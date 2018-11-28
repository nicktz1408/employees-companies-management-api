const multer = require("multer");
const fs = require("fs");

const setup = dest => {
	return multer({ dest, fileFilter: (req, file, cb) => {
		console.log(file);

		if(file.mimetype === "image/png" || file.mimetype === 'image/gif' || file.mimetype === 'image/jpeg')
			cb(null, true);

		else
			return cb(null, false);
	} }).single("image");
}

const rename = (oldPath, newPath, callback) => {
	fs.rename(oldPath, newPath, (err) => {
		if(err)
			throw err;

		if(typeof callback === "function")
			callback();
	})
}

module.exports = {
	setup,
	rename
};