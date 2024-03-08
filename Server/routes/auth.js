const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator'); 

const User = require('../modules/User');
const {generateToken} = require('../utils/generateToken');
const Tenancy = require('../modules/Tenancy');

const authFieldValidation = [
  check('username', 'Email is required!').not().isEmpty(),
  check('password', 'Password is required!').not().isEmpty(),
]

router.post(
  '/',
  authFieldValidation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;

    const user = await User.findOne({ email: username });
    console.log(username, password);
    if(user && user.password) {
      const matchedCredentials = await user.matchPassword(password);
      if(matchedCredentials) {
        user.password = undefined;
        let redirectUrl;
        let token;
        if(user.role !== 'SuperAdmin') {
          const tenancy = await Tenancy.findById(user.orgId);
          redirectUrl = tenancy.subdomain;
        }
        token = generateToken(user._id);
        return res.status(200).json({ user, redirectUrl, token })
      } else {
        return res.status(401).json({ message: 'Invalid Credentials' });
      }
    } else  {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }
})

module.exports = router;
