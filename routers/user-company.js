const Router = require("express").Router();

const userCompany = require("./../controllers/user-company");

/* ACESS ONLY TO ADMINS */
/* FIRST GET userId */

Router.route("/")
	.get(userCompany.validateGet, userCompany.get)
	.post(userCompany.post)
	.put(userCompany.validatePut, userCompany.put(true));

Router.put("/retrieve", userCompany.validatePut, userCompany.put(false));

Router.get("/search", userCompany.validateSearch, userCompany.search);
Router.get("/autocomplete", userCompany.validateAutocomplete, userCompany.autocomplete);

module.exports = Router;