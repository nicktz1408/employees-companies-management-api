const config = "./config";
const nodemailer = require("nodemailer");

if(process.env.NODE_ENVIRONMENT === "development")
	module.exports = nodemailer.createTransport(config.transporterOptions.development);

else
	module.exports = nodemailer.createTransport(config.transporterOptions.production);