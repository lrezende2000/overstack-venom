const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    validate: [/^[0-9]{11}$/, 'Phone format 99999999999'],
  },
  status: {
    type: String,
    enum: ['A', 'D'],
    required: true,
    default: 'A',
  },
});

module.exports = mongoose.model('User', User);
