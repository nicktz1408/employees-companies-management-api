const get = (conversationId, callback) => {
	const query = "SELECT messageId, message, sendTime FROM chats WHERE conversationId=?";

	database.query(query, (err, rows, fields) => {
		if(err)
			throw err;

		callback(rows);
	})
}