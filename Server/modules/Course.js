const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  orgId: { type: String, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
  skills: [ {type: String, required: true} ],
  modules: [ { type: String } ],
  poster: { type: String, required: true },
  duration: { type: String, default: 0 },
  ratings: { type: String, default: 5 },
  published: { type: Boolean, default: false},
  expiry: { type: String },
  startDate: { type: String },
  lastEnrolledDateTime: Date,
});

module.exports = Course = mongoose.model('course', CourseSchema);
