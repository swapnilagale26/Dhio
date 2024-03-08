const mongoose = require('mongoose');

const ResponsesSchema = new mongoose.Schema({
  qId: { type: String, required: true },
  response: { type: String, required: true },
});

const ReportSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  status: { type: String, required: true },
  responses: [{ type: ResponsesSchema}]
});

const SurveyReportSchema = new mongoose.Schema({
  surveyId: { type: String, required: true },
  reports: [{ type: ReportSchema }],
});

module.exports = SurveyReport = mongoose.model('surveyReport', SurveyReportSchema);
