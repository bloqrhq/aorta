import express from 'express';
import User from '../model/User.js';

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({ username, email, password });
    await user.save();

    // Generate token (simplified - in production use JWT)
    const token = `token_${user._id}`;

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password (simplified - in production use bcrypt)
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token (simplified - in production use JWT)
    const token = `token_${user._id}`;

    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;