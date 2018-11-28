const Router = require("express").Router();

const product = require("./../controllers/product");

/* DECRYPT COMPANY ID */
/* VALIDATE! */

Router.route("/:companyId")
	.get(product.get)
	.post(product.validatePost, product.post)
	.delete(product.validateDelete, product.Delete);

Router.put("/:companyId/title", product.validatePutTitle, product.putTitle);
Router.put("/:companyId/sale/activate", product.validatePutSale, product.putSale(2));
Router.put("/:companyId/sale/deactivate", product.validatePutSale, product.putSale(1));

module.exports = Router;