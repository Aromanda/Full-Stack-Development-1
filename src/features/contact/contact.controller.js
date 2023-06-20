const Contact = require('../../shared/db/mongodb/schemas/contact.Schema')
const validator = require('validator');

// Middleware de validation du formulaire de contact
async function validateContact (req, res, next) {
    const { name, email, phoneNumber, message } = req.body;
  
    // Vérifier que tous les champs sont présents
    if (!name || !email || !phoneNumber || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    // Valider l'e-mail
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }
  
    // Valider le numéro de téléphone
    if (!validator.isMobilePhone(phoneNumber)) {
      return res.status(400).json({ error: 'Invalid phone number' });
    }

    try {
      // Créer une nouvelle instance du modèle Contact avec les données du formulaire
      const newContact = new Contact(req.body);
  
      // Enregistrer le contact dans la base de données
      await newContact.save();
  
      // Répondre avec succès
      res.json({ message: 'Contact saved successfully' });
    } catch (error) {
      // Gérer les erreurs
    res.status(500).json({ error: 'An error occurred' });
}
  }
  

  module.exports = {
    validateContact,
}