const Data = require('../../shared/resources/data');
const Contact = require('../../shared/db/mongodb/schemas/contact.Schema');


//Contact Form
const contactUs = async (req,res) => {
  
  console.log(req.body)
  //const data = await Contact.create(req.body)
  const data = await Contact(req.body)
  await data.save()
  console.log(data)
 
  const responseMessage = `Message received from ${req.body.fullname}`;

  console.log(responseMessage);
  res.send(data);
};

//Calcul Type de batiment

const calculateQuote = (req, res) => {
  const buildingType = req.params.buildingType;
  const apts = +req.query.apts;
  const floors = +req.query.floors;
  const maxOccupancy = +req.query.maxOccupancy;
  const numElvs = +req.query.numElvs;
  const tier = req.query.tier;

  // validate request object
  if (!Object.keys(unitPrices).includes(tier)) {
    res.status(400);
    res.send(`Error: invalid tier`);
    return;
  }

  if (buildingType === 'residential' || buildingType === 'commercial') {
    if (isNaN(floors) || (buildingType === 'residential' && isNaN(apts))) {
      res.status(400);
      res.send(`Error: ${buildingType === 'residential' ? 'apts' : 'floors'} must be specified as a number`);
      return;
    }

    if (!Number.isInteger(floors) || (buildingType === 'residential' && !Number.isInteger(apts))) {
      res.status(400);
      res.send(`Error: ${buildingType === 'residential' ? 'apts' : 'floors'} must be an integer`);
      return;
    }

    if (floors < 1 || (buildingType === 'residential' && apts < 1)) {
      res.status(400);
      res.send(`${buildingType === 'residential' ? 'apts' : 'floors'} must be greater than zero`);
      return;
    }
  }

  // business logic
  let numElevators;
  if (buildingType === 'residential') {
    numElevators = calcResidentialElev(floors, apts);
  } else if (buildingType === 'commercial') {
    numElevators = calcCommercialElev(floors, maxOccupancy);
  } else if (buildingType === 'industrial') {
    numElevators = calcIndustrialElev(numElvs);
  } else {
    res.status(400);
    res.send(`Error: invalid building type`);
    return;
  }
  const totalCost = calcInstallFee(numElevators, tier);

  // response
  res.send({
    elevators_required: numElevators,
    cost: totalCost
  });
};


// Functions

const unitPrices = {
  standard: 8000,
  premium: 12000,
  excelium: 15000,
};
const installPercentFees = {
  standard: 10,
  premium: 15,
  excelium: 20,
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

const calcIndustrialElev = (numElvs) => {
  return numElvs;
}

function calcInstallFee(numElevator, Tier) {
  const priceperunit = unitPrices[Tier];
  const pricepercentage = installPercentFees[Tier];
  const priceElevator = (priceperunit * numElevator);
  const totalinstallfees = (pricepercentage/100) * priceElevator;
  const totalprice = priceElevator + totalinstallfees;
  return totalprice;
}

module.exports = {contactUs,calculateQuote};