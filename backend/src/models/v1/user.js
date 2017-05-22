const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  online: {
    type: Boolean,
    default: false,
  },
  creation_date: {
    type: Date,
    default: new Date(),
  },
});

UserSchema.post('validate', (doc) => {
  if (doc.isNew) {
    doc.creation_date = new Date();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
