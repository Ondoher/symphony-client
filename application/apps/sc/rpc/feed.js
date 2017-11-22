var Q = require('q');
var RpcHandler =  require('sapphire-rpc').RpcHandler;
var listener = require('./listener');

class RpcFeed extends RpcHandler {
	constructor ()
	{
		super('feed', SERVER);
	}

	messages (channel, data)
	{
		console.log('messages on feed', channel, data);
		listener.sendMessages(channel, data);
	}
}

var rpc = new RpcFeed();
