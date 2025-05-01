const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// POST: Add new doctor
router.post('/add-doctor', async (req, res) => {
  try {
    const newDoc = new Doctor(req.body);
    await newDoc.save();
    res.status(201).json({ success: true, doctor: newDoc });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET: List doctors with optional filters and pagination
router.get('/list-doctor-with-filter', async (req, res) => {
  const { minFee, maxFee, minExp, maxExp, page = 1, limit = 10 } = req.query;
  const filter = {};

  if (minFee !== undefined && maxFee !== undefined) {
    filter.fee = { $gte: Number(minFee), $lte: Number(maxFee) };
  }

  if (minExp !== undefined && maxExp !== undefined) {
    filter.experience = { $gte: Number(minExp), $lte: Number(maxExp) };
  }

  try {
    const doctors = await Doctor.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Doctor.countDocuments(filter);

    res.json({
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      doctors,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
