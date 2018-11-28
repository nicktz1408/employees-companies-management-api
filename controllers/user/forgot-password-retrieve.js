const Joi = require("joi");

const User = require("./../../models/user");
const ForgotPassword = require("./../../models/forgot-password")

const output = require("./../../utilities/output");
const bcrypt = require("./../../utilities/bcrypt");

const validate = (req, res, next) => {
	console.log("Validating data!");

	const schema = Joi.object().keys({
		token: Joi.any().required(),
		tokenId: Joi.number().required(),
		password: Joi.string().required()
	});

	Joi.validate(req.body, schema, (err, value) => {
		if(err)
			output.error(res, 100, 200);

		else
			next();
	});
};

const getRecordFromDB = (req, res, next) => {
	console.log("Retrieving record from DB!")

	ForgotPassword.getEntityByTokenId(req.body.tokenId, (entity) => {
		if(entity.length)
		{
			req.user = { token: req.body.token, encryptedToken: entity[0].uuid, userId: entity[0].userId, exp: entity[0].expTimestamp };

			next();
		}

		else
			output.error(res, 1, 200);
	})
};

const validateToken = (req, res, next) => {
	console.log("Validating Token!");
	console.log("exp: " + req.user.exp);
	console.log("now: " + Math.floor(+Date.now() / 1000));

	if(req.user.exp < Math.floor(+Date.now() / 1000))
	{
		output.error(res, 2, 200);

		//removeRecordFromDB(req, res, next);
	}

	else
	{
		bcrypt.validateData(req.user.token, req.user.encryptedToken, result => {
			console.log("Result: " + res);

			if(result)
				next();

			else
				output.error(res, 1, 100);
		});
	}
};

const hashPassword = (req, res, next) => {
	console.log("Hashing password!");

	bcrypt.encryptData(req.body.password, hash => {
		req.body.password = hash;

		next();
	})
}

const updatePassword = (req, res, next) => {
	console.log("Changing password!");
	User.updatePassword(req.user.userId, req.body.password);

	next();
}

const removeRecordFromDB = (req, res, next) => {
	console.log("Removing from DB!");
	ForgotPassword.removeEntity(req.body.tokenId);

	output.success(res, "The password has been successfully updated!");
}

module.exports = {
	validate,
	getRecordFromDB,
	validateToken,
	hashPassword,
	updatePassword,
	removeRecordFromDB
};