const mongoose = require('mongoose');

const CourseModuleSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  orgId: { type: String },
  description: { type: String },
  location: { type: String },
  file_path: { type: String },
  datetime: { type: String },
  file_mimetype: { type: String }
});

module.exports = CourseModule = mongoose.model('module', CourseModuleSchema);
