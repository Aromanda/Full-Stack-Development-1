const PublicController = require('../features/public/public.controller');

const registerPublicRoutes = (app) => {
  app.post('/contact', PublicController.contactUs);

  app.get('/calc/:buildingType', PublicController.calculateQuote);
}

module.exports = {registerPublicRoutes};