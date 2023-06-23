const PublicController = require('../features/public/public.controller');
const validateContactdata = require('../shared/middleware/base-middleware');
const decMiddleWare = require('../shared/middleware/base-middleware');

const registerPublicRoutes = (app) => {
  app.post('/contact', validateContactdata.validateContactdata, decMiddleWare.decMiddleWare, PublicController.contactUs);

  app.get('/calc/:buildingType', PublicController.calculateQuote);
}

module.exports = {registerPublicRoutes};