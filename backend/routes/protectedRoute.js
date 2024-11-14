const express = require('express');
const verifyToken = require('../middleware/authMiddleware'); // Import the JWT middleware
const router = express.Router();

// Define a protected route that requires JWT verification
router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.userId });
});

module.exports = router;
