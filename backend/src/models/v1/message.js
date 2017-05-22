const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const MessageSchema = new Schema({
  from: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  to: [{
    type: ObjectId,
    ref: 'User',
  }],
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  creation_date: {
    type: Date,
    default: new Date(),
  },
});

MessageSchema.post('validate', (doc) => {
  if (doc.isNew) {
    doc.creation_date = new Date();
  }
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
