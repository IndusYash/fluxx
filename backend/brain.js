import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });
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
import judgeAuthRoutes from './routes/judgeAuth.js';

const app = express();



app.use(express.json());

const defaultAllowedOrigins = [
  "https://flux.org.in",
  "https://www.flux.org.in",
];

const normalizeOrigin = (value = "") => value.trim().replace(/\/$/, "");

const allowedOrigins = (process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : defaultAllowedOrigins
)
  .map(normalizeOrigin)
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(normalizeOrigin(origin))) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use("/api/auth", auth);
app.use("/api/details",detailed);
app.use("/api/judge",judge);
app.use("/api/leader",lead);
app.use("/api/ideathonTeam",ideathonTeam);
app.use("/api/upload", uploadRoutes);
app.use("/api/applications", applications);
app.use("/api/judge-auth", judgeAuthRoutes);

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
