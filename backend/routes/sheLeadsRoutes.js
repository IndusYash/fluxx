import express from 'express';
import mongoose from 'mongoose';
import SheLeadsModel from '../models/sheLeadsModel.js';

const router = express.Router();

// Helper to check MongoDB connection status
const isDbConnected = () => mongoose.connection && mongoose.connection.readyState === 1;

// POST /api/she-leads/register - Submit She Leads Registration directly to MongoDB
router.post('/register', async (req, res) => {
  try {
    const {
      name,
      rollNo,
      branch,
      section,
      year,
      email,
      phone,
      mobileNo,
      gender,
      slot,
      interests,
      experienceLevel,
      registrationSource,
    } = req.body;

    // 1. Mandatory field validation
    const rawPhone = phone || mobileNo;
    if (!name || !rollNo || !branch || !section || !year || !email || !rawPhone) {
      return res.status(400).json({
        error: 'Please fill in all required fields: Name, Roll No, Branch, Section, Year, Email, and Mobile Number.',
      });
    }

    // 3. Format sanitization
    const sanitizedEmail = String(email).trim().toLowerCase();
    const sanitizedRollNo = String(rollNo).trim().toUpperCase();
    const sanitizedPhone = String(rawPhone).trim().replace(/[^0-9]/g, '');

    if (sanitizedPhone.length < 10) {
      return res.status(400).json({
        error: 'Please enter a valid 10-digit mobile number.',
      });
    }

    // 4. Verify MongoDB connection
    if (!isDbConnected()) {
      return res.status(503).json({
        error: 'Database connection is temporarily unavailable. Please try again shortly.',
      });
    }

    // 5. Check for duplicate registration in MongoDB
    const duplicate = await SheLeadsModel.findOne({
      $or: [
        { email: sanitizedEmail },
        { rollNo: sanitizedRollNo },
        { phone: sanitizedPhone },
      ],
    });

    if (duplicate) {
      let duplicateField = 'entry';
      if (duplicate.email === sanitizedEmail) duplicateField = 'Email ID';
      else if (duplicate.rollNo === sanitizedRollNo) duplicateField = 'Roll Number';
      else duplicateField = 'Mobile Number';

      return res.status(409).json({
        error: `A registration with this ${duplicateField} already exists for She Leads.`,
      });
    }

    const ticketNumber = `SHE-${sanitizedRollNo.slice(-4) || '2026'}`;

    // 6. Save directly to MongoDB
    const newRegistration = new SheLeadsModel({
      name: String(name).trim(),
      rollNo: sanitizedRollNo,
      branch: String(branch).trim(),
      section: String(section).trim().toUpperCase(),
      year: String(year).trim(),
      email: sanitizedEmail,
      phone: sanitizedPhone,
      gender: 'Female',
      ticketNumber,
      slot: slot ? String(slot).trim() : 'Slot 1 (02:00 PM – 03:00 PM)',
      interests: Array.isArray(interests) ? interests : [],
      experienceLevel: experienceLevel || 'Beginner',
      registrationSource: registrationSource || 'web-form',
    });

    const savedRecord = await newRegistration.save();

    return res.status(201).json({
      success: true,
      message: 'Registration successful! Welcome to She Leads.',
      registrationId: savedRecord._id,
      ticketNumber: savedRecord.ticketNumber,
      data: savedRecord,
    });
  } catch (err) {
    console.error('Error saving She Leads registration to MongoDB:', err);

    // Handle mongoose duplicate key error if race condition occurs
    if (err.code === 11000) {
      return res.status(409).json({
        error: 'A registration with this credential already exists for She Leads.',
      });
    }

    return res.status(500).json({ error: 'Server error while processing registration.' });
  }
});

// GET /api/she-leads/registrations - List all registrations from MongoDB
router.get('/registrations', async (req, res) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({
        error: 'Database connection is temporarily unavailable.',
      });
    }

    const registrations = await SheLeadsModel.find().sort({ createdAt: -1 }).lean();
    return res.status(200).json({
      success: true,
      count: registrations.length,
      registrations,
    });
  } catch (err) {
    console.error('Error fetching She Leads registrations from MongoDB:', err);
    return res.status(500).json({ error: 'Server error while fetching registrations.' });
  }
});

// GET /api/she-leads/stats - Registration statistics from MongoDB
router.get('/stats', async (req, res) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({
        error: 'Database connection is temporarily unavailable.',
      });
    }

    const totalCount = await SheLeadsModel.countDocuments();
    return res.status(200).json({
      success: true,
      totalCount,
    });
  } catch (err) {
    console.error('Error fetching She Leads stats from MongoDB:', err);
    return res.status(500).json({ error: 'Server error while fetching stats.' });
  }
});

export default router;
