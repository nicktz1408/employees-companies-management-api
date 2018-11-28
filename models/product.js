const database = require("./../config/database");
const util = require("./../utilities/util");

const getByCompanyId = (companyId, callback) => {
	const query = "SELECT * FROM products WHERE companyId=?";

	database.query(query, [companyId], (err, rows, fields) => {
		if(err)
			throw err;

		callback(rows);
	});
}

const add = (companyId, title, callback) => {
	const query = "INSERT INTO products (title, companyId) VALUES (?, ?)";

	database.query(query, [title, companyId], (err, rows, fields) => {
		if(err)
			throw err;

		callback();
	});
}

const updateSale = (productId, companyId, newSale, callback) => {
	if(newSale < 0 || newSale > 2)
		callback(false);

	console.log("New sale: " + newSale)
	const query = "UPDATE products SET sale=? WHERE productId=? AND companyId=?";

	database.query(query, [newSale, productId, companyId], (err, rows, fields) => {
		if(err)
			throw err;

		callback(true);
	})
}

const updateTitle = (productId, companyId, newTitle, callback) => {
	const query = "UPDATE products SET title=? WHERE productId=? AND companyId=?";

	database.query(query, [newTitle, productId, companyId], (err, rows, fields) => {
		if(err)
			throw err;

		if(typeof callback === "function")
			callback();
	})
}

const Delete = (productId, companyId, callback) => {
	const query = "DELETE FROM products WHERE productId=? AND companyId=?";

	database.query(query, [newTitle, productId, companyId], (err, rows, fields) => {
		if(err)
			throw err;

		if(typeof callback === "function")
			callback();
	})
}

module.exports = {
	getByCompanyId,
	add,
	updateSale,
	updateTitle,
	Delete
};