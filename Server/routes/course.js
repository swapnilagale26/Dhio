const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { check, validationResult } = require('express-validator');

const Course = require('../modules/Course');
const User = require('../modules/User');
const Tenancy = require('../modules/Tenancy');
const courseValidations = [
  check('name', 'Course Name is required!')
    .not()
    .isEmpty(),
  check('type', 'Course Type is required!')
    .not()
    .isEmpty(),
  check('category', 'Category is required!')
    .not()
    .isEmpty(),
  check('author', 'Author is required!')
    .not()
    .isEmpty(),
  check('duration', 'Course Duration is required!').not().isEmpty(),
  check('skills', 'At least 1 skill is required!').not().isEmpty(),
  check('poster', 'Poster Image is required!')
    .not()
    .isEmpty(),
  check('expiry', 'Expiry is required!')
    .not()
    .isEmpty(),
]

router.post(
  '/',
  courseValidations,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, type, category, author, duration, skills, poster, expiry, orgId, startDate } = req.body;
    const skillsToAdd = skills.map(skill => skill.label || skill);
    if(skills.some(skill => skill?.__isNew__)) {
      let tenancy = await Tenancy.findById(orgId);
      tenancy = await Tenancy.updateOne({ _id: orgId }, { $set: { ...tenancy._doc, skills: [...new Set([...tenancy.skills, ...skillsToAdd])] } });
    }
    try {
      let course = await Course.findOne({ name });
      if (course) {
        return res.status(405).json({ errors: [{ name: 'Course with the same name already exists! Please try with other name.' }] });
      }
      course = new Course({ name, type, category, author, duration, skills: skillsToAdd, poster, expiry, orgId, startDate  });
      const createdCourse = await course.save();
      return res.status(200).send({message: 'Course created successfully!!!', course: createdCourse});
    } catch (err) {
      console.log(err);
      return res.status(500).send('Server Error');
    }
  }
);

router.get(
  '/:id',
  // auth,
  async (req, res) => {
    const { headers, params: { id } } = req;
    const token = headers.authorization?.split(' ')[1];
    const data = jwt.verify(token, process.env.JWTSecret);
    let course = [];
    if(data.userId) {
      try {
        const user = await User.findById(data.userId);
        if(user.role === 'Admin'){
          course = await Course.findOne({ orgId: user.orgId, _id: id });
        } else {
          course = await Course.findOne({ '_id': user?.accessibleCourses, _id: id });
        }
        return res.status(200).send(course);
      } catch (err) {
        console.log(err.message);
        return res.status(500).send('Server Error');
      }
    }
  }
);

router.get(
  '/',
  // auth,
  async (req, res) => {
    const { headers} = req;
    const token = headers.authorization?.split(' ')[1];
    const data = jwt.verify(token, process.env.JWTSecret);
    let courses = [];
    if(data.userId) {
      try {
        const user = await User.findById(data.userId);
        if(user.role === 'Admin'){
          courses = await Course.find({ orgId: user.orgId });
        } else {
          courses = await Course.find({ '_id': user?.accessibleCourses });
        }
        return res.status(200).send(courses);
      } catch (err) {
        console.log(err.message);
        return res.status(500).send('Server Error');
      }
    }
  }
);

router.put(
  '/:id',
  courseValidations,
  async (req, res) => {
    const { id } = req.params;
    const { name, skills, orgId,  } = req.body;
    const skillsToAdd = skills.map(skill => skill.label || skill);

    if(skills.some(skill => skill?.__isNew__)) {
      console.log(skillsToAdd);
      let tenancy = await Tenancy.findById(orgId);
      tenancy = await Tenancy.updateOne({ _id: orgId }, { $set: { ...tenancy._doc, skills: [...new Set([...tenancy.skills, ...skillsToAdd])] } });
    }
    try {
      let course = await Course.findOne({ name });
      if (course && course?.id !== id) {
        return res.status(405).json({ errors: [{ email: 'Course with the same name already exists! Please try with other name.' }] });
      }
      course = await Course.findById(id);
      const { type, category, author, duration, poster, expiry, orgId, startDate, published = false } = req.body;
      if (course) {
        await Course.updateOne({ _id: id }, { $set: { 
          ...course._doc, 
          name, type, category, author, duration, poster, expiry, orgId, startDate,published,
          skills: skillsToAdd 
        } });
        course = await Course.findById(id);
        return res.status(200).send({ message: "Course Updated Successfully!!!", course });
      } else {
        return res.status(404).send({ message: "Course not found!!!" });
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({ errors: { message:'Server Error' } });
    }
  }
);

router.post(
  '/delete',
  async (req, res) => {
    console.log(req.body);
    try {
      await Course.deleteMany({ _id: { $in: req.body } });
      return res.status(200).send({ message: "Courses Deleted Successfully!!!" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({message:'Server Error'});
    }
  }
);

module.exports = router;