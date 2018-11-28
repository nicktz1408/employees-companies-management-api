const database = require("./../config/database");
const util = require("./../utilities/util");

const get = (companyId, callback) => {
	console.log(companyId);
	const query = "SELECT * FROM companies WHERE companyId=?";

	database.query(query, [companyId], (err, rows, fields) => {
		if(err)
			throw err;

		else if(rows.length)
			callback(rows[0]);

		else
			callback(false);
	});
};

const getByUserId = (userId, sortBy, sortType, activityStatus, callback) => {
	if(activityStatus > 2 || activityStatus <= 0)
		callback(false);

	let query = "SELECT companyName, phone, email FROM companies WHERE userId=? AND activityStatus=? ";
	query = util.addSortingToQuery(query, sortBy, sortType);

	console.log("Query: " + query);

	if(!query)
		callback(false);

	else
		database.query(query, [userId, activityStatus], (err, rows, fields) => {
			if(err)
				throw err;

			callback(rows);
		});
};

const search = (key, callback) => {
	const query = "SELECT companyId, companyName, email FROM companies WHERE companyName=?";
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

const searchByUserId = (userId, key, callback) => {
	const query = "SELECT companyId, companyName, email FROM companies WHERE userId=? AND companyName=?";

	database.query(query, [userId, key], (err, rows, fields) => {
		if(err)
			throw err;

		callback(rows);
	})
}

const searchAutocomplete = (key, limit, callback) => {
	if(limit > 10 || limit < 0)
		callback(true);

	const query = "SELECT companyId, companyName, email  FROM companies WHERE userId=? AND companyName LIKE CONCAT('%', ?, '%') LIMIT ?";
	console.log("Query: " + query);

	database.query(query, [userId, key, limit], (err, rows, fields) => {
		if(err)
			throw err;

		callback(false, rows);
	})
}

const searchAutocompleteByUserId = (userId, key, limit, callback) => {
	if(limit > 10 || limit < 0)
		callback(true);

	const query = "SELECT companyId, companyName, email  FROM companies WHERE companyId=? AND companyName LIKE CONCAT('%', ?, '%') LIMIT ?";
	console.log("Query: " + query);

	database.query(query, [userId, key, limit], (err, rows, fields) => {
		if(err)
			throw err;

		callback(false, rows);
	})
}


const add = (userId, callback) => {
	const query = "INSERT INTO companies (userId) VALUES (?)";

	database.query(query, [userId], (err, rows, fields) => {
		if(err)
			throw err;

		if(typeof callback === "function")
			callback();
	})
}

const accepted = ["companyName", "phone", "email", "facebook", 
"instagram", "linkedin", "twitter", "pinterest", "about"];

const update = (companyId, data, callback) => {
	let query = "UPDATE companies SET ";
	let propertiesArr = [];

	for(let prop in data)
	{
		if(util.exists(prop, accepted))
			propertiesArr.push({ property: prop, key: data[prop] });
	}

	for(let i = 0; i < propertiesArr.length; i++)
		query += propertiesArr[i].property + "=?,";

	query = query.slice(0, query.length - 1);
	query += " WHERE companyId=?";

	propertiesArr = propertiesArr.map(curr => curr.key);
	propertiesArr.push(parseInt(companyId));

	database.query(query, propertiesArr, (err, rows, fields) => {
		if(err)
			throw err;

		if(typeof callback === "function")
			callback();
	});
}

const updateActivity = (companyId, newActivity, callback) => {
	if(newActivity < 1 || newActivity > 2)
		callback(false);

	const query = "UPDATE companies SET activityStatus=? WHERE companyId=?";

	database.query(query, [newActivity, companyId], (err, rows, fields) => {
		if(err)
			throw err;

		if(typeof callback === "function")
			callback(true);
	})
};

const updateImage = (companyId, imageUrl, callback) => {
	const query = "UPDATE companies SET imageUrl=? WHERE companyId=?";

	database.query(query, [imageUrl, companyId], (err, rows, fields) => {
		if(err)
			throw err;

		if(typeof callback === "function")
			callback();
	})
}

const Delete = (companyId) => {
	let query = "DELETE FROM companies WHERE companyId=?";

	database.query(query, [companyId], (err, rows, fields) => {
		if(err)
			throw err;

		if(typeof callback === "function")
			callback();
	});
};

module.exports = {
	get,
	getByUserId,
	search,
	searchByUserId,
	searchAutocomplete,
	searchByUserId,
	searchAutocompleteByUserId,
	add,
	update,
	updateActivity,
	updateImage,
	Delete
};