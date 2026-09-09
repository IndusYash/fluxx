import express from 'express';
import ApplicationModel from '../models/applicationModel.js';

const router = express.Router();

// POST /api/applications  - submit induction form
router.post('/', async (req, res) => {
  try {
    const applicationData = req.body;

    // Check for duplicate phone / email / rollNo
    const query = {
      $or: [
        { email: applicationData.email },
        { phone: applicationData.phone }
      ]
    };

    if (applicationData.rollNo && applicationData.rollNo.trim() !== '') {
      query.$or.push({ rollNo: applicationData.rollNo });
    }

    const duplicate = await ApplicationModel.findOne(query);

    if (duplicate) {
      return res.status(409).json({
        error: 'An application with the same email, phone, or roll number already exists.',
      });
    }

    const newApplication = new ApplicationModel(applicationData);
    await newApplication.save();

    return res.status(201).json({
      message: 'Application submitted successfully.',
      applicationId: newApplication._id,
    });
  } catch (err) {
    console.error('Error saving application:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: 'Server error while saving application.' });
  }
});

// GET /api/applications  - retrieve all applications (admin use)
router.get('/', async (req, res) => {
  try {
    const applications = await ApplicationModel.find().sort({ createdAt: -1 });
    return res.status(200).json(applications);
  } catch (err) {
    console.error('Error fetching applications:', err);
    return res.status(500).json({ error: 'Server error while fetching applications.' });
  }
});

export default router;
