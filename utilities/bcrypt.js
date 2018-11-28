const bcrypt = require("bcrypt");

/*const encryptData = (req, res, next) => {
	console.log("Begin encrypting data!");
	const data = req.user.dataToEncrypt;

	console.log("Data to encrypt: " + data);

	bcrypt.hash(data, 10, (err, hash) => {
		if(err)
			throw err;

		console.log("Hash: " + hash);
		req.user.hash = hash;

		next();
	});
};*/

const encryptData = (data, callback) => {
	console.log("Begin encrypting data!");

	console.log("Data to encrypt: " + data);

	bcrypt.hash(data, 10, (err, hash) => {
		if(err)
			throw err;

		console.log("Hash: " + hash);

		callback(hash);
	});
}

const validateData = (data, hash, callback) => {
	console.log("Beging validating data!");

	bcrypt.compare(data, hash, (err, res) => {
		if(err)
			throw err;

		callback(res);
	})
};

module.exports = {
	encryptData,
	validateData
};