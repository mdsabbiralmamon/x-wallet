const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
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
            error: 'A user with this email or phone number already exists',
            message: 'Email or phone number already exists',
          });
        }

        // Hash the PIN
        const hashedPassword = await bcrypt.hash(pin, 13);
        console.log('Hashed password', hashedPassword);

        const newUser = {
          name,
          email,
          phone: mobile,
          accountType: account,
          userRole: role,
          pin: hashedPassword,
          status: 'pending', // Initial status is pending
          balance: account === 'user' ? 40 : 10000, // Initial balance based on role
        };

        // Insert the new user into the database
        const result = await userCollection.insertOne(newUser);

        // Return success response
        res.status(201).json({
          message: 'User registered successfully',
          userId: result.insertedId,
        });
      } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Login Related API Calls
    app.post("/api/auth/login", async (req, res) => {
      // Extract the user details from the request body
      const { identifier, pin } = req.body;
      console.log('Identifier:', identifier, 'PIN:', pin);
    
      try {
        // Check if a user with the given email or phone number exists
        const user = await userCollection.findOne({
          $or: [{ email: identifier }, { phone: identifier }],
        });
        console.log('User:', user);
    
        if (!user) {
          return res.status(404).json({
            error: 'User not found',
            message: 'User not found',
          });
        }
    
        // Compare the hashed password
        const isPasswordValid = await bcrypt.compare(pin, user.pin);
    
        if (!isPasswordValid) {
          return res.status(401).json({
            error: 'Invalid PIN',
            message: 'Invalid PIN',
          });
        }
    
        // Return success response
        res.status(200).json({
          message: 'User logged in successfully',
          user,
        });
      } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal server error' });
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
  