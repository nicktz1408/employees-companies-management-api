const Joi = require("joi");

const User = require("./../../models/user");
const output = require("./../../utilities/output");
const bcrypt = require("./../../utilities/bcrypt");

const validate = (req, res, next) => {
	const schema = Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
		//accessLevel: Joi.number().min(1).max(2).required(),
		firstname: Joi.string(),
		lastname: Joi.string()
	});

	Joi.validate(req.body, schema, (err, value) => {
		if(err)
			output.error(res, 100, 200, "Please fill all the fields!");

		else
			next();
	});
};

const checkUserExistance = (req, res, next) => {
	console.log("Checking existance of user!");

	User.userExists(req.body.email, result => {
		if(result)
			output.error(res, 1, 200, "This email already exists!");

		else
			next();
	});
};

const hashPassword = (req, res, next) => {
	console.log("Hashing password!");

	bcrypt.encryptData(req.body.password, hash => {
		req.body.password = hash;

		next();
	})
}

const addUserToDB = (req, res, next) => {
	console.log("Adding user!");

	//Employee.addEmployee(); NEED TO ADD employee!!
	User.addUser(req.body.email, req.body.password, 2, () => {
		output.success(res);
	});
};

module.exports = {
	validate,
	checkUserExistance,
	hashPassword,
	addUserToDB
}