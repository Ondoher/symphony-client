describe('View Loader', function()
{
	it('should be registerted', function()
	{
		var views = SYMPHONY.services.subscribe('views');
		expect(views).not.toBe(false);
	});

	it('should load a view', function(done)
	{
		var views = SYMPHONY.services.subscribe('views');

		views.load('alert-bar', 'alert-bar-1')
			.then(function(service)
			{
				service.beenSeen = true;
				expect(service).toBeTruthy();
				done();
			});

	});

	it('should give back an existing view', function(done)
	{
		var views = SYMPHONY.services.subscribe('views');

		views.load('alert-bar', 'alert-bar-1')
			.then(function(service)
			{
				expect(service).toBeTruthy();
				expect(service.beenSeen).toBe(true);
				done();
			});

	});

	it('should fail loading a missing view', function(done)
	{
		var views = SYMPHONY.services.subscribe('views');

		views.load('does-not-exist', 'does-not-exist-1')
			.then(function(service)
			{
				fail('load view should fail');
				done();
			})
			.catch(function()
			{
				done();
			});
	});
});
