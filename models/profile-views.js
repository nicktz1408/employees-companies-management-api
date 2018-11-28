const database = require("./../config/database");

const getEmployeeViewers = (employeeId, callback) => {
	const query = "SELECT profile_views.viewId, employees.firstName, employees.lastName, employees.imageUrl FROM profile_views\
				   LEFT JOIN employees ON profile_views.employeeId=employees.employeeId \
				   WHERE profile_views.employeeId=?";

	database.query(query, [employeeId], (err, rows, fields) => {
		if(err)
			throw err;

		callback(rows);
	});
}

const getCompanyViewers = (employeeId, callback) => {
	const query = "SELECT profile_views.viewId, companies.companyName, companies.imageUrl FROM profile_views \
				   LEFT JOIN employees ON profile_views.employeeId=employees.employeeId \
				   LEFT JOIN companies ON employees.companyId=companies.companyId \
				   WHERE profile_views.employeeId=? GROUP BY employees.companyId HAVING COUNT(*) > 1;";

	database.query(query, [employeeId], (err, rows, fields) => {
		if(err)
			throw err;

		callback(rows);
	});
}

const viewed = (employeeId, viewerId, callback) => {
	const query = "SELECT viewerId from profile_views WHERE employeeId=? AND viewerId=?";

	database.query(query, [employeeId, viewerId], (err, rows, fields) => {
		if(err)
			throw err;

		callback((rows.length ? true : false));
	});
}

const add = (employeeId, viewerId, callback) => {
	const query = "INSERT INTO profile_views (employeeId, viewerId) VALUES (?, ?)";

	database.query(query, [employeeId, viewerId], (err, rows, fields) => {
		if(err)
			throw err;

		if(typeof callback === "function")
			callback();
	});
}

module.exports = {
	getEmployeeViewers,
	getCompanyViewers,
	viewed,
	add
};