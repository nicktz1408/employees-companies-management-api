const Router = require("express").Router();

const company = require("./../controllers/company");
const companyEmployee = require("./../controllers/company-employee");

/* AUTHENTICATE */

/* Decrypt employeeId!!!! */

//Router.post("/", /*first extract userId from JWT token!*/company.validatePost, company.post);

Router.get("/search", company.validateSearch, company.search);
Router.get("/autocomplete", company.validateAutocomplete, company.autocomplete)		//maybe allow searches with keys with 3 or more chars

Router.route("/:companyId")
	.get(company.get/* encrypt employeeID! */)
	.put(company.validatePut, company.put);

Router.post("/:companyId/image", company.setupImageUpload(), company.renameImage, company.addImageUrlToDatabase);
// --- Company Employee ---

Router.route("/:companyId/employee")
	.get(companyEmployee.validateGet, companyEmployee.get)
	.post(companyEmployee.post)
	.put(companyEmployee.validatePut, companyEmployee.put(true));

Router.put("/:companyId/employee/retrieve", companyEmployee.validatePut, companyEmployee.put(false));
Router.get("/:companyId/employee/total", companyEmployee.getTotal);

Router.get("/:companyId/employee/search", companyEmployee.validateSearch, companyEmployee.search);
Router.get("/:companyId/employee/autocomplete", companyEmployee.validateAutocomplete, companyEmployee.autocomplete);

module.exports = Router;