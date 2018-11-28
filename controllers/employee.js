const Joi = require("joi");
const multer = require("multer");

const Employee = require("./../models/employee");
const Users = require("./../models/user");

const output = require("./../utilities/output");
const imageUpload = require("./../utilities/image-upload");

const getData = (req, res, next) => {
	Employee.get(req.params.employeeId, data => {
		if(!data)
			output.error(res, 1, 200);

		else
			output.success(res, data);
	});
};



const validatePut = (req, res, next) => {
	const objectSchema = Joi.object().keys({
		data: Joi.object().keys({
			firstName: Joi.string(),
			lastName: Joi.string(),
			jobTitle: Joi.string(),
			phone: Joi.string(),
			email: Joi.string().email(),
			facebook: Joi.string().uri(),
			instagram: Joi.string().uri(),
			linkedin: Joi.string().uri(),
			twitter: Joi.string().uri(),
			pinterest: Joi.string().uri(),
			about: Joi.string()
		}).required()
	});

	Joi.validate(req.body, objectSchema, (err, value) => {
		if(err)
			output.error(res, 100, 200);

		else
			next();
	})
};

const updateData = (req, res, next) => {
	Employee.update(req.params.employeeId, req.body.data, () => {
		output.success(res);
	});
}

const validateSearch = (req, res, next) => {
	const objectSchema = Joi.object().keys({
		key: Joi.string().required()	//maybe allow only searches with keys longer than 3 chars
	});

	Joi.validate(req.query, objectSchema, (err, value) => {
		if(err)
			output.error(res, 100, 200);

		else
			next();
	});
}

const search = (req, res, next) => {
	Employee.search(req.query.key, result => {
		output.success(res, result);
	});
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
	const limit = (req.query.limit ? parseInt(req.query.limit) : 10);

	Employee.searchAutocomplete(req.query.key, limit, (err, results) => {
		if(err)
			output.error(res, 100, 200);

		else
			output.success(res, results);
	})
}

/* File upload */
const setupImageUpload = () => {
	console.log("Uploading employee profile image!");

	return imageUpload.setup("./images/employees");
};

const deleteFile = (req, res, next) => {
	//Might be used later
}

const renameImage = (req, res, next) => {
	console.log(req.file);

	if(!req.file)			//Not an image!
		output.error(res, 1, 200);

	else
	{
		const oldPath = "./images/employees/" + req.file.filename,
			  newPath = "./images/employees/employee_" + req.params.employeeId + ".jpg";

		console.log("Old path: " + oldPath);
		console.log("New path: " + newPath);

		req.user = Object.assign({}, req.user, { imageUrl: newPath.slice(1, newPath.length) });

		imageUpload.rename(oldPath, newPath);
		next();
	}
}

const addImageUrlToDatabase = (req, res, next) => {
	Employee.updateImage(req.params.employeeId, req.user.imageUrl);

	output.success(res);
}

module.exports = {
	getData,
	validatePut,
	updateData,
	validateSearch,
	search,
	validateAutocomplete,
	autocomplete,
	setupImageUpload,
	renameImage,
	addImageUrlToDatabase
};