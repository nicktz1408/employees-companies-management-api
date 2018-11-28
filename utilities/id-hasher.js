const Hashids = require('hashids');
const config = require("./../config/config");

const userHasher = new Hashids(config.tokens.userHasher);
const employeeHasher = new Hashids(config.tokens.employeeHasher);
const companyHasher = new Hashids(config.tokens.companyHasher);

const types = {
	user,
	employee,
	company
};

const encode = (type, id) => {
	if(type === types.user)
		return userHahser.encode(id);

	else if(type === types.employee)
		return employeeHasher.encode(id);

	else if(type === types.company)
		return companyHasher.encode(id);

	throw { err: "Invalid encrypt id hash type!" };
}

const decode = (type, token) => {
	const decodedArr = [];

	if(type === types.user)
		decodedArr = userHasher.decode(token);

	else if(type === types.employee)
		decodedArr = employeeHasher.decode(token);

	else if(type === types.company)
		decodedArr = companyHasher.decode(token);

	else
		throw { err: "Invalid encrypt id hash type!" };

	return (decodedArr.length ? decodedArr[0] : false);
}

module.exports = {
	types,
	encode,
	decode
};