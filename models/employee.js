const database = require("./../config/database");
const util = require("./../utilities/util");

const get = (employeeId, callback) => {
	const query = "SELECT * FROM employees WHERE employeeId=?";

	database.query(query, [employeeId], (err, rows, fields) => {
		if(err)
			throw err;

		else if(rows.length)
			callback(rows[0]);

		else
			callback(false);
	});
};

const getByCompanyId = (companyId, sortBy, sortType, activityStatus, callback) => {
	if(activityStatus > 2 || activityStatus <= 0)
		callback(false);

	let query = "SELECT employeeId, firstname, lastname, phone, email FROM employees WHERE companyId=? AND activityStatus=? ";

	query = util.addSortingToQuery(query, sortBy, sortType);

	console.log("Query: " + query);

	if(!query)
		callback(false);

	else
		database.query(query, [companyId, activityStatus], (err, rows, fields) => {
			if(err)
				throw err;

			callback(rows);
		});
};

const getTotalByCompanyId = (companyId, callback) => {
	const query = "SELECT COUNT(employeeId) AS total FROM employees WHERE companyId=?";

	database.query(query, [companyId], (err, rows, fields) => {
		callback(rows[0].total);
	})
};

const search = (key, callback) => {
	const query = "SELECT employeeId, CONCAT(firstName, ' ', lastName) AS fullName, email, jobTitle FROM employees WHERE CONCAT(firstName, ' ', lastName)=?";
	console.log("Query: " + query);

	database.query(query, [key], (err, rows, fields) => {
		if(err)
			throw err;

		if(rows.length)
			callback(rows[0]);

		else
			callback(false);
	})
};

const searchByCompanyId = (companyId, key, callback) => {
	const query = "SELECT employeeId, CONCAT(firstName, ' ', lastName) AS fullName, email, jobTitle FROM employees WHERE companyId=? AND CONCAT(firstName, ' ', lastName)=?";

	console.log("Query: " + query);
	console.log(companyId + " " + key);

	database.query(query, [companyId, key], (err, rows, fields) => {
		if(err)
			throw err;

		callback(rows);
	})
};

const searchAutocomplete = (key, limit, callback) => {
	if(limit > 10 || limit < 0)
		callback(true);

	const query = "SELECT employeeId, CONCAT(firstName, ' ', lastName) AS fullName, email, jobTitle  FROM employees WHERE CONCAT(firstName, ' ', lastName) LIKE CONCAT('%', ?, '%') LIMIT ?";
	console.log("Query: " + query);

	database.query(query, [key, limit], (err, rows, fields) => {
		if(err)
			throw err;

		callback(false, rows);
	});
};

const searchAutocompleteByCompanyId = (companyId, key, limit, callback) => {
	if(limit > 10 || limit < 0)
		callback(true);

	const query = "SELECT employeeId, CONCAT(firstName, ' ', lastName) AS fullName, email, jobTitle  FROM employees WHERE companyId=? AND CONCAT(firstName, ' ', lastName) LIKE CONCAT('%', ?, '%') LIMIT ?";
	console.log("Query: " + query);

	database.query(query, [companyId, key, limit], (err, rows, fields) => {
		if(err)
			throw err;

		callback(false, rows);
	});
}

const add = (companyId, callback) => {
	const query = "INSERT INTO employees (companyId) VALUES (?)";

	database.query(query, [companyId], (err, rows, fields) => {
		if(err)
			throw err;

		if(typeof callback === "function")
			callback();
	})
}

const addToCompany = (employeeId, companyId, callback) => {
	const query = "UPDATE employees SET companyId=? WHERE employeeId=?";

	database.query(query, [companyId, employeeId], (err, rows, fields) => {
		if(typeof callback === "function")
			callback();
	});
}

const accepted = ["firstName", "lastName", "jobTitle", "phone", "email", "facebook", 
"instagram", "linkedin", "twitter", "pinterest", "about"];

const update = (employeeId, data, callback) => {
	let query = "UPDATE employees SET ";
	let propertiesArr = [];

	console.log("Data:");
	console.log(data);



	for(let prop in data)
	{
		if(util.exists(prop, accepted))
			propertiesArr.push({ property: prop, key: data[prop] });
	}

	console.log(propertiesArr);

	for(let i = 0; i < propertiesArr.length; i++)
		query += propertiesArr[i].property + "=?,";

	query = query.slice(0, query.length - 1);
	query += " WHERE employeeId=?";

	propertiesArr = propertiesArr.map(curr => curr.key);
	propertiesArr.push(parseInt(employeeId));

	database.query(query, propertiesArr, (err, rows, fields) => {
		console.log(fields);

		if(err)
			throw err;

		if(typeof callback === "function")
			callback();
	});
}

const updateActivity = (employeeId, companyId, newActivity, callback) => {
	if(newActivity < 1 || newActivity > 2)
		callback(false);

	console.log(newActivity);
	console.log(employeeId);
	console.log(companyId);

	const query = "UPDATE employees SET activityStatus=? WHERE employeeId=? AND companyId=?";

	database.query(query, [newActivity, employeeId, companyId], (err, rows, fields) => {
		if(err)
			throw err;

		if(typeof callback === "function")
			callback(true);
	});
};

const updateActivityByCompanyId = (companyId, newActivity, callback) => {
	if(newActivity < 1 || newActivity > 2)
		callback(false);

	const query = "UPDATE employees SET activityStatus=? WHERE companyId=?";

	database.query(query, [newActivity, companyId], (err, rows, fields) => {
		if(err)
			throw err;

		if(typeof callback === "function")
			callback(true);
	});
}

const updateImage = (employeeId, imageUrl, callback) => {
	const query = "UPDATE employees SET imageUrl=? WHERE employeeId=?";

	database.query(query, [imageUrl, employeeId], (err, rows, fields) => {
		if(err)
			throw err;

		if(typeof callback === "function")
			callback();
	})
}

const Delete = (employeeId, callback) => {
	let query = "DELETE FROM employees WHERE employeeId=?";

	database.query(query, [employeeId], (err, rows, fields) => {
		if(err)
			throw err;

		if(typeof callback === "function")
			callback();
	});
};

module.exports = {
	get,
	getByCompanyId,
	getTotalByCompanyId,
	search,
	searchByCompanyId,
	searchAutocomplete,
	searchAutocompleteByCompanyId,
	add,
	addToCompany,
	update,
	updateActivity,
	updateActivityByCompanyId,
	updateImage,
	Delete
};