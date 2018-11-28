const Joi = require("joi");

const Employee = require("./../models/employee");
const Company = require("./../models/company");
const Users = require("./../models/user");

const output = require("./../utilities/output");

const validateGet = (req, res, next) => {
	const objectSchema = Joi.object().keys({
		sortBy: Joi.string().valid("name", "email", "phone"),
		sortType: Joi.string().valid("asc", "desc"),
		activityStatus: Joi.number().min(1).max(2)
	});

	Joi.validate(req.query, objectSchema, (err, value) => {
		if(err)
			output.error(res, 100, 200);

		else
			next();
	});
};

const get = (req, res, next) => {
	console.log("companyId: " + req.params.companyId)

	const sortBy = (req.query.sortBy ? req.query.sortBy : "id"),
		  sortType = (req.query.sortType ? req.query.sortType : "asc"),
		  activityStatus = (req.query.activityStatus ? req.query.activityStatus : 1);

	Employee.getByCompanyId(req.params.companyId, sortBy, sortType, activityStatus, (employees) => {
		if(!employees)
			output.error(res, 100, 200);

		else
			output.success(res, employees);
	})
};

const post = (req, res, next) => {
	Employee.add(req.params.companyId, () => {

	});

	output.success(res);
};

const validatePut = (req, res, next) => {
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

const put = (archive) => {
	const newActivity = (archive ? 2 : 1);
	console.log("To do: " + newActivity)

	return (req, res, next) => {
		const employeeId = req.body.employeeId;

		Employee.updateActivity(employeeId, req.params.companyId, newActivity, success => {
			if(!success)
				throw { err: "Unexpected error" };

			output.success(res);
		})
	}
}

const getTotal = (req, res, next) => {
	Employee.getTotalByCompanyId(req.params.companyId, (total) => {
		output.success(res, total);
	});
};

const validateSearch = (req, res, next) => {
	const objectSchema = Joi.object().keys({
		key: Joi.string().required()
	});

	Joi.validate(req.query, objectSchema, (err, value) => {
		if(err)
			output.error(res, 100, 200);

		else
			next();
	});
};

const search = (req, res, next) => {
	Employee.searchByCompanyId(req.params.companyId, req.query.key, results => {
		output.success(res, results, 200);
	})
};

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

const autocomplete = (req, res, next) => {
	const limit = parseInt(req.query.limit) || 8;

	Employee.searchAutocompleteByCompanyId(req.params.companyId, req.query.key, limit, (err, results) => {
		if(!err)
			output.success(res, results, 200);

		else
			output.err(res, 100, 200);
	})
}

module.exports = {
	validateGet,
	get,
	post,
	validatePut,
	put,
	getTotal,
	validateSearch,
	search,
	validateAutocomplete,
	autocomplete
};