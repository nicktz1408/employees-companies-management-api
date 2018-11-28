const Joi = require("joi");
const uuid = require("uuid/v4");

const User = require("./../../models/user");
const ForgotPassword = require("./../../models/forgot-password");

const output = require("./../../utilities/output");
const bcrypt = require("./../../utilities/bcrypt");
const config = require("./../../config/config");

const validate = (req, res, next) => {
	const schema = Joi.object().keys({
		email: Joi.string().email().required()
	});

	Joi.validate(req.query, schema, (err, value) => {
		if(err)
			output.error(res, 100, 200);

		else
			next();
	});
};

const getUserId = (req, res, next) => {
	console.log("Getting userId!");
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
			output.error(res, 100, 1);
	})
}

const generateToken = (req, res, next) => {
	console.log("Begin generating UUID token!");

	const token = uuid();
	console.log("Token: " + token);

	req.user.token = token;
	next();
};

const hashToken = (req, res, next) => {
	console.log("Begin hashing UUID token!");

	bcrypt.encryptData(req.user.token, hash => {
		console.log("Hashed Token: " + hash);
		req.user.token = hash;

		next();
	})
}

const addRecordToDB = (req, res, next) => {
	console.log("Adding Record to DB!");
	console.log("NOW: " + Math.floor(+Date.now() / 1000));
	const exp = Math.floor(+Date.now() / 1000) + config.forgotPasswordTokenExpiration,
		  expDate = new Date(exp * 1000);

	ForgotPassword.addEntity(req.user.token, req.user.userId, expDate, () => {
		//output.success(res, "The request has been successfully sent!");
	});

	//next(); 		FOR SENDING E-MAIL
}

const sendEmail = (req, res, next) => {
	const transporter = require("./../../config/email");
	const recoveryUrl = "www.recoverypage.com";

	const options = {
		from: config.email.passwordRecovery,
		to: req.query.email,
		subject: "Password Recovery",
		html: "<p>Hello, <br />you have requested a password recovery for your account of DBC! <br />In order to perform this recovery, please click \
			   on the following link or copy paste it on the address bar on your browser: </p><a href='" + recoveryUrl + "'>" + recoveryUrl + "</a>"
	};

	transporter.sendMail(options, (err, info) => {
		if(err)
		{
			console.log(err);

			output.error(res, 100, 2);
		}

		else
			output.success(res);
	})
}

module.exports = {
	validate,
	getUserId,
	generateToken,
	hashToken,
	addRecordToDB
};