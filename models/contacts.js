const database = require("./../config/database");

const areContacts = (employeeId, otherEmployeeId, callback) => {
	const query = "SELECT contactId FROM contacts WHERE employeeId=? AND otherEmployeeId=?";

	database.query(query, [employeeId, otherEmployeeId], (err, rows, fields) => {
		if(err)
			throw err;

		if(rows.length)
			callback(true);

		else
			callback(false);
	})
}

const getEmployeeContacts = (employeeId, callback) => {
	const query = "SELECT contacts.contactId, employees.employeeId, employees.firstName, employees.lastName, employees.jobTitle FROM contacts \
	               LEFT JOIN employees ON contacts.otherEmployeeId=employees.employeeId \
	               WHERE contacts.employeeId=?";

	database.query(query, [employeeId], (err, rows, fields) => {
		if(err)
			throw err;

		callback(rows);
	})
};

const getCompanyContacts = (employeeId, callback) => {
	const query = "SELECT companies.companyId, companies.companyName FROM contacts \
				   LEFT JOIN employees ON contacts.otherEmployeeId=employees.employeeId \
				   LEFT JOIN companies ON employees.companyId=companies.companyId \
				   WHERE contacts.employeeId=? GROUP BY employees.companyId HAVING COUNT(*) > 1;";

	database.query(query, [employeeId], (err, rows, fields) => {
		if(err)
			throw err;

		callback(rows);
	})
};

const searchEmployees = (employeeId, key, callback) => {
	const query = "SELECT contacts.contactId, employees.employeeId, employees.firstName, employees.lastName, employees.jobTitle FROM contacts \
	               LEFT JOIN employees ON contacts.otherEmployeeId=employees.employeeId \
	               WHERE contacts.employeeId=? AND CONCAT(employees.firstName, ' ', employees.lastName)=?";

	database.query(query, [employeeId, key], (err, rows, fields) => {
		if(err)
			throw err;

		callback(rows);
	});
};

const autocompleteEmployees = (employeeId, key, limit, callback) => {
	if(limit < 0 || limit > 10)
		callback(true);

	const query = "SELECT contacts.contactId, employees.employeeId, employees.firstName, employees.lastName, employees.jobTitle FROM contacts \
	               LEFT JOIN employees ON contacts.otherEmployeeId=employees.employeeId \
	               WHERE contacts.employeeId=? AND CONCAT(employees.firstName, ' ', employees.lastName) LIKE CONCAT('%', ?, '%') LIMIT ?";

	database.query(query, [employeeId, key, limit], (err, rows, fields) => {
		if(err)
			throw err;

		callback(false, rows);
	});
};

const searchCompanies = (employeeId, key, callback) => {
	const query = "SELECT companies.companyId, companies.companyName FROM contacts \
				   LEFT JOIN employees ON contacts.otherEmployeeId=employees.employeeId \
				   LEFT JOIN companies ON employees.companyId=companies.companyId \
				   WHERE contacts.employeeId=? AND companies.companyName=? \
				   GROUP BY employees.companyId HAVING COUNT(*) > 1;";

	database.query(query, [employeeId, key], (err, rows, fields) => {
		if(err)
			throw err;

		callback(rows);
	});
};

const autocompleteCompanies = (employeeId, key, limit, callback) => {
	if(limit < 0 || limit > 10)
		callback(true);

	const query = "SELECT companies.companyId, companies.companyName FROM contacts \
				   LEFT JOIN employees ON contacts.otherEmployeeId=employees.employeeId \
				   LEFT JOIN companies ON employees.companyId=companies.companyId \
				   WHERE contacts.employeeId=? AND companies.companyName LIKE CONCAT('%', ?, '%') \
				   GROUP BY employees.companyId HAVING COUNT(*) > 1 LIMIT ?";

	database.query(query, [employeeId, key, limit], (err, rows, fields) => {
		if(err)
			throw err;

		callback(false, rows);
	});
};

const add = (employeeId, otherEmployeeId, callback) => {
	const query = "INSERT INTO contacts (employeeId, otherEmployeeId) VALUES (?, ?), (?, ?)";

	database.query(query, [employeeId, otherEmployeeId, otherEmployeeId, employeeId], (err, rows, fields) => {
		if(err)
			throw err;

		if(typeof callback === "function")
			callback();
	})
}

module.exports = {
	areContacts,
	getEmployeeContacts,
	getCompanyContacts,
	searchEmployees,
	autocompleteEmployees,
	searchCompanies,
	autocompleteCompanies,
	add
};