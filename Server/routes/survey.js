const jwt = require('jsonwebtoken');
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator'); 
const User = require('../modules/User');
const Survey = require('../modules/Survey');

const surveyValidation = [
  check('title', 'Survey title is required!')
    .not()
    .isEmpty(),
  check('startDate', 'Survey Start Date is required!')
    .not()
    .isEmpty(),
  check('endDate', 'Survey End Date is required!')
    .not()
    .isEmpty(),
];

router.get(
  '/',
  async (req, res) => {
    const { headers} = req;
    const token = headers.authorization?.split(' ')[1];
    const data = jwt.verify(token, process.env.JWTSecret);
    if(data.userId) {
      try {
        const user = await User.findById(data.userId).select({"password": 0});
        if(user.role === 'Admin'){
          const survey = await Survey.find({ orgId: user.orgId});
          return res.status(200).send(survey);
        }
        else if(user.role === 'User' || user.role === 'Manager') {
          const surveys = (await Survey.find({ orgId: user.orgId})).filter((survey) => {
            return survey.invited.some(invite => invite === user.id)
          });

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

router.get(
  '/:id',
  async (req, res) => {
    const { headers, params } = req;
    const token = headers.authorization?.split(' ')[1];
    const data = jwt.verify(token, process.env.JWTSecret);
    if(data.userId) {
      try {
        const user = await User.findById(data.userId).select({"password": 0});
        if (user) {
          const survey = await Survey.findById(params.id);
          return res.status(200).send(survey);
        } else {
          return res.status(404).send({ errors: { message:'Server Error' }});
        }
        
      } catch (err) {
        console.log(err.message);
        return res.status(500).send({ errors: { message:'Server Error' } });
      }
    }
    return res.status(403).send({ message:'Unauthorised!!!' });
  }
);


router.post(
  '/',
  surveyValidation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { headers} = req;
    const token = headers.authorization?.split(' ')[1];
    const data = jwt.verify(token, process.env.JWTSecret);
    if(data.userId) {
      try {
        const survey = await Survey.findOne({ title: req.body.title}); 
        if(survey) {
          return res.status(405).json({ errors: [{ title: 'Survey with this title already exist! Please try with another title.' }] });
        }
        const user = await User.findById(data.userId).select({"password": 0});
        if (user) {
          const { title, startDate, endDate, questions, published, surveyType, objective } = req.body; 
          const survey = new Survey({ title, startDate, endDate, questions, published, surveyType, objective, orgId: user.orgId });
          await survey.save();
          return res.status(200).send({ message: 'Survey created successfully!!!' });
        } else {
          return res.status(404).send({ errors: { message:'Server Error' }});
        }
        
      } catch (err) {
        console.log(err.message);
        return res.status(500).send({ errors: { message:'Server Error' } });
      }
    }
    return res.status(403).send({ message:'Unauthorised!!!' });
  }
);

router.put(
  '/:id',
  surveyValidation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { headers, params } = req;
    const token = headers.authorization?.split(' ')[1];
    const data = jwt.verify(token, process.env.JWTSecret);
    if(data.userId) {
      try {
        const survey = await Survey.findOne({ title: req.body.title}); 
        if(survey.id !== params.id) {
          return res.status(405).json({ errors: [{ title: 'Survey with this title already exist! Please try with another title.' }] });
        }
        const user = await User.findById(data.userId).select({"password": 0});
        if (user) {
          const { title, startDate, endDate, questions, published, surveyType, objective } = req.body; 
          const survey = await Survey.findById(params.id);
          await Survey.updateOne({ _id: params.id }, { ...survey._doc, title, startDate, endDate, questions, published, surveyType, objective, orgId: user.orgId });
          return res.status(200).send({ message: 'Survey updated successfully!!!' });
        } else {
          return res.status(404).send({ errors: { message:'Server Error' }});
        }
      } catch (err) {
        console.log(err.message);
        return res.status(500).send({ errors: { message:'Server Error' } });
      }
    } else {
      return res.status(404).send({ message: "Authentication Failed!!!" });
    }
  }
);

router.put(
  '/invite/:id',
  async(req, res) => {
    const { headers, params } = req;
    const token = headers.authorization?.split(' ')[1];
    const data = jwt.verify(token, process.env.JWTSecret);
    if(data.userId) {
      try {
        const { id } = params;
        const survey = await Survey.findById(id); 
        if(!survey || !survey.published) {
          return res.status(405).json({ errors: [{ title: 'Survey not found or may not be published yet!!!' }] });
        }
        const invited = [...new Set([...survey.invited, ...req.body.invited])];
        await Survey.updateOne({ _id: params.id }, { ...survey._doc, invited });
        return res.status(200).send({ message: 'Survey invited successfully!!!' });
        
      } catch (err) {
        console.log(err.message);
        return res.status(500).send({ errors: { message:'Server Error' } });
      }
    } else {
      return res.status(404).send({ message: "Authentication Failed!!!" });
    }
  }
)

module.exports = router;

