const Joi = require("joi");
const jwt = require("jsonwebtoken");

const User = require("./../../models/user");
const output = require("./../../utilities/output");
const config = require("./../../config/config")

const validate = (req, res, next) => {
	const schema = Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	});

	Joi.validate(req.body, schema, (err, value) => {
		if(err)
			output.error(res, 100, 200, "Please fill all the fields!");

		else
			next();
	});
};

const authenticate = (req, res, next) => {
	const email = req.body.email,
		  password = req.body.password;

	User.authenticate(email, password, result => {
		if(result.status === "success")
		{
			req.user = { userId: result.userId, accessLevel: result.accessLevel };

			next();
		}

		else
			output.error(res, 1, 200, "Wrong credentials!");
	});
};

const issueToken = (req, res, next) => {
	//ENCRYPT THE userId

	jwt.sign({
		sub: req.user.userId,
		iat: + Date.now(),
		accessLevel: req.user.accessLevel
	}, config.tokens.jwtSecret, (err, token) => {
		if(err)
			throw err;

		res.json({ status: "success", token });
	});
};

module.exports = {
	validate,
	authenticate,
	issueToken
};