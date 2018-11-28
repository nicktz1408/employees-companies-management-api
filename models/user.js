const database = require("./../config/database");

const bcrypt = require("bcrypt");//"./../utilities/bcrypt");

//SELECT
const getUserByEmail = (email, callback) => {
	const query = "SELECT * FROM users WHERE email=?";
	console.log(query);

	database.query(query, [email], (err, rows, fields) => {
		if(err)
			throw err;

		callback(rows);
	})
}

const userExists = (email, callback) => {
	const query = "SELECT * FROM users WHERE email=?";

	database.query(query, [email], (err, rows, fields) => {
		if(err)
			throw err;

		const result = rows.length > 0;
		callback(result);
	});
}

//INSERT
const addUser = (email, password, accessLevel, callback) => {
	const query = "INSERT INTO users (email, password, accessLevel) VALUES (?, ?, ?)";

	database.query(query, [email, password, accessLevel], (err, rows, fields) => {
		if(err)
			throw err;

		callback();
	})
};

const authenticate = (email, password, callback) => {
	const query = "SELECT * FROM users WHERE email=?";
	console.log("Password provided: " + password);

	database.query(query, [email], (err, rows, fields) => {
		if(err)
			throw err;

		else if(rows.length === 0)
			callback({ status: "no_users" });

		else
		{
			const hash = rows[0].password;
			console.log("Hash: " + hash);

			bcrypt.compare(password, hash, (err, res) => {
				if(err)
					throw err;

				if(res)
					callback({ status: "success", userId: rows[0].userId, accessLevel: rows[0].accessLevel });

				else
					callback({ status: "password_mismatch" });
			});
		}
	});
};

//UPDATE
const updatePassword = (userId, password) => {
	const query = "UPDATE users SET password=? WHERE userId=?";

	database.query(query, [password, userId], (err, rows, fields) => {
		if(err)
			throw err;
	});
}

const deleteByEmployee = (employeeId, callback) => {
	const query = "DELETE FROM users WHERE employeeId=?";

	database.query(query, [employeeId], (err, rows, fields) => {
		if(err)
			throw err;

		if(typeof callback === "function")
			callback();
	});
}

module.exports = {
	getUserByEmail,
	userExists,
	addUser,
	authenticate,
	updatePassword,
	deleteByEmployee
};