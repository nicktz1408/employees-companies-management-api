const Joi = require("joi");

const Notifications = require("./../models/notifications");
const output = require("./../utilities/output");

const get = (req, res, next) => {
	Notifications.get(req.params.employeeId, results => {
		ouput.success(res, results);
	});
}

const Delete = (req, res, next) => {
	Notifications.Delete(req.params.employeeId, req.params.notificationId);

	ouput.success(res);
}

const DeleteAll = (req, res, next) => {
	Notifications.DeleteAll(req.params.employeeId);

	output.success(res);
}

module.exports = {
	get,
	Delete,
	DeleteAll
};