var symphonyApi = require('symphony-api');
var Q = require('q');
var config = require('./config');
var User = require('./user');

class Runner {
	constructor ()
	{
		this.users = {};
	}

	createUser (id)
	{
		var userConfig = config.users[id];
		console.log(config, id);
		console.log('createUser', id, userConfig)

		return new User(id, userConfig);
	}

	getUser (id)
	{
		return this.users[id];
	}

	startFeed (user)
	{
		return user.startFeed();
	}

	start (id)
	{
		if (this.users[id]) return Q(this.users[id]);

		var user = this.createUser(id);
		this.users[id] = user;
		return user.load()
			.then(this.startFeed.bind(this));
	}
}

module.exports = new Runner();

