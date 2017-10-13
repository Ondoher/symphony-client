if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
	value: function(predicate) {
	 'use strict';
	 if (this == null) {
	   throw new TypeError('Array.prototype.find called on null or undefined');
	 }
	 if (typeof predicate !== 'function') {
	   throw new TypeError('predicate must be a function');
	 }
	 var list = Object(this);
	 var length = list.length >>> 0;
	 var thisArg = arguments[1];
	 var value;

	 for (var i = 0; i < length; i++) {
	   value = list[i];
	   if (predicate.call(thisArg, value, i, list)) {
		 return value;
	   }
	 }
	 return undefined;
	}
  });
}

/**
 * Performs a binary search on the host array. This method can either be
 * injected into Array.prototype or called with a specified scope like this:
 * binaryIndexOf.call(someArray, searchElement);
 *
 * @param {*} searchElement The item to search for within the array.
 * @return {Number} The index of the element which defaults to -1 when not found.
 */
Array.prototype.bsearch = function(searchElement, compare, context)
{
	var minIndex = 0;
	var maxIndex = this.length - 1;
	var currentIndex;
	var currentElement;

	while (minIndex <= maxIndex)
	{
		currentIndex = (minIndex + maxIndex) / 2 | 0;
		currentElement = this[currentIndex];

		var delta = compare.call(context, currentElement, searchElement);
		if (delta < 0) {
			minIndex = currentIndex + 1;
		}
		else if (delta > 0) {
			maxIndex = currentIndex - 1;
		}
		else {
			return currentIndex;
		}
	}

	return minIndex;
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
function throttle(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};
