
const mongoose = require('mongoose');

const roles = ['particulier', 'entreprise'];
var Schema = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
  firstName: { type: String, required:  true },
  lastName: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  archive: { type: String, default:'false' }
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model('User', userSchema);

module.exports = User;
