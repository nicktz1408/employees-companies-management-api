const database = require("./../config/database");

const get = (employeeId, callback) => {
	const query = "SELECT conversations.otherEmployeeId, employees.firstName, employees.lastName, employees.imageUrl AS employeeId FROM conversations \
				   LEFT JOIN employees \
				   ON employees.employeeId=conversations.otherEmployeeId \
				   WHERE conversations.employeeId=?";

	database.query(query, [employeeId], (err, rows, fields) => {
		if(err)
			throw err;

		callback(rows);
	})
};

const exists = (employeeId, otherEmployeeId, callback) => {
	const query = "SELECT conversationId FROM conversations WHERE employeeId=? AND otherEmployeeId=?";

	database.query(query, [employeeId, otherEmployeeId], (err, rows, fields) => {
		if(err)
			throw err;

		if(rows.length)
			callback(true);

		else
			callback(false);
	});
}

const add = (employeeId, otherEmployeeId, callback) => {
	const query = "INSERT INTO conversations (employeeId, otherEmployeeId) VALUES (?, ?), (?, ?)";

	database.query(query, [employeeId, otherEmployeeId, otherEmployeeId, employeeId], (err, rows, fields) => {
		if(err)
			callback(false);

		callback(true);
	});
}

const Delete = (employeeId, otherEmployeeId) => {
	const query = "DELETE FROM conversations WHERE employeeId=? AND otherEmployeeId=?";

	database.query(query, [employeeId, otherEmployeeId], (err, rows, fields) => {
		if(err)
			throw err;

		if(typeof callback === "function")
			callback();
	})
}

module.exports = {
	get,
	exists,
	add,
	Delete
}