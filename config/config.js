const configDetails = {
	db: {
		production: {
			user: "",
			password: "",
			database: "",
			host: ""
		},

		development: {
			user: "admin",
			password: "password",
			database: "dbc",
			//host: "localhost",
			//port: 3306
		}
	},

	email: {
		passwordRecovery: "email@email.com"
	},

	transporterOptions: {
		production: {
			host: "the host of email service",
			port: "the port of email service",
			secure: false,		//true if port === 465
			auth: {
				user: "the username",
				password: "the password"
			}
		},
		development: {

		}
	},

	tokens: {
		jwtSecret: "8uLI3Ka6xSXvtFOTqjBn",
		userHash: "qJI1zpLxBW",
		employeeHash: "dGZjb0iNdc",
		companyHash: "k0Qxp1QLfP"
	},

	forgotPasswordTokenExpiration: 3600		//1 hour
};

module.exports = configDetails;