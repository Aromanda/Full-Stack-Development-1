const PublicController = require('../features/public/public.controller');
const { validateContactdata, decMiddleWare, validateBuildingType } = require('../shared/middleware/base-middleware');

const registerPublicRoutes = (app) => {
  app.post('/contact', validateContactdata, decMiddleWare, PublicController.contactUs);

  app.get('/calc/:buildingType', validateBuildingType, decMiddleWare, PublicController.calculateQuote);
}

module.exports = {registerPublicRoutes};