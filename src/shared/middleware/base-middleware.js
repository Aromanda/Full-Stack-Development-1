require('dotenv').config();
const Express = require('express');
const app = Express();
const validator = require('validator');

const decMiddleWare = (req, res, next) => {
  console.log('Running middleware for:', req.path);
  next();
}

const validateContactdata = (req, res, next) => {
  const { fullname, email, phone, message } = req.body;

  if (!fullname || !phone || !email || !message) {
    return res.status(400).json({ error: "All fields are required"})
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }
  if (!validator.isMobilePhone(phone)) {
    return res.status(400).json({ error: "Invalid phone number" });
  }
  next();
}


const adminRoutes = [
  '/email-list',
  '/region-avg',
  '/calc-residential'
];

const registerBaseMiddleWare = (app) => {
  app.use(Express.json());
  app.use(logger);
  app.use(checkAuthToken);
};

/*const logger = (req,res,next) => {
  const message = `API call: ${req.method} on ${req.originalUrl} at ${new Date()}`
  console.log(message);
  next();
};

const checkAuthToken = (req,res,next) => {
  const url = req.url.slice(0,req.url.indexOf('?'));

  if(!adminRoutes.includes(url)){
    next();
    return;
  }

  const inputToken = req.headers.token;
  const savedToken = process.env.TOKEN;

  if(inputToken !== savedToken){
    res.status(401);
    res.send('Unauthorized');
    return;
  }
  next();
};*/

module.exports = {validateContactdata, decMiddleWare};