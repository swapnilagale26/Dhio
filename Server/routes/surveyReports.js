const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const User = require('../modules/User');
const SurveyReport = require('../modules/SurveyReport');

router.post(
  '/',
  async (req, res) => {
    const { headers, body } = req;
    const token = headers.authorization?.split(' ')[1];
    const data = jwt.verify(token, process.env.JWTSecret);
    if(data.userId) {
      try {
        const user = await User.findById(data.userId).select({"password": 0});
        if(user.role === 'Admin'){
          const survey = await SurveyReport.find({ orgId: user.orgId});
          return res.status(200).send(survey);
        }
        else if(user.role === 'User' || user.role === 'Manager') {
          const surveys = await SurveyReport.find().where('_id').in(body.surveyIds);
          return res.status(200).send(surveys);
        }
        return res.status(404).send({ errors: { message:'Server Error' }});
      } catch (err) {
        console.log(err.message);
        return res.status(500).send({ errors: { message:'Server Error' } });
      }
    }
    return res.status(403).send({ message:'Unauthorised!!!' });
  }
);

router.post(
  '/save',
  async (req, res) => {
    const { headers, body } = req;
    const token = headers.authorization?.split(' ')[1];
    const data = jwt.verify(token, process.env.JWTSecret);
    if(data.userId) {
      try {
        const surveys = await SurveyReport.findOne({surveyId: body.id});
        if(!surveys) {
          const survey = new SurveyReport({ 
              surveyId: body.id, 
              reports: [
                {
                  userId: data.userId,
                  status: 'COMPLETED',
                  responses: req.body.questionFeedback
                }
              ]
            })
          await survey.save();
          return res.status(200).send({ message: 'Survey Completed Successfully!' });
        } else {
          const reports = surveys.reports.map(report => {
            if(report.userId === data.userId) {
              const responses = req.body.questionFeedback;
              const getOldResp = (qId) => responses.find(res => res.qId === qId)
              return ({
                    userId: data.userId,
                    status: 'COMPLETED',
                    responses: report.responses.map(response => ({ _id: response.id, ...getOldResp(response.qId)})),
                  })
            } else return report;
          })
          const survey = {
            ...surveys,
            reports,
          }
          const report = await SurveyReport.updateOne({ _id: surveys.id }, { $set: survey});
          console.log(report)
          return res.status(200).send({ message: 'Survey Completed Successfully!' });
        }
      } catch (err) {
        console.log(err.message);
        return res.status(500).send({ errors: { message:'Server Error' } });
      }
    }
    return res.status(403).send({ message:'Unauthorised!!!' });
  }
);


module.exports = router;
