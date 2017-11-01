var listener = require('../rpc/listener');

exports.start = function(socket, data, callback)
{
	var userId = data.userId;
	listener.addListener(userId, socket);
	return SERVER.ask('sc', 'user', 'start', {id: userId})
		.then(function(user)
		{
			return SERVER.ask('sc', 'user', 'streams', {id: userId})
				.then(function(response)
				{
					user.streams = response
					callback(user);
				}.bind(this));
		}.bind(this));
}
