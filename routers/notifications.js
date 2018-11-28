const notifications = require("./../controllers/notifications");

const Router = require("express").Router();

Router.route("/:employeeId")
	.get(notifications.get)
	.delete(notifications.DeleteAll);

Router.delete("/:employeeId/:notificationId", notifications.Delete);

module.exports = Router;