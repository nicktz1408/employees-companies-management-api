const Joi = require("joi");

const inputValidate = (input, schema, callback) => {
	Joi.validate(input, schema, err => {
		if(err)
			callback(false);

		callback(true);
	});
};

const exists = (key, arr) => {
	for(let i = 0; i < arr.length; i++)
		if(arr[i] === key)
			return true;

	return false;
}

const addSortingToQuery = (query, sortBy = "id", sortType = "asc") => {
	if(sortBy !== "id")
	{
		if(sortBy === "name" || sortBy === "email" || sortBy === "phone")
		{
			if(sortBy === "name")
				sortBy = "lastName";

			if(sortType === "asc" || sortType === "desc")
				query += "ORDER BY " + sortBy + ' ' + sortType;

			else
				return false;
		}

		else
			return false;
	}

	return query;
}

module.exports = {
	inputValidate,
	exists,
	addSortingToQuery
};