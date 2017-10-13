var symphonyApi = require('symphony-api');
var Q = require('q');

function base64EncodeUrl(str){
	return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
}

var n1CrazyThreadId = base64EncodeUrl('9FR+lyvLNttuARgs7av3D3///rCPekXbdA=='); //nexus
var n2CrazyThreadId = base64EncodeUrl('pnTN05AkpGivKFCNzEWkk3///qTgBnUtdA=='); //nexus2
var nexusThreadId = base64EncodeUrl('pnTN05AkpGivKFCNzEWkk3///qTgBnUtdA=='); //nexus2
var n2PrivateThreadId = base64EncodeUrl('DxbnV8++z3vny/SIX7NqGX///qPFMGuYdA==');
var corpTestThreadId = base64EncodeUrl('QBsRAH+GVNvyvRsK9AVufX///qOCFrt8dA==');

class User {
	constructor (id, config)
	{
		this.id = id;
		this.config = config;
		this.urls = {
			keyUrl: config.keyUrl,
			sessionUrl: config.sessionUrl ,
			agentUrl: config.agentUrl,
			podUrl: config.podUrl,
		}

		this.api = symphonyApi.create(this.urls);
		this.api.setCerts(config.auth.cert, config.auth.key, config.auth.passphrase);
		this.api.setLogState(true);
	}

	getMe (user)
	{
		if (this.me) return Q(me);

		return this.api.user.me()
	}

	load ()
	{
		return this.api.authenticate()
			.then(this.getMe.bind(this))
			.then(function(me)
			{
				console.log('me', me);
				this.me = me;
//				this.api.message.v4.send(n2CrazyThreadId, '<messageML>Hi</messageML>', {});
				return this;
			}.bind(this));
	}

	getStreams ()
	{
		return this.api.stream.list(0, 2000, [{type: 'IM'}, {type: 'MIM'}, {type: 'ROOM'}], false)
			.then(function(response) {
				console.log('response.length', response.length);
				var ids = response.map(function(stream)
				{
					return stream.id;
				}, this);

				return this.api.stream.info(ids);
			}.bind(this));
	}

	startFeed ()
	{
		this.api.feed.on('messages', this.onMessage.bind(this));
		return this.api.feed.start()
			.then(function() {
				return this;
			}.bind(this));
	}

	onMessage (messages)
	{
		console.log('calling', this.id, 'feed', 'messages', messages);
		global.SERVER.call(this.id, 'feed', 'messages', messages)
		console.log(JSON.stringify(messages, null, '  '));
	}
}


module.exports = User;
