var SYMPHONY = {};

var services = {};
var registryService = new Service('service-registry');

SYMPHONY.services = {
	listen : registryService.listen.bind(registryService),
	unlisten : registryService.unlisten.bind(registryService),
	fire : registryService.fire.bind(registryService),
	fireArgs : registryService.fireArgs.bind(registryService),
	register : function(name) {
		if (services[name] === undefined) {
			services[name] = new Service(name);
		}

		registryService.fire('registered', name);
		return services[name];
	},

	subscribe : function(name) {
		if (services[name] === undefined) {
			return false
		}

		return services[name];
	},

	remove : function(name) {
		if (services[name] !== undefined) {
			delete services[name];
		}
	},

	broadcast : function(event) {
		var passed = Array.prototype.slice.call(arguments, 1);
		var results = [];

		for (var name in services) {
			if (services.hasOwnProperty(name)) {
				try {
					results.push(services[name].fireArgs(event, passed));
				}
				catch (e) {
					console.warn('error during broadcast');
					console.warn(e.stack);
				}
			}
		 }

		 SYMPHONY.services.fireArgs(event, passed);

		 return results;
	},

	make : function(serviceName, thing, implements, eventable)
	{
		thing.registryService = SYMPHONY.services.register(serviceName);
		implements = implements || [];

		implements.forEach(function(name) {
			if (thing[name]) {
				thing.registryService.implement(name, thing[name].bind(thing));
			} else {
				console.warn('cannot find', name, 'in', serviceName);
			}
		});

		if (eventable) {
			thing.fire = thing.registryService.callfire.bind(thing.registryService);
			thing.listen = thing.registryService.listen.bind(thing.registryService);
			thing.unlisten = thing.registryService.unlisten.bind(thing.registryService);
		}
	},
}
