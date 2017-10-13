/**
 * @file Implements some useful utilities
 */

/**
 * Call this method to clone a value
 *
 * @param value This is any javascript value that can be JSON stringified
 *
 * @returns a copy of the passed value, or undefined if it could not be cloned
 */

SC.utils = SC.utils || {};SC.utils.clone = function(value) {
	try {
		return JSON.parse(JSON.stringify(value));
	} catch (e) {
		console.worn(e.stack);
		return undefined;
	}
};

/**
 * Call this method to parse a url into it's various pieces.
 *
 * @param {String} url The url to be parsed
 */
SC.utils.parseUrl = function(url) {
	var parser = new URI(url);
	return parser;
};

