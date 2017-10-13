var Q = require('q');
var RpcHandler =  require('sapphire-rpc').RpcHandler;
var runner = require('../users/runner');

class RpcUser extends RpcHandler {
	constructor ()
	{
		super('user', SERVER);
	}

	start (channel, data)
	{
		if (channel !== 'sc') return Q(false);
		var id = data.id;

		return runner.start(id)
			.then(function(user)
			{
				return user.me;
			}.bind(this));
	}

	streams (channel, data)
	{
		var id = data.id;
		var user = runner.getUser(id);

		if (!user) return 'no user found.';
		return user.getStreams();
	}
}

var rpc = new RpcUser();
