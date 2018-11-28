const Router = require("express").Router();

const employee = require("./../controllers/employee");

/* AUTHENTICATE */

/* Decrypt employeeId!!!! */

Router.get("/search", employee.validateSearch, employee.search);
Router.get("/autocomplete", employee.validateAutocomplete, employee.autocomplete)		//maybe allow searches with keys with 3 or more chars

Router.route("/:employeeId")
	.get(employee.getData/* encrypt employeeID! */)
	.put(employee.validatePut, employee.updateData);

Router.post("/:employeeId/image", employee.setupImageUpload(), employee.renameImage, employee.addImageUrlToDatabase);

module.exports = Router;