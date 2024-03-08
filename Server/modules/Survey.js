const mongoose = require('mongoose');


const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, required: true },
  options: [{ type: String }],
});

const SurveySchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  orgId: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  questions: [{ type: QuestionSchema }],
  surveyType: { type: String },
  objective: { type: String },
  published: { type: Boolean, default: false},
  invited: [{type: String}],
});

module.exports = Survey = mongoose.model('Survey', SurveySchema);