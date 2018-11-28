const conversations = require("./../controllers/conversations");

const Router = require("express").Router();

Router.route("/:employeeId")
	.get(conversations.get)
	.post(conversations.validate, conversations.checkExistance, conversations.post)
	.delete(conversations.validate, conversations.Delete);

module.exports = Router;