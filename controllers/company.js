const Joi = require("joi");

const Employee = require("./../models/employee");
const Company = require("./../models/company");
const Users = require("./../models/user");

const output = require("./../utilities/output");
const imageUpload = require("./../utilities/image-upload");

const  validatePost = (req, res, next) => {
	const objectSchema = Joi.object().keys({
		userId: Joi.number()
	});

	Joi.validate(req.body, objectSchema, (err, value) => {
		if(err)
			output.error(res, 100, 200);

		else
			next();
	});
};

const validatePut = (req, res, next) => {
	const objectSchema = Joi.object().keys({
		data: Joi.object().keys({
			companyName: Joi.string(),
			phone: Joi.string(),
			email: Joi.string().email(),
			facebook: Joi.string().uri(),
			instagram: Joi.string().uri(),
			/*linkedin: Joi.string().uri(),*/
			twitter: Joi.string().uri(),
			pinterest: Joi.string().uri(),
		}).required()
	});

	Joi.validate(req.body, objectSchema, (err, value) => {
		if(err)
			output.error(res, 100, 200);

		else
			next();
	})
};


const get = (req, res, next) => {
	Company.get(req.params.companyId, data => {
		if(!data)
			output.error(res, 1, 200);

		else
			output.success(res, data);
	});
};

const post = (req, res, next) => {
	Company.add(req.body.userId);

	output.success(res);
}

const put = (req, res, next) => {
	Company.update(req.params.companyId, req.body.data, () => {
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
	Company.search(req.query.key, result => {
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

	Company.searchAutocomplete(req.query.key, limit, (err, results) => {
		if(err)
			output.error(res, 100, 200);

		else
			output.success(res, results);
	})
}

/*File upload*/
const setupImageUpload = () => {
	console.log("Uploading company profile image!");

	return imageUpload.setup("./images/companies");
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
		const oldPath = "./images/companies/" + req.file.filename,
			  newPath = "./images/companies/company_" + req.params.companyId + ".jpg";

		console.log("Old path: " + oldPath);
		console.log("New path: " + newPath);

		req.user = Object.assign({}, req.user, { imageUrl: newPath.slice(1, newPath.length) });

		imageUpload.rename(oldPath, newPath);
		next();
	}
}

const addImageUrlToDatabase = (req, res, next) => {
	Company.updateImage(req.params.companyId, req.user.imageUrl);

	output.success(res);
}

module.exports = {
	validatePost,
	validatePut,
	get,
	post,
	put,
	validateSearch,
	search,
	validateAutocomplete,
	autocomplete,
	setupImageUpload,
	renameImage,
	addImageUrlToDatabase
};