const Joi = require("joi");
const Products = require("./../models/product");

const output = require("./../utilities/output");

const get = (req, res, next) => {
	Products.getByCompanyId(req.params.companyId, products => {
		output.success(res, products);
	})
};

const validatePost = (req, res, next) => {
	const objectSchema = Joi.object().keys({
		title: Joi.string().required()
	});

	Joi.validate(req.body, objectSchema, (err, value) => {
		if(err)
			output.error(res, 100, 200);

		else
			next();
	})
};

const post = (req, res, next) => {
	const companyId = parseInt(req.params.companyId);

	Products.add(companyId, req.body.title, products => {
		output.success(res);
	});
};

const validateDelete = (req, res, next) => {
	const objectSchema = Joi.object().keys({
		productId: Joi.number().required()
	});

	Joi.validate(req.body, objectSchema, (err, value) => {
		if(err)
			output.error(res, 100, 200);

		else
			next();
	})
};

const Delete = (req, res, next) => {
	Products.Delete(req.body.productId, req.params.companyId);

	output.success(res);
}

const validatePutTitle = (req, res, next) => {
	const objectSchema = Joi.object().keys({
		productId: Joi.number().required(),
		title: Joi.string().required()
	});

	Joi.validate(req.body, objectSchema, (err, value) => {
		if(err)
			output.error(res, 100, 200);

		else
			next();
	})
}

const putTitle = (req, res, next) => {
	Products.updateTitle(req.body.productId, req.params.companyId, req.body.title);

	output.success(res);
}

const validatePutSale = (req, res, next) => {
	const objectSchema = Joi.object().keys({
		productId: Joi.number().required()
	});

	Joi.validate(req.body, objectSchema, (err, value) => {
		if(err)
			output.error(res, 100, 200);

		else
			next();
	})
}

const putSale = sale => {
	return (req, res, next) => {
		console.log("Sale status: " + sale);
		Products.updateSale(req.body.productId, req.params.companyId, sale, result => {
			if(!result)
				output.error(res, 100, 200);

			else
				output.success(res);
		});
	}
}

module.exports = {
	get,
	validatePost,
	post,
	validateDelete,
	Delete,
	validatePutTitle,
	putTitle,
	validatePutSale,
	putSale
}