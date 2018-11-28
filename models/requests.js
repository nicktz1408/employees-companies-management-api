const database = require("./../config/database");

const getEmployees = (employeeId, callback) => {
	const query = "SELECT requestId, iniatorId FROM requests WHERE employeeId=?";
	console.log("Query: " + query);

	database.query(query, [employeeId], (err, rows, fields) => {
		callback(rows);
	});
}

const getCompanies = (employeeId, callback) => {
	const query = "SELECT requests.requestId, requests.iniatorId, companies.companyId, companies.companyName FROM requests \
				   LEFT JOIN employees ON requests.iniatorId=employees.employeeId \
				   LEFT JOIN companies ON employees.companyId=companies.companyId \
				   WHERE requests.employeeId=? GROUP BY employees.companyId";// HAVING COUNT(*) > 1;";

	database.query(query, [employeeId], (err, rows, fields) => {
		if(err)
			throw err;

		console.log(rows);

		callback(rows);
	});
}

const checkExistance = (employeeId, iniatorId, callback) => {
	const query = "SELECT iniatorId FROM requests WHERE employeeId=? AND iniatorId=?";

	database.query(query, [employeeId, iniatorId], (err, rows, fields) => {
		if(err)
			throw err;

		if(rows.length)
			callback(true);

		else
			callback(false);
	})
}

const add = (employeeId, iniatorId, callback) => {
	const query = "INSERT INTO requests (employeeId, iniatorId) VALUES (?, ?)";
	console.log("Query: " + query);
	console.log("IniatorId: " + iniatorId);

	database.query(query, [employeeId, iniatorId], (err, rows, fields) => {
		if(err)
			callback(true);

		else
			callback(false);
	});
}

const Delete = (employeeId, iniatorId, callback) => {
	const query = "DELETE FROM requests WHERE employeeId=? AND iniatorId=?";
	console.log("Query: " + query);
	console.log("EmployeeId: " + employeeId);
	console.log("IniatorId: " + iniatorId);

	database.query(query, [employeeId, iniatorId], (err, rows, fields) => {
		if(err)
			throw err;

		if(typeof callback === "function")
			callback();
	})
};

module.exports = {
	getEmployees,
	getCompanies,
	checkExistance,
	add,
	Delete
};