var symphonyApi = require('symphony-api');
var Q = require('q');
var config = require('./config');
var User = require('./user');
var Messages = require('./messages');

class Runner {
	constructor ()
	{
		this.users = {};
	}

	createUser (id)
	{
		console.log('createUser', id, userConfig)
		var userConfig = config.users[id];
		console.log(config, id);

		return new User(id, userConfig);
	}

	createObjects (id, user)
	{
		if (!this.users[id]) return;
		this.users[id].createObjects();
		return user;
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
			.then(this.startFeed.bind(this))
			.then(this.createObjects.bind(this, id));
	}
}

module.exports = new Runner();

