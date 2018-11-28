function error(res, errorCode, statusCode = 400, msg = "Not yet done")
{
	if(errorCode >= 100)
		res.status(statusCode).json({ status: "error", errorCode, flag: 2, msg });

	else
		res.status(statusCode).json({ status: "error", errorCode, flag: 0, msg });
}

function success(res, success = null, statusCode = 200)
{
	if(success === null)
		res.status(statusCode).json({ status: "success", flag: 1 });

	else
		res.status(statusCode).json({ status: "success", flag: 1, success });
}

module.exports = {
	success,
	error
}