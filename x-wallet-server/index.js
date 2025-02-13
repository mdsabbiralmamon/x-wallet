const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://x-wallet-bysam.firebaseapp.com",
      "https://x-wallet-bysam.web.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

// mongoDB
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wu8kmms.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// ====================================
//         Mongo DB Connection
// ====================================
async function run() {
  try {
    // User collection
    const userCollection = client.db("xWalletDB").collection("users");
    const transactionCollection = client
      .db("xWalletDB")
      .collection("transactions");

    // user API calls
    app.get("/api/auth/user", async (req, res) => {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res
          .status(401)
          .json({ error: "Unauthorized", message: "No token provided" });
      }

      try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await userCollection.findOne({
          _id: new ObjectId(decoded.id),
        });

        if (!user) {
          return res.status(404).json({
            error: "User not found",
            message: "User associated with token not found",
          });
        }

        res.status(200).json({ user });
      } catch (error) {
        console.error("Failed to verify token:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // transaction API calls
    // send money
    app.post("/api/transactions/send", async (req, res) => {
      const token = req.headers.authorization?.split(" ")[1];
      const { receiver, amount, pin, transactionType } = req.body;

      if (!token) {
        return res
          .status(401)
          .json({ error: "Unauthorized", message: "No token provided" });
      }

      try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await userCollection.findOne({
          _id: new ObjectId(decoded.id),
        });

        if (!user) {
          return res.status(404).json({
            error: "User not found",
            message: "User associated with token not found",
          });
        }

        const receiverUser = await userCollection.findOne({ phone: receiver });
        if (!receiverUser) {
          return res.status(404).json({
            error: "Receiver not found",
            message: "Receiver not found",
          });
        }

        if (user.phone === receiver) {
          return res.status(400).json({
            error: "Invalid receiver",
            message: "You cannot send money to yourself",
          });
        }

        if (user.balance < amount) {
          return res.status(400).json({
            error: "Insufficient balance",
            message: "You do not have enough balance to send this amount",
          });
        }

        if (
          receiverUser.accountType !== user.accountType 
        ) {
          return res.status(400).json({
            error: "Invalid receiver",
            message: "You can only send money to the personal account",
          });
        }

        const isPasswordValid = await bcrypt.compare(pin, user.pin);
        if (!isPasswordValid) {
          return res.status(401).json({
            error: "Invalid PIN",
            message: "Invalid PIN",
          });
        }

        if (amount < 50) {
          return res.status(400).json({
            error: "Invalid amount",
            message: "Transaction amount must be at least 50 Taka",
          });
        }

        let fee = 0;
        if (amount > 100) {
          fee = 5;
        }

        const finalAmount = parseFloat(amount) + parseFloat(fee);
        if (user.balance < finalAmount) {
          return res.status(400).json({
            error: "Insufficient balance",
            message:
              "You do not have enough balance to send this amount with fee",
          });
        }

        // Start a session and transaction
        const session = client.startSession();
        session.startTransaction();

        try {
          // transaction logic
          await transactionCollection.insertOne(
            {
              senderPhone: user.phone,
              receiverPhone: receiverUser.phone,
              amount: parseFloat(amount),
              fee,
              transactionType,
              date: new Date(),
            },
            { session }
          );

          // Update sender's balance
          await userCollection.updateOne(
            { _id: user._id },
            { $inc: { balance: -finalAmount } },
            { session }
          );

          // Update receiver's balance
          await userCollection.updateOne(
            { _id: receiverUser._id },
            { $inc: { balance: parseFloat(amount) } },
            { session }
          );

          // Commit the transaction
          await session.commitTransaction();
          session.endSession();

          // console.log(`Sender id: ${user._id} Phone: ${user.phone} sending ${amount} with fee ${fee}`);
          // console.log(`Receiver id: ${receiverUser._id} Phone: ${receiverUser.phone} receiving ${amount}`);

          res
            .status(200)
            .json({ success: true, message: "Money sent successfully" });
        } catch (error) {
          // Abort the transaction
          await session.abortTransaction();
          session.endSession();

          console.error("Transaction failed:", error);
          res.status(500).json({
            error: "Internal server error",
            message: "Transaction failed",
          });
        }
      } catch (error) {
        console.error("Failed to verify token or send money:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // cash out api
    app.post("/api/transactions/cash", async (req, res) => {
      const token = req.headers.authorization?.split(" ")[1];
      const { receiver, amount, pin, transactionType } = req.body;
    
      if (!token) {
        return res
          .status(401)
          .json({ error: "Unauthorized", message: "No token provided" });
      }
    
      try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await userCollection.findOne({
          _id: new ObjectId(decoded.id),
        });
    
        if (!user) {
          return res.status(404).json({
            error: "User not found",
            message: "User associated with token not found",
          });
        }
    
        const receiverUser = await userCollection.findOne({ phone: receiver });
        if (!receiverUser) {
          return res.status(404).json({
            error: "Agent not found",
            message: "Agent not found",
          });
        }
    
        if (receiverUser.accountType === user.accountType) {
          return res.status(400).json({
            error: "Invalid Agent",
            message: "Cash out can only be done through an agent",
          });
        }
    
        if (user.phone === receiver) {
          return res.status(400).json({
            error: "Invalid receiver",
            message: "You cannot Cash out money to yourself",
          });
        }
    
        if (user.balance < amount) {
          return res.status(400).json({
            error: "Insufficient balance",
            message: "You do not have enough balance to Cash Out",
          });
        }
    
        const isPasswordValid = await bcrypt.compare(pin, user.pin);
        if (!isPasswordValid) {
          return res.status(401).json({
            error: "Invalid PIN",
            message: "Invalid PIN",
          });
        }
    
        if (amount < 50) {
          return res.status(400).json({
            error: "Invalid amount",
            message: "Transaction amount must be at least 50 Taka",
          });
        }
    
        const fee = amount * 0.015;
        const finalAmount = parseFloat(amount) + parseFloat(fee);
        console.log(`amount ${amount} Final Amount: ${finalAmount} Fee: ${fee}`);
    
        if (user.balance < finalAmount) {
          return res.status(400).json({
            error: "Insufficient balance",
            message:
              "You do not have enough balance to Cash Out this amount with fee",
          });
        }
    
        // Start a session and transaction
        const session = client.startSession();
        session.startTransaction();
    
        try {
          // transaction logic
          await transactionCollection.insertOne(
            {
              senderPhone: user.phone,
              receiverPhone: receiverUser.phone,
              amount: parseFloat(amount),
              fee,
              transactionType,
              date: new Date(),
            },
            { session }
          );
    
          // Update sender's balance
          await userCollection.updateOne(
            { _id: user._id },
            { $inc: { balance: -finalAmount } },
            { session }
          );
    
          // Update receiver's balance
          await userCollection.updateOne(
            { _id: receiverUser._id },
            { $inc: { balance: parseFloat(amount + fee) } },
            { session }
          );
    
          // Commit the transaction
          await session.commitTransaction();
          session.endSession();
    
          res.status(200).json({ success: true, message: "Money Cashed Out successfully" });
        } catch (error) {
          // Abort the transaction
          await session.abortTransaction();
          session.endSession();
    
          console.error("Transaction failed:", error);
          res.status(500).json({
            error: "Internal server error",
            message: "Transaction failed",
          });
        }
      } catch (error) {
        console.error("Failed to verify token or send money:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });
    

    // Signup Related API Calls
    app.post("/api/auth/register", async (req, res) => {
      // Extract the user details from the request body
      const { name, mobile, email, pin, account, role } = req.body;

      try {
        // Check if a user with the given email or phone number already exists
        const existingUser = await userCollection.findOne({
          $or: [{ email }, { phone: mobile }],
        });

        if (existingUser) {
          return res.status(400).json({
            error: "A user with this email or phone number already exists",
            message: "Email or phone number already exists",
          });
        }

        // Hash the PIN
        const hashedPassword = await bcrypt.hash(pin, 13);
        console.log("Hashed password", hashedPassword);

        const newUser = {
          name,
          email,
          phone: mobile,
          accountType: account,
          userRole: role,
          pin: hashedPassword,
          status: "pending", // Initial status is pending
          balance: account === "user" ? 40 : 10000, // Initial balance based on role
        };

        // Insert the new user into the database
        const result = await userCollection.insertOne(newUser);

        // Return success response
        res.status(201).json({
          message: "User registered successfully",
          userId: result.insertedId,
        });
      } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Login Related API Calls
    app.post("/api/auth/login", async (req, res) => {
      const { identifier, pin } = req.body;
      console.log("Identifier:", identifier, "PIN:", pin);

      try {
        const user = await userCollection.findOne({
          $or: [{ email: identifier }, { phone: identifier }],
        });
        console.log("User:", user);

        if (!user) {
          return res.status(404).json({
            error: "User not found",
            message: "User not found",
          });
        }

        if (user.status === "pending") {
          return res.status(403).json({
            error: "Account pending",
            message: "Your account is still pending approval.",
          });
        }

        const isPasswordValid = await bcrypt.compare(pin, user.pin);

        if (!isPasswordValid) {
          return res.status(401).json({
            error: "Invalid PIN",
            message: "Invalid PIN",
          });
        }

        // Generate JWT
        const token = jwt.sign(
          { id: user._id },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1h", // Token expires in 1 hour
          }
        );

        res.status(200).json({
          message: "User logged in successfully",
          token,
          user,
        });
      } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// routes
app.get("/", (req, res) => {
  res.send("X Wallet server is running");
});

// listening port
app.listen(port, () => {
  console.log("X Wallet server is listening on port " + port);
});
