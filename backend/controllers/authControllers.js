const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

const register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashed, role });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      '9f4b69f0c7b125d5b184aa267a70f1952e6d6b6fcf9fc4598f66c7a17f91f500',
      { expiresIn: '1d' }
    );

    res.status(201).json({
      token,
      role: newUser.role,
      msg: 'User registered successfully'
    });
  } catch (err) {
    res.status(500).json({ msg: 'Error registering user', error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid email or password' });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      '9f4b69f0c7b125d5b184aa267a70f1952e6d6b6fcf9fc4598f66c7a17f91f500',
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Login error', error: err.message });
  }
};

module.exports = {
  register,
  login
};
