const Joi = require("joi");

const Contacts = require("./../models/contacts");
const output = require("./../utilities/output");

const getEmployees = (req, res, next) => {
	Contacts.getEmployeeContacts(req.params.employeeId, contacts => {
		//Encrypt contacts
		output.success(res, contacts, 200);
	})
};

const getCompanies = (req, res, next) => {
	Contacts.getCompanyContacts(req.params.employeeId, contacts => {
		output.success(res, contacts, 200);
	})
};

const validateSearch = (req, res, next) => {
	const objectSchema = Joi.object().keys({
		key: Joi.string().required(),
	});

	Joi.validate(req.query, objectSchema, (err, value) => {
		if(err)
			output.error(res, 100, 200);

		else
			next();
	});
}

const validateAutocomplete = (req, res, next) => {
	const objectSchema = Joi.object().keys({
		key: Joi.string().required(),
		limit: Joi.number().min(1).max(10)
	});

	Joi.validate(req.query, objectSchema, (err, value) => {
		if(err)
			output.error(res, 100, 200);

		else
			next();
	});
};

const searchEmployees = (req, res, next) => {
	Contacts.searchEmployees(req.params.employeeId, req.query.key, results => {
		output.success(res, results, 200);
	})
}

const  autocompleteEmployees = (req, res, next) => {
	const limit = parseInt(req.querylimit) || 8;

	Contacts.autocompleteEmployees(req.params.employeeId, req.query.key, limit, (err, results) => {
		if(!err)
			output.success(res, results, 200);

		else
			output.error(res, 100, 200);
	})
}

const searchCompanies = (req, res, next) => {
	Contacts.searchCompanies(req.params.employeeId, req.query.key, results => {
		output.success(res, results, 200);
	})
}

const  autocompleteCompanies = (req, res, next) => {
	const limit = parseInt(req.querylimit) || 8;

	Contacts.autocompleteCompanies(req.params.employeeId, req.query.key, limit, (err, results) => {
		if(!err)
			output.success(res, results, 200);

		else
			output.error(res, 100, 200);
	})
}

module.exports = {
	getEmployees,
	getCompanies,
	validateSearch,
	validateAutocomplete,
	searchEmployees,
	autocompleteEmployees,
	searchCompanies,
	autocompleteCompanies
};