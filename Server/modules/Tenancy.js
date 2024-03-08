const mongoose = require('mongoose');

const TenancySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  subdomain: { type: String, required: true, unique: true },
  adminName: { type: String },
  gstin: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  city: { type: String },
  country: { type: String },
  departments: [{ type: String },],
  autoRenewal: { type: Boolean, default: true },
  userCount: { type: Number, default: 0 },
  logo: { type: String },
  skills: [{ type: String },],
});

module.exports = Tenancy = mongoose.model('tenancy', TenancySchema);