const Joi = require("joi");

const Requests = require("./../models/requests");
const Contacts = require("./../models/contacts");

const output = require("./../utilities/output");

const getEmployees = (req, res, next) => {
	Requests.getEmployees(req.params.employeeId, results => {
		output.success(res, results, 200);
	});
}

const getCompanies = (req, res, next) => {
	Requests.getCompanies(req.params.employeeId, results => {
		console.log(results);
		output.success(res, results, 200);
	});
}

const validateRequestAction = (req, res, next) => {
	const objectSchema = Joi.object().keys({
		iniatorId: Joi.number()
	});

	Joi.validate(req.body, objectSchema, (err, value) => {
		if(err)
			output.error(res, 100, 200);

		else
			next();
	});
}

const checkExistanceRequestAction = (req, res, next) => {
	console.log("Checking if request exists!")
	console.log("params:" + req.params.employeeId)

	Requests.checkExistance(req.params.employeeId, req.body.iniatorId, exist => {
		console.log(exist);

		if(exist)
			next();

		else
		{
			console.log("Can't accept/decline! (doesn't exist!)")
			output.error(res, 1, 200);
		}
	})
}

const addContact = (req, res, next) => {
	console.log("Adding to contacts table!")

	Contacts.add(req.params.employeeId, req.body.iniatorId);
	next();
}

const Delete = (req, res, next) => {
	console.log("Deleting from requests table!")

	Requests.Delete(req.params.employeeId, req.body.iniatorId);
	output.success(res);
}

const validateIniate = (req, res, next) => {
	console.log("VALIDATING!");

	const objectSchema = Joi.object().keys({
		employeeId: Joi.number().required()
	});

	Joi.validate(req.body, objectSchema, (err, value) => {
		if(err)
			output.error(res, 100, 200);

		else
			next();
	});
}

const checkExistanceIniate = (req, res, next) => {
	console.log("Checking if the request is pending!")

	Requests.checkExistance(req.body.employeeId, req.params.iniatorId, exist => {
		console.log(exist);

		if(!exist)
			next();

		else
		{
			console.log("Can't initate! (already exists!)")
			output.error(res, 1, 200);			//Request pending!
		}
	})
}

const checkExistanceContact = (req, res, next) => {
	console.log("Checking if they are already contacts!")

	Contacts.areContacts(req.body.employeeId, req.params.iniatorId, contacts => {
		if(contacts)
			output.error(res, 3, 200);		//Already contacts!

		else
			next();
	})
}

const post = (req, res, next) => {
	console.log("Adding to requests table!")

	Requests.add(req.body.employeeId, req.params.iniatorId, err => {
		if(err)		/* not necessary because of encryption!!!*/
			output.error(res, 2, 200);			//This employeeId doesn't exist! NOT NECESSARY

		else
			output.success(res);
	});
}

module.exports = {
	getEmployees,
	getCompanies,
	validateRequestAction,
	checkExistanceRequestAction,
	addContact,
	Delete,
	validateIniate,
	checkExistanceIniate,
	checkExistanceContact,
	post
};