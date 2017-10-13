var feed = require('./feed');

class UserRpc {
	constructor()
	{
	}

	start (userId)
	{
		feed.listen(userId);
		return SERVER.ask('sc', 'user', 'start', {id: userId})
			.then(function(response)
			{
				return response;
			}.bind(this));
	}
}

module.exports = new UserRpc();
