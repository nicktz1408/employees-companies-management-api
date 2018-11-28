const cron = require("node-cron");
const ForgotPassword = require("./../models/forgot-password");

cron.schedule("59 * 12 * * *", () => {
	console.log("Cleanup forgot_password table task has begun!");

	const now = Math.floor(+Date.now() / 1000);

	ForgotPassword.getAll(results => {
		for(let i = 0; i < results.length; i++)
		{
			const exp = results[i].expTimestamp;

			if(now > exp)
			{
				const tokenId = results[i].tokenId;

				ForgotPassword.removeEntity(tokenId);
			}
		}
	})
})