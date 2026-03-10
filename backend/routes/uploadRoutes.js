import express from "express";
import upload from "../extrasTaken/upload.js";
import { uploadToSupabase } from "../extrasTaken/upload.js";

const router = express.Router();

// Upload PPT / documents to Supabase
router.post("/ppt", upload.single("file"), async (req, res) => {
  try {
    const bucket = process.env.SUPABASE_BUCKET_PPTS || "ideathon_ppts";
    const result = await uploadToSupabase(
      req.file.buffer,
      bucket,
      req.file.originalname,
      req.file.mimetype
    );
    // Return the public URL (ensure your Supabase bucket is public)
    res.json({ url: result.publicURL, key: result.key, path: result.path });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message || err });
  }
});

// Upload photos/images to Supabase
router.post("/photo", upload.single("file"), async (req, res) => {
  try {
    const bucket = process.env.SUPABASE_BUCKET_PHOTOS || "ideathon_photos";
    const result = await uploadToSupabase(
      req.file.buffer,
      bucket,
      req.file.originalname,
      req.file.mimetype
    );
    res.json({ url: result.publicURL, key: result.key, path: result.path });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message || err });
  }
});

// Upload induction application photos to Supabase
router.post("/induction-photo", upload.single("file"), async (req, res) => {
  try {
    const bucket = "applications";
    const rollNo = req.body.rollNo || 'unknown';
    const timestamp = Date.now();
    const fileExt = req.file.originalname.split('.').pop();
    const customName = `induction-photos/${rollNo}_${timestamp}.${fileExt}`;
    
    const result = await uploadToSupabase(
      req.file.buffer,
      bucket,
      customName,
      req.file.mimetype
    );
    res.json({ url: result.publicURL, key: result.key, path: result.path });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message || err });
  }
});

router.get("/testpreset", (req, res) => {
  res.json({
    presetLoaded: process.env.CLOUD_PRESET
  });
});


export default router;
