const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/admin');
const router = express.Router();

const jwtSecret = 'newone'; 

// Employee login route
router.post('/employee/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    
    if (password !== user.password) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
    console.log('JWT token created:', token); 
    res.json({ token, msg: 'Login successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Admin login route
router.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;

  try {
  
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    
    if (password !== admin.password) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    
    const token = jwt.sign({ adminId: admin.id }, jwtSecret, { expiresIn: '1h' });
    console.log('JWT token created:', token); 
    res.json({ token, msg: 'Login successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
