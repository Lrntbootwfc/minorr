const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'customer'], // 🟣 define allowed roles
    default: 'customer'          // 🟣 set default
  }
});

const User = mongoose.model('User', userSchema);


module.exports = { User };
