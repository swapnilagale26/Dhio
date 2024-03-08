const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Tenancy = require('../modules/Tenancy');

const tenancyFieldValidation = [
  check('name', 'Company Name is required!')
    .not()
    .isEmpty(),
  check('subdomain', 'Company subdomain for Leammo is required!')
    .not()
    .isEmpty(),
  check('logo', 'Company Logo is required!')
    .not()
    .isEmpty(),
  // check('adminName', 'Primary admin name is required!')
  //   .not()
  //   .isEmpty(),
  check('gstin', 'GSTIN is required!')
    .not()
    .isEmpty(),
  check('email', 'Company Email is required!').not().isEmpty(),
  check('phone', 'Company Phone is required!').not().isEmpty(),
  check('startDate', 'Start Date is required!')
    .not()
    .isEmpty(),
  check('endDate', 'End Date is required!')
    .not()
    .isEmpty(),
  check('city', 'City is required!')
    .not()
    .isEmpty(),
  check('country', 'Country is required!')
    .not()
    .isEmpty(),
];

router.get(
  '/:id',
  async (req, res) => {
    const { id } = req.params;
    try {
      const tenancy = await Tenancy.findById(id);
      if (tenancy) {
        return res.status(200).send(tenancy);
      } else {
        return res.status(404).send({ message: "Tenancy not found!!!" });
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
    try {
      const tenancies = await Tenancy.find();
      return res.status(200).send(tenancies);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({ errors: { message:'Server Error' } });
    }
  }
);

router.post(
  '/',
  tenancyFieldValidation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { 
      name, subdomain, logo, gstin, email, 
      phone, startDate, endDate, city, country,
    } = req.body;
    try {
      let tenancy = await Tenancy.findOne({ subdomain });
      if (tenancy) {
        return res.status(405).json({ errors: [{ subdomain: 'Tenancy with the same Subdomain already exists! Please try with other Subdomain.' }] });
      }
      tenancy = await Tenancy.findOne({ name });
      if (tenancy) {
        return res.status(405).json({ errors: [{ name: 'Tenancy with the same name already exists! Please try with other name.' }] });
      }
      tenancy = await Tenancy.findOne({ gstin });
      if (tenancy) {
        return res.status(405).json({ errors: [{ gstin: 'Tenancy with the same GSTIN already exists! Please try with other GSTIN.' }] });
      }
      tenancy = await Tenancy.findOne({ email });
      if (tenancy) {
        return res.status(405).json({ errors: [{ email: 'Tenancy with the same Email already exists! Please try with other Email.' }] });
      }
      tenancy = await Tenancy.findOne({ phone });
      if (tenancy) {
        return res.status(405).json({ errors: [{ phone: 'Tenancy with the same Phone already exists! Please try with other Phone.' }] });
      }
      tenancy = new Tenancy({ name, subdomain, logo, gstin, email, phone, startDate, endDate, city, country });
      await tenancy.save();
      return res.status(200).send({message: 'Tenancy created successfully!!!'});
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({message: 'Server Error'});
    }
  }
);

router.put(
  '/:id',
  tenancyFieldValidation,
  async (req, res) => {
    const { id } = req.params;
    const { name, subdomain, gstin, email, phone } = req.body; 
    try {
      let tenancy = await Tenancy.findOne({ subdomain });
      if (tenancy && tenancy?.id !== id) {
        return res.status(405).json({ errors: [{ subdomain: 'Tenancy with the same Subdomain already exists! Please try with other Subdomain.' }] });
      }
      tenancy = await Tenancy.findOne({ name });
      if (tenancy && tenancy?.id !== id) {
        return res.status(405).json({ errors: [{ name: 'Tenancy with the same name already exists! Please try with other name.' }] });
      }
      tenancy = await Tenancy.findOne({ gstin });
      if (tenancy && tenancy?.id !== id) {
        return res.status(405).json({ errors: [{ gstin: 'Tenancy with the same GSTIN already exists! Please try with other GSTIN.' }] });
      }
      tenancy = await Tenancy.findOne({ email });
      if (tenancy && tenancy?.id !== id) {
        return res.status(405).json({ errors: [{ email: 'Tenancy with the same Email already exists! Please try with other Email.' }] });
      }
      tenancy = await Tenancy.findOne({ phone });
      if (tenancy && tenancy?.id !== id) {
        return res.status(405).json({ errors: [{ phone: 'Tenancy with the same Phone already exists! Please try with other Phone.' }] });
      }
      tenancy = await Tenancy.findById(id);
      if (tenancy) {
        await Tenancy.updateOne({ _id: id }, { $set: { ...tenancy._doc, ...req.body } });
        return res.status(200).send({ message: "Tenancy Updated Successfully!!!" });
      } else {
        return res.status(404).send({ message: "Tenancy not found!!!" });
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
      const tenancy = await Tenancy.findById(id);
      if (tenancy) {
        await Tenancy.deleteOne({ _id: id });
        return res.status(200).send({ message: "Tenancy Deleted Successfully!!!" });
      } else {
        return res.status(404).send({ message: "Tenancy not found!!!" });
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
      await Tenancy.deleteMany({ _id: { $in: req.body } });
      return res.status(200).send({ message: "Tenancies Deleted Successfully!!!" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({ errors: { message:'Server Error' } });
    }
  }
);

router.post(
  '/bulk-update',
  async (req, res) => {
    const { tenancyIds, autoRenewal } = req.body;
    try {
      await Tenancy.updateMany({_id: tenancyIds},{ autoRenewal });
      return res.status(200).send({ message: "Tenancies updated Successfully!!!" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({ errors: { message:'Server Error' } });
    }
  }
);

module.exports = router;