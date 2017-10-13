SAPPHIRE.application.listen('start', function(callback)
{
	var promises = [];
	var results = SYMPHONY.services.broadcast('start');

	results.each(function(result)
	{
		if (Q.isPromise(result)) promises.push(result);
	});

	return Q.allSettled(promises)
		.then(function()
		{
			callback();
		});
})

SAPPHIRE.application.listen('ready', function()
{
	SYMPHONY.services.broadcast('ready');
});
