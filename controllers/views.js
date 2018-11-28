const Joi = require("joi");
const ProfileViews = require("./../models/profile-views");

const output = require("./../utilities/output");

const validateGet = (req, res, next) => {
	const objectSchema = Joi.object().keys({
		employeeId: Joi.number().required()		/*Temporal*/
	});

	Joi.validate(req.query, objectSchema, (err, value) => {
		if(err)
			output.error(res, 100, 200);

		else
			next();
	});
}

const getEmployee = (req, res, next) => {
	ProfileViews.getEmployeeViewers(req.query.employeeId, results => {
		output.success(res, results, 200);
	})
}

const getCompany = (req, res, next) => {
	ProfileViews.getCompanyViewers(req.query.employeeId, results => {
		output.success(res, results, 200);
	});
}

module.exports = {
	validateGet,
	getEmployee,
	getCompany
};