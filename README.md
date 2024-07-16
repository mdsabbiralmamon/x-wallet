## X Wallet : Project Details >>>

**X Wallet** is a Mobile Financial Service (MFS) application inspired by popular platforms like bKash and Nagad. Built using React.js, Node.js, Express.js, and MongoDB, X Wallet provides a simple, secure web interface for essential financial transactions.

### Features

**For Users:**
- **Registration:** Users register with their name, mobile number, email, and a 5-digit PIN. Accounts are initially pending and require admin approval. Upon activation, users receive a 40 Taka bonus.
- **Secure Login:** Users can log in using either their mobile number or email along with their PIN. JWT is used for authentication.
- **Send Money:** Users can send money to other users, with PIN and JWT verification. Transactions over 100 Taka incur a 5 Taka fee.
- **Cash-Out:** Users can cash out through agents, with a 1.5% transaction fee.
- **Cash-In:** Users can cash in through agents without any fees.
- **Balance Inquiry:** Users can check their account balance at any time.
- **Transaction History:** Users can view their last 10 transactions.

**For Agents:**
- **Registration:** Agents register with their name, mobile number, email, and a 5-digit PIN. Accounts are initially pending and require admin approval. Upon activation, agents receive a 10,000 Taka bonus.
- **Secure Login:** Agents can log in using either their mobile number or email along with their PIN. JWT is used for authentication.
- **Transaction Management:** Agents can manage cash-in and cash-out requests. Approved transactions adjust the balances of the user and agent accordingly.
- **Balance Inquiry:** Agents can check their account balance at any time.
- **Transaction History:** Agents can view their last 20 transactions.

**For Admins:**
- **Secure Login:** Admins can log in using either their mobile number or email along with their PIN. JWT is used for authentication.
- **User Management:** Admins can view all users, search for specific users, and manage account statuses (activate/block accounts).
- **System Monitoring:** Admins can view all transactions within the system.

### UI Instructions
- **Dashboard Only:** The application does not include a landing page. The focus is on a visually attractive dashboard.
- **Protected Application:** Users are redirected to the login page if not authenticated.
- **Responsive Design:** The dashboard is designed to be responsive for both desktop and mobile devices.

### Setup and Installation
1. **Clone the Repository:**
   ```sh
   git clone https://github.com/mdsabbiralmamon/x-wallet.git
   cd x-wallet
   ```
2. **Open Desired Folder:**
This folder contains the server and client both directory. You have to open and read the Separate readme files for more detailed information:
---

## X Wallet : Project To Do List >>>

## Day 1: Frontend Setup and Basic Features


1. **Project Initialization:**
   - <strike>Initialize React.js project.</strike>
   - <strike>Set up Context API for state management.</strike>

2. **User Registration and Login:**
   - <strike>Create registration and login forms for User.</strike>
   - <strike>Implement form validation.</strike>


3. **Agent Registration and Login:**
   - Create registration and login forms for Agent.
   - Implement form validation.

4. **Admin Login:**
   - Create login form for Admin.
   - Implement form validation.


5. **User Dashboard:**
   - Create dashboard component for User.
   - Implement overview page showing relevant stats (Name, Email, Phone, Balance).

6. **Agent Dashboard:**
   - Create dashboard component for Agent.
   - Implement overview page showing relevant stats (Name, Email, Phone, Balance).

## Day 2: Backend Setup and Advanced Features


1. **Project Initialization:**
   - Initialize Node.js project.
   - Set up Express.js server.
   - Create MongoDB database connection.

2. **User and Agent Registration:**
   - Define Mongoose schemas for User and Agent.
   - Implement registration routes for User and Agent.
   - Add PIN hashing using bcrypt.js.
   - Save user and agent data with pending status.


3. **Admin Registration and Secure Login:**
   - Define Mongoose schema for Admin.
   - Implement admin registration and login routes.
   - Use JWT for authentication and secure login.
   - Implement PIN hashing and JWT token generation for Admin.

4. **Admin Approval System:**
   - Implement routes for admin to view and approve User and Agent registrations.
   - Update user and agent status upon approval.
   - Credit bonuses to approved User (40 Taka) and Agent (10,000 Taka).


5. **Secure Login for Users and Agents:**
   - Implement login routes for User and Agent.
   - Use JWT for authentication.
   - Save JWT token in the browser upon successful login.

6. **Basic Transaction Management:**
   - Create routes for sending money, cash-in, and cash-out.
   - Implement PIN and JWT verification for transactions.
   - Add transaction fee logic for send money and cash-out.

7. **Final Touches and Testing:**
   - Ensure all routes are protected and redirect to login if not authenticated.
   - Implement responsive design for mobile and desktop.
   - Test all features thoroughly to ensure everything works as expected.
