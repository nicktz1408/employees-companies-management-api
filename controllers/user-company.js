const Joi = require("joi");

const Employee = require("./../models/employee");
const Company = require("./../models/company");
const Users = require("./../models/user");

const output = require("./../utilities/output");

const validateGet = (req, res, next) => {
	const objectSchema = Joi.object().keys({
		sortBy: Joi.string().valid("name", "email", "phone"),
		sortType: Joi.string().valid("asc", "desc"),
		activityStatus: Joi.number().min(1).max(2),
		userId: Joi.number().required() /*TEMPORAL*/
	});

	Joi.validate(req.query, objectSchema, (err, value) => {
		if(err)
			output.error(res, 100, 200);

		else
			next();
	});
};

const get = (req, res, next) => {
	const sortBy = (req.query.sortBy ? req.query.sortBy : "id"),
		  sortType = (req.query.sortType ? req.query.sortType : "asc"),
		  activityStatus = (req.query.activityStatus ? req.query.activityStatus : 1);

	Company.getByUserId(req.query.userId/*change!!*/, sortBy, sortType, activityStatus, (companies) => {
		/*if(!employees)
			output.error(res, 100, 200);

		else*/
			output.success(res, companies);
	});
}

const post = (req, res, next) => {
	Company.add(req.query.userId /*Temporal!!*/);
};

const validatePut = (req, res, next) => {
	const objectSchema = Joi.object().keys({
		userId: Joi.number().required(), /*TEMPORAL*/
		companyId: Joi.number().required()
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

	return (req, res, next) => {
		const companyId = req.body.companyId;

		Company.updateActivity(companyId, newActivity, success => {
			if(!success)
				throw { err: "Unexpected error!" }

			//output.success(res);
		});

		Employee.updateActivityByCompanyId(companyId, newActivity, success => {
			if(!success)
				throw { err: "Unexpected error!" }

			output.success(res);
		});
	};
};

const validateSearch = (req, res, next) => {
	const objectSchema = Joi.object().keys({
		userId: Joi.number().required(), /*Temporal!*/
		key: Joi.string().required(),
	});

	Joi.validate(req.query, objectSchema, (err, value) => {
		if(err)
			output.error(res, 100, 200);

		else
			next();
	});
};

const search = (req, res, next) => {
	Company.searchByUserId(req.query.userId, req.query.key, results => {
		output.success(res, results, 200);
	})
};

const validateAutocomplete = (req, res, next) => {
	const objectSchema = Joi.object().keys({
		userId: Joi.number().required(), /*Temporal!*/
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

	Company.searchAutocompleteByUserId(req.query.userId, req.query.key, limit, (err, results) => {
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
	validateSearch,
	search,
	validateAutocomplete,
	autocomplete
}