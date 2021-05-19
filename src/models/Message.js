const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema({
  text: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  to: {
    type: String,
    required: true,
    validate: [/^[0-9]{11}$/, 'Phone format 99999999999'],
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Message', Message);
