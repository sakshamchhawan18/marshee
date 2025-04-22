require('dotenv').config();
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const session = require('express-session');
const serviceAccount = require('./key/serviceAccountKey.json');

const app = express();
const port = process.env.PORT || 5000;

// 🔐 Firebase Admin Init
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// 🌍 CORS Setup
const allowedOrigins = [
  'http://localhost:3000',
  'https://3000-idx-marshee-1745084024189.cluster-w5vd22whf5gmav2vgkomwtc4go.cloudworkstations.dev'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

// 🔧 Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
  genid: () => uuidv4(),
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// 🐞 Debug session data
app.use((req, res, next) => {
  console.log('Session:', req.session);
  next();
});

// 🚀 Test route
app.get('/test', (req, res) => {
  res.send('Hello World');
});

// 📝 Register route
app.post('/register', async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const existingUser = await admin.auth().getUserByPhoneNumber(phoneNumber)
      .catch(err => (err.code === 'auth/user-not-found' ? null : Promise.reject(err)));

    if (existingUser) {
      return res.status(409).json({ error: 'Phone number already registered' });
    }

    await admin.auth().createUser({
      phoneNumber,
      password,
    });

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Error during registration' });
  }
});

// 🔐 Send OTP route (placeholder)
app.post('/send-otp', async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    const existingUser = await admin.auth().getUserByPhoneNumber(phoneNumber)
      .catch(err => (err.code === 'auth/user-not-found' ? null : Promise.reject(err)));

    if (existingUser) {
      return res.status(409).json({ error: 'Phone number already registered' });
    }

    // Placeholder for Twilio or Firebase client SDK logic
    console.log(phoneNumber, '🔔 Send OTP logic goes here');

    res.status(200).json({ message: 'OTP logic not implemented — use client SDK or Twilio' });

  } catch (error) {
    console.error('OTP send error:', error);
    res.status(500).json({ error: 'Error sending OTP' });
  }
});

// 🎯 Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
