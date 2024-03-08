const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const { check, validationResult } = require('express-validator'); 

const User = require('../modules/User');
const Tenancy = require('../modules/Tenancy');
const { generateToken } = require('../utils/generateToken');
const sendMail = require('../utils/mailer');

const userFieldValidation = [
  check('firstname', 'First Name is required!')
    .not()
    .isEmpty(),
  check('lastname', 'Last Name is required!')
    .not()
    .isEmpty(),
  check('dob', 'Date of Birth is required!')
    .not()
    .isEmpty(),
  check('doj', 'Date of Joining is required!')
    .not()
    .isEmpty(),
  check('email', 'User Email is required!').not().isEmpty(),
  check('phone', 'User Phone is required!').not().isEmpty(),
  check('city', 'City is required!')
    .not()
    .isEmpty(),
  check('country', 'Country is required!')
    .not()
    .isEmpty(),
];

router.get(
  '/getProfile/:token?',
  async (req, res) => {
    const { params, headers} = req;
    const token = params?.token?.split('=')[1] || headers.authorization?.split(' ')[1];

    if(!token) {
      return res.status(403).send({ message:'Unauthorised!!!' });
    }
    const data = jwt.verify(token, process.env.JWTSecret);
    if(data.userId) {
      try {
        const user = await User.findById(data.userId).select({"password": 0});
        if (user) {
          return res.status(200).send(user);
        } else {
          return res.status(404).send({ message: "User not found!!!" });
        }
        
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
    const { id } = req.params;
    try {
      const user = await User.findById(id).select({"password": 0});
      if (user) {
        return res.status(200).send(user);
      } else {
        return res.status(404).send({ message: "User not found!!!" });
      }
      
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({ errors: { message:'Server Error' } });
    }
  }
);

router.get(
  '/',
  async (req, res) => {
    const { headers} = req;
    const token = headers.authorization?.split(' ')[1];
    if(!token) {
      return res.status(403).send({ message:'Unauthorised!!!' });
    }
    const data = jwt.verify(token, process.env.JWTSecret);
    if(data.userId) {
      try {
        const user = await User.findById(data.userId);
        let users = [];
        if(user.role === 'SuperAdmin') {
          users = await User.find().where({ role: 'Admin' }).select({"password": 0});
        } if (user.role === 'Admin') {
          users = await User.find().where({ orgId: user.orgId }).where('role').in(['User', 'Manager']).select({"password": 0});
        }
        return res.status(200).send(users);
      } catch (err) {
        console.log(err.message);
        return res.status(500).send({ errors: { message:'Server Error' } });
      }
    }
    return res.status(403).send({ message:'Unauthorised!!!' });
  }
);

router.post(
  '/usersByRole',
  async (req, res) => {
    const { headers} = req;
    const token = headers.authorization?.split(' ')[1];
    if(!token) {
      return res.status(403).send({ message:'Unauthorised!!!' });
    }
    const data = jwt.verify(token, process.env.JWTSecret);
    if(data.userId) {
      try {
        const user = await User.findById(data.userId);
        let users = [];
        if (user.role === 'Admin') {
          const roles = req.body.role ? [req.body.role] : ['User', 'Manager'];
          users = await User.find().where({ orgId: user.orgId }).where('role').in(roles).select({"password": 0});
        }
        return res.status(200).send(users);
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
  userFieldValidation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { 
      firstname, lastname, dob, doj, dept, role = 'User', manager, email, phone, city, country, orgId, avatar
    } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(405).json({ errors: [{ email: 'User with the same Email already exists! Please try with other Email.' }] });
      }
      user = await User.findOne({ phone });
      if (user) {
        return res.status(405).json({ errors: [{ phone: 'User with the same Phone already exists! Please try with other Phone.' }] });
      }
      const fullname = `${firstname} ${lastname}`;
      let {password} = req.body;
      if(password) {
        const salt = await bcrypt.genSalt(10);
        password = bcrypt.hash(password, salt);
      }
      user = new User({ firstname, lastname,fullname, dob, doj, dept: dept?.label || '', role, manager, email, orgId, phone, city, country, avatar });
      const newUser = await user.save();
      if(dept?.__isNew__) {
        let tenancy = await Tenancy.findById(orgId);
        const departments = [...new Set([...tenancy.departments, dept?.label])];
        tenancy = await Tenancy.updateOne({ _id: orgId }, { $set: { ...tenancy._doc, departments, userCount: tenancy.userCount + 1 } });
      }

      const newUserRegUrl = `${req.headers['x-forwarded-proto']}://${req.headers['x-forwarded-host']}/register/${generateToken(newUser._id)}`;
      sendMail(newUserRegUrl);
      return res.status(200).send({message: 'User created successfully!!!', newUserRegUrl});
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({message: 'Server Error'});
    }
  }
);

router.put(
  '/:id',
  userFieldValidation,
  async (req, res) => {
    const { id } = req.params;
    const { email, phone, dept, orgId } = req.body; 
    if(dept?.__isNew__) {
      let tenancy = await Tenancy.findById(orgId);
      const departments = [...new Set([...tenancy.departments, dept.label])];
      tenancy = await Tenancy.updateOne({ _id: orgId }, { $set: { ...tenancy._doc, departments } });
    }
    try {
      let user = await User.findOne({ email });
      if (user && user?.id !== id) {
        return res.status(405).json({ errors: [{ email: 'User with the same Email already exists! Please try with other Email.' }] });
      }
      user = await User.findOne({ phone });
      if (user && user?.id !== id) {
        return res.status(405).json({ errors: [{ phone: 'User with the same Phone already exists! Please try with other Phone.' }] });
      }
      user = await User.findById(id);
      const { firstname, lastname, role = 'User' } = req.body; 
      const fullname = `${firstname} ${lastname}`;
      let password = req.body.password || user.password;
      if(password) {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
      }
      if (user) {
        await User.updateOne({ _id: id }, { $set: { 
          ...user._doc, 
          ...req.body, 
          role: role ?? user.role, 
          fullname: fullname ?? user.fullname, 
          dept: dept?.label ?? user.dept, 
          password
        } });
        return res.status(200).send({ message: "User Updated Successfully!!!" });
      } else {
        return res.status(404).send({ message: "User not found!!!" });
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({ errors: { message:'Server Error' } });
    }
  }
);

router.delete(
  '/:id',
  async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (user) {
        await User.deleteOne({ _id: id });
        return res.status(200).send({ message: "User Deleted Successfully!!!" });
      } else {
        return res.status(404).send({ message: "User not found!!!" });
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({ errors: { message:'Server Error' } });
    }
  }
);

router.post(
  '/bulk-delete',
  async (req, res) => {
    console.log(req.body);
    try {
      await User.deleteMany({ _id: { $in: req.body } });
      return res.status(200).send({ message: "Users Deleted Successfully!!!" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({message:'Server Error'});
    }
  }
);

router.post(
  '/bulk-update',
  async (req, res) => {
    const { userIds, manager } = req.body;
    try {
      await User.updateMany({_id: userIds},{ manager });
      return res.status(200).send({ message: "Users updated Successfully!!!" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({message:'Server Error'});
    }
  }
);

module.exports = router;
