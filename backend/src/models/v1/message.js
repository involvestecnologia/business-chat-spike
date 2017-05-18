const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  from_user: {
    type: Number,
    required: true,
  },
  to_user: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
