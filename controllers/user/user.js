const Joi = require("joi");
const jwt = require("jsonwebtoken");
const uuid = require("uuid/v4");

const User = require("./../models/user");
const ForgotPassword = require("./../models/forgot-password");

const middleware = require("./../utilities/middleware");
const config = require("./../config/config");
const bcrypt = require("./../utilities/bcrypt");

const validateLogin = (req, res, next) => {
	const schema = Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	});

	Joi.validate(req.body, schema, (err, value) => {
		if(err)
			middleware.error(res, "Error: Invalid Body Data!");

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
			middleware.error(res, "Error: Wrong Credentials!");
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
}

/* Register */
const validateRegister = (req, res, next) => {
	const schema = Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
		//accessLevel: Joi.number().min(1).max(2).required(),
		firstname: Joi.string(),
		lastname: Joi.string()
	});

	Joi.validate(req.body, schema, (err, value) => {
		if(err)
			middleware.error(res, "Error: Invalid Body Data!");

		else
			next();
	});
};

const checkUserExistance = (req, res, next) => {
	console.log("Checking existance of user!");

	User.userExists(req.body.email, result => {
		if(result)

			middleware.error(res, "Error: This email already exists!", 200);

		else
		{
			req.user = { dataToEncrypt: req.body.password };

			next();
		}
	});
};

const addUserToDatabase = (req, res, next) => {
	console.log("Adding user!");

	//Employee.addEmployee(); NEED TO ADD employee!!
	User.addUser(req.body.email, req.user.hash, 2, () => {
		middleware.success(res, "You have been successfully registered!");
	});
}

/*Forgot Password*/
const getUserId = (req, res, next) => {
	console.log("Getting userId!");
	console.log("email: " + req.query.email);
	req.user = {};

	User.getUserByEmail(req.query.email, (user) => {
		if(user.length)
		{
			const userId = user[0].userId;
			console.log(userId);

			req.user.userId = userId;
			next();
		}

		else
			middleware.error(res, "This is an invalid e-mail", 200);
	})
}

const generateToken = (req, res, next) => {
	console.log("Begin generating UUID token!");

	const token = uuid();
	console.log("Token: " + token);

	req.user.dataToEncrypt = token;
	next();
};

const addTokenToDatabase = (req, res, next) => {
	ForgotPassword.addEntity(req.user.hash, req.user.userId, () => {
		middleware.success(res, "The request has been successfully sent!");
	});

	//next(); 		FOR SENDING E-MAIL
}


module.exports = {
	validateLogin,
	authenticate,
	issueToken,
	validateRegister,
	checkUserExistance,
	addUserToDatabase,
	getUserId,
	generateToken,
	addTokenToDatabase
};