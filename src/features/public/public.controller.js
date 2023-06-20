const Data = require('../../shared/resources/data');
const Contact = require('../../shared/db/mongodb/schemas/contact.Schema');
const validator = require('validator');

const contactUs = async (req,res) => {

  // Vérifier que tous les champs sont présents
  if (!req.body.fullname || !req.body.email || !req.body.phoneNumber || !req.body.message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!validator.isEmail(req.body.email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  if (!validator.isMobilePhone(req.body.phoneNumber)) {
    return res.status(400).json({ error: 'Invalid phone number' });
  }

  const data = await Contact.create(req.body)

  const responseMessage = `Message received from ${req.body.fullname}`;

  console.log(responseMessage);
  res.send(data);
};

const calculateResidentialQuote = (req,res) => {
  // define constants
  const apts = +req.query.apts;
  const floors = +req.query.floors;
  const tier = req.query.tier.toLowerCase();

  // validate request object
  if(!Object.keys(Data.unitPrices).includes(tier)){
    res.status(400);
    res.send(`Error: invalid tier`);
    return;
  }
  
  if(isNaN(floors) || isNaN(apts)){
    res.status(400);
    res.send(`Error: apts and floors must be specified as numbers`);
    return;
  }

  if(!Number.isInteger(floors) || !Number.isInteger(apts)){
    res.status(400);
    res.send(`Error: apts and floors must be integers`);
    return;
  }

  if(floors < 1 || apts < 1){
    res.status(400);
    res.send(`apts and floors must be greater than zero`);
    return;
  }

  // business logic
  const numElevators = calcResidentialElev(floors,apts);
  const totalCost = calcInstallFee(numElevators,tier);

  // format response
  res.send({
    elevators_required:numElevators,
    cost: totalCost
  });
};

const calcResidentialElev = (numFloors, numApts) => {
  const elevatorsRequired = Math.ceil(numApts / numFloors / 6)*Math.ceil(numFloors / 20);
  return elevatorsRequired;
};

const calcCommercialElev = (numFloors, maxOccupancy) => {
  const elevatorsRequired = Math.ceil((maxOccupancy * numFloors) / 200)*Math.ceil(numFloors / 10);
  const freighElevatorsRequired = Math.ceil(numFloors / 10);
  return freighElevatorsRequired + elevatorsRequired;
};

const calcInstallFee = (numElvs, tier) => {
  const unitPrice = Data.unitPrices[tier];
  const installPercentFees = Data.installPercentFees[tier];
  const total = numElvs * unitPrice * installPercentFees;
  return total;
};

module.exports = {contactUs,calculateResidentialQuote};