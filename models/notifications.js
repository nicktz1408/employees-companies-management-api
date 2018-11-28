const database = require("./../config/database");

const get = (employeeId, callback) => {
	const query = "SELECT * FROM notifications WHERE employeeId=?";

	database.query(query, [employeeId], (err, rows, fields) => {
		if(err)
			throw err;

		callback(rows);
	})
}

const push = (employeeId, text, callback) => {
	const query = "INSERT INTO notifications (employeeId, text) VALUES (?. ?)";

	database.query(query, [employeeId, text], (err, rows, fields) => {
		if(err)
		{
			console.log(err);
			callback(false);
		}

		else
			callback(true);
	})
}

const Delete = (employeeId, notificationId) => {
	const query = "DELETE FROM notifications WHERE emplyoeeId=? AND notificationId=?";

	database.query(query, [employeeId, notificationId], (err, rows, fields) => {
		if(err)
			throw err;

		if(typeof callback === "function")
			callback();
	})
};

const DeleteAll = employeeId => {
	const query = "DELETE FROM notifications WHERE emplyeeId=?";

	database.query(query, [employeeId], (err, rows, fields) => {
		if(err)
			throw err;

		if(typeof callback === "function")
			callback();
	})
}

module.exports = {
	get,
	push,
	Delete,
	DeleteAll
};