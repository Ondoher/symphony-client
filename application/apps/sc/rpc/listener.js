class Listener {
	constructor ()
	{
		this.listeners = {};
	}

	addListener (userId, socket)
	{
		console.log('addListener', userId)
		global.SERVER.start(userId);
		this.listeners[userId] = this.listeners[userId] || [];
		this.listeners[userId].push(socket);
	}

	sendMessages (userId, messages)
	{
		var listeners = this.listeners[userId];

		if (!listeners) return;

		listeners.each(function(socket)
		{
			try
			{
				socket.emit('feed', messages);
			}
			catch (e)
			{
				console.log(e.stack);
			}
		}, this);
	}
}

module.exports = new Listener();
