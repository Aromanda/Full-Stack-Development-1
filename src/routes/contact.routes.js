const ContactController = require('../features/contact/contact.controller');


const registerContactRoutes = (app) => {
    app.post('/contact', ContactController.createContact);
}

module.exports = {registerContactRoutes};