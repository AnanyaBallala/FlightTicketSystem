const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: 'Password encryption failed' });

    User.create({ name, email, password: hash }, (err) => {
      if (err) return res.status(500).json({ error: 'User registration failed' });
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ error: 'User not found' });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2h' });
      res.status(200).json({ message: 'Login successful', token });
    });
  });
};
