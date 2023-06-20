const mongoose = require('mongoose')
const validator = require('validator');

const contactSchema = new mongoose.Schema({
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: validator.isEmail,
        message: 'Invalid email address',
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: validator.isMobilePhone,
        message: 'Invalid phone number',
        options: 'any',
      },
    },
    companyname: {
      type: String,
      required: true,
    },
    project_name: {
      type: String,
      required: true,
    },
    project_desc: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    file: {
      type: String,
    }
  });

  module.exports = mongoose.model('Contact', contactSchema)