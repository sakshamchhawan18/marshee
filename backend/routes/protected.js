const express = require('express');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.get('/profile', verifyToken, (req, res) => {
  res.status(200).json({
    message: 'You are authenticated',
    user: req.user,
  });
});

module.exports = router;
