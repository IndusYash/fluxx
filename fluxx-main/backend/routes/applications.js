// const express = require('express');
// const router = express.Router();
// const Joi = require('joi');

// const Application = require('../models/application');

// const applicationSchema = Joi.object({
//   name: Joi.string().min(1).max(200).required(),
//   branch: Joi.string().min(1).max(200).required(),
//   year: Joi.string().min(1).max(20).required(),
//   phone: Joi.string().pattern(/^[0-9+\-() ]{6,20}$/).required(),
//   email: Joi.string().email().required(),
//   whyJoin: Joi.string().min(1).max(2000).required(),
//   softSkills: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()).optional(),
//   hardSkills: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()).optional(),
// });

// // Create application
// router.post('/', async (req, res) => {
//   const { error, value } = applicationSchema.validate(req.body, { abortEarly: false });
//   if (error) return res.status(400).json({ errors: error.details.map(d => d.message) });

//   // normalize skills to arrays
//   const softSkills = Array.isArray(value.softSkills) ? value.softSkills : (value.softSkills ? value.softSkills.split(',').map(s => s.trim()) : []);
//   const hardSkills = Array.isArray(value.hardSkills) ? value.hardSkills : (value.hardSkills ? value.hardSkills.split(',').map(s => s.trim()) : []);

//   try {
//     const app = new Application({
//       name: value.name,
//       branch: value.branch,
//       year: value.year,
//       phone: value.phone,
//       email: value.email,
//       whyJoin: value.whyJoin,
//       softSkills,
//       hardSkills,
//     });
//     const saved = await app.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     console.error(err);
//     // Duplicate key error handling
//     if (err.code === 11000) {
//       const dupField = Object.keys(err.keyValue || {})[0];
//       return res.status(409).json({ error: `${dupField} already exists` });
//     }
//     res.status(500).json({ error: 'Failed to save application' });
//   }
// });

// // List applications (simple)
// router.get('/', async (req, res) => {
//   try {
//     const list = await Application.find().sort({ createdAt: -1 }).limit(100);
//     res.json(list);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch applications' });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Joi = require('joi');

const Application = require('../models/application');

const applicationSchema = Joi.object({
  name: Joi.string().min(1).max(200).required(),
  rollNo: Joi.string().length(10).required(),
  branch: Joi.string().min(1).max(200).required(),
  year: Joi.string().min(1).max(20).required(),
  phone: Joi.string().pattern(/^[0-9+\-() ]{6,20}$/).required(),
  email: Joi.string().email().required(),
  society: Joi.string().min(1).max(200).required(),
  whyJoin: Joi.string().min(1).max(2000).required(),
  softSkills: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()).optional(),
  hardSkills: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()).optional(),
});

// Create application
router.post('/', async (req, res) => {
  console.log("📩 Incoming body:", req.body);

  const { error, value } = applicationSchema.validate(req.body, { abortEarly: false });
  if (error) {
    console.error("Validation failed:", error.details); // 👈 Debug log
    return res.status(400).json({ errors: error.details.map(d => d.message) });
  }

  // normalize skills to arrays
  const softSkills = Array.isArray(value.softSkills) ? value.softSkills : (value.softSkills ? value.softSkills.split(',').map(s => s.trim()) : []);
  const hardSkills = Array.isArray(value.hardSkills) ? value.hardSkills : (value.hardSkills ? value.hardSkills.split(',').map(s => s.trim()) : []);

  try {
    const app = new Application({
      name: value.name,
      rollNo: value.rollNo,
      branch: value.branch,
      year: value.year,
      phone: value.phone,
      email: value.email,
      society: value.society,
      whyJoin: value.whyJoin,
      softSkills,
      hardSkills,
    });
    const saved = await app.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    // Duplicate key error handling
    if (err.code === 11000) {
      const dupField = Object.keys(err.keyValue || {})[0];
      return res.status(409).json({ error: `${dupField} already exists` });
    }
    res.status(500).json({ error: 'Failed to save application' });
  }
});

// List applications (simple)
router.get('/', async (req, res) => {
  try {
    const list = await Application.find().sort({ createdAt: -1 }).limit(100);
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

module.exports = router;
