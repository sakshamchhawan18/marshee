const express = require('express');
const bcrypt = require('bcrypt');
const admin = require('../config/firebase');
const router = express.Router();

// Temp in-memory user store
const users = [];

router.post('/register', async (req, res) => {
  const { uid, phone, password } = req.body;

  if (!uid || !phone || !password) {
    return res.status(400).json({ message: 'All fields are required: uid, phone, password' });
  }

  try {
    // Fetch user info from Firebase using UID
    const userRecord = await admin.auth().getUser(uid);

    if (userRecord.phoneNumber !== phone) {
      return res.status(403).json({ message: 'Phone number does not match Firebase UID' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user (replace with DB logic)
    users.push({ uid, phone, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully', uid });
  } catch (error) {
    console.error('Firebase error:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

module.exports = router;
