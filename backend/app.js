const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();

// ✅ Must be first: CORS setup
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ✅ Explicitly handle preflight OPTIONS requests
app.options('*', cors());

// ✅ JSON body parser
app.use(bodyParser.json());

// ✅ Route handler
app.use('/api/auth', authRoutes);

// ✅ Debug log
app.use((req, res, next) => {
  console.log(`➡️ [${req.method}] ${req.originalUrl} from ${req.headers.origin}`);
  next();
});

module.exports = app;
