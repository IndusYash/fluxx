import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import auth from "./routes/auth.js";
import detailed from "./routes/getDetail.js";
import judge from "./routes/judge.js";
import lead from "./routes/leader.js";
import ideathonTeam from "./routes/ideathonTeam.js";
import uploadRoutes from './routes/uploadRoutes.js';
import applications from './routes/applications.js';


dotenv.config();

const app = express();



app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',') : '*',
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
app.get('/ping', (req, res) => {
  res.send('pong')
});
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ CONNECTED TO DB");

    const port = process.env.PORT || 4000;

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);

      // Self ping every 10 min (Render free tier sleep fix)
      setInterval(() => {
        fetch("https://flux-backend-1hmq.onrender.com/ping")
          .then(() => console.log("🔁 Pinged self!"))
          .catch(() => console.log("❌ Self ping failed."));
      }, 1000 * 60 * 10);
    });

  } catch (error) {
    console.error("❌ DB Connection Failed:", error);
  }
};


start();
