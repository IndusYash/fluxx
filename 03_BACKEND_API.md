# 03 - Backend & REST API

## What is Backend?

**Backend is the server that handles:**
- Data storage (database)
- Business logic (calculations, validations)
- Authentication (login, security)
- API endpoints (where frontend sends requests)

Your project uses **Node.js + Express** for backend.

---

## REST API Explained

**REST API** = Way for frontend to talk to backend

### HTTP Methods (Ways to Talk)

```
GET     /api/users         → Fetch data
POST    /api/auth/login    → Create data (submit form)
PUT     /api/users/123     → Update data
DELETE  /api/users/123     → Delete data
```

### Request & Response

```
FRONTEND                          BACKEND
   ↓                               ↑
  Sends HTTP Request      ← Receives Request
  {                                ↓
    method: POST                Processes Data
    url: /api/auth/login         ↓
    body: {email, password}   Database Operation
  }                                ↓
   ↑                          Sends JSON Response
  Gets JSON Response              ↓
  {
    token: "xyz",
    user: { name, email }
  }
```

---

## Your Backend Code

### File: `backend/brain.js` (Main Server)

```javascript
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

// Middleware: Process incoming requests
app.use(express.json());    // Parse JSON requests
app.use(cors());            // Allow frontend to call this API

// Routes: Define what endpoints do
app.use("/api/auth", auth);           // Login/register
app.use("/api/details", detailed);    // Fetch details
app.use("/api/judge", judge);         // Judge operations
app.use("/api/upload", uploadRoutes); // File upload

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

**What's happening:**
1. Import express (framework for APIs)
2. Set up middleware (express.json, cors)
3. Define routes (endpoints)
4. Start server on port 4000

---

## What is Middleware?

**Middleware** = Code that processes requests before reaching the endpoint

```
Request comes in
    ↓
Middleware 1 (express.json) → Parse JSON
    ↓
Middleware 2 (cors) → Check if allowed
    ↓
Middleware 3 (auth) → Verify user token
    ↓
Route Handler → Do the actual work
    ↓
Send Response
```

### Common Middleware in Your Project

```javascript
app.use(express.json());
// Parses incoming JSON
// Converts JSON string to JavaScript object

app.use(cors());
// Allows frontend domain to call backend
// Without this: frontend can't make requests

app.use("/api/auth", auth);
// Routes all /api/auth/* requests to auth.js
```

---

## Routes (API Endpoints)

Routes are like **functions** that run when you visit a URL.

### Example Route

```javascript
// When frontend does: POST /api/auth/login
// This code runs:
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;  // Get from request
  
  // Check password
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  
  // Send response
  res.json({
    token: "xyz...",
    user: { name: user.name, email: user.email }
  });
});
```

**What's happening:**
1. Frontend sends `POST /api/auth/login` with email and password
2. Backend receives request in `req`
3. Backend checks database
4. Backend sends response with `res.json()`

---

## Your Routes

### Route 1: Authentication (`backend/routes/auth.js`)

```javascript
POST   /api/auth/register     → Create new user account
POST   /api/auth/login        → Login user, get token
GET    /api/auth/profile      → Get current user info
```

### Route 2: Details (`backend/routes/getDetail.js`)

```javascript
GET    /api/details/:id       → Get user/team details
```

### Route 3: Judge (`backend/routes/judge.js`)

```javascript
POST   /api/judge/score       → Submit judge score
GET    /api/judge/results     → Get judge results
```

### Route 4: Upload (`backend/routes/uploadRoutes.js`)

```javascript
POST   /api/upload            → Upload image/file
```

---

## How Frontend Calls Backend

### Example 1: Login

**Frontend Code:**
```jsx
// In React component
async function login(email, password) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  // data = { token: "xyz", user: {...} }
  
  localStorage.setItem("token", data.token);  // Save token
}
```

**Backend Code:**
```javascript
// In auth.js
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  
  // Verify credentials
  const user = await User.findOne({ email });
  const validPassword = bcrypt.compare(password, user.password);
  
  if (validPassword) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token, user });
  } else {
    res.status(401).json({ error: "Invalid password" });
  }
});
```

---

## Authentication: Passwords & Tokens

### Problem: Storing Passwords

❌ **Don't store plain passwords:**
```javascript
// BAD
user.password = "mypassword123";  // If hacked, passwords exposed!
```

✅ **Hash passwords:**
```javascript
// GOOD
const hashedPassword = bcrypt.hash("mypassword123");
// Hashing: "mypassword123" → "aG7k2jH3m9x0..."
// Cannot reverse it!
```

### JWT Tokens (Session)

**Token** = Proof that user is logged in

```
User logs in
    ↓
Backend creates token with user ID
    ↓
Frontend stores token (localStorage)
    ↓
Future requests include token
    ↓
Backend verifies token
    ↓
Serves data if token valid
```

**Token Example:**
```
Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2FmMTIzIn0...

Contains: { userId: "63af123" }
Signed with: process.env.JWT_SECRET
Backend can verify it wasn't tampered with
```

---

## Database in Backend

Your backend uses **MongoDB** via **Mongoose**.

```javascript
// models/auth.js
const userSchema = new Schema({
  fullName: String,
  email: String,
  password: String,  // Hashed!
  createdAt: Date
});

const User = mongoose.model("User", userSchema);

// Insert user
const newUser = new User({ fullName, email, password });
await newUser.save();

// Find user
const user = await User.findOne({ email });

// Update user
await User.updateOne({ _id: id }, { fullName: "New Name" });

// Delete user
await User.deleteOne({ _id: id });
```

---

## Backend Validation

Backend validates **again** even though frontend did:

```javascript
// Frontend validates with Zod
// Backend validates with database checks

app.post("/api/auth/register", async (req, res) => {
  const { email, password } = req.body;
  
  // Check if user already exists
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ error: "Email already registered" });
  }
  
  // Create user
  const newUser = new User({ email, password: bcrypt.hash(password) });
  await newUser.save();
  
  res.json({ message: "User registered" });
});
```

**Why?** Frontend can be bypassed, backend is more secure.

---

## Interview Questions

### Q1: "What is REST API?"

Answer:
> "REST API is a way for frontend and backend to communicate.
> Frontend sends HTTP requests (GET, POST, PUT, DELETE) to endpoints.
> Backend responds with JSON data.
> Example: POST /api/auth/login with email/password."

### Q2: "What is middleware?"

Answer:
> "Middleware processes requests before they reach the route handler.
> Examples: express.json() parses JSON, cors() allows frontend to call backend.
> Middleware runs in order and can stop the request."

### Q3: "Why hash passwords?"

Answer:
> "Hashing converts password to unreadable string. If database is hacked,
> passwords are protected because hashes can't be reversed.
> bcrypt is a hashing library that makes this secure."

### Q4: "What is JWT token?"

Answer:
> "JWT is a token given after login. It contains user ID and is signed by backend.
> Frontend stores it and sends with future requests.
> Backend verifies the signature to confirm token is valid."

---

## Key Takeaways

✅ Backend = Server handling logic and data
✅ REST API = HTTP methods (GET, POST, PUT, DELETE)
✅ Middleware = Process requests before routes
✅ Routes = Endpoints that do specific work
✅ Authentication = Passwords hashed, tokens for sessions
✅ Database = Stores and retrieves data

---

**Next:** Read `04_DATABASE.md` to understand data storage.

