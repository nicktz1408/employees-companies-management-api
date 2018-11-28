const database = require("./../config/database");

const getAll = (callback) => {
	const query = "SELECT *, UNIX_TIMESTAMP(exp) AS expTimestamp FROM forgot_password";

	database.query(query, (err, rows, fields) => {
		if(err)
			throw err;

		callback(rows);
	})
}

const getEntityByTokenId = (tokenId, callback) => {
	const query = "SELECT *, UNIX_TIMESTAMP(exp) AS expTimestamp FROM forgot_password WHERE tokenId=?";

	database.query(query, [tokenId], (err, rows, fields) => {
		if(err)
			throw err;
		console.log(rows);
		callback(rows);
	})
};

const addEntity = (uuid, userId, exp, callback) => {
	const query = "INSERT INTO forgot_password (uuid, userId, exp) VALUES (?, ?, ?)";
	console.log("exp: " + exp);

	database.query(query, [uuid, userId, exp], (err, rows, fields) => {
		if(err)
			throw err;

		callback();
	});
};

const removeEntity = (tokenId, callback) => {
	const query = "DELETE FROM forgot_password WHERE tokenId=?";
	console.log(tokenId);

	database.query(query, [tokenId], (err, rows, fields) => {
		if(err)
			throw err;
	});
}

module.exports = {
	getAll,
	getEntityByTokenId,
	addEntity,
	removeEntity
};