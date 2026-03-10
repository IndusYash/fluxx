import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import auth from "./routes/auth.js";
import detailed from "./routes/getDetail.js";
import judge from "./routes/judge.js";
import lead from "./routes/leader.js";
import ideathonTeam from "./routes/ideathonTeam.js";
import uploadRoutes from './routes/uploadRoutes.js';
import applications from './routes/applications.js';

const app = express();



app.use(express.json());

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use("/api/auth", auth);
app.use("/api/details",detailed);
app.use("/api/judge",judge);
app.use("/api/leader",lead);
app.use("/api/ideathonTeam",ideathonTeam);
app.use("/api/upload", uploadRoutes);
app.use("/api/applications", applications);

// simple health check endpoint used by many platforms (GET /healthz)
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const start = async () => {
  try{
    await mongoose.connect(process.env.MONGO_URI);
  console.log("CONNECTED TO DB");
  
  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
  }
  catch(err){
    if (err.name === 'MongooseServerSelectionError') {
      console.error("\n❌ MONGODB CONNECTION ERROR: Could not connect to Atlas cluster.");
      console.error("👉 Please ensure your current IP address is whitelisted in MongoDB Atlas.");
      console.error("👉 See: https://www.mongodb.com/docs/atlas/security-whitelist/\n");
    } else {
      console.error("❌ Database connection error:", err.message);
    }
    process.exit(1);
  }
};

start();
