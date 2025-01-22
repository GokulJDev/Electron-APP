const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');  // For password hashing
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');  // Import the User model

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
const connectionString = process.env.MONGO_URI;
mongoose.connect(connectionString)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header (Bearer token)
  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }
    req.user = decoded;  // Attach decoded user data to the request object
    next();  // Proceed to the next middleware or route handler
  });
};

// Register a new user
app.post('/register', async (req, res) => {
  const { username, password, role, lastLogin } = req.body;

  if (!username || !password || !role) {
      return res.status(400).json({ message: 'Username, password, and role are required' });
  }

  try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
          return res.status(400).json({ message: 'Username already exists' });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds of hashing
      const newUser = new User({
          username, 
          password: hashedPassword, 
          role, 
          lastLogin: lastLogin || new Date()
      });

      await newUser.save();
      res.json({ message: 'User registered successfully!', user: newUser });
  } catch (err) {
      console.error('Error while registering:', err);
      res.status(500).json({ message: 'Error registering user', error: err });
  }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare the hashed password with the input password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Update lastLogin to the current timestamp
        user.lastLogin = new Date();
        await user.save();

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// `/me` route to get the current user’s profile based on JWT token
app.get('/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');  // Exclude the password from the response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);  // Send back the user's details
    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
