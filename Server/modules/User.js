const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String },
  orgId: { type: String },
  fullname: { type: String, required: true },
  dob: { type: String, required: true },
  doj: { type: String, required: true },
  dept: { type: String, default: '' },
  role: { type: String, required: true },
  manager: { type: String, default: '' },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  city: { type: String },
  country: { type: String },
  avatar: { type: String },
  accessibleCourses: [{type: String}]
});

UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = User = mongoose.model('user', UserSchema);