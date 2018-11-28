const mysql = require("mysql");

const config = require("./config.js");

console.log(process.env.NODE_ENVIRONMENT);

if(process.env.NODE_ENVIRONMENT === "development")
	module.exports = mysql.createConnection(config.db.development);

else
	module.exports = mysql.createConnection(config.db.production);