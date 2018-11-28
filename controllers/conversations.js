const Joi = require("joi");

const Conversations = require("./../models/Conversations");
const output = require("./../utilities/output");

const get = (req, res, next) => {
	Conversations.get(req.params.employeeId, results => {
		output.success(res, results);
	})
}

const validate = (req, res, next) => {
	const objectSchema = Joi.object().keys({
		otherEmployeeId: Joi.number().required()
	});

	Joi.validate(req.body, objectSchema, (err, value) => {
		if(err)
			output.error(res, 100, 200);

		else
			next();
	});
}

const checkExistance = (req, res, next) => {
	Conversations.exists(req.params.employeeId, req.body.otherEmployeeId, exists => {
		if(exists)
			output.error(res, 1, 200);

		else
			next();
	});
}

const post = (req, res, next) => {
	Conversations.add(req.params.employeeId, req.body.otherEmployeeId, result => {
		if(result)
			output.success(res);

		else
			output.error(res, 2, 200);
	});
}

const Delete = (req, res, next) => {
	Conversations.Delete(req.params.employeeId, req.body.otherEmployeeId);

	output.success(res);
}

module.exports = {
	get,
	validate,
	checkExistance,
	post,
	Delete
};