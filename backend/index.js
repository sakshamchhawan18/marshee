// Main server file
require('dotenv').config();

const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');
const serviceAccount = require('./key/serviceAccountKey.json');


const session = require('express-session')
const speakeasy = require('speakeasy');
const app = express();
const port = 5000;


const allowedOrigins = ['https://3000-idx-marshee-1745084024189.cluster-w5vd22whf5gmav2vgkomwtc4go.cloudworkstations.dev'];

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Add other Firebase project configs if needed

})
const corsOptions = {
  origin: allowedOrigins,
};


app.use(cors(corsOptions));


app.use(session({
  
  genid: () => {
    return uuidv4()
  },
  secret: 'your-secret-key', // Replace with a strong, random secret key
  resave: false,
  saveUninitialized: true,
}));

// Endpoint to test if the server is running
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Registration route
app.post('/register', async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    // Check if user exists in Firebase Authentication
    const userRecord = await admin.auth().getUserByPhoneNumber(phoneNumber)
    .then((userRecord)=>{
      return userRecord
    }).catch((err) =>{
      if (err.code == "auth/user-not-found"){
        return null
      }else{
        throw err
      }
    });
    if (userRecord) {
      return res.status(409).send({ error: 'Phone number already registered' });
    }
      // Create new user
    await admin.auth().createUser({
      phoneNumber: phoneNumber,
      password: password,
    });
     res.status(201).send({ message: 'User registered successfully' });
   } catch (error) {
    console.log(error)
    console.error('Error during registration:', error);
    res.status(500).send({ error: 'Error during registration' });
  }
});

// Test route
app.get('/test', (req, res) => {
  res.send('Hello World');
});


app.post('/send-otp', async (req, res) => {
  try {
    const { phoneNumber } = req.body; 
     // Check if user exists in Firebase Authentication
     const userRecord = await admin.auth().getUserByPhoneNumber(phoneNumber)
     .then((userRecord)=>{
       return userRecord
     }).catch((err) =>{
       if (err.code == "auth/user-not-found"){
         return null
       }else{
         throw err
       }
     });
     if (userRecord) {
       return res.status(409).send({ error: 'Phone number already registered' });
    }
    const verificationId = await admin.auth().createSessionLoginLink(phoneNumber).catch((err) => {
      throw err
    })
     console.log(phoneNumber, verificationId);


    res.status(200).send({ message: 'Verification code sent successfully', verificationId: verificationId });

  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).send({ error: 'Error sending OTP' });
  }
});

app.use((req, res, next) => {
  console.log(req.session);

  next();
});
app.listen(port, () => {

  console.log(`Server running on port ${port}`);
});