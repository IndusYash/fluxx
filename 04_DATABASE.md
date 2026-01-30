# 04 - Database (MongoDB & Mongoose)

## What is a Database?

**Database** = Place to store and retrieve data

Think of it like a **filing system**:
- Each document = A file folder
- Collections = Drawers that organize folders
- Database = The whole cabinet

```
Database (fluxx)
├── Collection: users
│   ├── Document: { _id, name, email, password }
│   ├── Document: { _id, name, email, password }
│   └── Document: { _id, name, email, password }
│
├── Collection: applications
│   ├── Document: { _id, fullName, email, phone }
│   └── Document: { _id, fullName, email, phone }
│
└── Collection: teams
    └── Document: { _id, teamName, members }
```

---

## SQL vs NoSQL

### SQL (Traditional)

```
Table: users
| id  | name  | email              | age |
|----|-------|-------------------|-----|
| 1  | Yash  | yash@example.com  | 21  |
| 2  | John  | john@example.com  | 25  |
```

- Structured tables with columns
- Example: MySQL, PostgreSQL

### NoSQL (Your Project)

```javascript
// Document (like JSON)
{
  _id: ObjectId("63af123"),
  name: "Yash",
  email: "yash@example.com",
  age: 21,
  skills: ["React", "Node.js"],  // Can have arrays!
  profile: { bio: "...", avatar: "..." }  // Can have nested objects!
}
```

- Flexible structure (documents look like JSON)
- Example: MongoDB
- Your project uses MongoDB

---

## MongoDB & Mongoose

**MongoDB** = NoSQL database
**Mongoose** = Library to work with MongoDB from Node.js

### Why Mongoose?

MongoDB by itself is low-level. Mongoose adds:
- **Schemas** = Define data structure
- **Validation** = Ensure data quality
- **Queries** = Easy ways to find/update data

---

## Mongoose Schema & Model

### Step 1: Define Schema (Structure)

```javascript
// models/auth.js
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,  // Must provide
    trim: true       // Remove spaces
  },
  email: {
    type: String,
    required: true,
    unique: true     // No duplicates
  },
  password: {
    type: String,
    required: true
  },
  phone: String,    // Optional
  createdAt: {
    type: Date,
    default: Date.now  // Auto timestamp
  }
});
```

**What Each Line Does:**
- `type: String` = Data type (String, Number, Boolean, Date, Array, Object)
- `required: true` = Must provide when creating
- `unique: true` = No duplicate values
- `default: value` = Auto-fill if not provided
- `trim: true` = Remove whitespace

### Step 2: Create Model (Interface to Database)

```javascript
const User = model("User", userSchema);

// Now you can use User to:
// - Create new users
// - Find users
// - Update users
// - Delete users
```

---

## CRUD Operations (Create, Read, Update, Delete)

### CREATE: Add New Data

```javascript
// Method 1: Direct creation
const newUser = new User({
  fullName: "Yash Verma",
  email: "yash@example.com",
  password: "hashed...",
  phone: "1234567890"
});
await newUser.save();

// Method 2: Shorthand
const user = await User.create({
  fullName: "Yash Verma",
  email: "yash@example.com",
  password: "hashed...",
  phone: "1234567890"
});
```

### READ: Fetch Data

```javascript
// Find one user by email
const user = await User.findOne({ email: "yash@example.com" });

// Find one user by ID
const user = await User.findById("63af123");

// Find all users
const allUsers = await User.find();

// Find with filter
const adults = await User.find({ age: { $gte: 18 } });

// Find specific fields only
const emails = await User.find({}, { email: 1, name: 1 });
```

### UPDATE: Modify Data

```javascript
// Update one
await User.updateOne(
  { _id: "63af123" },           // Find who
  { fullName: "New Name" }      // Change what
);

// Update many
await User.updateMany(
  { age: { $lt: 18 } },         // Find all under 18
  { status: "minor" }           // Mark as minor
);

// Find and update (returns updated doc)
const updatedUser = await User.findByIdAndUpdate(
  "63af123",
  { fullName: "New Name" },
  { new: true }  // Return updated version
);
```

### DELETE: Remove Data

```javascript
// Delete one
await User.deleteOne({ _id: "63af123" });

// Delete many
await User.deleteMany({ age: { $lt: 18 } });

// Find and delete (returns deleted doc)
const deleted = await User.findByIdAndDelete("63af123");
```

---

## Your Project's Models

### User Model (models/auth.js)

```javascript
const userSchema = new Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,        // Hashed
  phone: String,
  createdAt: { type: Date, default: Date.now }
});

const User = model("User", userSchema);
```

### Application Model (models/detail.js)

```javascript
const applicationSchema = new Schema({
  fullName: String,
  email: String,
  phone: String,
  branch: String,
  year: Number,
  experience: String,
  github: String,
  portfolio: String,
  submittedAt: { type: Date, default: Date.now }
});

const Application = model("Application", applicationSchema);
```

### Team Model (models/teamModel.js)

```javascript
const teamSchema = new Schema({
  teamName: String,
  members: [String],  // Array of member names
  leaderId: String,   // Reference to user
  createdAt: { type: Date, default: Date.now }
});

const Team = model("Team", teamSchema);
```

---

## How Backend Uses Database

### Example: Login Route

```javascript
// routes/auth.js
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;  // From request
  
  // READ: Find user in database
  const user = await User.findOne({ email });
  
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  
  // Verify password
  const validPassword = await bcrypt.compare(password, user.password);
  
  if (!validPassword) {
    return res.status(401).json({ error: "Wrong password" });
  }
  
  // CREATE: Generate token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  
  // SEND: Response to frontend
  res.json({
    token,
    user: { name: user.fullName, email: user.email }
  });
});
```

### Example: Submit Application

```javascript
app.post("/api/details", async (req, res) => {
  const applicationData = req.body;  // From form
  
  try {
    // CREATE: Save to database
    const application = await Application.create(applicationData);
    
    res.json({
      message: "Application submitted!",
      applicationId: application._id
    });
  } catch (error) {
    res.status(400).json({ error: "Invalid data" });
  }
});
```

---

## Data Types in MongoDB

```javascript
const schema = new Schema({
  // String
  name: String,
  
  // Number
  age: Number,
  
  // Boolean
  isActive: Boolean,
  
  // Date
  createdAt: Date,
  
  // Array
  skills: [String],           // ["React", "Node.js"]
  grades: [Number],           // [85, 92, 78]
  members: [{ name, role }],  // Array of objects
  
  // Object (nested)
  profile: {
    bio: String,
    avatar: String,
    social: {
      github: String,
      linkedin: String
    }
  },
  
  // Reference to another document
  leaderId: {
    type: Schema.Types.ObjectId,
    ref: "User"  // Link to User model
  }
});
```

---

## Index (Make Queries Fast)

```javascript
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,  // Index: speeds up finding by email
    index: true    // Also index for faster searches
  }
});
```

---

## Interview Questions

### Q1: "What is MongoDB?"

Answer:
> "MongoDB is a NoSQL database that stores data as JSON-like documents.
> Unlike SQL with rigid tables, MongoDB is flexible - each document can have different fields.
> Your project uses it to store users, applications, and teams."

### Q2: "What is Mongoose?"

Answer:
> "Mongoose is a library that makes MongoDB easier to use from Node.js.
> It lets you define schemas (rules for data structure) and provides methods
> like find(), create(), update(), delete() to work with the database."

### Q3: "What's the difference between Schema and Model?"

Answer:
> "Schema defines the structure and rules (what fields exist, what types).
> Model is the interface to actually work with the database.
> You create a Schema, then create a Model from it."

### Q4: "How do you fetch a user?"

Answer:
> "Using Mongoose: const user = await User.findOne({ email: 'yash@example.com' });
> This searches the users collection for a document with that email.
> The await waits for the database to respond."

---

## Key Takeaways

✅ MongoDB = NoSQL database (JSON-like documents)
✅ Mongoose = Library to work with MongoDB
✅ Schema = Structure and rules for data
✅ Model = Interface to database (find, create, update, delete)
✅ CRUD = Create, Read, Update, Delete operations
✅ Index = Make queries faster

---

**Next:** Read `05_PROJECT_STRUCTURE.md` to understand your project layout.

