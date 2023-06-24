const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    company_name: {
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
        data: Buffer,
        type: String,
        require: false
    },
  });

  module.exports = mongoose.model('Contact', ContactSchema)