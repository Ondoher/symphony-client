(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./packages/entities/src/index.js":[function(require,module,exports){
require('./entity-registry');

},{"./entity-registry":"C:\\dev\\NEXUS\\packages\\entities\\src\\entity-registry.js"}],"./packages/extensionml/src/index.js":[function(require,module,exports){
require('./services');
require('./defaults');
require('./logic');
require('./advanced');
require('./entity');
require('./renderers');

},{"./advanced":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\advanced\\index.js","./defaults":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\defaults\\index.js","./entity":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\entity\\index.js","./logic":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\logic\\index.js","./renderers":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\renderers\\index.js","./services":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\services\\index.js"}],"./packages/messageml-renderer/src/index.js":[function(require,module,exports){
require('./services');

},{"./services":"C:\\dev\\NEXUS\\packages\\messageml-renderer\\src\\services\\index.js"}],"./packages/renderer/src/index.js":[function(require,module,exports){
require('./services/linkParser');
require('./services/services-list');
require('./services/rendering-registry');
require('./services/markdown');
require('./services/markdown-renderer');
require('./services/message-renderer');
require('./renderers/emojis');

},{"./renderers/emojis":"C:\\dev\\NEXUS\\packages\\renderer\\src\\renderers\\emojis.js","./services/linkParser":"C:\\dev\\NEXUS\\packages\\renderer\\src\\services\\linkParser.js","./services/markdown":"C:\\dev\\NEXUS\\packages\\renderer\\src\\services\\markdown.js","./services/markdown-renderer":"C:\\dev\\NEXUS\\packages\\renderer\\src\\services\\markdown-renderer.js","./services/message-renderer":"C:\\dev\\NEXUS\\packages\\renderer\\src\\services\\message-renderer.js","./services/rendering-registry":"C:\\dev\\NEXUS\\packages\\renderer\\src\\services\\rendering-registry.js","./services/services-list":"C:\\dev\\NEXUS\\packages\\renderer\\src\\services\\services-list.js"}],"C:\\dev\\NEXUS\\node_modules\\base64-js\\lib\\b64.js":[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS)
			return 62 // '+'
		if (code === SLASH)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],"C:\\dev\\NEXUS\\node_modules\\browser-resolve\\empty.js":[function(require,module,exports){

},{}],"C:\\dev\\NEXUS\\node_modules\\buffer\\index.js":[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('is-array')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192 // not used by this implementation

var kMaxLength = 0x3fffffff

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Note:
 *
 * - Implementation must support adding new properties to `Uint8Array` instances.
 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *    incorrect length in some situations.
 *
 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
 * get the Object implementation, which is slower but will work correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = (function () {
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Find the length
  var length
  if (type === 'number')
    length = subject > 0 ? subject >>> 0 : 0
  else if (type === 'string') {
    if (encoding === 'base64')
      subject = base64clean(subject)
    length = Buffer.byteLength(subject, encoding)
  } else if (type === 'object' && subject !== null) { // assume object is array-like
    if (subject.type === 'Buffer' && isArray(subject.data))
      subject = subject.data
    length = +subject.length > 0 ? Math.floor(+subject.length) : 0
  } else
    throw new TypeError('must start with number, buffer, array or string')

  if (this.length > kMaxLength)
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
      'size: 0x' + kMaxLength.toString(16) + ' bytes')

  var buf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer.TYPED_ARRAY_SUPPORT && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    if (Buffer.isBuffer(subject)) {
      for (i = 0; i < length; i++)
        buf[i] = subject.readUInt8(i)
    } else {
      for (i = 0; i < length; i++)
        buf[i] = ((subject[i] % 256) + 256) % 256
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer.TYPED_ARRAY_SUPPORT && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

Buffer.isBuffer = function (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b))
    throw new TypeError('Arguments must be Buffers')

  var x = a.length
  var y = b.length
  for (var i = 0, len = Math.min(x, y); i < len && a[i] === b[i]; i++) {}
  if (i !== len) {
    x = a[i]
    y = b[i]
  }
  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function (list, totalLength) {
  if (!isArray(list)) throw new TypeError('Usage: Buffer.concat(list[, length])')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (totalLength === undefined) {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    case 'hex':
      ret = str.length >>> 1
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    default:
      ret = str.length
  }
  return ret
}

// pre-set for values that may exist in the future
Buffer.prototype.length = undefined
Buffer.prototype.parent = undefined

// toString(encoding, start=0, end=buffer.length)
Buffer.prototype.toString = function (encoding, start, end) {
  var loweredCase = false

  start = start >>> 0
  end = end === undefined || end === Infinity ? this.length : end >>> 0

  if (!encoding) encoding = 'utf8'
  if (start < 0) start = 0
  if (end > this.length) end = this.length
  if (end <= start) return ''

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'binary':
        return binarySlice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase)
          throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.equals = function (b) {
  if(!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max)
      str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  return Buffer.compare(this, b)
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(byte)) throw new Error('Invalid hex string')
    buf[offset + i] = byte
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  var charsWritten = blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function asciiWrite (buf, string, offset, length) {
  var charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function binaryWrite (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  var charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function utf16leWrite (buf, string, offset, length) {
  var charsWritten = blitBuffer(utf16leToBytes(string), buf, offset, length, 2)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = utf16leWrite(this, string, offset, length)
      break
    default:
      throw new TypeError('Unknown encoding: ' + encoding)
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function binarySlice (buf, start, end) {
  return asciiSlice(buf, start, end)
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len;
    if (start < 0)
      start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0)
      end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start)
    end = start

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0)
    throw new RangeError('offset is not uint')
  if (offset + ext > length)
    throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
      ((this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      this[offset + 3])
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80))
    return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16) |
      (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
      (this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      (this[offset + 3])
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
  if (value > max || value < min) throw new TypeError('value is out of bounds')
  if (offset + ext > buf.length) throw new TypeError('index out of range')
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = value
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else objectWriteUInt16(this, value, offset, true)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else objectWriteUInt16(this, value, offset, false)
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = value
  } else objectWriteUInt32(this, value, offset, true)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else objectWriteUInt32(this, value, offset, false)
  return offset + 4
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = value
  return offset + 1
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else objectWriteUInt16(this, value, offset, true)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else objectWriteUInt16(this, value, offset, false)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else objectWriteUInt32(this, value, offset, true)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else objectWriteUInt32(this, value, offset, false)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (value > max || value < min) throw new TypeError('value is out of bounds')
  if (offset + ext > buf.length) throw new TypeError('index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert)
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert)
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  if (end < start) throw new TypeError('sourceEnd < sourceStart')
  if (target_start < 0 || target_start >= target.length)
    throw new TypeError('targetStart out of bounds')
  if (start < 0 || start >= source.length) throw new TypeError('sourceStart out of bounds')
  if (end < 0 || end > source.length) throw new TypeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < len; i++) {
      target[i + target_start] = this[i + start]
    }
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (end < start) throw new TypeError('end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  if (start < 0 || start >= this.length) throw new TypeError('start out of bounds')
  if (end < 0 || end > this.length) throw new TypeError('end out of bounds')

  var i
  if (typeof value === 'number') {
    for (i = start; i < end; i++) {
      this[i] = value
    }
  } else {
    var bytes = utf8ToBytes(value.toString())
    var len = bytes.length
    for (i = start; i < end; i++) {
      this[i] = bytes[i % len]
    }
  }

  return this
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1) {
        buf[i] = this[i]
      }
      return buf.buffer
    }
  } else {
    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr.constructor = Buffer
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.equals = BP.equals
  arr.compare = BP.compare
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

var INVALID_BASE64_RE = /[^+\/0-9A-z]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F) {
      byteArray.push(b)
    } else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++) {
        byteArray.push(parseInt(h[j], 16))
      }
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length, unitSize) {
  if (unitSize) length -= length % unitSize;
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

},{"base64-js":"C:\\dev\\NEXUS\\node_modules\\base64-js\\lib\\b64.js","ieee754":"C:\\dev\\NEXUS\\node_modules\\ieee754\\index.js","is-array":"C:\\dev\\NEXUS\\node_modules\\is-array\\index.js"}],"C:\\dev\\NEXUS\\node_modules\\core-util-is\\lib\\util.js":[function(require,module,exports){
(function (Buffer){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

}).call(this,{"isBuffer":require("../../is-buffer/index.js")})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9jb3JlLXV0aWwtaXMvbGliL3V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbi8vIE5PVEU6IFRoZXNlIHR5cGUgY2hlY2tpbmcgZnVuY3Rpb25zIGludGVudGlvbmFsbHkgZG9uJ3QgdXNlIGBpbnN0YW5jZW9mYFxuLy8gYmVjYXVzZSBpdCBpcyBmcmFnaWxlIGFuZCBjYW4gYmUgZWFzaWx5IGZha2VkIHdpdGggYE9iamVjdC5jcmVhdGUoKWAuXG5cbmZ1bmN0aW9uIGlzQXJyYXkoYXJnKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXJnKTtcbiAgfVxuICByZXR1cm4gb2JqZWN0VG9TdHJpbmcoYXJnKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cbmV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG5cbmZ1bmN0aW9uIGlzQm9vbGVhbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJztcbn1cbmV4cG9ydHMuaXNCb29sZWFuID0gaXNCb29sZWFuO1xuXG5mdW5jdGlvbiBpc051bGwoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGw7XG59XG5leHBvcnRzLmlzTnVsbCA9IGlzTnVsbDtcblxuZnVuY3Rpb24gaXNOdWxsT3JVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsT3JVbmRlZmluZWQgPSBpc051bGxPclVuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cbmV4cG9ydHMuaXNOdW1iZXIgPSBpc051bWJlcjtcblxuZnVuY3Rpb24gaXNTdHJpbmcoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3RyaW5nJztcbn1cbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcblxuZnVuY3Rpb24gaXNTeW1ib2woYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3ltYm9sJztcbn1cbmV4cG9ydHMuaXNTeW1ib2wgPSBpc1N5bWJvbDtcblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNSZWdFeHAocmUpIHtcbiAgcmV0dXJuIG9iamVjdFRvU3RyaW5nKHJlKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59XG5leHBvcnRzLmlzUmVnRXhwID0gaXNSZWdFeHA7XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuXG5mdW5jdGlvbiBpc0RhdGUoZCkge1xuICByZXR1cm4gb2JqZWN0VG9TdHJpbmcoZCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cbmV4cG9ydHMuaXNEYXRlID0gaXNEYXRlO1xuXG5mdW5jdGlvbiBpc0Vycm9yKGUpIHtcbiAgcmV0dXJuIChvYmplY3RUb1N0cmluZyhlKSA9PT0gJ1tvYmplY3QgRXJyb3JdJyB8fCBlIGluc3RhbmNlb2YgRXJyb3IpO1xufVxuZXhwb3J0cy5pc0Vycm9yID0gaXNFcnJvcjtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5leHBvcnRzLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuXG5mdW5jdGlvbiBpc1ByaW1pdGl2ZShhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbCB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnbnVtYmVyJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3N0cmluZycgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnIHx8ICAvLyBFUzYgc3ltYm9sXG4gICAgICAgICB0eXBlb2YgYXJnID09PSAndW5kZWZpbmVkJztcbn1cbmV4cG9ydHMuaXNQcmltaXRpdmUgPSBpc1ByaW1pdGl2ZTtcblxuZXhwb3J0cy5pc0J1ZmZlciA9IEJ1ZmZlci5pc0J1ZmZlcjtcblxuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcobykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pO1xufVxuIl19
},{"../../is-buffer/index.js":"C:\\dev\\NEXUS\\node_modules\\is-buffer\\index.js"}],"C:\\dev\\NEXUS\\node_modules\\events\\events.js":[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],"C:\\dev\\NEXUS\\node_modules\\handlebars\\dist\\cjs\\handlebars.runtime.js":[function(require,module,exports){
"use strict";
/*globals Handlebars: true */
var base = require("./handlebars/base");

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)
var SafeString = require("./handlebars/safe-string")["default"];
var Exception = require("./handlebars/exception")["default"];
var Utils = require("./handlebars/utils");
var runtime = require("./handlebars/runtime");

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
var create = function() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = SafeString;
  hb.Exception = Exception;
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;

  hb.VM = runtime;
  hb.template = function(spec) {
    return runtime.template(spec, hb);
  };

  return hb;
};

var Handlebars = create();
Handlebars.create = create;

Handlebars['default'] = Handlebars;

exports["default"] = Handlebars;
},{"./handlebars/base":"C:\\dev\\NEXUS\\node_modules\\handlebars\\dist\\cjs\\handlebars\\base.js","./handlebars/exception":"C:\\dev\\NEXUS\\node_modules\\handlebars\\dist\\cjs\\handlebars\\exception.js","./handlebars/runtime":"C:\\dev\\NEXUS\\node_modules\\handlebars\\dist\\cjs\\handlebars\\runtime.js","./handlebars/safe-string":"C:\\dev\\NEXUS\\node_modules\\handlebars\\dist\\cjs\\handlebars\\safe-string.js","./handlebars/utils":"C:\\dev\\NEXUS\\node_modules\\handlebars\\dist\\cjs\\handlebars\\utils.js"}],"C:\\dev\\NEXUS\\node_modules\\handlebars\\dist\\cjs\\handlebars\\base.js":[function(require,module,exports){
"use strict";
var Utils = require("./utils");
var Exception = require("./exception")["default"];

var VERSION = "2.0.0";
exports.VERSION = VERSION;var COMPILER_REVISION = 6;
exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1'
};
exports.REVISION_CHANGES = REVISION_CHANGES;
var isArray = Utils.isArray,
    isFunction = Utils.isFunction,
    toString = Utils.toString,
    objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials) {
  this.helpers = helpers || {};
  this.partials = partials || {};

  registerDefaultHelpers(this);
}

exports.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: logger,
  log: log,

  registerHelper: function(name, fn) {
    if (toString.call(name) === objectType) {
      if (fn) { throw new Exception('Arg not supported with multiple helpers'); }
      Utils.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function(name) {
    delete this.helpers[name];
  },

  registerPartial: function(name, partial) {
    if (toString.call(name) === objectType) {
      Utils.extend(this.partials,  name);
    } else {
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function(name) {
    delete this.partials[name];
  }
};

function registerDefaultHelpers(instance) {
  instance.registerHelper('helperMissing', function(/* [args, ]options */) {
    if(arguments.length === 1) {
      // A missing field in a {{foo}} constuct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new Exception("Missing helper: '" + arguments[arguments.length-1].name + "'");
    }
  });

  instance.registerHelper('blockHelperMissing', function(context, options) {
    var inverse = options.inverse,
        fn = options.fn;

    if(context === true) {
      return fn(this);
    } else if(context === false || context == null) {
      return inverse(this);
    } else if (isArray(context)) {
      if(context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }

        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        var data = createFrame(options.data);
        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.name);
        options = {data: data};
      }

      return fn(context, options);
    }
  });

  instance.registerHelper('each', function(context, options) {
    if (!options) {
      throw new Exception('Must pass iterator to #each');
    }

    var fn = options.fn, inverse = options.inverse;
    var i = 0, ret = "", data;

    var contextPath;
    if (options.data && options.ids) {
      contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (isFunction(context)) { context = context.call(this); }

    if (options.data) {
      data = createFrame(options.data);
    }

    if(context && typeof context === 'object') {
      if (isArray(context)) {
        for(var j = context.length; i<j; i++) {
          if (data) {
            data.index = i;
            data.first = (i === 0);
            data.last  = (i === (context.length-1));

            if (contextPath) {
              data.contextPath = contextPath + i;
            }
          }
          ret = ret + fn(context[i], { data: data });
        }
      } else {
        for(var key in context) {
          if(context.hasOwnProperty(key)) {
            if(data) {
              data.key = key;
              data.index = i;
              data.first = (i === 0);

              if (contextPath) {
                data.contextPath = contextPath + key;
              }
            }
            ret = ret + fn(context[key], {data: data});
            i++;
          }
        }
      }
    }

    if(i === 0){
      ret = inverse(this);
    }

    return ret;
  });

  instance.registerHelper('if', function(conditional, options) {
    if (isFunction(conditional)) { conditional = conditional.call(this); }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function(conditional, options) {
    return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
  });

  instance.registerHelper('with', function(context, options) {
    if (isFunction(context)) { context = context.call(this); }

    var fn = options.fn;

    if (!Utils.isEmpty(context)) {
      if (options.data && options.ids) {
        var data = createFrame(options.data);
        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]);
        options = {data:data};
      }

      return fn(context, options);
    } else {
      return options.inverse(this);
    }
  });

  instance.registerHelper('log', function(message, options) {
    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
    instance.log(level, message);
  });

  instance.registerHelper('lookup', function(obj, field) {
    return obj && obj[field];
  });
}

var logger = {
  methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

  // State enum
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  level: 3,

  // can be overridden in the host environment
  log: function(level, message) {
    if (logger.level <= level) {
      var method = logger.methodMap[level];
      if (typeof console !== 'undefined' && console[method]) {
        console[method].call(console, message);
      }
    }
  }
};
exports.logger = logger;
var log = logger.log;
exports.log = log;
var createFrame = function(object) {
  var frame = Utils.extend({}, object);
  frame._parent = object;
  return frame;
};
exports.createFrame = createFrame;
},{"./exception":"C:\\dev\\NEXUS\\node_modules\\handlebars\\dist\\cjs\\handlebars\\exception.js","./utils":"C:\\dev\\NEXUS\\node_modules\\handlebars\\dist\\cjs\\handlebars\\utils.js"}],"C:\\dev\\NEXUS\\node_modules\\handlebars\\dist\\cjs\\handlebars\\exception.js":[function(require,module,exports){
"use strict";

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var line;
  if (node && node.firstLine) {
    line = node.firstLine;

    message += ' - ' + line + ':' + node.firstColumn;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  if (line) {
    this.lineNumber = line;
    this.column = node.firstColumn;
  }
}

Exception.prototype = new Error();

exports["default"] = Exception;
},{}],"C:\\dev\\NEXUS\\node_modules\\handlebars\\dist\\cjs\\handlebars\\runtime.js":[function(require,module,exports){
"use strict";
var Utils = require("./utils");
var Exception = require("./exception")["default"];
var COMPILER_REVISION = require("./base").COMPILER_REVISION;
var REVISION_CHANGES = require("./base").REVISION_CHANGES;
var createFrame = require("./base").createFrame;

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = REVISION_CHANGES[currentRevision],
          compilerVersions = REVISION_CHANGES[compilerRevision];
      throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. "+
            "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. "+
            "Please update your runtime to a newer version ("+compilerInfo[1]+").");
    }
  }
}

exports.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial

function template(templateSpec, env) {
  /* istanbul ignore next */
  if (!env) {
    throw new Exception("No environment passed to template");
  }
  if (!templateSpec || !templateSpec.main) {
    throw new Exception('Unknown template object: ' + typeof templateSpec);
  }

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  var invokePartialWrapper = function(partial, indent, name, context, hash, helpers, partials, data, depths) {
    if (hash) {
      context = Utils.extend({}, context, hash);
    }

    var result = env.VM.invokePartial.call(this, partial, name, context, helpers, partials, data, depths);

    if (result == null && env.compile) {
      var options = { helpers: helpers, partials: partials, data: data, depths: depths };
      partials[name] = env.compile(partial, { data: data !== undefined, compat: templateSpec.compat }, env);
      result = partials[name](context, options);
    }
    if (result != null) {
      if (indent) {
        var lines = result.split('\n');
        for (var i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }

          lines[i] = indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
    }
  };

  // Just add water
  var container = {
    lookup: function(depths, name) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        if (depths[i] && depths[i][name] != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },

    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,

    fn: function(i) {
      return templateSpec[i];
    },

    programs: [],
    program: function(i, data, depths) {
      var programWrapper = this.programs[i],
          fn = this.fn(i);
      if (data || depths) {
        programWrapper = program(this, i, fn, data, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = program(this, i, fn);
      }
      return programWrapper;
    },

    data: function(data, depth) {
      while (data && depth--) {
        data = data._parent;
      }
      return data;
    },
    merge: function(param, common) {
      var ret = param || common;

      if (param && common && (param !== common)) {
        ret = Utils.extend({}, common, param);
      }

      return ret;
    },

    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };

  var ret = function(context, options) {
    options = options || {};
    var data = options.data;

    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    var depths;
    if (templateSpec.useDepths) {
      depths = options.depths ? [context].concat(options.depths) : [context];
    }

    return templateSpec.main.call(container, context, container.helpers, container.partials, data, depths);
  };
  ret.isTop = true;

  ret._setup = function(options) {
    if (!options.partial) {
      container.helpers = container.merge(options.helpers, env.helpers);

      if (templateSpec.usePartial) {
        container.partials = container.merge(options.partials, env.partials);
      }
    } else {
      container.helpers = options.helpers;
      container.partials = options.partials;
    }
  };

  ret._child = function(i, data, depths) {
    if (templateSpec.useDepths && !depths) {
      throw new Exception('must pass parent depths');
    }

    return program(container, i, templateSpec[i], data, depths);
  };
  return ret;
}

exports.template = template;function program(container, i, fn, data, depths) {
  var prog = function(context, options) {
    options = options || {};

    return fn.call(container, context, container.helpers, container.partials, options.data || data, depths && [context].concat(depths));
  };
  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  return prog;
}

exports.program = program;function invokePartial(partial, name, context, helpers, partials, data, depths) {
  var options = { partial: true, helpers: helpers, partials: partials, data: data, depths: depths };

  if(partial === undefined) {
    throw new Exception("The partial " + name + " could not be found");
  } else if(partial instanceof Function) {
    return partial(context, options);
  }
}

exports.invokePartial = invokePartial;function noop() { return ""; }

exports.noop = noop;function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? createFrame(data) : {};
    data.root = context;
  }
  return data;
}
},{"./base":"C:\\dev\\NEXUS\\node_modules\\handlebars\\dist\\cjs\\handlebars\\base.js","./exception":"C:\\dev\\NEXUS\\node_modules\\handlebars\\dist\\cjs\\handlebars\\exception.js","./utils":"C:\\dev\\NEXUS\\node_modules\\handlebars\\dist\\cjs\\handlebars\\utils.js"}],"C:\\dev\\NEXUS\\node_modules\\handlebars\\dist\\cjs\\handlebars\\safe-string.js":[function(require,module,exports){
"use strict";
// Build out our basic SafeString type
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = function() {
  return "" + this.string;
};

exports["default"] = SafeString;
},{}],"C:\\dev\\NEXUS\\node_modules\\handlebars\\dist\\cjs\\handlebars\\utils.js":[function(require,module,exports){
"use strict";
/*jshint -W004 */
var SafeString = require("./safe-string")["default"];

var escape = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};

var badChars = /[&<>"'`]/g;
var possible = /[&<>"'`]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

exports.extend = extend;var toString = Object.prototype.toString;
exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
var isFunction = function(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  isFunction = function(value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
var isFunction;
exports.isFunction = isFunction;
/* istanbul ignore next */
var isArray = Array.isArray || function(value) {
  return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
};
exports.isArray = isArray;

function escapeExpression(string) {
  // don't escape SafeStrings, since they're already safe
  if (string instanceof SafeString) {
    return string.toString();
  } else if (string == null) {
    return "";
  } else if (!string) {
    return string + '';
  }

  // Force a string conversion as this will be done by the append regardless and
  // the regex test will do this transparently behind the scenes, causing issues if
  // an object's to string has escaped characters in it.
  string = "" + string;

  if(!possible.test(string)) { return string; }
  return string.replace(badChars, escapeChar);
}

exports.escapeExpression = escapeExpression;function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.isEmpty = isEmpty;function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}

exports.appendContextPath = appendContextPath;
},{"./safe-string":"C:\\dev\\NEXUS\\node_modules\\handlebars\\dist\\cjs\\handlebars\\safe-string.js"}],"C:\\dev\\NEXUS\\node_modules\\handlebars\\runtime.js":[function(require,module,exports){
// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = require('./dist/cjs/handlebars.runtime');

},{"./dist/cjs/handlebars.runtime":"C:\\dev\\NEXUS\\node_modules\\handlebars\\dist\\cjs\\handlebars.runtime.js"}],"C:\\dev\\NEXUS\\node_modules\\hbsfy\\runtime.js":[function(require,module,exports){
module.exports = require("handlebars/runtime")["default"];

},{"handlebars/runtime":"C:\\dev\\NEXUS\\node_modules\\handlebars\\runtime.js"}],"C:\\dev\\NEXUS\\node_modules\\ieee754\\index.js":[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],"C:\\dev\\NEXUS\\node_modules\\inherits\\inherits_browser.js":[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],"C:\\dev\\NEXUS\\node_modules\\is-array\\index.js":[function(require,module,exports){

/**
 * isArray
 */

var isArray = Array.isArray;

/**
 * toString
 */

var str = Object.prototype.toString;

/**
 * Whether or not the given `val`
 * is an array.
 *
 * example:
 *
 *        isArray([]);
 *        // > true
 *        isArray(arguments);
 *        // > false
 *        isArray('');
 *        // > false
 *
 * @param {mixed} val
 * @return {bool}
 */

module.exports = isArray || function (val) {
  return !! val && '[object Array]' == str.call(val);
};

},{}],"C:\\dev\\NEXUS\\node_modules\\is-buffer\\index.js":[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],"C:\\dev\\NEXUS\\node_modules\\isarray\\index.js":[function(require,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}],"C:\\dev\\NEXUS\\node_modules\\process\\browser.js":[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],"C:\\dev\\NEXUS\\node_modules\\readable-stream\\duplex.js":[function(require,module,exports){
module.exports = require("./lib/_stream_duplex.js")

},{"./lib/_stream_duplex.js":"C:\\dev\\NEXUS\\node_modules\\readable-stream\\lib\\_stream_duplex.js"}],"C:\\dev\\NEXUS\\node_modules\\readable-stream\\lib\\_stream_duplex.js":[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

module.exports = Duplex;

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}
/*</replacement>*/


/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var Readable = require('./_stream_readable');
var Writable = require('./_stream_writable');

util.inherits(Duplex, Readable);

forEach(objectKeys(Writable.prototype), function(method) {
  if (!Duplex.prototype[method])
    Duplex.prototype[method] = Writable.prototype[method];
});

function Duplex(options) {
  if (!(this instanceof Duplex))
    return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false)
    this.readable = false;

  if (options && options.writable === false)
    this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false)
    this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended)
    return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  process.nextTick(this.end.bind(this));
}

function forEach (xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

}).call(this,require('_process'))
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbGliL19zdHJlYW1fZHVwbGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4vLyBhIGR1cGxleCBzdHJlYW0gaXMganVzdCBhIHN0cmVhbSB0aGF0IGlzIGJvdGggcmVhZGFibGUgYW5kIHdyaXRhYmxlLlxuLy8gU2luY2UgSlMgZG9lc24ndCBoYXZlIG11bHRpcGxlIHByb3RvdHlwYWwgaW5oZXJpdGFuY2UsIHRoaXMgY2xhc3Ncbi8vIHByb3RvdHlwYWxseSBpbmhlcml0cyBmcm9tIFJlYWRhYmxlLCBhbmQgdGhlbiBwYXJhc2l0aWNhbGx5IGZyb21cbi8vIFdyaXRhYmxlLlxuXG5tb2R1bGUuZXhwb3J0cyA9IER1cGxleDtcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciBvYmplY3RLZXlzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24gKG9iaikge1xuICB2YXIga2V5cyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSBrZXlzLnB1c2goa2V5KTtcbiAgcmV0dXJuIGtleXM7XG59XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIHV0aWwgPSByZXF1aXJlKCdjb3JlLXV0aWwtaXMnKTtcbnV0aWwuaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbnZhciBSZWFkYWJsZSA9IHJlcXVpcmUoJy4vX3N0cmVhbV9yZWFkYWJsZScpO1xudmFyIFdyaXRhYmxlID0gcmVxdWlyZSgnLi9fc3RyZWFtX3dyaXRhYmxlJyk7XG5cbnV0aWwuaW5oZXJpdHMoRHVwbGV4LCBSZWFkYWJsZSk7XG5cbmZvckVhY2gob2JqZWN0S2V5cyhXcml0YWJsZS5wcm90b3R5cGUpLCBmdW5jdGlvbihtZXRob2QpIHtcbiAgaWYgKCFEdXBsZXgucHJvdG90eXBlW21ldGhvZF0pXG4gICAgRHVwbGV4LnByb3RvdHlwZVttZXRob2RdID0gV3JpdGFibGUucHJvdG90eXBlW21ldGhvZF07XG59KTtcblxuZnVuY3Rpb24gRHVwbGV4KG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIER1cGxleCkpXG4gICAgcmV0dXJuIG5ldyBEdXBsZXgob3B0aW9ucyk7XG5cbiAgUmVhZGFibGUuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgV3JpdGFibGUuY2FsbCh0aGlzLCBvcHRpb25zKTtcblxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnJlYWRhYmxlID09PSBmYWxzZSlcbiAgICB0aGlzLnJlYWRhYmxlID0gZmFsc2U7XG5cbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy53cml0YWJsZSA9PT0gZmFsc2UpXG4gICAgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuXG4gIHRoaXMuYWxsb3dIYWxmT3BlbiA9IHRydWU7XG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuYWxsb3dIYWxmT3BlbiA9PT0gZmFsc2UpXG4gICAgdGhpcy5hbGxvd0hhbGZPcGVuID0gZmFsc2U7XG5cbiAgdGhpcy5vbmNlKCdlbmQnLCBvbmVuZCk7XG59XG5cbi8vIHRoZSBuby1oYWxmLW9wZW4gZW5mb3JjZXJcbmZ1bmN0aW9uIG9uZW5kKCkge1xuICAvLyBpZiB3ZSBhbGxvdyBoYWxmLW9wZW4gc3RhdGUsIG9yIGlmIHRoZSB3cml0YWJsZSBzaWRlIGVuZGVkLFxuICAvLyB0aGVuIHdlJ3JlIG9rLlxuICBpZiAodGhpcy5hbGxvd0hhbGZPcGVuIHx8IHRoaXMuX3dyaXRhYmxlU3RhdGUuZW5kZWQpXG4gICAgcmV0dXJuO1xuXG4gIC8vIG5vIG1vcmUgZGF0YSBjYW4gYmUgd3JpdHRlbi5cbiAgLy8gQnV0IGFsbG93IG1vcmUgd3JpdGVzIHRvIGhhcHBlbiBpbiB0aGlzIHRpY2suXG4gIHByb2Nlc3MubmV4dFRpY2sodGhpcy5lbmQuYmluZCh0aGlzKSk7XG59XG5cbmZ1bmN0aW9uIGZvckVhY2ggKHhzLCBmKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsID0geHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZih4c1tpXSwgaSk7XG4gIH1cbn1cbiJdfQ==
},{"./_stream_readable":"C:\\dev\\NEXUS\\node_modules\\readable-stream\\lib\\_stream_readable.js","./_stream_writable":"C:\\dev\\NEXUS\\node_modules\\readable-stream\\lib\\_stream_writable.js","_process":"C:\\dev\\NEXUS\\node_modules\\process\\browser.js","core-util-is":"C:\\dev\\NEXUS\\node_modules\\core-util-is\\lib\\util.js","inherits":"C:\\dev\\NEXUS\\node_modules\\inherits\\inherits_browser.js"}],"C:\\dev\\NEXUS\\node_modules\\readable-stream\\lib\\_stream_passthrough.js":[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

module.exports = PassThrough;

var Transform = require('./_stream_transform');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough))
    return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function(chunk, encoding, cb) {
  cb(null, chunk);
};

},{"./_stream_transform":"C:\\dev\\NEXUS\\node_modules\\readable-stream\\lib\\_stream_transform.js","core-util-is":"C:\\dev\\NEXUS\\node_modules\\core-util-is\\lib\\util.js","inherits":"C:\\dev\\NEXUS\\node_modules\\inherits\\inherits_browser.js"}],"C:\\dev\\NEXUS\\node_modules\\readable-stream\\lib\\_stream_readable.js":[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Readable;

/*<replacement>*/
var isArray = require('isarray');
/*</replacement>*/


/*<replacement>*/
var Buffer = require('buffer').Buffer;
/*</replacement>*/

Readable.ReadableState = ReadableState;

var EE = require('events').EventEmitter;

/*<replacement>*/
if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

var Stream = require('stream');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var StringDecoder;


/*<replacement>*/
var debug = require('util');
if (debug && debug.debuglog) {
  debug = debug.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/


util.inherits(Readable, Stream);

function ReadableState(options, stream) {
  var Duplex = require('./_stream_duplex');

  options = options || {};

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  this.buffer = [];
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;


  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex)
    this.objectMode = this.objectMode || !!options.readableObjectMode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // when piping, we only care about 'readable' events that happen
  // after read()ing all the bytes and not getting any pushback.
  this.ranOut = false;

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder)
      StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  var Duplex = require('./_stream_duplex');

  if (!(this instanceof Readable))
    return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  Stream.call(this);
}

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function(chunk, encoding) {
  var state = this._readableState;

  if (util.isString(chunk) && !state.objectMode) {
    encoding = encoding || state.defaultEncoding;
    if (encoding !== state.encoding) {
      chunk = new Buffer(chunk, encoding);
      encoding = '';
    }
  }

  return readableAddChunk(this, state, chunk, encoding, false);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function(chunk) {
  var state = this._readableState;
  return readableAddChunk(this, state, chunk, '', true);
};

function readableAddChunk(stream, state, chunk, encoding, addToFront) {
  var er = chunkInvalid(state, chunk);
  if (er) {
    stream.emit('error', er);
  } else if (util.isNullOrUndefined(chunk)) {
    state.reading = false;
    if (!state.ended)
      onEofChunk(stream, state);
  } else if (state.objectMode || chunk && chunk.length > 0) {
    if (state.ended && !addToFront) {
      var e = new Error('stream.push() after EOF');
      stream.emit('error', e);
    } else if (state.endEmitted && addToFront) {
      var e = new Error('stream.unshift() after end event');
      stream.emit('error', e);
    } else {
      if (state.decoder && !addToFront && !encoding)
        chunk = state.decoder.write(chunk);

      if (!addToFront)
        state.reading = false;

      // if we want the data now, just emit it.
      if (state.flowing && state.length === 0 && !state.sync) {
        stream.emit('data', chunk);
        stream.read(0);
      } else {
        // update the buffer info.
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront)
          state.buffer.unshift(chunk);
        else
          state.buffer.push(chunk);

        if (state.needReadable)
          emitReadable(stream);
      }

      maybeReadMore(stream, state);
    }
  } else if (!addToFront) {
    state.reading = false;
  }

  return needMoreData(state);
}



// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended &&
         (state.needReadable ||
          state.length < state.highWaterMark ||
          state.length === 0);
}

// backwards compatibility.
Readable.prototype.setEncoding = function(enc) {
  if (!StringDecoder)
    StringDecoder = require('string_decoder/').StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 128MB
var MAX_HWM = 0x800000;
function roundUpToNextPowerOf2(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2
    n--;
    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
    n++;
  }
  return n;
}

function howMuchToRead(n, state) {
  if (state.length === 0 && state.ended)
    return 0;

  if (state.objectMode)
    return n === 0 ? 0 : 1;

  if (isNaN(n) || util.isNull(n)) {
    // only flow one buffer at a time
    if (state.flowing && state.buffer.length)
      return state.buffer[0].length;
    else
      return state.length;
  }

  if (n <= 0)
    return 0;

  // If we're asking for more than the target buffer level,
  // then raise the water mark.  Bump up to the next highest
  // power of 2, to prevent increasing it excessively in tiny
  // amounts.
  if (n > state.highWaterMark)
    state.highWaterMark = roundUpToNextPowerOf2(n);

  // don't have that much.  return null, unless we've ended.
  if (n > state.length) {
    if (!state.ended) {
      state.needReadable = true;
      return 0;
    } else
      return state.length;
  }

  return n;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function(n) {
  debug('read', n);
  var state = this._readableState;
  var nOrig = n;

  if (!util.isNumber(n) || n > 0)
    state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 &&
      state.needReadable &&
      (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended)
      endReadable(this);
    else
      emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0)
      endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  }

  if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0)
      state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
  }

  // If _read pushed data synchronously, then `reading` will be false,
  // and we need to re-evaluate how much data we can return to the user.
  if (doRead && !state.reading)
    n = howMuchToRead(nOrig, state);

  var ret;
  if (n > 0)
    ret = fromList(n, state);
  else
    ret = null;

  if (util.isNull(ret)) {
    state.needReadable = true;
    n = 0;
  }

  state.length -= n;

  // If we have nothing in the buffer, then we want to know
  // as soon as we *do* get something into the buffer.
  if (state.length === 0 && !state.ended)
    state.needReadable = true;

  // If we tried to read() past the EOF, then emit end on the next tick.
  if (nOrig !== n && state.ended && state.length === 0)
    endReadable(this);

  if (!util.isNull(ret))
    this.emit('data', ret);

  return ret;
};

function chunkInvalid(state, chunk) {
  var er = null;
  if (!util.isBuffer(chunk) &&
      !util.isString(chunk) &&
      !util.isNullOrUndefined(chunk) &&
      !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}


function onEofChunk(stream, state) {
  if (state.decoder && !state.ended) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync)
      process.nextTick(function() {
        emitReadable_(stream);
      });
    else
      emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}


// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    process.nextTick(function() {
      maybeReadMore_(stream, state);
    });
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended &&
         state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;
    else
      len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function(n) {
  this.emit('error', new Error('not implemented'));
};

Readable.prototype.pipe = function(dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
              dest !== process.stdout &&
              dest !== process.stderr;

  var endFn = doEnd ? onend : cleanup;
  if (state.endEmitted)
    process.nextTick(endFn);
  else
    src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable) {
    debug('onunpipe');
    if (readable === src) {
      cleanup();
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', cleanup);
    src.removeListener('data', ondata);

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain &&
        (!dest._writableState || dest._writableState.needDrain))
      ondrain();
  }

  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    var ret = dest.write(chunk);
    if (false === ret) {
      debug('false write response, pause',
            src._readableState.awaitDrain);
      src._readableState.awaitDrain++;
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EE.listenerCount(dest, 'error') === 0)
      dest.emit('error', er);
  }
  // This is a brutally ugly hack to make sure that our error handler
  // is attached before any userland ones.  NEVER DO THIS.
  if (!dest._events || !dest._events.error)
    dest.on('error', onerror);
  else if (isArray(dest._events.error))
    dest._events.error.unshift(onerror);
  else
    dest._events.error = [onerror, dest._events.error];



  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function() {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain)
      state.awaitDrain--;
    if (state.awaitDrain === 0 && EE.listenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}


Readable.prototype.unpipe = function(dest) {
  var state = this._readableState;

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0)
    return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes)
      return this;

    if (!dest)
      dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest)
      dest.emit('unpipe', this);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++)
      dests[i].emit('unpipe', this);
    return this;
  }

  // try to find the right one.
  var i = indexOf(state.pipes, dest);
  if (i === -1)
    return this;

  state.pipes.splice(i, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1)
    state.pipes = state.pipes[0];

  dest.emit('unpipe', this);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function(ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  // If listening to data, and it has not explicitly been paused,
  // then call resume to start the flow of data on the next tick.
  if (ev === 'data' && false !== this._readableState.flowing) {
    this.resume();
  }

  if (ev === 'readable' && this.readable) {
    var state = this._readableState;
    if (!state.readableListening) {
      state.readableListening = true;
      state.emittedReadable = false;
      state.needReadable = true;
      if (!state.reading) {
        var self = this;
        process.nextTick(function() {
          debug('readable nexttick read 0');
          self.read(0);
        });
      } else if (state.length) {
        emitReadable(this, state);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function() {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    if (!state.reading) {
      debug('resume read 0');
      this.read(0);
    }
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    process.nextTick(function() {
      resume_(stream, state);
    });
  }
}

function resume_(stream, state) {
  state.resumeScheduled = false;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading)
    stream.read(0);
}

Readable.prototype.pause = function() {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  if (state.flowing) {
    do {
      var chunk = stream.read();
    } while (null !== chunk && state.flowing);
  }
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function(stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function() {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length)
        self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function(chunk) {
    debug('wrapped data');
    if (state.decoder)
      chunk = state.decoder.write(chunk);
    if (!chunk || !state.objectMode && !chunk.length)
      return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (util.isFunction(stream[i]) && util.isUndefined(this[i])) {
      this[i] = function(method) { return function() {
        return stream[method].apply(stream, arguments);
      }}(i);
    }
  }

  // proxy certain important events.
  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
  forEach(events, function(ev) {
    stream.on(ev, self.emit.bind(self, ev));
  });

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function(n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};



// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
function fromList(n, state) {
  var list = state.buffer;
  var length = state.length;
  var stringMode = !!state.decoder;
  var objectMode = !!state.objectMode;
  var ret;

  // nothing in the list, definitely empty.
  if (list.length === 0)
    return null;

  if (length === 0)
    ret = null;
  else if (objectMode)
    ret = list.shift();
  else if (!n || n >= length) {
    // read it all, truncate the array.
    if (stringMode)
      ret = list.join('');
    else
      ret = Buffer.concat(list, length);
    list.length = 0;
  } else {
    // read just some of it.
    if (n < list[0].length) {
      // just take a part of the first list item.
      // slice is the same for buffers and strings.
      var buf = list[0];
      ret = buf.slice(0, n);
      list[0] = buf.slice(n);
    } else if (n === list[0].length) {
      // first list is a perfect match
      ret = list.shift();
    } else {
      // complex case.
      // we have enough to cover it, but it spans past the first buffer.
      if (stringMode)
        ret = '';
      else
        ret = new Buffer(n);

      var c = 0;
      for (var i = 0, l = list.length; i < l && c < n; i++) {
        var buf = list[0];
        var cpy = Math.min(n - c, buf.length);

        if (stringMode)
          ret += buf.slice(0, cpy);
        else
          buf.copy(ret, c, 0, cpy);

        if (cpy < buf.length)
          list[0] = buf.slice(cpy);
        else
          list.shift();

        c += cpy;
      }
    }
  }

  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0)
    throw new Error('endReadable called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    process.nextTick(function() {
      // Check that we didn't get one last unshift.
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit('end');
      }
    });
  }
}

function forEach (xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf (xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}

}).call(this,require('_process'))
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbGliL19zdHJlYW1fcmVhZGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFkYWJsZTtcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciBCdWZmZXIgPSByZXF1aXJlKCdidWZmZXInKS5CdWZmZXI7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxuUmVhZGFibGUuUmVhZGFibGVTdGF0ZSA9IFJlYWRhYmxlU3RhdGU7XG5cbnZhciBFRSA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbmlmICghRUUubGlzdGVuZXJDb3VudCkgRUUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJzKHR5cGUpLmxlbmd0aDtcbn07XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxudmFyIFN0cmVhbSA9IHJlcXVpcmUoJ3N0cmVhbScpO1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIHV0aWwgPSByZXF1aXJlKCdjb3JlLXV0aWwtaXMnKTtcbnV0aWwuaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbnZhciBTdHJpbmdEZWNvZGVyO1xuXG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgZGVidWcgPSByZXF1aXJlKCd1dGlsJyk7XG5pZiAoZGVidWcgJiYgZGVidWcuZGVidWdsb2cpIHtcbiAgZGVidWcgPSBkZWJ1Zy5kZWJ1Z2xvZygnc3RyZWFtJyk7XG59IGVsc2Uge1xuICBkZWJ1ZyA9IGZ1bmN0aW9uICgpIHt9O1xufVxuLyo8L3JlcGxhY2VtZW50PiovXG5cblxudXRpbC5pbmhlcml0cyhSZWFkYWJsZSwgU3RyZWFtKTtcblxuZnVuY3Rpb24gUmVhZGFibGVTdGF0ZShvcHRpb25zLCBzdHJlYW0pIHtcbiAgdmFyIER1cGxleCA9IHJlcXVpcmUoJy4vX3N0cmVhbV9kdXBsZXgnKTtcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAvLyB0aGUgcG9pbnQgYXQgd2hpY2ggaXQgc3RvcHMgY2FsbGluZyBfcmVhZCgpIHRvIGZpbGwgdGhlIGJ1ZmZlclxuICAvLyBOb3RlOiAwIGlzIGEgdmFsaWQgdmFsdWUsIG1lYW5zIFwiZG9uJ3QgY2FsbCBfcmVhZCBwcmVlbXB0aXZlbHkgZXZlclwiXG4gIHZhciBod20gPSBvcHRpb25zLmhpZ2hXYXRlck1hcms7XG4gIHZhciBkZWZhdWx0SHdtID0gb3B0aW9ucy5vYmplY3RNb2RlID8gMTYgOiAxNiAqIDEwMjQ7XG4gIHRoaXMuaGlnaFdhdGVyTWFyayA9IChod20gfHwgaHdtID09PSAwKSA/IGh3bSA6IGRlZmF1bHRId207XG5cbiAgLy8gY2FzdCB0byBpbnRzLlxuICB0aGlzLmhpZ2hXYXRlck1hcmsgPSB+fnRoaXMuaGlnaFdhdGVyTWFyaztcblxuICB0aGlzLmJ1ZmZlciA9IFtdO1xuICB0aGlzLmxlbmd0aCA9IDA7XG4gIHRoaXMucGlwZXMgPSBudWxsO1xuICB0aGlzLnBpcGVzQ291bnQgPSAwO1xuICB0aGlzLmZsb3dpbmcgPSBudWxsO1xuICB0aGlzLmVuZGVkID0gZmFsc2U7XG4gIHRoaXMuZW5kRW1pdHRlZCA9IGZhbHNlO1xuICB0aGlzLnJlYWRpbmcgPSBmYWxzZTtcblxuICAvLyBhIGZsYWcgdG8gYmUgYWJsZSB0byB0ZWxsIGlmIHRoZSBvbndyaXRlIGNiIGlzIGNhbGxlZCBpbW1lZGlhdGVseSxcbiAgLy8gb3Igb24gYSBsYXRlciB0aWNrLiAgV2Ugc2V0IHRoaXMgdG8gdHJ1ZSBhdCBmaXJzdCwgYmVjYXVzZSBhbnlcbiAgLy8gYWN0aW9ucyB0aGF0IHNob3VsZG4ndCBoYXBwZW4gdW50aWwgXCJsYXRlclwiIHNob3VsZCBnZW5lcmFsbHkgYWxzb1xuICAvLyBub3QgaGFwcGVuIGJlZm9yZSB0aGUgZmlyc3Qgd3JpdGUgY2FsbC5cbiAgdGhpcy5zeW5jID0gdHJ1ZTtcblxuICAvLyB3aGVuZXZlciB3ZSByZXR1cm4gbnVsbCwgdGhlbiB3ZSBzZXQgYSBmbGFnIHRvIHNheVxuICAvLyB0aGF0IHdlJ3JlIGF3YWl0aW5nIGEgJ3JlYWRhYmxlJyBldmVudCBlbWlzc2lvbi5cbiAgdGhpcy5uZWVkUmVhZGFibGUgPSBmYWxzZTtcbiAgdGhpcy5lbWl0dGVkUmVhZGFibGUgPSBmYWxzZTtcbiAgdGhpcy5yZWFkYWJsZUxpc3RlbmluZyA9IGZhbHNlO1xuXG5cbiAgLy8gb2JqZWN0IHN0cmVhbSBmbGFnLiBVc2VkIHRvIG1ha2UgcmVhZChuKSBpZ25vcmUgbiBhbmQgdG9cbiAgLy8gbWFrZSBhbGwgdGhlIGJ1ZmZlciBtZXJnaW5nIGFuZCBsZW5ndGggY2hlY2tzIGdvIGF3YXlcbiAgdGhpcy5vYmplY3RNb2RlID0gISFvcHRpb25zLm9iamVjdE1vZGU7XG5cbiAgaWYgKHN0cmVhbSBpbnN0YW5jZW9mIER1cGxleClcbiAgICB0aGlzLm9iamVjdE1vZGUgPSB0aGlzLm9iamVjdE1vZGUgfHwgISFvcHRpb25zLnJlYWRhYmxlT2JqZWN0TW9kZTtcblxuICAvLyBDcnlwdG8gaXMga2luZCBvZiBvbGQgYW5kIGNydXN0eS4gIEhpc3RvcmljYWxseSwgaXRzIGRlZmF1bHQgc3RyaW5nXG4gIC8vIGVuY29kaW5nIGlzICdiaW5hcnknIHNvIHdlIGhhdmUgdG8gbWFrZSB0aGlzIGNvbmZpZ3VyYWJsZS5cbiAgLy8gRXZlcnl0aGluZyBlbHNlIGluIHRoZSB1bml2ZXJzZSB1c2VzICd1dGY4JywgdGhvdWdoLlxuICB0aGlzLmRlZmF1bHRFbmNvZGluZyA9IG9wdGlvbnMuZGVmYXVsdEVuY29kaW5nIHx8ICd1dGY4JztcblxuICAvLyB3aGVuIHBpcGluZywgd2Ugb25seSBjYXJlIGFib3V0ICdyZWFkYWJsZScgZXZlbnRzIHRoYXQgaGFwcGVuXG4gIC8vIGFmdGVyIHJlYWQoKWluZyBhbGwgdGhlIGJ5dGVzIGFuZCBub3QgZ2V0dGluZyBhbnkgcHVzaGJhY2suXG4gIHRoaXMucmFuT3V0ID0gZmFsc2U7XG5cbiAgLy8gdGhlIG51bWJlciBvZiB3cml0ZXJzIHRoYXQgYXJlIGF3YWl0aW5nIGEgZHJhaW4gZXZlbnQgaW4gLnBpcGUoKXNcbiAgdGhpcy5hd2FpdERyYWluID0gMDtcblxuICAvLyBpZiB0cnVlLCBhIG1heWJlUmVhZE1vcmUgaGFzIGJlZW4gc2NoZWR1bGVkXG4gIHRoaXMucmVhZGluZ01vcmUgPSBmYWxzZTtcblxuICB0aGlzLmRlY29kZXIgPSBudWxsO1xuICB0aGlzLmVuY29kaW5nID0gbnVsbDtcbiAgaWYgKG9wdGlvbnMuZW5jb2RpbmcpIHtcbiAgICBpZiAoIVN0cmluZ0RlY29kZXIpXG4gICAgICBTdHJpbmdEZWNvZGVyID0gcmVxdWlyZSgnc3RyaW5nX2RlY29kZXIvJykuU3RyaW5nRGVjb2RlcjtcbiAgICB0aGlzLmRlY29kZXIgPSBuZXcgU3RyaW5nRGVjb2RlcihvcHRpb25zLmVuY29kaW5nKTtcbiAgICB0aGlzLmVuY29kaW5nID0gb3B0aW9ucy5lbmNvZGluZztcbiAgfVxufVxuXG5mdW5jdGlvbiBSZWFkYWJsZShvcHRpb25zKSB7XG4gIHZhciBEdXBsZXggPSByZXF1aXJlKCcuL19zdHJlYW1fZHVwbGV4Jyk7XG5cbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlYWRhYmxlKSlcbiAgICByZXR1cm4gbmV3IFJlYWRhYmxlKG9wdGlvbnMpO1xuXG4gIHRoaXMuX3JlYWRhYmxlU3RhdGUgPSBuZXcgUmVhZGFibGVTdGF0ZShvcHRpb25zLCB0aGlzKTtcblxuICAvLyBsZWdhY3lcbiAgdGhpcy5yZWFkYWJsZSA9IHRydWU7XG5cbiAgU3RyZWFtLmNhbGwodGhpcyk7XG59XG5cbi8vIE1hbnVhbGx5IHNob3ZlIHNvbWV0aGluZyBpbnRvIHRoZSByZWFkKCkgYnVmZmVyLlxuLy8gVGhpcyByZXR1cm5zIHRydWUgaWYgdGhlIGhpZ2hXYXRlck1hcmsgaGFzIG5vdCBiZWVuIGhpdCB5ZXQsXG4vLyBzaW1pbGFyIHRvIGhvdyBXcml0YWJsZS53cml0ZSgpIHJldHVybnMgdHJ1ZSBpZiB5b3Ugc2hvdWxkXG4vLyB3cml0ZSgpIHNvbWUgbW9yZS5cblJlYWRhYmxlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oY2h1bmssIGVuY29kaW5nKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXMuX3JlYWRhYmxlU3RhdGU7XG5cbiAgaWYgKHV0aWwuaXNTdHJpbmcoY2h1bmspICYmICFzdGF0ZS5vYmplY3RNb2RlKSB7XG4gICAgZW5jb2RpbmcgPSBlbmNvZGluZyB8fCBzdGF0ZS5kZWZhdWx0RW5jb2Rpbmc7XG4gICAgaWYgKGVuY29kaW5nICE9PSBzdGF0ZS5lbmNvZGluZykge1xuICAgICAgY2h1bmsgPSBuZXcgQnVmZmVyKGNodW5rLCBlbmNvZGluZyk7XG4gICAgICBlbmNvZGluZyA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZWFkYWJsZUFkZENodW5rKHRoaXMsIHN0YXRlLCBjaHVuaywgZW5jb2RpbmcsIGZhbHNlKTtcbn07XG5cbi8vIFVuc2hpZnQgc2hvdWxkICphbHdheXMqIGJlIHNvbWV0aGluZyBkaXJlY3RseSBvdXQgb2YgcmVhZCgpXG5SZWFkYWJsZS5wcm90b3R5cGUudW5zaGlmdCA9IGZ1bmN0aW9uKGNodW5rKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXMuX3JlYWRhYmxlU3RhdGU7XG4gIHJldHVybiByZWFkYWJsZUFkZENodW5rKHRoaXMsIHN0YXRlLCBjaHVuaywgJycsIHRydWUpO1xufTtcblxuZnVuY3Rpb24gcmVhZGFibGVBZGRDaHVuayhzdHJlYW0sIHN0YXRlLCBjaHVuaywgZW5jb2RpbmcsIGFkZFRvRnJvbnQpIHtcbiAgdmFyIGVyID0gY2h1bmtJbnZhbGlkKHN0YXRlLCBjaHVuayk7XG4gIGlmIChlcikge1xuICAgIHN0cmVhbS5lbWl0KCdlcnJvcicsIGVyKTtcbiAgfSBlbHNlIGlmICh1dGlsLmlzTnVsbE9yVW5kZWZpbmVkKGNodW5rKSkge1xuICAgIHN0YXRlLnJlYWRpbmcgPSBmYWxzZTtcbiAgICBpZiAoIXN0YXRlLmVuZGVkKVxuICAgICAgb25Fb2ZDaHVuayhzdHJlYW0sIHN0YXRlKTtcbiAgfSBlbHNlIGlmIChzdGF0ZS5vYmplY3RNb2RlIHx8IGNodW5rICYmIGNodW5rLmxlbmd0aCA+IDApIHtcbiAgICBpZiAoc3RhdGUuZW5kZWQgJiYgIWFkZFRvRnJvbnQpIHtcbiAgICAgIHZhciBlID0gbmV3IEVycm9yKCdzdHJlYW0ucHVzaCgpIGFmdGVyIEVPRicpO1xuICAgICAgc3RyZWFtLmVtaXQoJ2Vycm9yJywgZSk7XG4gICAgfSBlbHNlIGlmIChzdGF0ZS5lbmRFbWl0dGVkICYmIGFkZFRvRnJvbnQpIHtcbiAgICAgIHZhciBlID0gbmV3IEVycm9yKCdzdHJlYW0udW5zaGlmdCgpIGFmdGVyIGVuZCBldmVudCcpO1xuICAgICAgc3RyZWFtLmVtaXQoJ2Vycm9yJywgZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzdGF0ZS5kZWNvZGVyICYmICFhZGRUb0Zyb250ICYmICFlbmNvZGluZylcbiAgICAgICAgY2h1bmsgPSBzdGF0ZS5kZWNvZGVyLndyaXRlKGNodW5rKTtcblxuICAgICAgaWYgKCFhZGRUb0Zyb250KVxuICAgICAgICBzdGF0ZS5yZWFkaW5nID0gZmFsc2U7XG5cbiAgICAgIC8vIGlmIHdlIHdhbnQgdGhlIGRhdGEgbm93LCBqdXN0IGVtaXQgaXQuXG4gICAgICBpZiAoc3RhdGUuZmxvd2luZyAmJiBzdGF0ZS5sZW5ndGggPT09IDAgJiYgIXN0YXRlLnN5bmMpIHtcbiAgICAgICAgc3RyZWFtLmVtaXQoJ2RhdGEnLCBjaHVuayk7XG4gICAgICAgIHN0cmVhbS5yZWFkKDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBidWZmZXIgaW5mby5cbiAgICAgICAgc3RhdGUubGVuZ3RoICs9IHN0YXRlLm9iamVjdE1vZGUgPyAxIDogY2h1bmsubGVuZ3RoO1xuICAgICAgICBpZiAoYWRkVG9Gcm9udClcbiAgICAgICAgICBzdGF0ZS5idWZmZXIudW5zaGlmdChjaHVuayk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBzdGF0ZS5idWZmZXIucHVzaChjaHVuayk7XG5cbiAgICAgICAgaWYgKHN0YXRlLm5lZWRSZWFkYWJsZSlcbiAgICAgICAgICBlbWl0UmVhZGFibGUoc3RyZWFtKTtcbiAgICAgIH1cblxuICAgICAgbWF5YmVSZWFkTW9yZShzdHJlYW0sIHN0YXRlKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIWFkZFRvRnJvbnQpIHtcbiAgICBzdGF0ZS5yZWFkaW5nID0gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gbmVlZE1vcmVEYXRhKHN0YXRlKTtcbn1cblxuXG5cbi8vIGlmIGl0J3MgcGFzdCB0aGUgaGlnaCB3YXRlciBtYXJrLCB3ZSBjYW4gcHVzaCBpbiBzb21lIG1vcmUuXG4vLyBBbHNvLCBpZiB3ZSBoYXZlIG5vIGRhdGEgeWV0LCB3ZSBjYW4gc3RhbmQgc29tZVxuLy8gbW9yZSBieXRlcy4gIFRoaXMgaXMgdG8gd29yayBhcm91bmQgY2FzZXMgd2hlcmUgaHdtPTAsXG4vLyBzdWNoIGFzIHRoZSByZXBsLiAgQWxzbywgaWYgdGhlIHB1c2goKSB0cmlnZ2VyZWQgYVxuLy8gcmVhZGFibGUgZXZlbnQsIGFuZCB0aGUgdXNlciBjYWxsZWQgcmVhZChsYXJnZU51bWJlcikgc3VjaCB0aGF0XG4vLyBuZWVkUmVhZGFibGUgd2FzIHNldCwgdGhlbiB3ZSBvdWdodCB0byBwdXNoIG1vcmUsIHNvIHRoYXQgYW5vdGhlclxuLy8gJ3JlYWRhYmxlJyBldmVudCB3aWxsIGJlIHRyaWdnZXJlZC5cbmZ1bmN0aW9uIG5lZWRNb3JlRGF0YShzdGF0ZSkge1xuICByZXR1cm4gIXN0YXRlLmVuZGVkICYmXG4gICAgICAgICAoc3RhdGUubmVlZFJlYWRhYmxlIHx8XG4gICAgICAgICAgc3RhdGUubGVuZ3RoIDwgc3RhdGUuaGlnaFdhdGVyTWFyayB8fFxuICAgICAgICAgIHN0YXRlLmxlbmd0aCA9PT0gMCk7XG59XG5cbi8vIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuUmVhZGFibGUucHJvdG90eXBlLnNldEVuY29kaW5nID0gZnVuY3Rpb24oZW5jKSB7XG4gIGlmICghU3RyaW5nRGVjb2RlcilcbiAgICBTdHJpbmdEZWNvZGVyID0gcmVxdWlyZSgnc3RyaW5nX2RlY29kZXIvJykuU3RyaW5nRGVjb2RlcjtcbiAgdGhpcy5fcmVhZGFibGVTdGF0ZS5kZWNvZGVyID0gbmV3IFN0cmluZ0RlY29kZXIoZW5jKTtcbiAgdGhpcy5fcmVhZGFibGVTdGF0ZS5lbmNvZGluZyA9IGVuYztcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBEb24ndCByYWlzZSB0aGUgaHdtID4gMTI4TUJcbnZhciBNQVhfSFdNID0gMHg4MDAwMDA7XG5mdW5jdGlvbiByb3VuZFVwVG9OZXh0UG93ZXJPZjIobikge1xuICBpZiAobiA+PSBNQVhfSFdNKSB7XG4gICAgbiA9IE1BWF9IV007XG4gIH0gZWxzZSB7XG4gICAgLy8gR2V0IHRoZSBuZXh0IGhpZ2hlc3QgcG93ZXIgb2YgMlxuICAgIG4tLTtcbiAgICBmb3IgKHZhciBwID0gMTsgcCA8IDMyOyBwIDw8PSAxKSBuIHw9IG4gPj4gcDtcbiAgICBuKys7XG4gIH1cbiAgcmV0dXJuIG47XG59XG5cbmZ1bmN0aW9uIGhvd011Y2hUb1JlYWQobiwgc3RhdGUpIHtcbiAgaWYgKHN0YXRlLmxlbmd0aCA9PT0gMCAmJiBzdGF0ZS5lbmRlZClcbiAgICByZXR1cm4gMDtcblxuICBpZiAoc3RhdGUub2JqZWN0TW9kZSlcbiAgICByZXR1cm4gbiA9PT0gMCA/IDAgOiAxO1xuXG4gIGlmIChpc05hTihuKSB8fCB1dGlsLmlzTnVsbChuKSkge1xuICAgIC8vIG9ubHkgZmxvdyBvbmUgYnVmZmVyIGF0IGEgdGltZVxuICAgIGlmIChzdGF0ZS5mbG93aW5nICYmIHN0YXRlLmJ1ZmZlci5sZW5ndGgpXG4gICAgICByZXR1cm4gc3RhdGUuYnVmZmVyWzBdLmxlbmd0aDtcbiAgICBlbHNlXG4gICAgICByZXR1cm4gc3RhdGUubGVuZ3RoO1xuICB9XG5cbiAgaWYgKG4gPD0gMClcbiAgICByZXR1cm4gMDtcblxuICAvLyBJZiB3ZSdyZSBhc2tpbmcgZm9yIG1vcmUgdGhhbiB0aGUgdGFyZ2V0IGJ1ZmZlciBsZXZlbCxcbiAgLy8gdGhlbiByYWlzZSB0aGUgd2F0ZXIgbWFyay4gIEJ1bXAgdXAgdG8gdGhlIG5leHQgaGlnaGVzdFxuICAvLyBwb3dlciBvZiAyLCB0byBwcmV2ZW50IGluY3JlYXNpbmcgaXQgZXhjZXNzaXZlbHkgaW4gdGlueVxuICAvLyBhbW91bnRzLlxuICBpZiAobiA+IHN0YXRlLmhpZ2hXYXRlck1hcmspXG4gICAgc3RhdGUuaGlnaFdhdGVyTWFyayA9IHJvdW5kVXBUb05leHRQb3dlck9mMihuKTtcblxuICAvLyBkb24ndCBoYXZlIHRoYXQgbXVjaC4gIHJldHVybiBudWxsLCB1bmxlc3Mgd2UndmUgZW5kZWQuXG4gIGlmIChuID4gc3RhdGUubGVuZ3RoKSB7XG4gICAgaWYgKCFzdGF0ZS5lbmRlZCkge1xuICAgICAgc3RhdGUubmVlZFJlYWRhYmxlID0gdHJ1ZTtcbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZVxuICAgICAgcmV0dXJuIHN0YXRlLmxlbmd0aDtcbiAgfVxuXG4gIHJldHVybiBuO1xufVxuXG4vLyB5b3UgY2FuIG92ZXJyaWRlIGVpdGhlciB0aGlzIG1ldGhvZCwgb3IgdGhlIGFzeW5jIF9yZWFkKG4pIGJlbG93LlxuUmVhZGFibGUucHJvdG90eXBlLnJlYWQgPSBmdW5jdGlvbihuKSB7XG4gIGRlYnVnKCdyZWFkJywgbik7XG4gIHZhciBzdGF0ZSA9IHRoaXMuX3JlYWRhYmxlU3RhdGU7XG4gIHZhciBuT3JpZyA9IG47XG5cbiAgaWYgKCF1dGlsLmlzTnVtYmVyKG4pIHx8IG4gPiAwKVxuICAgIHN0YXRlLmVtaXR0ZWRSZWFkYWJsZSA9IGZhbHNlO1xuXG4gIC8vIGlmIHdlJ3JlIGRvaW5nIHJlYWQoMCkgdG8gdHJpZ2dlciBhIHJlYWRhYmxlIGV2ZW50LCBidXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGEgYnVuY2ggb2YgZGF0YSBpbiB0aGUgYnVmZmVyLCB0aGVuIGp1c3QgdHJpZ2dlclxuICAvLyB0aGUgJ3JlYWRhYmxlJyBldmVudCBhbmQgbW92ZSBvbi5cbiAgaWYgKG4gPT09IDAgJiZcbiAgICAgIHN0YXRlLm5lZWRSZWFkYWJsZSAmJlxuICAgICAgKHN0YXRlLmxlbmd0aCA+PSBzdGF0ZS5oaWdoV2F0ZXJNYXJrIHx8IHN0YXRlLmVuZGVkKSkge1xuICAgIGRlYnVnKCdyZWFkOiBlbWl0UmVhZGFibGUnLCBzdGF0ZS5sZW5ndGgsIHN0YXRlLmVuZGVkKTtcbiAgICBpZiAoc3RhdGUubGVuZ3RoID09PSAwICYmIHN0YXRlLmVuZGVkKVxuICAgICAgZW5kUmVhZGFibGUodGhpcyk7XG4gICAgZWxzZVxuICAgICAgZW1pdFJlYWRhYmxlKHRoaXMpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgbiA9IGhvd011Y2hUb1JlYWQobiwgc3RhdGUpO1xuXG4gIC8vIGlmIHdlJ3ZlIGVuZGVkLCBhbmQgd2UncmUgbm93IGNsZWFyLCB0aGVuIGZpbmlzaCBpdCB1cC5cbiAgaWYgKG4gPT09IDAgJiYgc3RhdGUuZW5kZWQpIHtcbiAgICBpZiAoc3RhdGUubGVuZ3RoID09PSAwKVxuICAgICAgZW5kUmVhZGFibGUodGhpcyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBBbGwgdGhlIGFjdHVhbCBjaHVuayBnZW5lcmF0aW9uIGxvZ2ljIG5lZWRzIHRvIGJlXG4gIC8vICpiZWxvdyogdGhlIGNhbGwgdG8gX3JlYWQuICBUaGUgcmVhc29uIGlzIHRoYXQgaW4gY2VydGFpblxuICAvLyBzeW50aGV0aWMgc3RyZWFtIGNhc2VzLCBzdWNoIGFzIHBhc3N0aHJvdWdoIHN0cmVhbXMsIF9yZWFkXG4gIC8vIG1heSBiZSBhIGNvbXBsZXRlbHkgc3luY2hyb25vdXMgb3BlcmF0aW9uIHdoaWNoIG1heSBjaGFuZ2VcbiAgLy8gdGhlIHN0YXRlIG9mIHRoZSByZWFkIGJ1ZmZlciwgcHJvdmlkaW5nIGVub3VnaCBkYXRhIHdoZW5cbiAgLy8gYmVmb3JlIHRoZXJlIHdhcyAqbm90KiBlbm91Z2guXG4gIC8vXG4gIC8vIFNvLCB0aGUgc3RlcHMgYXJlOlxuICAvLyAxLiBGaWd1cmUgb3V0IHdoYXQgdGhlIHN0YXRlIG9mIHRoaW5ncyB3aWxsIGJlIGFmdGVyIHdlIGRvXG4gIC8vIGEgcmVhZCBmcm9tIHRoZSBidWZmZXIuXG4gIC8vXG4gIC8vIDIuIElmIHRoYXQgcmVzdWx0aW5nIHN0YXRlIHdpbGwgdHJpZ2dlciBhIF9yZWFkLCB0aGVuIGNhbGwgX3JlYWQuXG4gIC8vIE5vdGUgdGhhdCB0aGlzIG1heSBiZSBhc3luY2hyb25vdXMsIG9yIHN5bmNocm9ub3VzLiAgWWVzLCBpdCBpc1xuICAvLyBkZWVwbHkgdWdseSB0byB3cml0ZSBBUElzIHRoaXMgd2F5LCBidXQgdGhhdCBzdGlsbCBkb2Vzbid0IG1lYW5cbiAgLy8gdGhhdCB0aGUgUmVhZGFibGUgY2xhc3Mgc2hvdWxkIGJlaGF2ZSBpbXByb3Blcmx5LCBhcyBzdHJlYW1zIGFyZVxuICAvLyBkZXNpZ25lZCB0byBiZSBzeW5jL2FzeW5jIGFnbm9zdGljLlxuICAvLyBUYWtlIG5vdGUgaWYgdGhlIF9yZWFkIGNhbGwgaXMgc3luYyBvciBhc3luYyAoaWUsIGlmIHRoZSByZWFkIGNhbGxcbiAgLy8gaGFzIHJldHVybmVkIHlldCksIHNvIHRoYXQgd2Uga25vdyB3aGV0aGVyIG9yIG5vdCBpdCdzIHNhZmUgdG8gZW1pdFxuICAvLyAncmVhZGFibGUnIGV0Yy5cbiAgLy9cbiAgLy8gMy4gQWN0dWFsbHkgcHVsbCB0aGUgcmVxdWVzdGVkIGNodW5rcyBvdXQgb2YgdGhlIGJ1ZmZlciBhbmQgcmV0dXJuLlxuXG4gIC8vIGlmIHdlIG5lZWQgYSByZWFkYWJsZSBldmVudCwgdGhlbiB3ZSBuZWVkIHRvIGRvIHNvbWUgcmVhZGluZy5cbiAgdmFyIGRvUmVhZCA9IHN0YXRlLm5lZWRSZWFkYWJsZTtcbiAgZGVidWcoJ25lZWQgcmVhZGFibGUnLCBkb1JlYWQpO1xuXG4gIC8vIGlmIHdlIGN1cnJlbnRseSBoYXZlIGxlc3MgdGhhbiB0aGUgaGlnaFdhdGVyTWFyaywgdGhlbiBhbHNvIHJlYWQgc29tZVxuICBpZiAoc3RhdGUubGVuZ3RoID09PSAwIHx8IHN0YXRlLmxlbmd0aCAtIG4gPCBzdGF0ZS5oaWdoV2F0ZXJNYXJrKSB7XG4gICAgZG9SZWFkID0gdHJ1ZTtcbiAgICBkZWJ1ZygnbGVuZ3RoIGxlc3MgdGhhbiB3YXRlcm1hcmsnLCBkb1JlYWQpO1xuICB9XG5cbiAgLy8gaG93ZXZlciwgaWYgd2UndmUgZW5kZWQsIHRoZW4gdGhlcmUncyBubyBwb2ludCwgYW5kIGlmIHdlJ3JlIGFscmVhZHlcbiAgLy8gcmVhZGluZywgdGhlbiBpdCdzIHVubmVjZXNzYXJ5LlxuICBpZiAoc3RhdGUuZW5kZWQgfHwgc3RhdGUucmVhZGluZykge1xuICAgIGRvUmVhZCA9IGZhbHNlO1xuICAgIGRlYnVnKCdyZWFkaW5nIG9yIGVuZGVkJywgZG9SZWFkKTtcbiAgfVxuXG4gIGlmIChkb1JlYWQpIHtcbiAgICBkZWJ1ZygnZG8gcmVhZCcpO1xuICAgIHN0YXRlLnJlYWRpbmcgPSB0cnVlO1xuICAgIHN0YXRlLnN5bmMgPSB0cnVlO1xuICAgIC8vIGlmIHRoZSBsZW5ndGggaXMgY3VycmVudGx5IHplcm8sIHRoZW4gd2UgKm5lZWQqIGEgcmVhZGFibGUgZXZlbnQuXG4gICAgaWYgKHN0YXRlLmxlbmd0aCA9PT0gMClcbiAgICAgIHN0YXRlLm5lZWRSZWFkYWJsZSA9IHRydWU7XG4gICAgLy8gY2FsbCBpbnRlcm5hbCByZWFkIG1ldGhvZFxuICAgIHRoaXMuX3JlYWQoc3RhdGUuaGlnaFdhdGVyTWFyayk7XG4gICAgc3RhdGUuc3luYyA9IGZhbHNlO1xuICB9XG5cbiAgLy8gSWYgX3JlYWQgcHVzaGVkIGRhdGEgc3luY2hyb25vdXNseSwgdGhlbiBgcmVhZGluZ2Agd2lsbCBiZSBmYWxzZSxcbiAgLy8gYW5kIHdlIG5lZWQgdG8gcmUtZXZhbHVhdGUgaG93IG11Y2ggZGF0YSB3ZSBjYW4gcmV0dXJuIHRvIHRoZSB1c2VyLlxuICBpZiAoZG9SZWFkICYmICFzdGF0ZS5yZWFkaW5nKVxuICAgIG4gPSBob3dNdWNoVG9SZWFkKG5PcmlnLCBzdGF0ZSk7XG5cbiAgdmFyIHJldDtcbiAgaWYgKG4gPiAwKVxuICAgIHJldCA9IGZyb21MaXN0KG4sIHN0YXRlKTtcbiAgZWxzZVxuICAgIHJldCA9IG51bGw7XG5cbiAgaWYgKHV0aWwuaXNOdWxsKHJldCkpIHtcbiAgICBzdGF0ZS5uZWVkUmVhZGFibGUgPSB0cnVlO1xuICAgIG4gPSAwO1xuICB9XG5cbiAgc3RhdGUubGVuZ3RoIC09IG47XG5cbiAgLy8gSWYgd2UgaGF2ZSBub3RoaW5nIGluIHRoZSBidWZmZXIsIHRoZW4gd2Ugd2FudCB0byBrbm93XG4gIC8vIGFzIHNvb24gYXMgd2UgKmRvKiBnZXQgc29tZXRoaW5nIGludG8gdGhlIGJ1ZmZlci5cbiAgaWYgKHN0YXRlLmxlbmd0aCA9PT0gMCAmJiAhc3RhdGUuZW5kZWQpXG4gICAgc3RhdGUubmVlZFJlYWRhYmxlID0gdHJ1ZTtcblxuICAvLyBJZiB3ZSB0cmllZCB0byByZWFkKCkgcGFzdCB0aGUgRU9GLCB0aGVuIGVtaXQgZW5kIG9uIHRoZSBuZXh0IHRpY2suXG4gIGlmIChuT3JpZyAhPT0gbiAmJiBzdGF0ZS5lbmRlZCAmJiBzdGF0ZS5sZW5ndGggPT09IDApXG4gICAgZW5kUmVhZGFibGUodGhpcyk7XG5cbiAgaWYgKCF1dGlsLmlzTnVsbChyZXQpKVxuICAgIHRoaXMuZW1pdCgnZGF0YScsIHJldCk7XG5cbiAgcmV0dXJuIHJldDtcbn07XG5cbmZ1bmN0aW9uIGNodW5rSW52YWxpZChzdGF0ZSwgY2h1bmspIHtcbiAgdmFyIGVyID0gbnVsbDtcbiAgaWYgKCF1dGlsLmlzQnVmZmVyKGNodW5rKSAmJlxuICAgICAgIXV0aWwuaXNTdHJpbmcoY2h1bmspICYmXG4gICAgICAhdXRpbC5pc051bGxPclVuZGVmaW5lZChjaHVuaykgJiZcbiAgICAgICFzdGF0ZS5vYmplY3RNb2RlKSB7XG4gICAgZXIgPSBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG5vbi1zdHJpbmcvYnVmZmVyIGNodW5rJyk7XG4gIH1cbiAgcmV0dXJuIGVyO1xufVxuXG5cbmZ1bmN0aW9uIG9uRW9mQ2h1bmsoc3RyZWFtLCBzdGF0ZSkge1xuICBpZiAoc3RhdGUuZGVjb2RlciAmJiAhc3RhdGUuZW5kZWQpIHtcbiAgICB2YXIgY2h1bmsgPSBzdGF0ZS5kZWNvZGVyLmVuZCgpO1xuICAgIGlmIChjaHVuayAmJiBjaHVuay5sZW5ndGgpIHtcbiAgICAgIHN0YXRlLmJ1ZmZlci5wdXNoKGNodW5rKTtcbiAgICAgIHN0YXRlLmxlbmd0aCArPSBzdGF0ZS5vYmplY3RNb2RlID8gMSA6IGNodW5rLmxlbmd0aDtcbiAgICB9XG4gIH1cbiAgc3RhdGUuZW5kZWQgPSB0cnVlO1xuXG4gIC8vIGVtaXQgJ3JlYWRhYmxlJyBub3cgdG8gbWFrZSBzdXJlIGl0IGdldHMgcGlja2VkIHVwLlxuICBlbWl0UmVhZGFibGUoc3RyZWFtKTtcbn1cblxuLy8gRG9uJ3QgZW1pdCByZWFkYWJsZSByaWdodCBhd2F5IGluIHN5bmMgbW9kZSwgYmVjYXVzZSB0aGlzIGNhbiB0cmlnZ2VyXG4vLyBhbm90aGVyIHJlYWQoKSBjYWxsID0+IHN0YWNrIG92ZXJmbG93LiAgVGhpcyB3YXksIGl0IG1pZ2h0IHRyaWdnZXJcbi8vIGEgbmV4dFRpY2sgcmVjdXJzaW9uIHdhcm5pbmcsIGJ1dCB0aGF0J3Mgbm90IHNvIGJhZC5cbmZ1bmN0aW9uIGVtaXRSZWFkYWJsZShzdHJlYW0pIHtcbiAgdmFyIHN0YXRlID0gc3RyZWFtLl9yZWFkYWJsZVN0YXRlO1xuICBzdGF0ZS5uZWVkUmVhZGFibGUgPSBmYWxzZTtcbiAgaWYgKCFzdGF0ZS5lbWl0dGVkUmVhZGFibGUpIHtcbiAgICBkZWJ1ZygnZW1pdFJlYWRhYmxlJywgc3RhdGUuZmxvd2luZyk7XG4gICAgc3RhdGUuZW1pdHRlZFJlYWRhYmxlID0gdHJ1ZTtcbiAgICBpZiAoc3RhdGUuc3luYylcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIGVtaXRSZWFkYWJsZV8oc3RyZWFtKTtcbiAgICAgIH0pO1xuICAgIGVsc2VcbiAgICAgIGVtaXRSZWFkYWJsZV8oc3RyZWFtKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlbWl0UmVhZGFibGVfKHN0cmVhbSkge1xuICBkZWJ1ZygnZW1pdCByZWFkYWJsZScpO1xuICBzdHJlYW0uZW1pdCgncmVhZGFibGUnKTtcbiAgZmxvdyhzdHJlYW0pO1xufVxuXG5cbi8vIGF0IHRoaXMgcG9pbnQsIHRoZSB1c2VyIGhhcyBwcmVzdW1hYmx5IHNlZW4gdGhlICdyZWFkYWJsZScgZXZlbnQsXG4vLyBhbmQgY2FsbGVkIHJlYWQoKSB0byBjb25zdW1lIHNvbWUgZGF0YS4gIHRoYXQgbWF5IGhhdmUgdHJpZ2dlcmVkXG4vLyBpbiB0dXJuIGFub3RoZXIgX3JlYWQobikgY2FsbCwgaW4gd2hpY2ggY2FzZSByZWFkaW5nID0gdHJ1ZSBpZlxuLy8gaXQncyBpbiBwcm9ncmVzcy5cbi8vIEhvd2V2ZXIsIGlmIHdlJ3JlIG5vdCBlbmRlZCwgb3IgcmVhZGluZywgYW5kIHRoZSBsZW5ndGggPCBod20sXG4vLyB0aGVuIGdvIGFoZWFkIGFuZCB0cnkgdG8gcmVhZCBzb21lIG1vcmUgcHJlZW1wdGl2ZWx5LlxuZnVuY3Rpb24gbWF5YmVSZWFkTW9yZShzdHJlYW0sIHN0YXRlKSB7XG4gIGlmICghc3RhdGUucmVhZGluZ01vcmUpIHtcbiAgICBzdGF0ZS5yZWFkaW5nTW9yZSA9IHRydWU7XG4gICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbigpIHtcbiAgICAgIG1heWJlUmVhZE1vcmVfKHN0cmVhbSwgc3RhdGUpO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1heWJlUmVhZE1vcmVfKHN0cmVhbSwgc3RhdGUpIHtcbiAgdmFyIGxlbiA9IHN0YXRlLmxlbmd0aDtcbiAgd2hpbGUgKCFzdGF0ZS5yZWFkaW5nICYmICFzdGF0ZS5mbG93aW5nICYmICFzdGF0ZS5lbmRlZCAmJlxuICAgICAgICAgc3RhdGUubGVuZ3RoIDwgc3RhdGUuaGlnaFdhdGVyTWFyaykge1xuICAgIGRlYnVnKCdtYXliZVJlYWRNb3JlIHJlYWQgMCcpO1xuICAgIHN0cmVhbS5yZWFkKDApO1xuICAgIGlmIChsZW4gPT09IHN0YXRlLmxlbmd0aClcbiAgICAgIC8vIGRpZG4ndCBnZXQgYW55IGRhdGEsIHN0b3Agc3Bpbm5pbmcuXG4gICAgICBicmVhaztcbiAgICBlbHNlXG4gICAgICBsZW4gPSBzdGF0ZS5sZW5ndGg7XG4gIH1cbiAgc3RhdGUucmVhZGluZ01vcmUgPSBmYWxzZTtcbn1cblxuLy8gYWJzdHJhY3QgbWV0aG9kLiAgdG8gYmUgb3ZlcnJpZGRlbiBpbiBzcGVjaWZpYyBpbXBsZW1lbnRhdGlvbiBjbGFzc2VzLlxuLy8gY2FsbCBjYihlciwgZGF0YSkgd2hlcmUgZGF0YSBpcyA8PSBuIGluIGxlbmd0aC5cbi8vIGZvciB2aXJ0dWFsIChub24tc3RyaW5nLCBub24tYnVmZmVyKSBzdHJlYW1zLCBcImxlbmd0aFwiIGlzIHNvbWV3aGF0XG4vLyBhcmJpdHJhcnksIGFuZCBwZXJoYXBzIG5vdCB2ZXJ5IG1lYW5pbmdmdWwuXG5SZWFkYWJsZS5wcm90b3R5cGUuX3JlYWQgPSBmdW5jdGlvbihuKSB7XG4gIHRoaXMuZW1pdCgnZXJyb3InLCBuZXcgRXJyb3IoJ25vdCBpbXBsZW1lbnRlZCcpKTtcbn07XG5cblJlYWRhYmxlLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24oZGVzdCwgcGlwZU9wdHMpIHtcbiAgdmFyIHNyYyA9IHRoaXM7XG4gIHZhciBzdGF0ZSA9IHRoaXMuX3JlYWRhYmxlU3RhdGU7XG5cbiAgc3dpdGNoIChzdGF0ZS5waXBlc0NvdW50KSB7XG4gICAgY2FzZSAwOlxuICAgICAgc3RhdGUucGlwZXMgPSBkZXN0O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAxOlxuICAgICAgc3RhdGUucGlwZXMgPSBbc3RhdGUucGlwZXMsIGRlc3RdO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHN0YXRlLnBpcGVzLnB1c2goZGVzdCk7XG4gICAgICBicmVhaztcbiAgfVxuICBzdGF0ZS5waXBlc0NvdW50ICs9IDE7XG4gIGRlYnVnKCdwaXBlIGNvdW50PSVkIG9wdHM9JWonLCBzdGF0ZS5waXBlc0NvdW50LCBwaXBlT3B0cyk7XG5cbiAgdmFyIGRvRW5kID0gKCFwaXBlT3B0cyB8fCBwaXBlT3B0cy5lbmQgIT09IGZhbHNlKSAmJlxuICAgICAgICAgICAgICBkZXN0ICE9PSBwcm9jZXNzLnN0ZG91dCAmJlxuICAgICAgICAgICAgICBkZXN0ICE9PSBwcm9jZXNzLnN0ZGVycjtcblxuICB2YXIgZW5kRm4gPSBkb0VuZCA/IG9uZW5kIDogY2xlYW51cDtcbiAgaWYgKHN0YXRlLmVuZEVtaXR0ZWQpXG4gICAgcHJvY2Vzcy5uZXh0VGljayhlbmRGbik7XG4gIGVsc2VcbiAgICBzcmMub25jZSgnZW5kJywgZW5kRm4pO1xuXG4gIGRlc3Qub24oJ3VucGlwZScsIG9udW5waXBlKTtcbiAgZnVuY3Rpb24gb251bnBpcGUocmVhZGFibGUpIHtcbiAgICBkZWJ1Zygnb251bnBpcGUnKTtcbiAgICBpZiAocmVhZGFibGUgPT09IHNyYykge1xuICAgICAgY2xlYW51cCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uZW5kKCkge1xuICAgIGRlYnVnKCdvbmVuZCcpO1xuICAgIGRlc3QuZW5kKCk7XG4gIH1cblxuICAvLyB3aGVuIHRoZSBkZXN0IGRyYWlucywgaXQgcmVkdWNlcyB0aGUgYXdhaXREcmFpbiBjb3VudGVyXG4gIC8vIG9uIHRoZSBzb3VyY2UuICBUaGlzIHdvdWxkIGJlIG1vcmUgZWxlZ2FudCB3aXRoIGEgLm9uY2UoKVxuICAvLyBoYW5kbGVyIGluIGZsb3coKSwgYnV0IGFkZGluZyBhbmQgcmVtb3ZpbmcgcmVwZWF0ZWRseSBpc1xuICAvLyB0b28gc2xvdy5cbiAgdmFyIG9uZHJhaW4gPSBwaXBlT25EcmFpbihzcmMpO1xuICBkZXN0Lm9uKCdkcmFpbicsIG9uZHJhaW4pO1xuXG4gIGZ1bmN0aW9uIGNsZWFudXAoKSB7XG4gICAgZGVidWcoJ2NsZWFudXAnKTtcbiAgICAvLyBjbGVhbnVwIGV2ZW50IGhhbmRsZXJzIG9uY2UgdGhlIHBpcGUgaXMgYnJva2VuXG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBvbmNsb3NlKTtcbiAgICBkZXN0LnJlbW92ZUxpc3RlbmVyKCdmaW5pc2gnLCBvbmZpbmlzaCk7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignZHJhaW4nLCBvbmRyYWluKTtcbiAgICBkZXN0LnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIG9uZXJyb3IpO1xuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ3VucGlwZScsIG9udW5waXBlKTtcbiAgICBzcmMucmVtb3ZlTGlzdGVuZXIoJ2VuZCcsIG9uZW5kKTtcbiAgICBzcmMucmVtb3ZlTGlzdGVuZXIoJ2VuZCcsIGNsZWFudXApO1xuICAgIHNyYy5yZW1vdmVMaXN0ZW5lcignZGF0YScsIG9uZGF0YSk7XG5cbiAgICAvLyBpZiB0aGUgcmVhZGVyIGlzIHdhaXRpbmcgZm9yIGEgZHJhaW4gZXZlbnQgZnJvbSB0aGlzXG4gICAgLy8gc3BlY2lmaWMgd3JpdGVyLCB0aGVuIGl0IHdvdWxkIGNhdXNlIGl0IHRvIG5ldmVyIHN0YXJ0XG4gICAgLy8gZmxvd2luZyBhZ2Fpbi5cbiAgICAvLyBTbywgaWYgdGhpcyBpcyBhd2FpdGluZyBhIGRyYWluLCB0aGVuIHdlIGp1c3QgY2FsbCBpdCBub3cuXG4gICAgLy8gSWYgd2UgZG9uJ3Qga25vdywgdGhlbiBhc3N1bWUgdGhhdCB3ZSBhcmUgd2FpdGluZyBmb3Igb25lLlxuICAgIGlmIChzdGF0ZS5hd2FpdERyYWluICYmXG4gICAgICAgICghZGVzdC5fd3JpdGFibGVTdGF0ZSB8fCBkZXN0Ll93cml0YWJsZVN0YXRlLm5lZWREcmFpbikpXG4gICAgICBvbmRyYWluKCk7XG4gIH1cblxuICBzcmMub24oJ2RhdGEnLCBvbmRhdGEpO1xuICBmdW5jdGlvbiBvbmRhdGEoY2h1bmspIHtcbiAgICBkZWJ1Zygnb25kYXRhJyk7XG4gICAgdmFyIHJldCA9IGRlc3Qud3JpdGUoY2h1bmspO1xuICAgIGlmIChmYWxzZSA9PT0gcmV0KSB7XG4gICAgICBkZWJ1ZygnZmFsc2Ugd3JpdGUgcmVzcG9uc2UsIHBhdXNlJyxcbiAgICAgICAgICAgIHNyYy5fcmVhZGFibGVTdGF0ZS5hd2FpdERyYWluKTtcbiAgICAgIHNyYy5fcmVhZGFibGVTdGF0ZS5hd2FpdERyYWluKys7XG4gICAgICBzcmMucGF1c2UoKTtcbiAgICB9XG4gIH1cblxuICAvLyBpZiB0aGUgZGVzdCBoYXMgYW4gZXJyb3IsIHRoZW4gc3RvcCBwaXBpbmcgaW50byBpdC5cbiAgLy8gaG93ZXZlciwgZG9uJ3Qgc3VwcHJlc3MgdGhlIHRocm93aW5nIGJlaGF2aW9yIGZvciB0aGlzLlxuICBmdW5jdGlvbiBvbmVycm9yKGVyKSB7XG4gICAgZGVidWcoJ29uZXJyb3InLCBlcik7XG4gICAgdW5waXBlKCk7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBvbmVycm9yKTtcbiAgICBpZiAoRUUubGlzdGVuZXJDb3VudChkZXN0LCAnZXJyb3InKSA9PT0gMClcbiAgICAgIGRlc3QuZW1pdCgnZXJyb3InLCBlcik7XG4gIH1cbiAgLy8gVGhpcyBpcyBhIGJydXRhbGx5IHVnbHkgaGFjayB0byBtYWtlIHN1cmUgdGhhdCBvdXIgZXJyb3IgaGFuZGxlclxuICAvLyBpcyBhdHRhY2hlZCBiZWZvcmUgYW55IHVzZXJsYW5kIG9uZXMuICBORVZFUiBETyBUSElTLlxuICBpZiAoIWRlc3QuX2V2ZW50cyB8fCAhZGVzdC5fZXZlbnRzLmVycm9yKVxuICAgIGRlc3Qub24oJ2Vycm9yJywgb25lcnJvcik7XG4gIGVsc2UgaWYgKGlzQXJyYXkoZGVzdC5fZXZlbnRzLmVycm9yKSlcbiAgICBkZXN0Ll9ldmVudHMuZXJyb3IudW5zaGlmdChvbmVycm9yKTtcbiAgZWxzZVxuICAgIGRlc3QuX2V2ZW50cy5lcnJvciA9IFtvbmVycm9yLCBkZXN0Ll9ldmVudHMuZXJyb3JdO1xuXG5cblxuICAvLyBCb3RoIGNsb3NlIGFuZCBmaW5pc2ggc2hvdWxkIHRyaWdnZXIgdW5waXBlLCBidXQgb25seSBvbmNlLlxuICBmdW5jdGlvbiBvbmNsb3NlKCkge1xuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2ZpbmlzaCcsIG9uZmluaXNoKTtcbiAgICB1bnBpcGUoKTtcbiAgfVxuICBkZXN0Lm9uY2UoJ2Nsb3NlJywgb25jbG9zZSk7XG4gIGZ1bmN0aW9uIG9uZmluaXNoKCkge1xuICAgIGRlYnVnKCdvbmZpbmlzaCcpO1xuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgb25jbG9zZSk7XG4gICAgdW5waXBlKCk7XG4gIH1cbiAgZGVzdC5vbmNlKCdmaW5pc2gnLCBvbmZpbmlzaCk7XG5cbiAgZnVuY3Rpb24gdW5waXBlKCkge1xuICAgIGRlYnVnKCd1bnBpcGUnKTtcbiAgICBzcmMudW5waXBlKGRlc3QpO1xuICB9XG5cbiAgLy8gdGVsbCB0aGUgZGVzdCB0aGF0IGl0J3MgYmVpbmcgcGlwZWQgdG9cbiAgZGVzdC5lbWl0KCdwaXBlJywgc3JjKTtcblxuICAvLyBzdGFydCB0aGUgZmxvdyBpZiBpdCBoYXNuJ3QgYmVlbiBzdGFydGVkIGFscmVhZHkuXG4gIGlmICghc3RhdGUuZmxvd2luZykge1xuICAgIGRlYnVnKCdwaXBlIHJlc3VtZScpO1xuICAgIHNyYy5yZXN1bWUoKTtcbiAgfVxuXG4gIHJldHVybiBkZXN0O1xufTtcblxuZnVuY3Rpb24gcGlwZU9uRHJhaW4oc3JjKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RhdGUgPSBzcmMuX3JlYWRhYmxlU3RhdGU7XG4gICAgZGVidWcoJ3BpcGVPbkRyYWluJywgc3RhdGUuYXdhaXREcmFpbik7XG4gICAgaWYgKHN0YXRlLmF3YWl0RHJhaW4pXG4gICAgICBzdGF0ZS5hd2FpdERyYWluLS07XG4gICAgaWYgKHN0YXRlLmF3YWl0RHJhaW4gPT09IDAgJiYgRUUubGlzdGVuZXJDb3VudChzcmMsICdkYXRhJykpIHtcbiAgICAgIHN0YXRlLmZsb3dpbmcgPSB0cnVlO1xuICAgICAgZmxvdyhzcmMpO1xuICAgIH1cbiAgfTtcbn1cblxuXG5SZWFkYWJsZS5wcm90b3R5cGUudW5waXBlID0gZnVuY3Rpb24oZGVzdCkge1xuICB2YXIgc3RhdGUgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuXG4gIC8vIGlmIHdlJ3JlIG5vdCBwaXBpbmcgYW55d2hlcmUsIHRoZW4gZG8gbm90aGluZy5cbiAgaWYgKHN0YXRlLnBpcGVzQ291bnQgPT09IDApXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8ganVzdCBvbmUgZGVzdGluYXRpb24uICBtb3N0IGNvbW1vbiBjYXNlLlxuICBpZiAoc3RhdGUucGlwZXNDb3VudCA9PT0gMSkge1xuICAgIC8vIHBhc3NlZCBpbiBvbmUsIGJ1dCBpdCdzIG5vdCB0aGUgcmlnaHQgb25lLlxuICAgIGlmIChkZXN0ICYmIGRlc3QgIT09IHN0YXRlLnBpcGVzKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAoIWRlc3QpXG4gICAgICBkZXN0ID0gc3RhdGUucGlwZXM7XG5cbiAgICAvLyBnb3QgYSBtYXRjaC5cbiAgICBzdGF0ZS5waXBlcyA9IG51bGw7XG4gICAgc3RhdGUucGlwZXNDb3VudCA9IDA7XG4gICAgc3RhdGUuZmxvd2luZyA9IGZhbHNlO1xuICAgIGlmIChkZXN0KVxuICAgICAgZGVzdC5lbWl0KCd1bnBpcGUnLCB0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHNsb3cgY2FzZS4gbXVsdGlwbGUgcGlwZSBkZXN0aW5hdGlvbnMuXG5cbiAgaWYgKCFkZXN0KSB7XG4gICAgLy8gcmVtb3ZlIGFsbC5cbiAgICB2YXIgZGVzdHMgPSBzdGF0ZS5waXBlcztcbiAgICB2YXIgbGVuID0gc3RhdGUucGlwZXNDb3VudDtcbiAgICBzdGF0ZS5waXBlcyA9IG51bGw7XG4gICAgc3RhdGUucGlwZXNDb3VudCA9IDA7XG4gICAgc3RhdGUuZmxvd2luZyA9IGZhbHNlO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIGRlc3RzW2ldLmVtaXQoJ3VucGlwZScsIHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gdHJ5IHRvIGZpbmQgdGhlIHJpZ2h0IG9uZS5cbiAgdmFyIGkgPSBpbmRleE9mKHN0YXRlLnBpcGVzLCBkZXN0KTtcbiAgaWYgKGkgPT09IC0xKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIHN0YXRlLnBpcGVzLnNwbGljZShpLCAxKTtcbiAgc3RhdGUucGlwZXNDb3VudCAtPSAxO1xuICBpZiAoc3RhdGUucGlwZXNDb3VudCA9PT0gMSlcbiAgICBzdGF0ZS5waXBlcyA9IHN0YXRlLnBpcGVzWzBdO1xuXG4gIGRlc3QuZW1pdCgndW5waXBlJywgdGhpcyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBzZXQgdXAgZGF0YSBldmVudHMgaWYgdGhleSBhcmUgYXNrZWQgZm9yXG4vLyBFbnN1cmUgcmVhZGFibGUgbGlzdGVuZXJzIGV2ZW50dWFsbHkgZ2V0IHNvbWV0aGluZ1xuUmVhZGFibGUucHJvdG90eXBlLm9uID0gZnVuY3Rpb24oZXYsIGZuKSB7XG4gIHZhciByZXMgPSBTdHJlYW0ucHJvdG90eXBlLm9uLmNhbGwodGhpcywgZXYsIGZuKTtcblxuICAvLyBJZiBsaXN0ZW5pbmcgdG8gZGF0YSwgYW5kIGl0IGhhcyBub3QgZXhwbGljaXRseSBiZWVuIHBhdXNlZCxcbiAgLy8gdGhlbiBjYWxsIHJlc3VtZSB0byBzdGFydCB0aGUgZmxvdyBvZiBkYXRhIG9uIHRoZSBuZXh0IHRpY2suXG4gIGlmIChldiA9PT0gJ2RhdGEnICYmIGZhbHNlICE9PSB0aGlzLl9yZWFkYWJsZVN0YXRlLmZsb3dpbmcpIHtcbiAgICB0aGlzLnJlc3VtZSgpO1xuICB9XG5cbiAgaWYgKGV2ID09PSAncmVhZGFibGUnICYmIHRoaXMucmVhZGFibGUpIHtcbiAgICB2YXIgc3RhdGUgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuICAgIGlmICghc3RhdGUucmVhZGFibGVMaXN0ZW5pbmcpIHtcbiAgICAgIHN0YXRlLnJlYWRhYmxlTGlzdGVuaW5nID0gdHJ1ZTtcbiAgICAgIHN0YXRlLmVtaXR0ZWRSZWFkYWJsZSA9IGZhbHNlO1xuICAgICAgc3RhdGUubmVlZFJlYWRhYmxlID0gdHJ1ZTtcbiAgICAgIGlmICghc3RhdGUucmVhZGluZykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZGVidWcoJ3JlYWRhYmxlIG5leHR0aWNrIHJlYWQgMCcpO1xuICAgICAgICAgIHNlbGYucmVhZCgwKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHN0YXRlLmxlbmd0aCkge1xuICAgICAgICBlbWl0UmVhZGFibGUodGhpcywgc3RhdGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXM7XG59O1xuUmVhZGFibGUucHJvdG90eXBlLmFkZExpc3RlbmVyID0gUmVhZGFibGUucHJvdG90eXBlLm9uO1xuXG4vLyBwYXVzZSgpIGFuZCByZXN1bWUoKSBhcmUgcmVtbmFudHMgb2YgdGhlIGxlZ2FjeSByZWFkYWJsZSBzdHJlYW0gQVBJXG4vLyBJZiB0aGUgdXNlciB1c2VzIHRoZW0sIHRoZW4gc3dpdGNoIGludG8gb2xkIG1vZGUuXG5SZWFkYWJsZS5wcm90b3R5cGUucmVzdW1lID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXMuX3JlYWRhYmxlU3RhdGU7XG4gIGlmICghc3RhdGUuZmxvd2luZykge1xuICAgIGRlYnVnKCdyZXN1bWUnKTtcbiAgICBzdGF0ZS5mbG93aW5nID0gdHJ1ZTtcbiAgICBpZiAoIXN0YXRlLnJlYWRpbmcpIHtcbiAgICAgIGRlYnVnKCdyZXN1bWUgcmVhZCAwJyk7XG4gICAgICB0aGlzLnJlYWQoMCk7XG4gICAgfVxuICAgIHJlc3VtZSh0aGlzLCBzdGF0ZSk7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiByZXN1bWUoc3RyZWFtLCBzdGF0ZSkge1xuICBpZiAoIXN0YXRlLnJlc3VtZVNjaGVkdWxlZCkge1xuICAgIHN0YXRlLnJlc3VtZVNjaGVkdWxlZCA9IHRydWU7XG4gICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbigpIHtcbiAgICAgIHJlc3VtZV8oc3RyZWFtLCBzdGF0ZSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzdW1lXyhzdHJlYW0sIHN0YXRlKSB7XG4gIHN0YXRlLnJlc3VtZVNjaGVkdWxlZCA9IGZhbHNlO1xuICBzdHJlYW0uZW1pdCgncmVzdW1lJyk7XG4gIGZsb3coc3RyZWFtKTtcbiAgaWYgKHN0YXRlLmZsb3dpbmcgJiYgIXN0YXRlLnJlYWRpbmcpXG4gICAgc3RyZWFtLnJlYWQoMCk7XG59XG5cblJlYWRhYmxlLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICBkZWJ1ZygnY2FsbCBwYXVzZSBmbG93aW5nPSVqJywgdGhpcy5fcmVhZGFibGVTdGF0ZS5mbG93aW5nKTtcbiAgaWYgKGZhbHNlICE9PSB0aGlzLl9yZWFkYWJsZVN0YXRlLmZsb3dpbmcpIHtcbiAgICBkZWJ1ZygncGF1c2UnKTtcbiAgICB0aGlzLl9yZWFkYWJsZVN0YXRlLmZsb3dpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmVtaXQoJ3BhdXNlJyk7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBmbG93KHN0cmVhbSkge1xuICB2YXIgc3RhdGUgPSBzdHJlYW0uX3JlYWRhYmxlU3RhdGU7XG4gIGRlYnVnKCdmbG93Jywgc3RhdGUuZmxvd2luZyk7XG4gIGlmIChzdGF0ZS5mbG93aW5nKSB7XG4gICAgZG8ge1xuICAgICAgdmFyIGNodW5rID0gc3RyZWFtLnJlYWQoKTtcbiAgICB9IHdoaWxlIChudWxsICE9PSBjaHVuayAmJiBzdGF0ZS5mbG93aW5nKTtcbiAgfVxufVxuXG4vLyB3cmFwIGFuIG9sZC1zdHlsZSBzdHJlYW0gYXMgdGhlIGFzeW5jIGRhdGEgc291cmNlLlxuLy8gVGhpcyBpcyAqbm90KiBwYXJ0IG9mIHRoZSByZWFkYWJsZSBzdHJlYW0gaW50ZXJmYWNlLlxuLy8gSXQgaXMgYW4gdWdseSB1bmZvcnR1bmF0ZSBtZXNzIG9mIGhpc3RvcnkuXG5SZWFkYWJsZS5wcm90b3R5cGUud3JhcCA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICB2YXIgc3RhdGUgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuICB2YXIgcGF1c2VkID0gZmFsc2U7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBzdHJlYW0ub24oJ2VuZCcsIGZ1bmN0aW9uKCkge1xuICAgIGRlYnVnKCd3cmFwcGVkIGVuZCcpO1xuICAgIGlmIChzdGF0ZS5kZWNvZGVyICYmICFzdGF0ZS5lbmRlZCkge1xuICAgICAgdmFyIGNodW5rID0gc3RhdGUuZGVjb2Rlci5lbmQoKTtcbiAgICAgIGlmIChjaHVuayAmJiBjaHVuay5sZW5ndGgpXG4gICAgICAgIHNlbGYucHVzaChjaHVuayk7XG4gICAgfVxuXG4gICAgc2VsZi5wdXNoKG51bGwpO1xuICB9KTtcblxuICBzdHJlYW0ub24oJ2RhdGEnLCBmdW5jdGlvbihjaHVuaykge1xuICAgIGRlYnVnKCd3cmFwcGVkIGRhdGEnKTtcbiAgICBpZiAoc3RhdGUuZGVjb2RlcilcbiAgICAgIGNodW5rID0gc3RhdGUuZGVjb2Rlci53cml0ZShjaHVuayk7XG4gICAgaWYgKCFjaHVuayB8fCAhc3RhdGUub2JqZWN0TW9kZSAmJiAhY2h1bmsubGVuZ3RoKVxuICAgICAgcmV0dXJuO1xuXG4gICAgdmFyIHJldCA9IHNlbGYucHVzaChjaHVuayk7XG4gICAgaWYgKCFyZXQpIHtcbiAgICAgIHBhdXNlZCA9IHRydWU7XG4gICAgICBzdHJlYW0ucGF1c2UoKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIHByb3h5IGFsbCB0aGUgb3RoZXIgbWV0aG9kcy5cbiAgLy8gaW1wb3J0YW50IHdoZW4gd3JhcHBpbmcgZmlsdGVycyBhbmQgZHVwbGV4ZXMuXG4gIGZvciAodmFyIGkgaW4gc3RyZWFtKSB7XG4gICAgaWYgKHV0aWwuaXNGdW5jdGlvbihzdHJlYW1baV0pICYmIHV0aWwuaXNVbmRlZmluZWQodGhpc1tpXSkpIHtcbiAgICAgIHRoaXNbaV0gPSBmdW5jdGlvbihtZXRob2QpIHsgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gc3RyZWFtW21ldGhvZF0uYXBwbHkoc3RyZWFtLCBhcmd1bWVudHMpO1xuICAgICAgfX0oaSk7XG4gICAgfVxuICB9XG5cbiAgLy8gcHJveHkgY2VydGFpbiBpbXBvcnRhbnQgZXZlbnRzLlxuICB2YXIgZXZlbnRzID0gWydlcnJvcicsICdjbG9zZScsICdkZXN0cm95JywgJ3BhdXNlJywgJ3Jlc3VtZSddO1xuICBmb3JFYWNoKGV2ZW50cywgZnVuY3Rpb24oZXYpIHtcbiAgICBzdHJlYW0ub24oZXYsIHNlbGYuZW1pdC5iaW5kKHNlbGYsIGV2KSk7XG4gIH0pO1xuXG4gIC8vIHdoZW4gd2UgdHJ5IHRvIGNvbnN1bWUgc29tZSBtb3JlIGJ5dGVzLCBzaW1wbHkgdW5wYXVzZSB0aGVcbiAgLy8gdW5kZXJseWluZyBzdHJlYW0uXG4gIHNlbGYuX3JlYWQgPSBmdW5jdGlvbihuKSB7XG4gICAgZGVidWcoJ3dyYXBwZWQgX3JlYWQnLCBuKTtcbiAgICBpZiAocGF1c2VkKSB7XG4gICAgICBwYXVzZWQgPSBmYWxzZTtcbiAgICAgIHN0cmVhbS5yZXN1bWUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHNlbGY7XG59O1xuXG5cblxuLy8gZXhwb3NlZCBmb3IgdGVzdGluZyBwdXJwb3NlcyBvbmx5LlxuUmVhZGFibGUuX2Zyb21MaXN0ID0gZnJvbUxpc3Q7XG5cbi8vIFBsdWNrIG9mZiBuIGJ5dGVzIGZyb20gYW4gYXJyYXkgb2YgYnVmZmVycy5cbi8vIExlbmd0aCBpcyB0aGUgY29tYmluZWQgbGVuZ3RocyBvZiBhbGwgdGhlIGJ1ZmZlcnMgaW4gdGhlIGxpc3QuXG5mdW5jdGlvbiBmcm9tTGlzdChuLCBzdGF0ZSkge1xuICB2YXIgbGlzdCA9IHN0YXRlLmJ1ZmZlcjtcbiAgdmFyIGxlbmd0aCA9IHN0YXRlLmxlbmd0aDtcbiAgdmFyIHN0cmluZ01vZGUgPSAhIXN0YXRlLmRlY29kZXI7XG4gIHZhciBvYmplY3RNb2RlID0gISFzdGF0ZS5vYmplY3RNb2RlO1xuICB2YXIgcmV0O1xuXG4gIC8vIG5vdGhpbmcgaW4gdGhlIGxpc3QsIGRlZmluaXRlbHkgZW1wdHkuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMClcbiAgICByZXR1cm4gbnVsbDtcblxuICBpZiAobGVuZ3RoID09PSAwKVxuICAgIHJldCA9IG51bGw7XG4gIGVsc2UgaWYgKG9iamVjdE1vZGUpXG4gICAgcmV0ID0gbGlzdC5zaGlmdCgpO1xuICBlbHNlIGlmICghbiB8fCBuID49IGxlbmd0aCkge1xuICAgIC8vIHJlYWQgaXQgYWxsLCB0cnVuY2F0ZSB0aGUgYXJyYXkuXG4gICAgaWYgKHN0cmluZ01vZGUpXG4gICAgICByZXQgPSBsaXN0LmpvaW4oJycpO1xuICAgIGVsc2VcbiAgICAgIHJldCA9IEJ1ZmZlci5jb25jYXQobGlzdCwgbGVuZ3RoKTtcbiAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gcmVhZCBqdXN0IHNvbWUgb2YgaXQuXG4gICAgaWYgKG4gPCBsaXN0WzBdLmxlbmd0aCkge1xuICAgICAgLy8ganVzdCB0YWtlIGEgcGFydCBvZiB0aGUgZmlyc3QgbGlzdCBpdGVtLlxuICAgICAgLy8gc2xpY2UgaXMgdGhlIHNhbWUgZm9yIGJ1ZmZlcnMgYW5kIHN0cmluZ3MuXG4gICAgICB2YXIgYnVmID0gbGlzdFswXTtcbiAgICAgIHJldCA9IGJ1Zi5zbGljZSgwLCBuKTtcbiAgICAgIGxpc3RbMF0gPSBidWYuc2xpY2Uobik7XG4gICAgfSBlbHNlIGlmIChuID09PSBsaXN0WzBdLmxlbmd0aCkge1xuICAgICAgLy8gZmlyc3QgbGlzdCBpcyBhIHBlcmZlY3QgbWF0Y2hcbiAgICAgIHJldCA9IGxpc3Quc2hpZnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY29tcGxleCBjYXNlLlxuICAgICAgLy8gd2UgaGF2ZSBlbm91Z2ggdG8gY292ZXIgaXQsIGJ1dCBpdCBzcGFucyBwYXN0IHRoZSBmaXJzdCBidWZmZXIuXG4gICAgICBpZiAoc3RyaW5nTW9kZSlcbiAgICAgICAgcmV0ID0gJyc7XG4gICAgICBlbHNlXG4gICAgICAgIHJldCA9IG5ldyBCdWZmZXIobik7XG5cbiAgICAgIHZhciBjID0gMDtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsICYmIGMgPCBuOyBpKyspIHtcbiAgICAgICAgdmFyIGJ1ZiA9IGxpc3RbMF07XG4gICAgICAgIHZhciBjcHkgPSBNYXRoLm1pbihuIC0gYywgYnVmLmxlbmd0aCk7XG5cbiAgICAgICAgaWYgKHN0cmluZ01vZGUpXG4gICAgICAgICAgcmV0ICs9IGJ1Zi5zbGljZSgwLCBjcHkpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgYnVmLmNvcHkocmV0LCBjLCAwLCBjcHkpO1xuXG4gICAgICAgIGlmIChjcHkgPCBidWYubGVuZ3RoKVxuICAgICAgICAgIGxpc3RbMF0gPSBidWYuc2xpY2UoY3B5KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcblxuICAgICAgICBjICs9IGNweTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBlbmRSZWFkYWJsZShzdHJlYW0pIHtcbiAgdmFyIHN0YXRlID0gc3RyZWFtLl9yZWFkYWJsZVN0YXRlO1xuXG4gIC8vIElmIHdlIGdldCBoZXJlIGJlZm9yZSBjb25zdW1pbmcgYWxsIHRoZSBieXRlcywgdGhlbiB0aGF0IGlzIGFcbiAgLy8gYnVnIGluIG5vZGUuICBTaG91bGQgbmV2ZXIgaGFwcGVuLlxuICBpZiAoc3RhdGUubGVuZ3RoID4gMClcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2VuZFJlYWRhYmxlIGNhbGxlZCBvbiBub24tZW1wdHkgc3RyZWFtJyk7XG5cbiAgaWYgKCFzdGF0ZS5lbmRFbWl0dGVkKSB7XG4gICAgc3RhdGUuZW5kZWQgPSB0cnVlO1xuICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICAvLyBDaGVjayB0aGF0IHdlIGRpZG4ndCBnZXQgb25lIGxhc3QgdW5zaGlmdC5cbiAgICAgIGlmICghc3RhdGUuZW5kRW1pdHRlZCAmJiBzdGF0ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgc3RhdGUuZW5kRW1pdHRlZCA9IHRydWU7XG4gICAgICAgIHN0cmVhbS5yZWFkYWJsZSA9IGZhbHNlO1xuICAgICAgICBzdHJlYW0uZW1pdCgnZW5kJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZm9yRWFjaCAoeHMsIGYpIHtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB4cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmKHhzW2ldLCBpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbmRleE9mICh4cywgeCkge1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHhzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGlmICh4c1tpXSA9PT0geCkgcmV0dXJuIGk7XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuIl19
},{"./_stream_duplex":"C:\\dev\\NEXUS\\node_modules\\readable-stream\\lib\\_stream_duplex.js","_process":"C:\\dev\\NEXUS\\node_modules\\process\\browser.js","buffer":"C:\\dev\\NEXUS\\node_modules\\buffer\\index.js","core-util-is":"C:\\dev\\NEXUS\\node_modules\\core-util-is\\lib\\util.js","events":"C:\\dev\\NEXUS\\node_modules\\events\\events.js","inherits":"C:\\dev\\NEXUS\\node_modules\\inherits\\inherits_browser.js","isarray":"C:\\dev\\NEXUS\\node_modules\\isarray\\index.js","stream":"C:\\dev\\NEXUS\\node_modules\\stream-browserify\\index.js","string_decoder/":"C:\\dev\\NEXUS\\node_modules\\readable-stream\\node_modules\\string_decoder\\index.js","util":"C:\\dev\\NEXUS\\node_modules\\browser-resolve\\empty.js"}],"C:\\dev\\NEXUS\\node_modules\\readable-stream\\lib\\_stream_transform.js":[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.

module.exports = Transform;

var Duplex = require('./_stream_duplex');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(Transform, Duplex);


function TransformState(options, stream) {
  this.afterTransform = function(er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb)
    return stream.emit('error', new Error('no writecb in Transform class'));

  ts.writechunk = null;
  ts.writecb = null;

  if (!util.isNullOrUndefined(data))
    stream.push(data);

  if (cb)
    cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}


function Transform(options) {
  if (!(this instanceof Transform))
    return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(options, this);

  // when the writable side finishes, then flush out anything remaining.
  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  this.once('prefinish', function() {
    if (util.isFunction(this._flush))
      this._flush(function(er) {
        done(stream, er);
      });
    else
      done(stream);
  });
}

Transform.prototype.push = function(chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function(chunk, encoding, cb) {
  throw new Error('not implemented');
};

Transform.prototype._write = function(chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform ||
        rs.needReadable ||
        rs.length < rs.highWaterMark)
      this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function(n) {
  var ts = this._transformState;

  if (!util.isNull(ts.writechunk) && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};


function done(stream, er) {
  if (er)
    return stream.emit('error', er);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length)
    throw new Error('calling transform done when ws.length != 0');

  if (ts.transforming)
    throw new Error('calling transform done when still transforming');

  return stream.push(null);
}

},{"./_stream_duplex":"C:\\dev\\NEXUS\\node_modules\\readable-stream\\lib\\_stream_duplex.js","core-util-is":"C:\\dev\\NEXUS\\node_modules\\core-util-is\\lib\\util.js","inherits":"C:\\dev\\NEXUS\\node_modules\\inherits\\inherits_browser.js"}],"C:\\dev\\NEXUS\\node_modules\\readable-stream\\lib\\_stream_writable.js":[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, cb), and it'll handle all
// the drain event emission and buffering.

module.exports = Writable;

/*<replacement>*/
var Buffer = require('buffer').Buffer;
/*</replacement>*/

Writable.WritableState = WritableState;


/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var Stream = require('stream');

util.inherits(Writable, Stream);

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
}

function WritableState(options, stream) {
  var Duplex = require('./_stream_duplex');

  options = options || {};

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex)
    this.objectMode = this.objectMode || !!options.writableObjectMode;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function(er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.buffer = [];

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;
}

function Writable(options) {
  var Duplex = require('./_stream_duplex');

  // Writable ctor is applied to Duplexes, though they're not
  // instanceof Writable, they're instanceof Readable.
  if (!(this instanceof Writable) && !(this instanceof Duplex))
    return new Writable(options);

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function() {
  this.emit('error', new Error('Cannot pipe. Not readable.'));
};


function writeAfterEnd(stream, state, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  process.nextTick(function() {
    cb(er);
  });
}

// If we get something that is not a buffer, string, null, or undefined,
// and we're not in objectMode, then that's an error.
// Otherwise stream chunks are all considered to be of length=1, and the
// watermarks determine how many objects to keep in the buffer, rather than
// how many bytes or characters.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  if (!util.isBuffer(chunk) &&
      !util.isString(chunk) &&
      !util.isNullOrUndefined(chunk) &&
      !state.objectMode) {
    var er = new TypeError('Invalid non-string/buffer chunk');
    stream.emit('error', er);
    process.nextTick(function() {
      cb(er);
    });
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function(chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  if (util.isFunction(encoding)) {
    cb = encoding;
    encoding = null;
  }

  if (util.isBuffer(chunk))
    encoding = 'buffer';
  else if (!encoding)
    encoding = state.defaultEncoding;

  if (!util.isFunction(cb))
    cb = function() {};

  if (state.ended)
    writeAfterEnd(this, state, cb);
  else if (validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function() {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function() {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing &&
        !state.corked &&
        !state.finished &&
        !state.bufferProcessing &&
        state.buffer.length)
      clearBuffer(this, state);
  }
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode &&
      state.decodeStrings !== false &&
      util.isString(chunk)) {
    chunk = new Buffer(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, chunk, encoding, cb) {
  chunk = decodeChunk(state, chunk, encoding);
  if (util.isBuffer(chunk))
    encoding = 'buffer';
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret)
    state.needDrain = true;

  if (state.writing || state.corked)
    state.buffer.push(new WriteReq(chunk, encoding, cb));
  else
    doWrite(stream, state, false, len, chunk, encoding, cb);

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev)
    stream._writev(chunk, state.onwrite);
  else
    stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  if (sync)
    process.nextTick(function() {
      state.pendingcb--;
      cb(er);
    });
  else {
    state.pendingcb--;
    cb(er);
  }

  stream._writableState.errorEmitted = true;
  stream.emit('error', er);
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er)
    onwriteError(stream, state, sync, er, cb);
  else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(stream, state);

    if (!finished &&
        !state.corked &&
        !state.bufferProcessing &&
        state.buffer.length) {
      clearBuffer(stream, state);
    }

    if (sync) {
      process.nextTick(function() {
        afterWrite(stream, state, finished, cb);
      });
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished)
    onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}


// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;

  if (stream._writev && state.buffer.length > 1) {
    // Fast case, write everything using _writev()
    var cbs = [];
    for (var c = 0; c < state.buffer.length; c++)
      cbs.push(state.buffer[c].callback);

    // count the one we are adding, as well.
    // TODO(isaacs) clean this up
    state.pendingcb++;
    doWrite(stream, state, true, state.length, state.buffer, '', function(err) {
      for (var i = 0; i < cbs.length; i++) {
        state.pendingcb--;
        cbs[i](err);
      }
    });

    // Clear buffer
    state.buffer = [];
  } else {
    // Slow case, write chunks one-by-one
    for (var c = 0; c < state.buffer.length; c++) {
      var entry = state.buffer[c];
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);

      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        c++;
        break;
      }
    }

    if (c < state.buffer.length)
      state.buffer = state.buffer.slice(c);
    else
      state.buffer.length = 0;
  }

  state.bufferProcessing = false;
}

Writable.prototype._write = function(chunk, encoding, cb) {
  cb(new Error('not implemented'));

};

Writable.prototype._writev = null;

Writable.prototype.end = function(chunk, encoding, cb) {
  var state = this._writableState;

  if (util.isFunction(chunk)) {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (util.isFunction(encoding)) {
    cb = encoding;
    encoding = null;
  }

  if (!util.isNullOrUndefined(chunk))
    this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished)
    endWritable(this, state, cb);
};


function needFinish(stream, state) {
  return (state.ending &&
          state.length === 0 &&
          !state.finished &&
          !state.writing);
}

function prefinish(stream, state) {
  if (!state.prefinished) {
    state.prefinished = true;
    stream.emit('prefinish');
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(stream, state);
  if (need) {
    if (state.pendingcb === 0) {
      prefinish(stream, state);
      state.finished = true;
      stream.emit('finish');
    } else
      prefinish(stream, state);
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished)
      process.nextTick(cb);
    else
      stream.once('finish', cb);
  }
  state.ended = true;
}

}).call(this,require('_process'))
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbGliL19zdHJlYW1fd3JpdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gQSBiaXQgc2ltcGxlciB0aGFuIHJlYWRhYmxlIHN0cmVhbXMuXG4vLyBJbXBsZW1lbnQgYW4gYXN5bmMgLl93cml0ZShjaHVuaywgY2IpLCBhbmQgaXQnbGwgaGFuZGxlIGFsbFxuLy8gdGhlIGRyYWluIGV2ZW50IGVtaXNzaW9uIGFuZCBidWZmZXJpbmcuXG5cbm1vZHVsZS5leHBvcnRzID0gV3JpdGFibGU7XG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgQnVmZmVyID0gcmVxdWlyZSgnYnVmZmVyJykuQnVmZmVyO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbldyaXRhYmxlLldyaXRhYmxlU3RhdGUgPSBXcml0YWJsZVN0YXRlO1xuXG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgdXRpbCA9IHJlcXVpcmUoJ2NvcmUtdXRpbC1pcycpO1xudXRpbC5pbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxudmFyIFN0cmVhbSA9IHJlcXVpcmUoJ3N0cmVhbScpO1xuXG51dGlsLmluaGVyaXRzKFdyaXRhYmxlLCBTdHJlYW0pO1xuXG5mdW5jdGlvbiBXcml0ZVJlcShjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG4gIHRoaXMuY2h1bmsgPSBjaHVuaztcbiAgdGhpcy5lbmNvZGluZyA9IGVuY29kaW5nO1xuICB0aGlzLmNhbGxiYWNrID0gY2I7XG59XG5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RhdGUob3B0aW9ucywgc3RyZWFtKSB7XG4gIHZhciBEdXBsZXggPSByZXF1aXJlKCcuL19zdHJlYW1fZHVwbGV4Jyk7XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgLy8gdGhlIHBvaW50IGF0IHdoaWNoIHdyaXRlKCkgc3RhcnRzIHJldHVybmluZyBmYWxzZVxuICAvLyBOb3RlOiAwIGlzIGEgdmFsaWQgdmFsdWUsIG1lYW5zIHRoYXQgd2UgYWx3YXlzIHJldHVybiBmYWxzZSBpZlxuICAvLyB0aGUgZW50aXJlIGJ1ZmZlciBpcyBub3QgZmx1c2hlZCBpbW1lZGlhdGVseSBvbiB3cml0ZSgpXG4gIHZhciBod20gPSBvcHRpb25zLmhpZ2hXYXRlck1hcms7XG4gIHZhciBkZWZhdWx0SHdtID0gb3B0aW9ucy5vYmplY3RNb2RlID8gMTYgOiAxNiAqIDEwMjQ7XG4gIHRoaXMuaGlnaFdhdGVyTWFyayA9IChod20gfHwgaHdtID09PSAwKSA/IGh3bSA6IGRlZmF1bHRId207XG5cbiAgLy8gb2JqZWN0IHN0cmVhbSBmbGFnIHRvIGluZGljYXRlIHdoZXRoZXIgb3Igbm90IHRoaXMgc3RyZWFtXG4gIC8vIGNvbnRhaW5zIGJ1ZmZlcnMgb3Igb2JqZWN0cy5cbiAgdGhpcy5vYmplY3RNb2RlID0gISFvcHRpb25zLm9iamVjdE1vZGU7XG5cbiAgaWYgKHN0cmVhbSBpbnN0YW5jZW9mIER1cGxleClcbiAgICB0aGlzLm9iamVjdE1vZGUgPSB0aGlzLm9iamVjdE1vZGUgfHwgISFvcHRpb25zLndyaXRhYmxlT2JqZWN0TW9kZTtcblxuICAvLyBjYXN0IHRvIGludHMuXG4gIHRoaXMuaGlnaFdhdGVyTWFyayA9IH5+dGhpcy5oaWdoV2F0ZXJNYXJrO1xuXG4gIHRoaXMubmVlZERyYWluID0gZmFsc2U7XG4gIC8vIGF0IHRoZSBzdGFydCBvZiBjYWxsaW5nIGVuZCgpXG4gIHRoaXMuZW5kaW5nID0gZmFsc2U7XG4gIC8vIHdoZW4gZW5kKCkgaGFzIGJlZW4gY2FsbGVkLCBhbmQgcmV0dXJuZWRcbiAgdGhpcy5lbmRlZCA9IGZhbHNlO1xuICAvLyB3aGVuICdmaW5pc2gnIGlzIGVtaXR0ZWRcbiAgdGhpcy5maW5pc2hlZCA9IGZhbHNlO1xuXG4gIC8vIHNob3VsZCB3ZSBkZWNvZGUgc3RyaW5ncyBpbnRvIGJ1ZmZlcnMgYmVmb3JlIHBhc3NpbmcgdG8gX3dyaXRlP1xuICAvLyB0aGlzIGlzIGhlcmUgc28gdGhhdCBzb21lIG5vZGUtY29yZSBzdHJlYW1zIGNhbiBvcHRpbWl6ZSBzdHJpbmdcbiAgLy8gaGFuZGxpbmcgYXQgYSBsb3dlciBsZXZlbC5cbiAgdmFyIG5vRGVjb2RlID0gb3B0aW9ucy5kZWNvZGVTdHJpbmdzID09PSBmYWxzZTtcbiAgdGhpcy5kZWNvZGVTdHJpbmdzID0gIW5vRGVjb2RlO1xuXG4gIC8vIENyeXB0byBpcyBraW5kIG9mIG9sZCBhbmQgY3J1c3R5LiAgSGlzdG9yaWNhbGx5LCBpdHMgZGVmYXVsdCBzdHJpbmdcbiAgLy8gZW5jb2RpbmcgaXMgJ2JpbmFyeScgc28gd2UgaGF2ZSB0byBtYWtlIHRoaXMgY29uZmlndXJhYmxlLlxuICAvLyBFdmVyeXRoaW5nIGVsc2UgaW4gdGhlIHVuaXZlcnNlIHVzZXMgJ3V0ZjgnLCB0aG91Z2guXG4gIHRoaXMuZGVmYXVsdEVuY29kaW5nID0gb3B0aW9ucy5kZWZhdWx0RW5jb2RpbmcgfHwgJ3V0ZjgnO1xuXG4gIC8vIG5vdCBhbiBhY3R1YWwgYnVmZmVyIHdlIGtlZXAgdHJhY2sgb2YsIGJ1dCBhIG1lYXN1cmVtZW50XG4gIC8vIG9mIGhvdyBtdWNoIHdlJ3JlIHdhaXRpbmcgdG8gZ2V0IHB1c2hlZCB0byBzb21lIHVuZGVybHlpbmdcbiAgLy8gc29ja2V0IG9yIGZpbGUuXG4gIHRoaXMubGVuZ3RoID0gMDtcblxuICAvLyBhIGZsYWcgdG8gc2VlIHdoZW4gd2UncmUgaW4gdGhlIG1pZGRsZSBvZiBhIHdyaXRlLlxuICB0aGlzLndyaXRpbmcgPSBmYWxzZTtcblxuICAvLyB3aGVuIHRydWUgYWxsIHdyaXRlcyB3aWxsIGJlIGJ1ZmZlcmVkIHVudGlsIC51bmNvcmsoKSBjYWxsXG4gIHRoaXMuY29ya2VkID0gMDtcblxuICAvLyBhIGZsYWcgdG8gYmUgYWJsZSB0byB0ZWxsIGlmIHRoZSBvbndyaXRlIGNiIGlzIGNhbGxlZCBpbW1lZGlhdGVseSxcbiAgLy8gb3Igb24gYSBsYXRlciB0aWNrLiAgV2Ugc2V0IHRoaXMgdG8gdHJ1ZSBhdCBmaXJzdCwgYmVjYXVzZSBhbnlcbiAgLy8gYWN0aW9ucyB0aGF0IHNob3VsZG4ndCBoYXBwZW4gdW50aWwgXCJsYXRlclwiIHNob3VsZCBnZW5lcmFsbHkgYWxzb1xuICAvLyBub3QgaGFwcGVuIGJlZm9yZSB0aGUgZmlyc3Qgd3JpdGUgY2FsbC5cbiAgdGhpcy5zeW5jID0gdHJ1ZTtcblxuICAvLyBhIGZsYWcgdG8ga25vdyBpZiB3ZSdyZSBwcm9jZXNzaW5nIHByZXZpb3VzbHkgYnVmZmVyZWQgaXRlbXMsIHdoaWNoXG4gIC8vIG1heSBjYWxsIHRoZSBfd3JpdGUoKSBjYWxsYmFjayBpbiB0aGUgc2FtZSB0aWNrLCBzbyB0aGF0IHdlIGRvbid0XG4gIC8vIGVuZCB1cCBpbiBhbiBvdmVybGFwcGVkIG9ud3JpdGUgc2l0dWF0aW9uLlxuICB0aGlzLmJ1ZmZlclByb2Nlc3NpbmcgPSBmYWxzZTtcblxuICAvLyB0aGUgY2FsbGJhY2sgdGhhdCdzIHBhc3NlZCB0byBfd3JpdGUoY2h1bmssY2IpXG4gIHRoaXMub253cml0ZSA9IGZ1bmN0aW9uKGVyKSB7XG4gICAgb253cml0ZShzdHJlYW0sIGVyKTtcbiAgfTtcblxuICAvLyB0aGUgY2FsbGJhY2sgdGhhdCB0aGUgdXNlciBzdXBwbGllcyB0byB3cml0ZShjaHVuayxlbmNvZGluZyxjYilcbiAgdGhpcy53cml0ZWNiID0gbnVsbDtcblxuICAvLyB0aGUgYW1vdW50IHRoYXQgaXMgYmVpbmcgd3JpdHRlbiB3aGVuIF93cml0ZSBpcyBjYWxsZWQuXG4gIHRoaXMud3JpdGVsZW4gPSAwO1xuXG4gIHRoaXMuYnVmZmVyID0gW107XG5cbiAgLy8gbnVtYmVyIG9mIHBlbmRpbmcgdXNlci1zdXBwbGllZCB3cml0ZSBjYWxsYmFja3NcbiAgLy8gdGhpcyBtdXN0IGJlIDAgYmVmb3JlICdmaW5pc2gnIGNhbiBiZSBlbWl0dGVkXG4gIHRoaXMucGVuZGluZ2NiID0gMDtcblxuICAvLyBlbWl0IHByZWZpbmlzaCBpZiB0aGUgb25seSB0aGluZyB3ZSdyZSB3YWl0aW5nIGZvciBpcyBfd3JpdGUgY2JzXG4gIC8vIFRoaXMgaXMgcmVsZXZhbnQgZm9yIHN5bmNocm9ub3VzIFRyYW5zZm9ybSBzdHJlYW1zXG4gIHRoaXMucHJlZmluaXNoZWQgPSBmYWxzZTtcblxuICAvLyBUcnVlIGlmIHRoZSBlcnJvciB3YXMgYWxyZWFkeSBlbWl0dGVkIGFuZCBzaG91bGQgbm90IGJlIHRocm93biBhZ2FpblxuICB0aGlzLmVycm9yRW1pdHRlZCA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBXcml0YWJsZShvcHRpb25zKSB7XG4gIHZhciBEdXBsZXggPSByZXF1aXJlKCcuL19zdHJlYW1fZHVwbGV4Jyk7XG5cbiAgLy8gV3JpdGFibGUgY3RvciBpcyBhcHBsaWVkIHRvIER1cGxleGVzLCB0aG91Z2ggdGhleSdyZSBub3RcbiAgLy8gaW5zdGFuY2VvZiBXcml0YWJsZSwgdGhleSdyZSBpbnN0YW5jZW9mIFJlYWRhYmxlLlxuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgV3JpdGFibGUpICYmICEodGhpcyBpbnN0YW5jZW9mIER1cGxleCkpXG4gICAgcmV0dXJuIG5ldyBXcml0YWJsZShvcHRpb25zKTtcblxuICB0aGlzLl93cml0YWJsZVN0YXRlID0gbmV3IFdyaXRhYmxlU3RhdGUob3B0aW9ucywgdGhpcyk7XG5cbiAgLy8gbGVnYWN5LlxuICB0aGlzLndyaXRhYmxlID0gdHJ1ZTtcblxuICBTdHJlYW0uY2FsbCh0aGlzKTtcbn1cblxuLy8gT3RoZXJ3aXNlIHBlb3BsZSBjYW4gcGlwZSBXcml0YWJsZSBzdHJlYW1zLCB3aGljaCBpcyBqdXN0IHdyb25nLlxuV3JpdGFibGUucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5lbWl0KCdlcnJvcicsIG5ldyBFcnJvcignQ2Fubm90IHBpcGUuIE5vdCByZWFkYWJsZS4nKSk7XG59O1xuXG5cbmZ1bmN0aW9uIHdyaXRlQWZ0ZXJFbmQoc3RyZWFtLCBzdGF0ZSwgY2IpIHtcbiAgdmFyIGVyID0gbmV3IEVycm9yKCd3cml0ZSBhZnRlciBlbmQnKTtcbiAgLy8gVE9ETzogZGVmZXIgZXJyb3IgZXZlbnRzIGNvbnNpc3RlbnRseSBldmVyeXdoZXJlLCBub3QganVzdCB0aGUgY2JcbiAgc3RyZWFtLmVtaXQoJ2Vycm9yJywgZXIpO1xuICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uKCkge1xuICAgIGNiKGVyKTtcbiAgfSk7XG59XG5cbi8vIElmIHdlIGdldCBzb21ldGhpbmcgdGhhdCBpcyBub3QgYSBidWZmZXIsIHN0cmluZywgbnVsbCwgb3IgdW5kZWZpbmVkLFxuLy8gYW5kIHdlJ3JlIG5vdCBpbiBvYmplY3RNb2RlLCB0aGVuIHRoYXQncyBhbiBlcnJvci5cbi8vIE90aGVyd2lzZSBzdHJlYW0gY2h1bmtzIGFyZSBhbGwgY29uc2lkZXJlZCB0byBiZSBvZiBsZW5ndGg9MSwgYW5kIHRoZVxuLy8gd2F0ZXJtYXJrcyBkZXRlcm1pbmUgaG93IG1hbnkgb2JqZWN0cyB0byBrZWVwIGluIHRoZSBidWZmZXIsIHJhdGhlciB0aGFuXG4vLyBob3cgbWFueSBieXRlcyBvciBjaGFyYWN0ZXJzLlxuZnVuY3Rpb24gdmFsaWRDaHVuayhzdHJlYW0sIHN0YXRlLCBjaHVuaywgY2IpIHtcbiAgdmFyIHZhbGlkID0gdHJ1ZTtcbiAgaWYgKCF1dGlsLmlzQnVmZmVyKGNodW5rKSAmJlxuICAgICAgIXV0aWwuaXNTdHJpbmcoY2h1bmspICYmXG4gICAgICAhdXRpbC5pc051bGxPclVuZGVmaW5lZChjaHVuaykgJiZcbiAgICAgICFzdGF0ZS5vYmplY3RNb2RlKSB7XG4gICAgdmFyIGVyID0gbmV3IFR5cGVFcnJvcignSW52YWxpZCBub24tc3RyaW5nL2J1ZmZlciBjaHVuaycpO1xuICAgIHN0cmVhbS5lbWl0KCdlcnJvcicsIGVyKTtcbiAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgY2IoZXIpO1xuICAgIH0pO1xuICAgIHZhbGlkID0gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHZhbGlkO1xufVxuXG5Xcml0YWJsZS5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbihjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXMuX3dyaXRhYmxlU3RhdGU7XG4gIHZhciByZXQgPSBmYWxzZTtcblxuICBpZiAodXRpbC5pc0Z1bmN0aW9uKGVuY29kaW5nKSkge1xuICAgIGNiID0gZW5jb2Rpbmc7XG4gICAgZW5jb2RpbmcgPSBudWxsO1xuICB9XG5cbiAgaWYgKHV0aWwuaXNCdWZmZXIoY2h1bmspKVxuICAgIGVuY29kaW5nID0gJ2J1ZmZlcic7XG4gIGVsc2UgaWYgKCFlbmNvZGluZylcbiAgICBlbmNvZGluZyA9IHN0YXRlLmRlZmF1bHRFbmNvZGluZztcblxuICBpZiAoIXV0aWwuaXNGdW5jdGlvbihjYikpXG4gICAgY2IgPSBmdW5jdGlvbigpIHt9O1xuXG4gIGlmIChzdGF0ZS5lbmRlZClcbiAgICB3cml0ZUFmdGVyRW5kKHRoaXMsIHN0YXRlLCBjYik7XG4gIGVsc2UgaWYgKHZhbGlkQ2h1bmsodGhpcywgc3RhdGUsIGNodW5rLCBjYikpIHtcbiAgICBzdGF0ZS5wZW5kaW5nY2IrKztcbiAgICByZXQgPSB3cml0ZU9yQnVmZmVyKHRoaXMsIHN0YXRlLCBjaHVuaywgZW5jb2RpbmcsIGNiKTtcbiAgfVxuXG4gIHJldHVybiByZXQ7XG59O1xuXG5Xcml0YWJsZS5wcm90b3R5cGUuY29yayA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc3RhdGUgPSB0aGlzLl93cml0YWJsZVN0YXRlO1xuXG4gIHN0YXRlLmNvcmtlZCsrO1xufTtcblxuV3JpdGFibGUucHJvdG90eXBlLnVuY29yayA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc3RhdGUgPSB0aGlzLl93cml0YWJsZVN0YXRlO1xuXG4gIGlmIChzdGF0ZS5jb3JrZWQpIHtcbiAgICBzdGF0ZS5jb3JrZWQtLTtcblxuICAgIGlmICghc3RhdGUud3JpdGluZyAmJlxuICAgICAgICAhc3RhdGUuY29ya2VkICYmXG4gICAgICAgICFzdGF0ZS5maW5pc2hlZCAmJlxuICAgICAgICAhc3RhdGUuYnVmZmVyUHJvY2Vzc2luZyAmJlxuICAgICAgICBzdGF0ZS5idWZmZXIubGVuZ3RoKVxuICAgICAgY2xlYXJCdWZmZXIodGhpcywgc3RhdGUpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBkZWNvZGVDaHVuayhzdGF0ZSwgY2h1bmssIGVuY29kaW5nKSB7XG4gIGlmICghc3RhdGUub2JqZWN0TW9kZSAmJlxuICAgICAgc3RhdGUuZGVjb2RlU3RyaW5ncyAhPT0gZmFsc2UgJiZcbiAgICAgIHV0aWwuaXNTdHJpbmcoY2h1bmspKSB7XG4gICAgY2h1bmsgPSBuZXcgQnVmZmVyKGNodW5rLCBlbmNvZGluZyk7XG4gIH1cbiAgcmV0dXJuIGNodW5rO1xufVxuXG4vLyBpZiB3ZSdyZSBhbHJlYWR5IHdyaXRpbmcgc29tZXRoaW5nLCB0aGVuIGp1c3QgcHV0IHRoaXNcbi8vIGluIHRoZSBxdWV1ZSwgYW5kIHdhaXQgb3VyIHR1cm4uICBPdGhlcndpc2UsIGNhbGwgX3dyaXRlXG4vLyBJZiB3ZSByZXR1cm4gZmFsc2UsIHRoZW4gd2UgbmVlZCBhIGRyYWluIGV2ZW50LCBzbyBzZXQgdGhhdCBmbGFnLlxuZnVuY3Rpb24gd3JpdGVPckJ1ZmZlcihzdHJlYW0sIHN0YXRlLCBjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG4gIGNodW5rID0gZGVjb2RlQ2h1bmsoc3RhdGUsIGNodW5rLCBlbmNvZGluZyk7XG4gIGlmICh1dGlsLmlzQnVmZmVyKGNodW5rKSlcbiAgICBlbmNvZGluZyA9ICdidWZmZXInO1xuICB2YXIgbGVuID0gc3RhdGUub2JqZWN0TW9kZSA/IDEgOiBjaHVuay5sZW5ndGg7XG5cbiAgc3RhdGUubGVuZ3RoICs9IGxlbjtcblxuICB2YXIgcmV0ID0gc3RhdGUubGVuZ3RoIDwgc3RhdGUuaGlnaFdhdGVyTWFyaztcbiAgLy8gd2UgbXVzdCBlbnN1cmUgdGhhdCBwcmV2aW91cyBuZWVkRHJhaW4gd2lsbCBub3QgYmUgcmVzZXQgdG8gZmFsc2UuXG4gIGlmICghcmV0KVxuICAgIHN0YXRlLm5lZWREcmFpbiA9IHRydWU7XG5cbiAgaWYgKHN0YXRlLndyaXRpbmcgfHwgc3RhdGUuY29ya2VkKVxuICAgIHN0YXRlLmJ1ZmZlci5wdXNoKG5ldyBXcml0ZVJlcShjaHVuaywgZW5jb2RpbmcsIGNiKSk7XG4gIGVsc2VcbiAgICBkb1dyaXRlKHN0cmVhbSwgc3RhdGUsIGZhbHNlLCBsZW4sIGNodW5rLCBlbmNvZGluZywgY2IpO1xuXG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIGRvV3JpdGUoc3RyZWFtLCBzdGF0ZSwgd3JpdGV2LCBsZW4sIGNodW5rLCBlbmNvZGluZywgY2IpIHtcbiAgc3RhdGUud3JpdGVsZW4gPSBsZW47XG4gIHN0YXRlLndyaXRlY2IgPSBjYjtcbiAgc3RhdGUud3JpdGluZyA9IHRydWU7XG4gIHN0YXRlLnN5bmMgPSB0cnVlO1xuICBpZiAod3JpdGV2KVxuICAgIHN0cmVhbS5fd3JpdGV2KGNodW5rLCBzdGF0ZS5vbndyaXRlKTtcbiAgZWxzZVxuICAgIHN0cmVhbS5fd3JpdGUoY2h1bmssIGVuY29kaW5nLCBzdGF0ZS5vbndyaXRlKTtcbiAgc3RhdGUuc3luYyA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBvbndyaXRlRXJyb3Ioc3RyZWFtLCBzdGF0ZSwgc3luYywgZXIsIGNiKSB7XG4gIGlmIChzeW5jKVxuICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICBzdGF0ZS5wZW5kaW5nY2ItLTtcbiAgICAgIGNiKGVyKTtcbiAgICB9KTtcbiAgZWxzZSB7XG4gICAgc3RhdGUucGVuZGluZ2NiLS07XG4gICAgY2IoZXIpO1xuICB9XG5cbiAgc3RyZWFtLl93cml0YWJsZVN0YXRlLmVycm9yRW1pdHRlZCA9IHRydWU7XG4gIHN0cmVhbS5lbWl0KCdlcnJvcicsIGVyKTtcbn1cblxuZnVuY3Rpb24gb253cml0ZVN0YXRlVXBkYXRlKHN0YXRlKSB7XG4gIHN0YXRlLndyaXRpbmcgPSBmYWxzZTtcbiAgc3RhdGUud3JpdGVjYiA9IG51bGw7XG4gIHN0YXRlLmxlbmd0aCAtPSBzdGF0ZS53cml0ZWxlbjtcbiAgc3RhdGUud3JpdGVsZW4gPSAwO1xufVxuXG5mdW5jdGlvbiBvbndyaXRlKHN0cmVhbSwgZXIpIHtcbiAgdmFyIHN0YXRlID0gc3RyZWFtLl93cml0YWJsZVN0YXRlO1xuICB2YXIgc3luYyA9IHN0YXRlLnN5bmM7XG4gIHZhciBjYiA9IHN0YXRlLndyaXRlY2I7XG5cbiAgb253cml0ZVN0YXRlVXBkYXRlKHN0YXRlKTtcblxuICBpZiAoZXIpXG4gICAgb253cml0ZUVycm9yKHN0cmVhbSwgc3RhdGUsIHN5bmMsIGVyLCBjYik7XG4gIGVsc2Uge1xuICAgIC8vIENoZWNrIGlmIHdlJ3JlIGFjdHVhbGx5IHJlYWR5IHRvIGZpbmlzaCwgYnV0IGRvbid0IGVtaXQgeWV0XG4gICAgdmFyIGZpbmlzaGVkID0gbmVlZEZpbmlzaChzdHJlYW0sIHN0YXRlKTtcblxuICAgIGlmICghZmluaXNoZWQgJiZcbiAgICAgICAgIXN0YXRlLmNvcmtlZCAmJlxuICAgICAgICAhc3RhdGUuYnVmZmVyUHJvY2Vzc2luZyAmJlxuICAgICAgICBzdGF0ZS5idWZmZXIubGVuZ3RoKSB7XG4gICAgICBjbGVhckJ1ZmZlcihzdHJlYW0sIHN0YXRlKTtcbiAgICB9XG5cbiAgICBpZiAoc3luYykge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgYWZ0ZXJXcml0ZShzdHJlYW0sIHN0YXRlLCBmaW5pc2hlZCwgY2IpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFmdGVyV3JpdGUoc3RyZWFtLCBzdGF0ZSwgZmluaXNoZWQsIGNiKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYWZ0ZXJXcml0ZShzdHJlYW0sIHN0YXRlLCBmaW5pc2hlZCwgY2IpIHtcbiAgaWYgKCFmaW5pc2hlZClcbiAgICBvbndyaXRlRHJhaW4oc3RyZWFtLCBzdGF0ZSk7XG4gIHN0YXRlLnBlbmRpbmdjYi0tO1xuICBjYigpO1xuICBmaW5pc2hNYXliZShzdHJlYW0sIHN0YXRlKTtcbn1cblxuLy8gTXVzdCBmb3JjZSBjYWxsYmFjayB0byBiZSBjYWxsZWQgb24gbmV4dFRpY2ssIHNvIHRoYXQgd2UgZG9uJ3Rcbi8vIGVtaXQgJ2RyYWluJyBiZWZvcmUgdGhlIHdyaXRlKCkgY29uc3VtZXIgZ2V0cyB0aGUgJ2ZhbHNlJyByZXR1cm5cbi8vIHZhbHVlLCBhbmQgaGFzIGEgY2hhbmNlIHRvIGF0dGFjaCBhICdkcmFpbicgbGlzdGVuZXIuXG5mdW5jdGlvbiBvbndyaXRlRHJhaW4oc3RyZWFtLCBzdGF0ZSkge1xuICBpZiAoc3RhdGUubGVuZ3RoID09PSAwICYmIHN0YXRlLm5lZWREcmFpbikge1xuICAgIHN0YXRlLm5lZWREcmFpbiA9IGZhbHNlO1xuICAgIHN0cmVhbS5lbWl0KCdkcmFpbicpO1xuICB9XG59XG5cblxuLy8gaWYgdGhlcmUncyBzb21ldGhpbmcgaW4gdGhlIGJ1ZmZlciB3YWl0aW5nLCB0aGVuIHByb2Nlc3MgaXRcbmZ1bmN0aW9uIGNsZWFyQnVmZmVyKHN0cmVhbSwgc3RhdGUpIHtcbiAgc3RhdGUuYnVmZmVyUHJvY2Vzc2luZyA9IHRydWU7XG5cbiAgaWYgKHN0cmVhbS5fd3JpdGV2ICYmIHN0YXRlLmJ1ZmZlci5sZW5ndGggPiAxKSB7XG4gICAgLy8gRmFzdCBjYXNlLCB3cml0ZSBldmVyeXRoaW5nIHVzaW5nIF93cml0ZXYoKVxuICAgIHZhciBjYnMgPSBbXTtcbiAgICBmb3IgKHZhciBjID0gMDsgYyA8IHN0YXRlLmJ1ZmZlci5sZW5ndGg7IGMrKylcbiAgICAgIGNicy5wdXNoKHN0YXRlLmJ1ZmZlcltjXS5jYWxsYmFjayk7XG5cbiAgICAvLyBjb3VudCB0aGUgb25lIHdlIGFyZSBhZGRpbmcsIGFzIHdlbGwuXG4gICAgLy8gVE9ETyhpc2FhY3MpIGNsZWFuIHRoaXMgdXBcbiAgICBzdGF0ZS5wZW5kaW5nY2IrKztcbiAgICBkb1dyaXRlKHN0cmVhbSwgc3RhdGUsIHRydWUsIHN0YXRlLmxlbmd0aCwgc3RhdGUuYnVmZmVyLCAnJywgZnVuY3Rpb24oZXJyKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNicy5sZW5ndGg7IGkrKykge1xuICAgICAgICBzdGF0ZS5wZW5kaW5nY2ItLTtcbiAgICAgICAgY2JzW2ldKGVycik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBDbGVhciBidWZmZXJcbiAgICBzdGF0ZS5idWZmZXIgPSBbXTtcbiAgfSBlbHNlIHtcbiAgICAvLyBTbG93IGNhc2UsIHdyaXRlIGNodW5rcyBvbmUtYnktb25lXG4gICAgZm9yICh2YXIgYyA9IDA7IGMgPCBzdGF0ZS5idWZmZXIubGVuZ3RoOyBjKyspIHtcbiAgICAgIHZhciBlbnRyeSA9IHN0YXRlLmJ1ZmZlcltjXTtcbiAgICAgIHZhciBjaHVuayA9IGVudHJ5LmNodW5rO1xuICAgICAgdmFyIGVuY29kaW5nID0gZW50cnkuZW5jb2Rpbmc7XG4gICAgICB2YXIgY2IgPSBlbnRyeS5jYWxsYmFjaztcbiAgICAgIHZhciBsZW4gPSBzdGF0ZS5vYmplY3RNb2RlID8gMSA6IGNodW5rLmxlbmd0aDtcblxuICAgICAgZG9Xcml0ZShzdHJlYW0sIHN0YXRlLCBmYWxzZSwgbGVuLCBjaHVuaywgZW5jb2RpbmcsIGNiKTtcblxuICAgICAgLy8gaWYgd2UgZGlkbid0IGNhbGwgdGhlIG9ud3JpdGUgaW1tZWRpYXRlbHksIHRoZW5cbiAgICAgIC8vIGl0IG1lYW5zIHRoYXQgd2UgbmVlZCB0byB3YWl0IHVudGlsIGl0IGRvZXMuXG4gICAgICAvLyBhbHNvLCB0aGF0IG1lYW5zIHRoYXQgdGhlIGNodW5rIGFuZCBjYiBhcmUgY3VycmVudGx5XG4gICAgICAvLyBiZWluZyBwcm9jZXNzZWQsIHNvIG1vdmUgdGhlIGJ1ZmZlciBjb3VudGVyIHBhc3QgdGhlbS5cbiAgICAgIGlmIChzdGF0ZS53cml0aW5nKSB7XG4gICAgICAgIGMrKztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGMgPCBzdGF0ZS5idWZmZXIubGVuZ3RoKVxuICAgICAgc3RhdGUuYnVmZmVyID0gc3RhdGUuYnVmZmVyLnNsaWNlKGMpO1xuICAgIGVsc2VcbiAgICAgIHN0YXRlLmJ1ZmZlci5sZW5ndGggPSAwO1xuICB9XG5cbiAgc3RhdGUuYnVmZmVyUHJvY2Vzc2luZyA9IGZhbHNlO1xufVxuXG5Xcml0YWJsZS5wcm90b3R5cGUuX3dyaXRlID0gZnVuY3Rpb24oY2h1bmssIGVuY29kaW5nLCBjYikge1xuICBjYihuZXcgRXJyb3IoJ25vdCBpbXBsZW1lbnRlZCcpKTtcblxufTtcblxuV3JpdGFibGUucHJvdG90eXBlLl93cml0ZXYgPSBudWxsO1xuXG5Xcml0YWJsZS5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24oY2h1bmssIGVuY29kaW5nLCBjYikge1xuICB2YXIgc3RhdGUgPSB0aGlzLl93cml0YWJsZVN0YXRlO1xuXG4gIGlmICh1dGlsLmlzRnVuY3Rpb24oY2h1bmspKSB7XG4gICAgY2IgPSBjaHVuaztcbiAgICBjaHVuayA9IG51bGw7XG4gICAgZW5jb2RpbmcgPSBudWxsO1xuICB9IGVsc2UgaWYgKHV0aWwuaXNGdW5jdGlvbihlbmNvZGluZykpIHtcbiAgICBjYiA9IGVuY29kaW5nO1xuICAgIGVuY29kaW5nID0gbnVsbDtcbiAgfVxuXG4gIGlmICghdXRpbC5pc051bGxPclVuZGVmaW5lZChjaHVuaykpXG4gICAgdGhpcy53cml0ZShjaHVuaywgZW5jb2RpbmcpO1xuXG4gIC8vIC5lbmQoKSBmdWxseSB1bmNvcmtzXG4gIGlmIChzdGF0ZS5jb3JrZWQpIHtcbiAgICBzdGF0ZS5jb3JrZWQgPSAxO1xuICAgIHRoaXMudW5jb3JrKCk7XG4gIH1cblxuICAvLyBpZ25vcmUgdW5uZWNlc3NhcnkgZW5kKCkgY2FsbHMuXG4gIGlmICghc3RhdGUuZW5kaW5nICYmICFzdGF0ZS5maW5pc2hlZClcbiAgICBlbmRXcml0YWJsZSh0aGlzLCBzdGF0ZSwgY2IpO1xufTtcblxuXG5mdW5jdGlvbiBuZWVkRmluaXNoKHN0cmVhbSwgc3RhdGUpIHtcbiAgcmV0dXJuIChzdGF0ZS5lbmRpbmcgJiZcbiAgICAgICAgICBzdGF0ZS5sZW5ndGggPT09IDAgJiZcbiAgICAgICAgICAhc3RhdGUuZmluaXNoZWQgJiZcbiAgICAgICAgICAhc3RhdGUud3JpdGluZyk7XG59XG5cbmZ1bmN0aW9uIHByZWZpbmlzaChzdHJlYW0sIHN0YXRlKSB7XG4gIGlmICghc3RhdGUucHJlZmluaXNoZWQpIHtcbiAgICBzdGF0ZS5wcmVmaW5pc2hlZCA9IHRydWU7XG4gICAgc3RyZWFtLmVtaXQoJ3ByZWZpbmlzaCcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZpbmlzaE1heWJlKHN0cmVhbSwgc3RhdGUpIHtcbiAgdmFyIG5lZWQgPSBuZWVkRmluaXNoKHN0cmVhbSwgc3RhdGUpO1xuICBpZiAobmVlZCkge1xuICAgIGlmIChzdGF0ZS5wZW5kaW5nY2IgPT09IDApIHtcbiAgICAgIHByZWZpbmlzaChzdHJlYW0sIHN0YXRlKTtcbiAgICAgIHN0YXRlLmZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgIHN0cmVhbS5lbWl0KCdmaW5pc2gnKTtcbiAgICB9IGVsc2VcbiAgICAgIHByZWZpbmlzaChzdHJlYW0sIHN0YXRlKTtcbiAgfVxuICByZXR1cm4gbmVlZDtcbn1cblxuZnVuY3Rpb24gZW5kV3JpdGFibGUoc3RyZWFtLCBzdGF0ZSwgY2IpIHtcbiAgc3RhdGUuZW5kaW5nID0gdHJ1ZTtcbiAgZmluaXNoTWF5YmUoc3RyZWFtLCBzdGF0ZSk7XG4gIGlmIChjYikge1xuICAgIGlmIChzdGF0ZS5maW5pc2hlZClcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soY2IpO1xuICAgIGVsc2VcbiAgICAgIHN0cmVhbS5vbmNlKCdmaW5pc2gnLCBjYik7XG4gIH1cbiAgc3RhdGUuZW5kZWQgPSB0cnVlO1xufVxuIl19
},{"./_stream_duplex":"C:\\dev\\NEXUS\\node_modules\\readable-stream\\lib\\_stream_duplex.js","_process":"C:\\dev\\NEXUS\\node_modules\\process\\browser.js","buffer":"C:\\dev\\NEXUS\\node_modules\\buffer\\index.js","core-util-is":"C:\\dev\\NEXUS\\node_modules\\core-util-is\\lib\\util.js","inherits":"C:\\dev\\NEXUS\\node_modules\\inherits\\inherits_browser.js","stream":"C:\\dev\\NEXUS\\node_modules\\stream-browserify\\index.js"}],"C:\\dev\\NEXUS\\node_modules\\readable-stream\\node_modules\\string_decoder\\index.js":[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var Buffer = require('buffer').Buffer;

var isBufferEncoding = Buffer.isEncoding
  || function(encoding) {
       switch (encoding && encoding.toLowerCase()) {
         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
         default: return false;
       }
     }


function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters. CESU-8 is handled as part of the UTF-8 encoding.
//
// @TODO Handling all encodings inside a single object makes it very difficult
// to reason about this code, so it should be split up in the future.
// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
// points as used by CESU-8.
var StringDecoder = exports.StringDecoder = function(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  // Enough space to store all bytes of a single character. UTF-8 needs 4
  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
  this.charBuffer = new Buffer(6);
  // Number of bytes received for the current incomplete multi-byte character.
  this.charReceived = 0;
  // Number of bytes expected for the current incomplete multi-byte character.
  this.charLength = 0;
};


// write decodes the given buffer and returns it as JS string that is
// guaranteed to not contain any partial multi-byte characters. Any partial
// character found at the end of the buffer is buffered up, and will be
// returned when calling write again with the remaining bytes.
//
// Note: Converting a Buffer containing an orphan surrogate to a String
// currently works, but converting a String to a Buffer (via `new Buffer`, or
// Buffer#write) will replace incomplete surrogates with the unicode
// replacement character. See https://codereview.chromium.org/121173009/ .
StringDecoder.prototype.write = function(buffer) {
  var charStr = '';
  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var available = (buffer.length >= this.charLength - this.charReceived) ?
        this.charLength - this.charReceived :
        buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, 0, available);
    this.charReceived += available;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // remove bytes belonging to the current character from the buffer
    buffer = buffer.slice(available, buffer.length);

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (buffer.length === 0) {
      return charStr;
    }
    break;
  }

  // determine and set charLength / charReceived
  this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
    end -= this.charReceived;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    buffer.copy(this.charBuffer, 0, 0, size);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

// detectIncompleteChar determines if there is an incomplete UTF-8 character at
// the end of the given buffer. If so, it sets this.charLength to the byte
// length that character, and sets this.charReceived to the number of bytes
// that are available for this character.
StringDecoder.prototype.detectIncompleteChar = function(buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = (buffer.length >= 3) ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }
  this.charReceived = i;
};

StringDecoder.prototype.end = function(buffer) {
  var res = '';
  if (buffer && buffer.length)
    res = this.write(buffer);

  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }

  return res;
};

function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}

function utf16DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 2;
  this.charLength = this.charReceived ? 2 : 0;
}

function base64DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 3;
  this.charLength = this.charReceived ? 3 : 0;
}

},{"buffer":"C:\\dev\\NEXUS\\node_modules\\buffer\\index.js"}],"C:\\dev\\NEXUS\\node_modules\\readable-stream\\passthrough.js":[function(require,module,exports){
module.exports = require("./lib/_stream_passthrough.js")

},{"./lib/_stream_passthrough.js":"C:\\dev\\NEXUS\\node_modules\\readable-stream\\lib\\_stream_passthrough.js"}],"C:\\dev\\NEXUS\\node_modules\\readable-stream\\readable.js":[function(require,module,exports){
(function (process){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = require('stream');
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');
if (!process.browser && process.env.READABLE_STREAM === 'disable') {
  module.exports = require('stream');
}

}).call(this,require('_process'))
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vcmVhZGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL19zdHJlYW1fcmVhZGFibGUuanMnKTtcbmV4cG9ydHMuU3RyZWFtID0gcmVxdWlyZSgnc3RyZWFtJyk7XG5leHBvcnRzLlJlYWRhYmxlID0gZXhwb3J0cztcbmV4cG9ydHMuV3JpdGFibGUgPSByZXF1aXJlKCcuL2xpYi9fc3RyZWFtX3dyaXRhYmxlLmpzJyk7XG5leHBvcnRzLkR1cGxleCA9IHJlcXVpcmUoJy4vbGliL19zdHJlYW1fZHVwbGV4LmpzJyk7XG5leHBvcnRzLlRyYW5zZm9ybSA9IHJlcXVpcmUoJy4vbGliL19zdHJlYW1fdHJhbnNmb3JtLmpzJyk7XG5leHBvcnRzLlBhc3NUaHJvdWdoID0gcmVxdWlyZSgnLi9saWIvX3N0cmVhbV9wYXNzdGhyb3VnaC5qcycpO1xuaWYgKCFwcm9jZXNzLmJyb3dzZXIgJiYgcHJvY2Vzcy5lbnYuUkVBREFCTEVfU1RSRUFNID09PSAnZGlzYWJsZScpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCdzdHJlYW0nKTtcbn1cbiJdfQ==
},{"./lib/_stream_duplex.js":"C:\\dev\\NEXUS\\node_modules\\readable-stream\\lib\\_stream_duplex.js","./lib/_stream_passthrough.js":"C:\\dev\\NEXUS\\node_modules\\readable-stream\\lib\\_stream_passthrough.js","./lib/_stream_readable.js":"C:\\dev\\NEXUS\\node_modules\\readable-stream\\lib\\_stream_readable.js","./lib/_stream_transform.js":"C:\\dev\\NEXUS\\node_modules\\readable-stream\\lib\\_stream_transform.js","./lib/_stream_writable.js":"C:\\dev\\NEXUS\\node_modules\\readable-stream\\lib\\_stream_writable.js","_process":"C:\\dev\\NEXUS\\node_modules\\process\\browser.js","stream":"C:\\dev\\NEXUS\\node_modules\\stream-browserify\\index.js"}],"C:\\dev\\NEXUS\\node_modules\\readable-stream\\transform.js":[function(require,module,exports){
module.exports = require("./lib/_stream_transform.js")

},{"./lib/_stream_transform.js":"C:\\dev\\NEXUS\\node_modules\\readable-stream\\lib\\_stream_transform.js"}],"C:\\dev\\NEXUS\\node_modules\\readable-stream\\writable.js":[function(require,module,exports){
module.exports = require("./lib/_stream_writable.js")

},{"./lib/_stream_writable.js":"C:\\dev\\NEXUS\\node_modules\\readable-stream\\lib\\_stream_writable.js"}],"C:\\dev\\NEXUS\\node_modules\\sax\\lib\\sax.js":[function(require,module,exports){
(function (Buffer){
;(function (sax) { // wrapper for non-node envs
  sax.parser = function (strict, opt) { return new SAXParser(strict, opt) }
  sax.SAXParser = SAXParser
  sax.SAXStream = SAXStream
  sax.createStream = createStream

  // When we pass the MAX_BUFFER_LENGTH position, start checking for buffer overruns.
  // When we check, schedule the next check for MAX_BUFFER_LENGTH - (max(buffer lengths)),
  // since that's the earliest that a buffer overrun could occur.  This way, checks are
  // as rare as required, but as often as necessary to ensure never crossing this bound.
  // Furthermore, buffers are only tested at most once per write(), so passing a very
  // large string into write() might have undesirable effects, but this is manageable by
  // the caller, so it is assumed to be safe.  Thus, a call to write() may, in the extreme
  // edge case, result in creating at most one complete copy of the string passed in.
  // Set to Infinity to have unlimited buffers.
  sax.MAX_BUFFER_LENGTH = 64 * 1024

  var buffers = [
    'comment', 'sgmlDecl', 'textNode', 'tagName', 'doctype',
    'procInstName', 'procInstBody', 'entity', 'attribName',
    'attribValue', 'cdata', 'script'
  ]

  sax.EVENTS = [
    'text',
    'processinginstruction',
    'sgmldeclaration',
    'doctype',
    'comment',
    'opentagstart',
    'attribute',
    'opentag',
    'closetag',
    'opencdata',
    'cdata',
    'closecdata',
    'error',
    'end',
    'ready',
    'script',
    'opennamespace',
    'closenamespace'
  ]

  function SAXParser (strict, opt) {
    if (!(this instanceof SAXParser)) {
      return new SAXParser(strict, opt)
    }

    var parser = this
    clearBuffers(parser)
    parser.q = parser.c = ''
    parser.bufferCheckPosition = sax.MAX_BUFFER_LENGTH
    parser.opt = opt || {}
    parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags
    parser.looseCase = parser.opt.lowercase ? 'toLowerCase' : 'toUpperCase'
    parser.tags = []
    parser.closed = parser.closedRoot = parser.sawRoot = false
    parser.tag = parser.error = null
    parser.strict = !!strict
    parser.noscript = !!(strict || parser.opt.noscript)
    parser.state = S.BEGIN
    parser.strictEntities = parser.opt.strictEntities
    parser.ENTITIES = parser.strictEntities ? Object.create(sax.XML_ENTITIES) : Object.create(sax.ENTITIES)
    parser.attribList = []

    // namespaces form a prototype chain.
    // it always points at the current tag,
    // which protos to its parent tag.
    if (parser.opt.xmlns) {
      parser.ns = Object.create(rootNS)
    }

    // mostly just for error reporting
    parser.trackPosition = parser.opt.position !== false
    if (parser.trackPosition) {
      parser.position = parser.line = parser.column = 0
    }
    emit(parser, 'onready')
  }

  if (!Object.create) {
    Object.create = function (o) {
      function F () {}
      F.prototype = o
      var newf = new F()
      return newf
    }
  }

  if (!Object.keys) {
    Object.keys = function (o) {
      var a = []
      for (var i in o) if (o.hasOwnProperty(i)) a.push(i)
      return a
    }
  }

  function checkBufferLength (parser) {
    var maxAllowed = Math.max(sax.MAX_BUFFER_LENGTH, 10)
    var maxActual = 0
    for (var i = 0, l = buffers.length; i < l; i++) {
      var len = parser[buffers[i]].length
      if (len > maxAllowed) {
        // Text/cdata nodes can get big, and since they're buffered,
        // we can get here under normal conditions.
        // Avoid issues by emitting the text node now,
        // so at least it won't get any bigger.
        switch (buffers[i]) {
          case 'textNode':
            closeText(parser)
            break

          case 'cdata':
            emitNode(parser, 'oncdata', parser.cdata)
            parser.cdata = ''
            break

          case 'script':
            emitNode(parser, 'onscript', parser.script)
            parser.script = ''
            break

          default:
            error(parser, 'Max buffer length exceeded: ' + buffers[i])
        }
      }
      maxActual = Math.max(maxActual, len)
    }
    // schedule the next check for the earliest possible buffer overrun.
    var m = sax.MAX_BUFFER_LENGTH - maxActual
    parser.bufferCheckPosition = m + parser.position
  }

  function clearBuffers (parser) {
    for (var i = 0, l = buffers.length; i < l; i++) {
      parser[buffers[i]] = ''
    }
  }

  function flushBuffers (parser) {
    closeText(parser)
    if (parser.cdata !== '') {
      emitNode(parser, 'oncdata', parser.cdata)
      parser.cdata = ''
    }
    if (parser.script !== '') {
      emitNode(parser, 'onscript', parser.script)
      parser.script = ''
    }
  }

  SAXParser.prototype = {
    end: function () { end(this) },
    write: write,
    resume: function () { this.error = null; return this },
    close: function () { return this.write(null) },
    flush: function () { flushBuffers(this) }
  }

  var Stream
  try {
    Stream = require('stream').Stream
  } catch (ex) {
    Stream = function () {}
  }

  var streamWraps = sax.EVENTS.filter(function (ev) {
    return ev !== 'error' && ev !== 'end'
  })

  function createStream (strict, opt) {
    return new SAXStream(strict, opt)
  }

  function SAXStream (strict, opt) {
    if (!(this instanceof SAXStream)) {
      return new SAXStream(strict, opt)
    }

    Stream.apply(this)

    this._parser = new SAXParser(strict, opt)
    this.writable = true
    this.readable = true

    var me = this

    this._parser.onend = function () {
      me.emit('end')
    }

    this._parser.onerror = function (er) {
      me.emit('error', er)

      // if didn't throw, then means error was handled.
      // go ahead and clear error, so we can write again.
      me._parser.error = null
    }

    this._decoder = null

    streamWraps.forEach(function (ev) {
      Object.defineProperty(me, 'on' + ev, {
        get: function () {
          return me._parser['on' + ev]
        },
        set: function (h) {
          if (!h) {
            me.removeAllListeners(ev)
            me._parser['on' + ev] = h
            return h
          }
          me.on(ev, h)
        },
        enumerable: true,
        configurable: false
      })
    })
  }

  SAXStream.prototype = Object.create(Stream.prototype, {
    constructor: {
      value: SAXStream
    }
  })

  SAXStream.prototype.write = function (data) {
    if (typeof Buffer === 'function' &&
      typeof Buffer.isBuffer === 'function' &&
      Buffer.isBuffer(data)) {
      if (!this._decoder) {
        var SD = require('string_decoder').StringDecoder
        this._decoder = new SD('utf8')
      }
      data = this._decoder.write(data)
    }

    this._parser.write(data.toString())
    this.emit('data', data)
    return true
  }

  SAXStream.prototype.end = function (chunk) {
    if (chunk && chunk.length) {
      this.write(chunk)
    }
    this._parser.end()
    return true
  }

  SAXStream.prototype.on = function (ev, handler) {
    var me = this
    if (!me._parser['on' + ev] && streamWraps.indexOf(ev) !== -1) {
      me._parser['on' + ev] = function () {
        var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments)
        args.splice(0, 0, ev)
        me.emit.apply(me, args)
      }
    }

    return Stream.prototype.on.call(me, ev, handler)
  }

  // this really needs to be replaced with character classes.
  // XML allows all manner of ridiculous numbers and digits.
  var CDATA = '[CDATA['
  var DOCTYPE = 'DOCTYPE'
  var XML_NAMESPACE = 'http://www.w3.org/XML/1998/namespace'
  var XMLNS_NAMESPACE = 'http://www.w3.org/2000/xmlns/'
  var rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE }

  // http://www.w3.org/TR/REC-xml/#NT-NameStartChar
  // This implementation works on strings, a single character at a time
  // as such, it cannot ever support astral-plane characters (10000-EFFFF)
  // without a significant breaking change to either this  parser, or the
  // JavaScript language.  Implementation of an emoji-capable xml parser
  // is left as an exercise for the reader.
  var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/

  var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/

  var entityStart = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/
  var entityBody = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/

  function isWhitespace (c) {
    return c === ' ' || c === '\n' || c === '\r' || c === '\t'
  }

  function isQuote (c) {
    return c === '"' || c === '\''
  }

  function isAttribEnd (c) {
    return c === '>' || isWhitespace(c)
  }

  function isMatch (regex, c) {
    return regex.test(c)
  }

  function notMatch (regex, c) {
    return !isMatch(regex, c)
  }

  var S = 0
  sax.STATE = {
    BEGIN: S++, // leading byte order mark or whitespace
    BEGIN_WHITESPACE: S++, // leading whitespace
    TEXT: S++, // general stuff
    TEXT_ENTITY: S++, // &amp and such.
    OPEN_WAKA: S++, // <
    SGML_DECL: S++, // <!BLARG
    SGML_DECL_QUOTED: S++, // <!BLARG foo "bar
    DOCTYPE: S++, // <!DOCTYPE
    DOCTYPE_QUOTED: S++, // <!DOCTYPE "//blah
    DOCTYPE_DTD: S++, // <!DOCTYPE "//blah" [ ...
    DOCTYPE_DTD_QUOTED: S++, // <!DOCTYPE "//blah" [ "foo
    COMMENT_STARTING: S++, // <!-
    COMMENT: S++, // <!--
    COMMENT_ENDING: S++, // <!-- blah -
    COMMENT_ENDED: S++, // <!-- blah --
    CDATA: S++, // <![CDATA[ something
    CDATA_ENDING: S++, // ]
    CDATA_ENDING_2: S++, // ]]
    PROC_INST: S++, // <?hi
    PROC_INST_BODY: S++, // <?hi there
    PROC_INST_ENDING: S++, // <?hi "there" ?
    OPEN_TAG: S++, // <strong
    OPEN_TAG_SLASH: S++, // <strong /
    ATTRIB: S++, // <a
    ATTRIB_NAME: S++, // <a foo
    ATTRIB_NAME_SAW_WHITE: S++, // <a foo _
    ATTRIB_VALUE: S++, // <a foo=
    ATTRIB_VALUE_QUOTED: S++, // <a foo="bar
    ATTRIB_VALUE_CLOSED: S++, // <a foo="bar"
    ATTRIB_VALUE_UNQUOTED: S++, // <a foo=bar
    ATTRIB_VALUE_ENTITY_Q: S++, // <foo bar="&quot;"
    ATTRIB_VALUE_ENTITY_U: S++, // <foo bar=&quot
    CLOSE_TAG: S++, // </a
    CLOSE_TAG_SAW_WHITE: S++, // </a   >
    SCRIPT: S++, // <script> ...
    SCRIPT_ENDING: S++ // <script> ... <
  }

  sax.XML_ENTITIES = {
    'amp': '&',
    'gt': '>',
    'lt': '<',
    'quot': '"',
    'apos': "'"
  }

  sax.ENTITIES = {
    'amp': '&',
    'gt': '>',
    'lt': '<',
    'quot': '"',
    'apos': "'",
    'AElig': 198,
    'Aacute': 193,
    'Acirc': 194,
    'Agrave': 192,
    'Aring': 197,
    'Atilde': 195,
    'Auml': 196,
    'Ccedil': 199,
    'ETH': 208,
    'Eacute': 201,
    'Ecirc': 202,
    'Egrave': 200,
    'Euml': 203,
    'Iacute': 205,
    'Icirc': 206,
    'Igrave': 204,
    'Iuml': 207,
    'Ntilde': 209,
    'Oacute': 211,
    'Ocirc': 212,
    'Ograve': 210,
    'Oslash': 216,
    'Otilde': 213,
    'Ouml': 214,
    'THORN': 222,
    'Uacute': 218,
    'Ucirc': 219,
    'Ugrave': 217,
    'Uuml': 220,
    'Yacute': 221,
    'aacute': 225,
    'acirc': 226,
    'aelig': 230,
    'agrave': 224,
    'aring': 229,
    'atilde': 227,
    'auml': 228,
    'ccedil': 231,
    'eacute': 233,
    'ecirc': 234,
    'egrave': 232,
    'eth': 240,
    'euml': 235,
    'iacute': 237,
    'icirc': 238,
    'igrave': 236,
    'iuml': 239,
    'ntilde': 241,
    'oacute': 243,
    'ocirc': 244,
    'ograve': 242,
    'oslash': 248,
    'otilde': 245,
    'ouml': 246,
    'szlig': 223,
    'thorn': 254,
    'uacute': 250,
    'ucirc': 251,
    'ugrave': 249,
    'uuml': 252,
    'yacute': 253,
    'yuml': 255,
    'copy': 169,
    'reg': 174,
    'nbsp': 160,
    'iexcl': 161,
    'cent': 162,
    'pound': 163,
    'curren': 164,
    'yen': 165,
    'brvbar': 166,
    'sect': 167,
    'uml': 168,
    'ordf': 170,
    'laquo': 171,
    'not': 172,
    'shy': 173,
    'macr': 175,
    'deg': 176,
    'plusmn': 177,
    'sup1': 185,
    'sup2': 178,
    'sup3': 179,
    'acute': 180,
    'micro': 181,
    'para': 182,
    'middot': 183,
    'cedil': 184,
    'ordm': 186,
    'raquo': 187,
    'frac14': 188,
    'frac12': 189,
    'frac34': 190,
    'iquest': 191,
    'times': 215,
    'divide': 247,
    'OElig': 338,
    'oelig': 339,
    'Scaron': 352,
    'scaron': 353,
    'Yuml': 376,
    'fnof': 402,
    'circ': 710,
    'tilde': 732,
    'Alpha': 913,
    'Beta': 914,
    'Gamma': 915,
    'Delta': 916,
    'Epsilon': 917,
    'Zeta': 918,
    'Eta': 919,
    'Theta': 920,
    'Iota': 921,
    'Kappa': 922,
    'Lambda': 923,
    'Mu': 924,
    'Nu': 925,
    'Xi': 926,
    'Omicron': 927,
    'Pi': 928,
    'Rho': 929,
    'Sigma': 931,
    'Tau': 932,
    'Upsilon': 933,
    'Phi': 934,
    'Chi': 935,
    'Psi': 936,
    'Omega': 937,
    'alpha': 945,
    'beta': 946,
    'gamma': 947,
    'delta': 948,
    'epsilon': 949,
    'zeta': 950,
    'eta': 951,
    'theta': 952,
    'iota': 953,
    'kappa': 954,
    'lambda': 955,
    'mu': 956,
    'nu': 957,
    'xi': 958,
    'omicron': 959,
    'pi': 960,
    'rho': 961,
    'sigmaf': 962,
    'sigma': 963,
    'tau': 964,
    'upsilon': 965,
    'phi': 966,
    'chi': 967,
    'psi': 968,
    'omega': 969,
    'thetasym': 977,
    'upsih': 978,
    'piv': 982,
    'ensp': 8194,
    'emsp': 8195,
    'thinsp': 8201,
    'zwnj': 8204,
    'zwj': 8205,
    'lrm': 8206,
    'rlm': 8207,
    'ndash': 8211,
    'mdash': 8212,
    'lsquo': 8216,
    'rsquo': 8217,
    'sbquo': 8218,
    'ldquo': 8220,
    'rdquo': 8221,
    'bdquo': 8222,
    'dagger': 8224,
    'Dagger': 8225,
    'bull': 8226,
    'hellip': 8230,
    'permil': 8240,
    'prime': 8242,
    'Prime': 8243,
    'lsaquo': 8249,
    'rsaquo': 8250,
    'oline': 8254,
    'frasl': 8260,
    'euro': 8364,
    'image': 8465,
    'weierp': 8472,
    'real': 8476,
    'trade': 8482,
    'alefsym': 8501,
    'larr': 8592,
    'uarr': 8593,
    'rarr': 8594,
    'darr': 8595,
    'harr': 8596,
    'crarr': 8629,
    'lArr': 8656,
    'uArr': 8657,
    'rArr': 8658,
    'dArr': 8659,
    'hArr': 8660,
    'forall': 8704,
    'part': 8706,
    'exist': 8707,
    'empty': 8709,
    'nabla': 8711,
    'isin': 8712,
    'notin': 8713,
    'ni': 8715,
    'prod': 8719,
    'sum': 8721,
    'minus': 8722,
    'lowast': 8727,
    'radic': 8730,
    'prop': 8733,
    'infin': 8734,
    'ang': 8736,
    'and': 8743,
    'or': 8744,
    'cap': 8745,
    'cup': 8746,
    'int': 8747,
    'there4': 8756,
    'sim': 8764,
    'cong': 8773,
    'asymp': 8776,
    'ne': 8800,
    'equiv': 8801,
    'le': 8804,
    'ge': 8805,
    'sub': 8834,
    'sup': 8835,
    'nsub': 8836,
    'sube': 8838,
    'supe': 8839,
    'oplus': 8853,
    'otimes': 8855,
    'perp': 8869,
    'sdot': 8901,
    'lceil': 8968,
    'rceil': 8969,
    'lfloor': 8970,
    'rfloor': 8971,
    'lang': 9001,
    'rang': 9002,
    'loz': 9674,
    'spades': 9824,
    'clubs': 9827,
    'hearts': 9829,
    'diams': 9830
  }

  Object.keys(sax.ENTITIES).forEach(function (key) {
    var e = sax.ENTITIES[key]
    var s = typeof e === 'number' ? String.fromCharCode(e) : e
    sax.ENTITIES[key] = s
  })

  for (var s in sax.STATE) {
    sax.STATE[sax.STATE[s]] = s
  }

  // shorthand
  S = sax.STATE

  function emit (parser, event, data) {
    parser[event] && parser[event](data)
  }

  function emitNode (parser, nodeType, data) {
    if (parser.textNode) closeText(parser)
    emit(parser, nodeType, data)
  }

  function closeText (parser) {
    parser.textNode = textopts(parser.opt, parser.textNode)
    if (parser.textNode) emit(parser, 'ontext', parser.textNode)
    parser.textNode = ''
  }

  function textopts (opt, text) {
    if (opt.trim) text = text.trim()
    if (opt.normalize) text = text.replace(/\s+/g, ' ')
    return text
  }

  function error (parser, er) {
    closeText(parser)
    if (parser.trackPosition) {
      er += '\nLine: ' + parser.line +
        '\nColumn: ' + parser.column +
        '\nChar: ' + parser.c
    }
    er = new Error(er)
    parser.error = er
    emit(parser, 'onerror', er)
    return parser
  }

  function end (parser) {
    if (parser.sawRoot && !parser.closedRoot) strictFail(parser, 'Unclosed root tag')
    if ((parser.state !== S.BEGIN) &&
      (parser.state !== S.BEGIN_WHITESPACE) &&
      (parser.state !== S.TEXT)) {
      error(parser, 'Unexpected end')
    }
    closeText(parser)
    parser.c = ''
    parser.closed = true
    emit(parser, 'onend')
    SAXParser.call(parser, parser.strict, parser.opt)
    return parser
  }

  function strictFail (parser, message) {
    if (typeof parser !== 'object' || !(parser instanceof SAXParser)) {
      throw new Error('bad call to strictFail')
    }
    if (parser.strict) {
      error(parser, message)
    }
  }

  function newTag (parser) {
    if (!parser.strict) parser.tagName = parser.tagName[parser.looseCase]()
    var parent = parser.tags[parser.tags.length - 1] || parser
    var tag = parser.tag = { name: parser.tagName, attributes: {} }

    // will be overridden if tag contails an xmlns="foo" or xmlns:foo="bar"
    if (parser.opt.xmlns) {
      tag.ns = parent.ns
    }
    parser.attribList.length = 0
    emitNode(parser, 'onopentagstart', tag)
  }

  function qname (name, attribute) {
    var i = name.indexOf(':')
    var qualName = i < 0 ? [ '', name ] : name.split(':')
    var prefix = qualName[0]
    var local = qualName[1]

    // <x "xmlns"="http://foo">
    if (attribute && name === 'xmlns') {
      prefix = 'xmlns'
      local = ''
    }

    return { prefix: prefix, local: local }
  }

  function attrib (parser) {
    if (!parser.strict) {
      parser.attribName = parser.attribName[parser.looseCase]()
    }

    if (parser.attribList.indexOf(parser.attribName) !== -1 ||
      parser.tag.attributes.hasOwnProperty(parser.attribName)) {
      parser.attribName = parser.attribValue = ''
      return
    }

    if (parser.opt.xmlns) {
      var qn = qname(parser.attribName, true)
      var prefix = qn.prefix
      var local = qn.local

      if (prefix === 'xmlns') {
        // namespace binding attribute. push the binding into scope
        if (local === 'xml' && parser.attribValue !== XML_NAMESPACE) {
          strictFail(parser,
            'xml: prefix must be bound to ' + XML_NAMESPACE + '\n' +
            'Actual: ' + parser.attribValue)
        } else if (local === 'xmlns' && parser.attribValue !== XMLNS_NAMESPACE) {
          strictFail(parser,
            'xmlns: prefix must be bound to ' + XMLNS_NAMESPACE + '\n' +
            'Actual: ' + parser.attribValue)
        } else {
          var tag = parser.tag
          var parent = parser.tags[parser.tags.length - 1] || parser
          if (tag.ns === parent.ns) {
            tag.ns = Object.create(parent.ns)
          }
          tag.ns[local] = parser.attribValue
        }
      }

      // defer onattribute events until all attributes have been seen
      // so any new bindings can take effect. preserve attribute order
      // so deferred events can be emitted in document order
      parser.attribList.push([parser.attribName, parser.attribValue])
    } else {
      // in non-xmlns mode, we can emit the event right away
      parser.tag.attributes[parser.attribName] = parser.attribValue
      emitNode(parser, 'onattribute', {
        name: parser.attribName,
        value: parser.attribValue
      })
    }

    parser.attribName = parser.attribValue = ''
  }

  function openTag (parser, selfClosing) {
    if (parser.opt.xmlns) {
      // emit namespace binding events
      var tag = parser.tag

      // add namespace info to tag
      var qn = qname(parser.tagName)
      tag.prefix = qn.prefix
      tag.local = qn.local
      tag.uri = tag.ns[qn.prefix] || ''

      if (tag.prefix && !tag.uri) {
        strictFail(parser, 'Unbound namespace prefix: ' +
          JSON.stringify(parser.tagName))
        tag.uri = qn.prefix
      }

      var parent = parser.tags[parser.tags.length - 1] || parser
      if (tag.ns && parent.ns !== tag.ns) {
        Object.keys(tag.ns).forEach(function (p) {
          emitNode(parser, 'onopennamespace', {
            prefix: p,
            uri: tag.ns[p]
          })
        })
      }

      // handle deferred onattribute events
      // Note: do not apply default ns to attributes:
      //   http://www.w3.org/TR/REC-xml-names/#defaulting
      for (var i = 0, l = parser.attribList.length; i < l; i++) {
        var nv = parser.attribList[i]
        var name = nv[0]
        var value = nv[1]
        var qualName = qname(name, true)
        var prefix = qualName.prefix
        var local = qualName.local
        var uri = prefix === '' ? '' : (tag.ns[prefix] || '')
        var a = {
          name: name,
          value: value,
          prefix: prefix,
          local: local,
          uri: uri
        }

        // if there's any attributes with an undefined namespace,
        // then fail on them now.
        if (prefix && prefix !== 'xmlns' && !uri) {
          strictFail(parser, 'Unbound namespace prefix: ' +
            JSON.stringify(prefix))
          a.uri = prefix
        }
        parser.tag.attributes[name] = a
        emitNode(parser, 'onattribute', a)
      }
      parser.attribList.length = 0
    }

    parser.tag.isSelfClosing = !!selfClosing

    // process the tag
    parser.sawRoot = true
    parser.tags.push(parser.tag)
    emitNode(parser, 'onopentag', parser.tag)
    if (!selfClosing) {
      // special case for <script> in non-strict mode.
      if (!parser.noscript && parser.tagName.toLowerCase() === 'script') {
        parser.state = S.SCRIPT
      } else {
        parser.state = S.TEXT
      }
      parser.tag = null
      parser.tagName = ''
    }
    parser.attribName = parser.attribValue = ''
    parser.attribList.length = 0
  }

  function closeTag (parser) {
    if (!parser.tagName) {
      strictFail(parser, 'Weird empty close tag.')
      parser.textNode += '</>'
      parser.state = S.TEXT
      return
    }

    if (parser.script) {
      if (parser.tagName !== 'script') {
        parser.script += '</' + parser.tagName + '>'
        parser.tagName = ''
        parser.state = S.SCRIPT
        return
      }
      emitNode(parser, 'onscript', parser.script)
      parser.script = ''
    }

    // first make sure that the closing tag actually exists.
    // <a><b></c></b></a> will close everything, otherwise.
    var t = parser.tags.length
    var tagName = parser.tagName
    if (!parser.strict) {
      tagName = tagName[parser.looseCase]()
    }
    var closeTo = tagName
    while (t--) {
      var close = parser.tags[t]
      if (close.name !== closeTo) {
        // fail the first time in strict mode
        strictFail(parser, 'Unexpected close tag')
      } else {
        break
      }
    }

    // didn't find it.  we already failed for strict, so just abort.
    if (t < 0) {
      strictFail(parser, 'Unmatched closing tag: ' + parser.tagName)
      parser.textNode += '</' + parser.tagName + '>'
      parser.state = S.TEXT
      return
    }
    parser.tagName = tagName
    var s = parser.tags.length
    while (s-- > t) {
      var tag = parser.tag = parser.tags.pop()
      parser.tagName = parser.tag.name
      emitNode(parser, 'onclosetag', parser.tagName)

      var x = {}
      for (var i in tag.ns) {
        x[i] = tag.ns[i]
      }

      var parent = parser.tags[parser.tags.length - 1] || parser
      if (parser.opt.xmlns && tag.ns !== parent.ns) {
        // remove namespace bindings introduced by tag
        Object.keys(tag.ns).forEach(function (p) {
          var n = tag.ns[p]
          emitNode(parser, 'onclosenamespace', { prefix: p, uri: n })
        })
      }
    }
    if (t === 0) parser.closedRoot = true
    parser.tagName = parser.attribValue = parser.attribName = ''
    parser.attribList.length = 0
    parser.state = S.TEXT
  }

  function parseEntity (parser) {
    var entity = parser.entity
    var entityLC = entity.toLowerCase()
    var num
    var numStr = ''

    if (parser.ENTITIES[entity]) {
      return parser.ENTITIES[entity]
    }
    if (parser.ENTITIES[entityLC]) {
      return parser.ENTITIES[entityLC]
    }
    entity = entityLC
    if (entity.charAt(0) === '#') {
      if (entity.charAt(1) === 'x') {
        entity = entity.slice(2)
        num = parseInt(entity, 16)
        numStr = num.toString(16)
      } else {
        entity = entity.slice(1)
        num = parseInt(entity, 10)
        numStr = num.toString(10)
      }
    }
    entity = entity.replace(/^0+/, '')
    if (isNaN(num) || numStr.toLowerCase() !== entity) {
      strictFail(parser, 'Invalid character entity')
      return '&' + parser.entity + ';'
    }

    return String.fromCodePoint(num)
  }

  function beginWhiteSpace (parser, c) {
    if (c === '<') {
      parser.state = S.OPEN_WAKA
      parser.startTagPosition = parser.position
    } else if (!isWhitespace(c)) {
      // have to process this as a text node.
      // weird, but happens.
      strictFail(parser, 'Non-whitespace before first tag.')
      parser.textNode = c
      parser.state = S.TEXT
    }
  }

  function charAt (chunk, i) {
    var result = ''
    if (i < chunk.length) {
      result = chunk.charAt(i)
    }
    return result
  }

  function write (chunk) {
    var parser = this
    if (this.error) {
      throw this.error
    }
    if (parser.closed) {
      return error(parser,
        'Cannot write after close. Assign an onready handler.')
    }
    if (chunk === null) {
      return end(parser)
    }
    if (typeof chunk === 'object') {
      chunk = chunk.toString()
    }
    var i = 0
    var c = ''
    while (true) {
      c = charAt(chunk, i++)
      parser.c = c

      if (!c) {
        break
      }

      if (parser.trackPosition) {
        parser.position++
        if (c === '\n') {
          parser.line++
          parser.column = 0
        } else {
          parser.column++
        }
      }

      switch (parser.state) {
        case S.BEGIN:
          parser.state = S.BEGIN_WHITESPACE
          if (c === '\uFEFF') {
            continue
          }
          beginWhiteSpace(parser, c)
          continue

        case S.BEGIN_WHITESPACE:
          beginWhiteSpace(parser, c)
          continue

        case S.TEXT:
          if (parser.sawRoot && !parser.closedRoot) {
            var starti = i - 1
            while (c && c !== '<' && c !== '&') {
              c = charAt(chunk, i++)
              if (c && parser.trackPosition) {
                parser.position++
                if (c === '\n') {
                  parser.line++
                  parser.column = 0
                } else {
                  parser.column++
                }
              }
            }
            parser.textNode += chunk.substring(starti, i - 1)
          }
          if (c === '<' && !(parser.sawRoot && parser.closedRoot && !parser.strict)) {
            parser.state = S.OPEN_WAKA
            parser.startTagPosition = parser.position
          } else {
            if (!isWhitespace(c) && (!parser.sawRoot || parser.closedRoot)) {
              strictFail(parser, 'Text data outside of root node.')
            }
            if (c === '&') {
              parser.state = S.TEXT_ENTITY
            } else {
              parser.textNode += c
            }
          }
          continue

        case S.SCRIPT:
          // only non-strict
          if (c === '<') {
            parser.state = S.SCRIPT_ENDING
          } else {
            parser.script += c
          }
          continue

        case S.SCRIPT_ENDING:
          if (c === '/') {
            parser.state = S.CLOSE_TAG
          } else {
            parser.script += '<' + c
            parser.state = S.SCRIPT
          }
          continue

        case S.OPEN_WAKA:
          // either a /, ?, !, or text is coming next.
          if (c === '!') {
            parser.state = S.SGML_DECL
            parser.sgmlDecl = ''
          } else if (isWhitespace(c)) {
            // wait for it...
          } else if (isMatch(nameStart, c)) {
            parser.state = S.OPEN_TAG
            parser.tagName = c
          } else if (c === '/') {
            parser.state = S.CLOSE_TAG
            parser.tagName = ''
          } else if (c === '?') {
            parser.state = S.PROC_INST
            parser.procInstName = parser.procInstBody = ''
          } else {
            strictFail(parser, 'Unencoded <')
            // if there was some whitespace, then add that in.
            if (parser.startTagPosition + 1 < parser.position) {
              var pad = parser.position - parser.startTagPosition
              c = new Array(pad).join(' ') + c
            }
            parser.textNode += '<' + c
            parser.state = S.TEXT
          }
          continue

        case S.SGML_DECL:
          if ((parser.sgmlDecl + c).toUpperCase() === CDATA) {
            emitNode(parser, 'onopencdata')
            parser.state = S.CDATA
            parser.sgmlDecl = ''
            parser.cdata = ''
          } else if (parser.sgmlDecl + c === '--') {
            parser.state = S.COMMENT
            parser.comment = ''
            parser.sgmlDecl = ''
          } else if ((parser.sgmlDecl + c).toUpperCase() === DOCTYPE) {
            parser.state = S.DOCTYPE
            if (parser.doctype || parser.sawRoot) {
              strictFail(parser,
                'Inappropriately located doctype declaration')
            }
            parser.doctype = ''
            parser.sgmlDecl = ''
          } else if (c === '>') {
            emitNode(parser, 'onsgmldeclaration', parser.sgmlDecl)
            parser.sgmlDecl = ''
            parser.state = S.TEXT
          } else if (isQuote(c)) {
            parser.state = S.SGML_DECL_QUOTED
            parser.sgmlDecl += c
          } else {
            parser.sgmlDecl += c
          }
          continue

        case S.SGML_DECL_QUOTED:
          if (c === parser.q) {
            parser.state = S.SGML_DECL
            parser.q = ''
          }
          parser.sgmlDecl += c
          continue

        case S.DOCTYPE:
          if (c === '>') {
            parser.state = S.TEXT
            emitNode(parser, 'ondoctype', parser.doctype)
            parser.doctype = true // just remember that we saw it.
          } else {
            parser.doctype += c
            if (c === '[') {
              parser.state = S.DOCTYPE_DTD
            } else if (isQuote(c)) {
              parser.state = S.DOCTYPE_QUOTED
              parser.q = c
            }
          }
          continue

        case S.DOCTYPE_QUOTED:
          parser.doctype += c
          if (c === parser.q) {
            parser.q = ''
            parser.state = S.DOCTYPE
          }
          continue

        case S.DOCTYPE_DTD:
          parser.doctype += c
          if (c === ']') {
            parser.state = S.DOCTYPE
          } else if (isQuote(c)) {
            parser.state = S.DOCTYPE_DTD_QUOTED
            parser.q = c
          }
          continue

        case S.DOCTYPE_DTD_QUOTED:
          parser.doctype += c
          if (c === parser.q) {
            parser.state = S.DOCTYPE_DTD
            parser.q = ''
          }
          continue

        case S.COMMENT:
          if (c === '-') {
            parser.state = S.COMMENT_ENDING
          } else {
            parser.comment += c
          }
          continue

        case S.COMMENT_ENDING:
          if (c === '-') {
            parser.state = S.COMMENT_ENDED
            parser.comment = textopts(parser.opt, parser.comment)
            if (parser.comment) {
              emitNode(parser, 'oncomment', parser.comment)
            }
            parser.comment = ''
          } else {
            parser.comment += '-' + c
            parser.state = S.COMMENT
          }
          continue

        case S.COMMENT_ENDED:
          if (c !== '>') {
            strictFail(parser, 'Malformed comment')
            // allow <!-- blah -- bloo --> in non-strict mode,
            // which is a comment of " blah -- bloo "
            parser.comment += '--' + c
            parser.state = S.COMMENT
          } else {
            parser.state = S.TEXT
          }
          continue

        case S.CDATA:
          if (c === ']') {
            parser.state = S.CDATA_ENDING
          } else {
            parser.cdata += c
          }
          continue

        case S.CDATA_ENDING:
          if (c === ']') {
            parser.state = S.CDATA_ENDING_2
          } else {
            parser.cdata += ']' + c
            parser.state = S.CDATA
          }
          continue

        case S.CDATA_ENDING_2:
          if (c === '>') {
            if (parser.cdata) {
              emitNode(parser, 'oncdata', parser.cdata)
            }
            emitNode(parser, 'onclosecdata')
            parser.cdata = ''
            parser.state = S.TEXT
          } else if (c === ']') {
            parser.cdata += ']'
          } else {
            parser.cdata += ']]' + c
            parser.state = S.CDATA
          }
          continue

        case S.PROC_INST:
          if (c === '?') {
            parser.state = S.PROC_INST_ENDING
          } else if (isWhitespace(c)) {
            parser.state = S.PROC_INST_BODY
          } else {
            parser.procInstName += c
          }
          continue

        case S.PROC_INST_BODY:
          if (!parser.procInstBody && isWhitespace(c)) {
            continue
          } else if (c === '?') {
            parser.state = S.PROC_INST_ENDING
          } else {
            parser.procInstBody += c
          }
          continue

        case S.PROC_INST_ENDING:
          if (c === '>') {
            emitNode(parser, 'onprocessinginstruction', {
              name: parser.procInstName,
              body: parser.procInstBody
            })
            parser.procInstName = parser.procInstBody = ''
            parser.state = S.TEXT
          } else {
            parser.procInstBody += '?' + c
            parser.state = S.PROC_INST_BODY
          }
          continue

        case S.OPEN_TAG:
          if (isMatch(nameBody, c)) {
            parser.tagName += c
          } else {
            newTag(parser)
            if (c === '>') {
              openTag(parser)
            } else if (c === '/') {
              parser.state = S.OPEN_TAG_SLASH
            } else {
              if (!isWhitespace(c)) {
                strictFail(parser, 'Invalid character in tag name')
              }
              parser.state = S.ATTRIB
            }
          }
          continue

        case S.OPEN_TAG_SLASH:
          if (c === '>') {
            openTag(parser, true)
            closeTag(parser)
          } else {
            strictFail(parser, 'Forward-slash in opening tag not followed by >')
            parser.state = S.ATTRIB
          }
          continue

        case S.ATTRIB:
          // haven't read the attribute name yet.
          if (isWhitespace(c)) {
            continue
          } else if (c === '>') {
            openTag(parser)
          } else if (c === '/') {
            parser.state = S.OPEN_TAG_SLASH
          } else if (isMatch(nameStart, c)) {
            parser.attribName = c
            parser.attribValue = ''
            parser.state = S.ATTRIB_NAME
          } else {
            strictFail(parser, 'Invalid attribute name')
          }
          continue

        case S.ATTRIB_NAME:
          if (c === '=') {
            parser.state = S.ATTRIB_VALUE
          } else if (c === '>') {
            strictFail(parser, 'Attribute without value')
            parser.attribValue = parser.attribName
            attrib(parser)
            openTag(parser)
          } else if (isWhitespace(c)) {
            parser.state = S.ATTRIB_NAME_SAW_WHITE
          } else if (isMatch(nameBody, c)) {
            parser.attribName += c
          } else {
            strictFail(parser, 'Invalid attribute name')
          }
          continue

        case S.ATTRIB_NAME_SAW_WHITE:
          if (c === '=') {
            parser.state = S.ATTRIB_VALUE
          } else if (isWhitespace(c)) {
            continue
          } else {
            strictFail(parser, 'Attribute without value')
            parser.tag.attributes[parser.attribName] = ''
            parser.attribValue = ''
            emitNode(parser, 'onattribute', {
              name: parser.attribName,
              value: ''
            })
            parser.attribName = ''
            if (c === '>') {
              openTag(parser)
            } else if (isMatch(nameStart, c)) {
              parser.attribName = c
              parser.state = S.ATTRIB_NAME
            } else {
              strictFail(parser, 'Invalid attribute name')
              parser.state = S.ATTRIB
            }
          }
          continue

        case S.ATTRIB_VALUE:
          if (isWhitespace(c)) {
            continue
          } else if (isQuote(c)) {
            parser.q = c
            parser.state = S.ATTRIB_VALUE_QUOTED
          } else {
            strictFail(parser, 'Unquoted attribute value')
            parser.state = S.ATTRIB_VALUE_UNQUOTED
            parser.attribValue = c
          }
          continue

        case S.ATTRIB_VALUE_QUOTED:
          if (c !== parser.q) {
            if (c === '&') {
              parser.state = S.ATTRIB_VALUE_ENTITY_Q
            } else {
              parser.attribValue += c
            }
            continue
          }
          attrib(parser)
          parser.q = ''
          parser.state = S.ATTRIB_VALUE_CLOSED
          continue

        case S.ATTRIB_VALUE_CLOSED:
          if (isWhitespace(c)) {
            parser.state = S.ATTRIB
          } else if (c === '>') {
            openTag(parser)
          } else if (c === '/') {
            parser.state = S.OPEN_TAG_SLASH
          } else if (isMatch(nameStart, c)) {
            strictFail(parser, 'No whitespace between attributes')
            parser.attribName = c
            parser.attribValue = ''
            parser.state = S.ATTRIB_NAME
          } else {
            strictFail(parser, 'Invalid attribute name')
          }
          continue

        case S.ATTRIB_VALUE_UNQUOTED:
          if (!isAttribEnd(c)) {
            if (c === '&') {
              parser.state = S.ATTRIB_VALUE_ENTITY_U
            } else {
              parser.attribValue += c
            }
            continue
          }
          attrib(parser)
          if (c === '>') {
            openTag(parser)
          } else {
            parser.state = S.ATTRIB
          }
          continue

        case S.CLOSE_TAG:
          if (!parser.tagName) {
            if (isWhitespace(c)) {
              continue
            } else if (notMatch(nameStart, c)) {
              if (parser.script) {
                parser.script += '</' + c
                parser.state = S.SCRIPT
              } else {
                strictFail(parser, 'Invalid tagname in closing tag.')
              }
            } else {
              parser.tagName = c
            }
          } else if (c === '>') {
            closeTag(parser)
          } else if (isMatch(nameBody, c)) {
            parser.tagName += c
          } else if (parser.script) {
            parser.script += '</' + parser.tagName
            parser.tagName = ''
            parser.state = S.SCRIPT
          } else {
            if (!isWhitespace(c)) {
              strictFail(parser, 'Invalid tagname in closing tag')
            }
            parser.state = S.CLOSE_TAG_SAW_WHITE
          }
          continue

        case S.CLOSE_TAG_SAW_WHITE:
          if (isWhitespace(c)) {
            continue
          }
          if (c === '>') {
            closeTag(parser)
          } else {
            strictFail(parser, 'Invalid characters in closing tag')
          }
          continue

        case S.TEXT_ENTITY:
        case S.ATTRIB_VALUE_ENTITY_Q:
        case S.ATTRIB_VALUE_ENTITY_U:
          var returnState
          var buffer
          switch (parser.state) {
            case S.TEXT_ENTITY:
              returnState = S.TEXT
              buffer = 'textNode'
              break

            case S.ATTRIB_VALUE_ENTITY_Q:
              returnState = S.ATTRIB_VALUE_QUOTED
              buffer = 'attribValue'
              break

            case S.ATTRIB_VALUE_ENTITY_U:
              returnState = S.ATTRIB_VALUE_UNQUOTED
              buffer = 'attribValue'
              break
          }

          if (c === ';') {
            parser[buffer] += parseEntity(parser)
            parser.entity = ''
            parser.state = returnState
          } else if (isMatch(parser.entity.length ? entityBody : entityStart, c)) {
            parser.entity += c
          } else {
            strictFail(parser, 'Invalid character in entity name')
            parser[buffer] += '&' + parser.entity + c
            parser.entity = ''
            parser.state = returnState
          }

          continue

        default:
          throw new Error(parser, 'Unknown state: ' + parser.state)
      }
    } // while

    if (parser.position >= parser.bufferCheckPosition) {
      checkBufferLength(parser)
    }
    return parser
  }

  /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
  /* istanbul ignore next */
  if (!String.fromCodePoint) {
    (function () {
      var stringFromCharCode = String.fromCharCode
      var floor = Math.floor
      var fromCodePoint = function () {
        var MAX_SIZE = 0x4000
        var codeUnits = []
        var highSurrogate
        var lowSurrogate
        var index = -1
        var length = arguments.length
        if (!length) {
          return ''
        }
        var result = ''
        while (++index < length) {
          var codePoint = Number(arguments[index])
          if (
            !isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
            codePoint < 0 || // not a valid Unicode code point
            codePoint > 0x10FFFF || // not a valid Unicode code point
            floor(codePoint) !== codePoint // not an integer
          ) {
            throw RangeError('Invalid code point: ' + codePoint)
          }
          if (codePoint <= 0xFFFF) { // BMP code point
            codeUnits.push(codePoint)
          } else { // Astral code point; split in surrogate halves
            // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
            codePoint -= 0x10000
            highSurrogate = (codePoint >> 10) + 0xD800
            lowSurrogate = (codePoint % 0x400) + 0xDC00
            codeUnits.push(highSurrogate, lowSurrogate)
          }
          if (index + 1 === length || codeUnits.length > MAX_SIZE) {
            result += stringFromCharCode.apply(null, codeUnits)
            codeUnits.length = 0
          }
        }
        return result
      }
      /* istanbul ignore next */
      if (Object.defineProperty) {
        Object.defineProperty(String, 'fromCodePoint', {
          value: fromCodePoint,
          configurable: true,
          writable: true
        })
      } else {
        String.fromCodePoint = fromCodePoint
      }
    }())
  }
})(typeof exports === 'undefined' ? this.sax = {} : exports)

}).call(this,require("buffer").Buffer)
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9zYXgvbGliL3NheC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyI7KGZ1bmN0aW9uIChzYXgpIHsgLy8gd3JhcHBlciBmb3Igbm9uLW5vZGUgZW52c1xuICBzYXgucGFyc2VyID0gZnVuY3Rpb24gKHN0cmljdCwgb3B0KSB7IHJldHVybiBuZXcgU0FYUGFyc2VyKHN0cmljdCwgb3B0KSB9XG4gIHNheC5TQVhQYXJzZXIgPSBTQVhQYXJzZXJcbiAgc2F4LlNBWFN0cmVhbSA9IFNBWFN0cmVhbVxuICBzYXguY3JlYXRlU3RyZWFtID0gY3JlYXRlU3RyZWFtXG5cbiAgLy8gV2hlbiB3ZSBwYXNzIHRoZSBNQVhfQlVGRkVSX0xFTkdUSCBwb3NpdGlvbiwgc3RhcnQgY2hlY2tpbmcgZm9yIGJ1ZmZlciBvdmVycnVucy5cbiAgLy8gV2hlbiB3ZSBjaGVjaywgc2NoZWR1bGUgdGhlIG5leHQgY2hlY2sgZm9yIE1BWF9CVUZGRVJfTEVOR1RIIC0gKG1heChidWZmZXIgbGVuZ3RocykpLFxuICAvLyBzaW5jZSB0aGF0J3MgdGhlIGVhcmxpZXN0IHRoYXQgYSBidWZmZXIgb3ZlcnJ1biBjb3VsZCBvY2N1ci4gIFRoaXMgd2F5LCBjaGVja3MgYXJlXG4gIC8vIGFzIHJhcmUgYXMgcmVxdWlyZWQsIGJ1dCBhcyBvZnRlbiBhcyBuZWNlc3NhcnkgdG8gZW5zdXJlIG5ldmVyIGNyb3NzaW5nIHRoaXMgYm91bmQuXG4gIC8vIEZ1cnRoZXJtb3JlLCBidWZmZXJzIGFyZSBvbmx5IHRlc3RlZCBhdCBtb3N0IG9uY2UgcGVyIHdyaXRlKCksIHNvIHBhc3NpbmcgYSB2ZXJ5XG4gIC8vIGxhcmdlIHN0cmluZyBpbnRvIHdyaXRlKCkgbWlnaHQgaGF2ZSB1bmRlc2lyYWJsZSBlZmZlY3RzLCBidXQgdGhpcyBpcyBtYW5hZ2VhYmxlIGJ5XG4gIC8vIHRoZSBjYWxsZXIsIHNvIGl0IGlzIGFzc3VtZWQgdG8gYmUgc2FmZS4gIFRodXMsIGEgY2FsbCB0byB3cml0ZSgpIG1heSwgaW4gdGhlIGV4dHJlbWVcbiAgLy8gZWRnZSBjYXNlLCByZXN1bHQgaW4gY3JlYXRpbmcgYXQgbW9zdCBvbmUgY29tcGxldGUgY29weSBvZiB0aGUgc3RyaW5nIHBhc3NlZCBpbi5cbiAgLy8gU2V0IHRvIEluZmluaXR5IHRvIGhhdmUgdW5saW1pdGVkIGJ1ZmZlcnMuXG4gIHNheC5NQVhfQlVGRkVSX0xFTkdUSCA9IDY0ICogMTAyNFxuXG4gIHZhciBidWZmZXJzID0gW1xuICAgICdjb21tZW50JywgJ3NnbWxEZWNsJywgJ3RleHROb2RlJywgJ3RhZ05hbWUnLCAnZG9jdHlwZScsXG4gICAgJ3Byb2NJbnN0TmFtZScsICdwcm9jSW5zdEJvZHknLCAnZW50aXR5JywgJ2F0dHJpYk5hbWUnLFxuICAgICdhdHRyaWJWYWx1ZScsICdjZGF0YScsICdzY3JpcHQnXG4gIF1cblxuICBzYXguRVZFTlRTID0gW1xuICAgICd0ZXh0JyxcbiAgICAncHJvY2Vzc2luZ2luc3RydWN0aW9uJyxcbiAgICAnc2dtbGRlY2xhcmF0aW9uJyxcbiAgICAnZG9jdHlwZScsXG4gICAgJ2NvbW1lbnQnLFxuICAgICdvcGVudGFnc3RhcnQnLFxuICAgICdhdHRyaWJ1dGUnLFxuICAgICdvcGVudGFnJyxcbiAgICAnY2xvc2V0YWcnLFxuICAgICdvcGVuY2RhdGEnLFxuICAgICdjZGF0YScsXG4gICAgJ2Nsb3NlY2RhdGEnLFxuICAgICdlcnJvcicsXG4gICAgJ2VuZCcsXG4gICAgJ3JlYWR5JyxcbiAgICAnc2NyaXB0JyxcbiAgICAnb3Blbm5hbWVzcGFjZScsXG4gICAgJ2Nsb3NlbmFtZXNwYWNlJ1xuICBdXG5cbiAgZnVuY3Rpb24gU0FYUGFyc2VyIChzdHJpY3QsIG9wdCkge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTQVhQYXJzZXIpKSB7XG4gICAgICByZXR1cm4gbmV3IFNBWFBhcnNlcihzdHJpY3QsIG9wdClcbiAgICB9XG5cbiAgICB2YXIgcGFyc2VyID0gdGhpc1xuICAgIGNsZWFyQnVmZmVycyhwYXJzZXIpXG4gICAgcGFyc2VyLnEgPSBwYXJzZXIuYyA9ICcnXG4gICAgcGFyc2VyLmJ1ZmZlckNoZWNrUG9zaXRpb24gPSBzYXguTUFYX0JVRkZFUl9MRU5HVEhcbiAgICBwYXJzZXIub3B0ID0gb3B0IHx8IHt9XG4gICAgcGFyc2VyLm9wdC5sb3dlcmNhc2UgPSBwYXJzZXIub3B0Lmxvd2VyY2FzZSB8fCBwYXJzZXIub3B0Lmxvd2VyY2FzZXRhZ3NcbiAgICBwYXJzZXIubG9vc2VDYXNlID0gcGFyc2VyLm9wdC5sb3dlcmNhc2UgPyAndG9Mb3dlckNhc2UnIDogJ3RvVXBwZXJDYXNlJ1xuICAgIHBhcnNlci50YWdzID0gW11cbiAgICBwYXJzZXIuY2xvc2VkID0gcGFyc2VyLmNsb3NlZFJvb3QgPSBwYXJzZXIuc2F3Um9vdCA9IGZhbHNlXG4gICAgcGFyc2VyLnRhZyA9IHBhcnNlci5lcnJvciA9IG51bGxcbiAgICBwYXJzZXIuc3RyaWN0ID0gISFzdHJpY3RcbiAgICBwYXJzZXIubm9zY3JpcHQgPSAhIShzdHJpY3QgfHwgcGFyc2VyLm9wdC5ub3NjcmlwdClcbiAgICBwYXJzZXIuc3RhdGUgPSBTLkJFR0lOXG4gICAgcGFyc2VyLnN0cmljdEVudGl0aWVzID0gcGFyc2VyLm9wdC5zdHJpY3RFbnRpdGllc1xuICAgIHBhcnNlci5FTlRJVElFUyA9IHBhcnNlci5zdHJpY3RFbnRpdGllcyA/IE9iamVjdC5jcmVhdGUoc2F4LlhNTF9FTlRJVElFUykgOiBPYmplY3QuY3JlYXRlKHNheC5FTlRJVElFUylcbiAgICBwYXJzZXIuYXR0cmliTGlzdCA9IFtdXG5cbiAgICAvLyBuYW1lc3BhY2VzIGZvcm0gYSBwcm90b3R5cGUgY2hhaW4uXG4gICAgLy8gaXQgYWx3YXlzIHBvaW50cyBhdCB0aGUgY3VycmVudCB0YWcsXG4gICAgLy8gd2hpY2ggcHJvdG9zIHRvIGl0cyBwYXJlbnQgdGFnLlxuICAgIGlmIChwYXJzZXIub3B0LnhtbG5zKSB7XG4gICAgICBwYXJzZXIubnMgPSBPYmplY3QuY3JlYXRlKHJvb3ROUylcbiAgICB9XG5cbiAgICAvLyBtb3N0bHkganVzdCBmb3IgZXJyb3IgcmVwb3J0aW5nXG4gICAgcGFyc2VyLnRyYWNrUG9zaXRpb24gPSBwYXJzZXIub3B0LnBvc2l0aW9uICE9PSBmYWxzZVxuICAgIGlmIChwYXJzZXIudHJhY2tQb3NpdGlvbikge1xuICAgICAgcGFyc2VyLnBvc2l0aW9uID0gcGFyc2VyLmxpbmUgPSBwYXJzZXIuY29sdW1uID0gMFxuICAgIH1cbiAgICBlbWl0KHBhcnNlciwgJ29ucmVhZHknKVxuICB9XG5cbiAgaWYgKCFPYmplY3QuY3JlYXRlKSB7XG4gICAgT2JqZWN0LmNyZWF0ZSA9IGZ1bmN0aW9uIChvKSB7XG4gICAgICBmdW5jdGlvbiBGICgpIHt9XG4gICAgICBGLnByb3RvdHlwZSA9IG9cbiAgICAgIHZhciBuZXdmID0gbmV3IEYoKVxuICAgICAgcmV0dXJuIG5ld2ZcbiAgICB9XG4gIH1cblxuICBpZiAoIU9iamVjdC5rZXlzKSB7XG4gICAgT2JqZWN0LmtleXMgPSBmdW5jdGlvbiAobykge1xuICAgICAgdmFyIGEgPSBbXVxuICAgICAgZm9yICh2YXIgaSBpbiBvKSBpZiAoby5oYXNPd25Qcm9wZXJ0eShpKSkgYS5wdXNoKGkpXG4gICAgICByZXR1cm4gYVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrQnVmZmVyTGVuZ3RoIChwYXJzZXIpIHtcbiAgICB2YXIgbWF4QWxsb3dlZCA9IE1hdGgubWF4KHNheC5NQVhfQlVGRkVSX0xFTkdUSCwgMTApXG4gICAgdmFyIG1heEFjdHVhbCA9IDBcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGJ1ZmZlcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB2YXIgbGVuID0gcGFyc2VyW2J1ZmZlcnNbaV1dLmxlbmd0aFxuICAgICAgaWYgKGxlbiA+IG1heEFsbG93ZWQpIHtcbiAgICAgICAgLy8gVGV4dC9jZGF0YSBub2RlcyBjYW4gZ2V0IGJpZywgYW5kIHNpbmNlIHRoZXkncmUgYnVmZmVyZWQsXG4gICAgICAgIC8vIHdlIGNhbiBnZXQgaGVyZSB1bmRlciBub3JtYWwgY29uZGl0aW9ucy5cbiAgICAgICAgLy8gQXZvaWQgaXNzdWVzIGJ5IGVtaXR0aW5nIHRoZSB0ZXh0IG5vZGUgbm93LFxuICAgICAgICAvLyBzbyBhdCBsZWFzdCBpdCB3b24ndCBnZXQgYW55IGJpZ2dlci5cbiAgICAgICAgc3dpdGNoIChidWZmZXJzW2ldKSB7XG4gICAgICAgICAgY2FzZSAndGV4dE5vZGUnOlxuICAgICAgICAgICAgY2xvc2VUZXh0KHBhcnNlcilcbiAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICBjYXNlICdjZGF0YSc6XG4gICAgICAgICAgICBlbWl0Tm9kZShwYXJzZXIsICdvbmNkYXRhJywgcGFyc2VyLmNkYXRhKVxuICAgICAgICAgICAgcGFyc2VyLmNkYXRhID0gJydcbiAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICBjYXNlICdzY3JpcHQnOlxuICAgICAgICAgICAgZW1pdE5vZGUocGFyc2VyLCAnb25zY3JpcHQnLCBwYXJzZXIuc2NyaXB0KVxuICAgICAgICAgICAgcGFyc2VyLnNjcmlwdCA9ICcnXG4gICAgICAgICAgICBicmVha1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGVycm9yKHBhcnNlciwgJ01heCBidWZmZXIgbGVuZ3RoIGV4Y2VlZGVkOiAnICsgYnVmZmVyc1tpXSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbWF4QWN0dWFsID0gTWF0aC5tYXgobWF4QWN0dWFsLCBsZW4pXG4gICAgfVxuICAgIC8vIHNjaGVkdWxlIHRoZSBuZXh0IGNoZWNrIGZvciB0aGUgZWFybGllc3QgcG9zc2libGUgYnVmZmVyIG92ZXJydW4uXG4gICAgdmFyIG0gPSBzYXguTUFYX0JVRkZFUl9MRU5HVEggLSBtYXhBY3R1YWxcbiAgICBwYXJzZXIuYnVmZmVyQ2hlY2tQb3NpdGlvbiA9IG0gKyBwYXJzZXIucG9zaXRpb25cbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyQnVmZmVycyAocGFyc2VyKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBidWZmZXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgcGFyc2VyW2J1ZmZlcnNbaV1dID0gJydcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBmbHVzaEJ1ZmZlcnMgKHBhcnNlcikge1xuICAgIGNsb3NlVGV4dChwYXJzZXIpXG4gICAgaWYgKHBhcnNlci5jZGF0YSAhPT0gJycpIHtcbiAgICAgIGVtaXROb2RlKHBhcnNlciwgJ29uY2RhdGEnLCBwYXJzZXIuY2RhdGEpXG4gICAgICBwYXJzZXIuY2RhdGEgPSAnJ1xuICAgIH1cbiAgICBpZiAocGFyc2VyLnNjcmlwdCAhPT0gJycpIHtcbiAgICAgIGVtaXROb2RlKHBhcnNlciwgJ29uc2NyaXB0JywgcGFyc2VyLnNjcmlwdClcbiAgICAgIHBhcnNlci5zY3JpcHQgPSAnJ1xuICAgIH1cbiAgfVxuXG4gIFNBWFBhcnNlci5wcm90b3R5cGUgPSB7XG4gICAgZW5kOiBmdW5jdGlvbiAoKSB7IGVuZCh0aGlzKSB9LFxuICAgIHdyaXRlOiB3cml0ZSxcbiAgICByZXN1bWU6IGZ1bmN0aW9uICgpIHsgdGhpcy5lcnJvciA9IG51bGw7IHJldHVybiB0aGlzIH0sXG4gICAgY2xvc2U6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMud3JpdGUobnVsbCkgfSxcbiAgICBmbHVzaDogZnVuY3Rpb24gKCkgeyBmbHVzaEJ1ZmZlcnModGhpcykgfVxuICB9XG5cbiAgdmFyIFN0cmVhbVxuICB0cnkge1xuICAgIFN0cmVhbSA9IHJlcXVpcmUoJ3N0cmVhbScpLlN0cmVhbVxuICB9IGNhdGNoIChleCkge1xuICAgIFN0cmVhbSA9IGZ1bmN0aW9uICgpIHt9XG4gIH1cblxuICB2YXIgc3RyZWFtV3JhcHMgPSBzYXguRVZFTlRTLmZpbHRlcihmdW5jdGlvbiAoZXYpIHtcbiAgICByZXR1cm4gZXYgIT09ICdlcnJvcicgJiYgZXYgIT09ICdlbmQnXG4gIH0pXG5cbiAgZnVuY3Rpb24gY3JlYXRlU3RyZWFtIChzdHJpY3QsIG9wdCkge1xuICAgIHJldHVybiBuZXcgU0FYU3RyZWFtKHN0cmljdCwgb3B0KVxuICB9XG5cbiAgZnVuY3Rpb24gU0FYU3RyZWFtIChzdHJpY3QsIG9wdCkge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTQVhTdHJlYW0pKSB7XG4gICAgICByZXR1cm4gbmV3IFNBWFN0cmVhbShzdHJpY3QsIG9wdClcbiAgICB9XG5cbiAgICBTdHJlYW0uYXBwbHkodGhpcylcblxuICAgIHRoaXMuX3BhcnNlciA9IG5ldyBTQVhQYXJzZXIoc3RyaWN0LCBvcHQpXG4gICAgdGhpcy53cml0YWJsZSA9IHRydWVcbiAgICB0aGlzLnJlYWRhYmxlID0gdHJ1ZVxuXG4gICAgdmFyIG1lID0gdGhpc1xuXG4gICAgdGhpcy5fcGFyc2VyLm9uZW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgbWUuZW1pdCgnZW5kJylcbiAgICB9XG5cbiAgICB0aGlzLl9wYXJzZXIub25lcnJvciA9IGZ1bmN0aW9uIChlcikge1xuICAgICAgbWUuZW1pdCgnZXJyb3InLCBlcilcblxuICAgICAgLy8gaWYgZGlkbid0IHRocm93LCB0aGVuIG1lYW5zIGVycm9yIHdhcyBoYW5kbGVkLlxuICAgICAgLy8gZ28gYWhlYWQgYW5kIGNsZWFyIGVycm9yLCBzbyB3ZSBjYW4gd3JpdGUgYWdhaW4uXG4gICAgICBtZS5fcGFyc2VyLmVycm9yID0gbnVsbFxuICAgIH1cblxuICAgIHRoaXMuX2RlY29kZXIgPSBudWxsXG5cbiAgICBzdHJlYW1XcmFwcy5mb3JFYWNoKGZ1bmN0aW9uIChldikge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1lLCAnb24nICsgZXYsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIG1lLl9wYXJzZXJbJ29uJyArIGV2XVxuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChoKSB7XG4gICAgICAgICAgaWYgKCFoKSB7XG4gICAgICAgICAgICBtZS5yZW1vdmVBbGxMaXN0ZW5lcnMoZXYpXG4gICAgICAgICAgICBtZS5fcGFyc2VyWydvbicgKyBldl0gPSBoXG4gICAgICAgICAgICByZXR1cm4gaFxuICAgICAgICAgIH1cbiAgICAgICAgICBtZS5vbihldiwgaClcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgU0FYU3RyZWFtLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoU3RyZWFtLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogU0FYU3RyZWFtXG4gICAgfVxuICB9KVxuXG4gIFNBWFN0cmVhbS5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIGlmICh0eXBlb2YgQnVmZmVyID09PSAnZnVuY3Rpb24nICYmXG4gICAgICB0eXBlb2YgQnVmZmVyLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmXG4gICAgICBCdWZmZXIuaXNCdWZmZXIoZGF0YSkpIHtcbiAgICAgIGlmICghdGhpcy5fZGVjb2Rlcikge1xuICAgICAgICB2YXIgU0QgPSByZXF1aXJlKCdzdHJpbmdfZGVjb2RlcicpLlN0cmluZ0RlY29kZXJcbiAgICAgICAgdGhpcy5fZGVjb2RlciA9IG5ldyBTRCgndXRmOCcpXG4gICAgICB9XG4gICAgICBkYXRhID0gdGhpcy5fZGVjb2Rlci53cml0ZShkYXRhKVxuICAgIH1cblxuICAgIHRoaXMuX3BhcnNlci53cml0ZShkYXRhLnRvU3RyaW5nKCkpXG4gICAgdGhpcy5lbWl0KCdkYXRhJywgZGF0YSlcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgU0FYU3RyZWFtLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAoY2h1bmspIHtcbiAgICBpZiAoY2h1bmsgJiYgY2h1bmsubGVuZ3RoKSB7XG4gICAgICB0aGlzLndyaXRlKGNodW5rKVxuICAgIH1cbiAgICB0aGlzLl9wYXJzZXIuZW5kKClcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgU0FYU3RyZWFtLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldiwgaGFuZGxlcikge1xuICAgIHZhciBtZSA9IHRoaXNcbiAgICBpZiAoIW1lLl9wYXJzZXJbJ29uJyArIGV2XSAmJiBzdHJlYW1XcmFwcy5pbmRleE9mKGV2KSAhPT0gLTEpIHtcbiAgICAgIG1lLl9wYXJzZXJbJ29uJyArIGV2XSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMubGVuZ3RoID09PSAxID8gW2FyZ3VtZW50c1swXV0gOiBBcnJheS5hcHBseShudWxsLCBhcmd1bWVudHMpXG4gICAgICAgIGFyZ3Muc3BsaWNlKDAsIDAsIGV2KVxuICAgICAgICBtZS5lbWl0LmFwcGx5KG1lLCBhcmdzKVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBTdHJlYW0ucHJvdG90eXBlLm9uLmNhbGwobWUsIGV2LCBoYW5kbGVyKVxuICB9XG5cbiAgLy8gdGhpcyByZWFsbHkgbmVlZHMgdG8gYmUgcmVwbGFjZWQgd2l0aCBjaGFyYWN0ZXIgY2xhc3Nlcy5cbiAgLy8gWE1MIGFsbG93cyBhbGwgbWFubmVyIG9mIHJpZGljdWxvdXMgbnVtYmVycyBhbmQgZGlnaXRzLlxuICB2YXIgQ0RBVEEgPSAnW0NEQVRBWydcbiAgdmFyIERPQ1RZUEUgPSAnRE9DVFlQRSdcbiAgdmFyIFhNTF9OQU1FU1BBQ0UgPSAnaHR0cDovL3d3dy53My5vcmcvWE1MLzE5OTgvbmFtZXNwYWNlJ1xuICB2YXIgWE1MTlNfTkFNRVNQQUNFID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAveG1sbnMvJ1xuICB2YXIgcm9vdE5TID0geyB4bWw6IFhNTF9OQU1FU1BBQ0UsIHhtbG5zOiBYTUxOU19OQU1FU1BBQ0UgfVxuXG4gIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL1JFQy14bWwvI05ULU5hbWVTdGFydENoYXJcbiAgLy8gVGhpcyBpbXBsZW1lbnRhdGlvbiB3b3JrcyBvbiBzdHJpbmdzLCBhIHNpbmdsZSBjaGFyYWN0ZXIgYXQgYSB0aW1lXG4gIC8vIGFzIHN1Y2gsIGl0IGNhbm5vdCBldmVyIHN1cHBvcnQgYXN0cmFsLXBsYW5lIGNoYXJhY3RlcnMgKDEwMDAwLUVGRkZGKVxuICAvLyB3aXRob3V0IGEgc2lnbmlmaWNhbnQgYnJlYWtpbmcgY2hhbmdlIHRvIGVpdGhlciB0aGlzICBwYXJzZXIsIG9yIHRoZVxuICAvLyBKYXZhU2NyaXB0IGxhbmd1YWdlLiAgSW1wbGVtZW50YXRpb24gb2YgYW4gZW1vamktY2FwYWJsZSB4bWwgcGFyc2VyXG4gIC8vIGlzIGxlZnQgYXMgYW4gZXhlcmNpc2UgZm9yIHRoZSByZWFkZXIuXG4gIHZhciBuYW1lU3RhcnQgPSAvWzpfQS1aYS16XFx1MDBDMC1cXHUwMEQ2XFx1MDBEOC1cXHUwMEY2XFx1MDBGOC1cXHUwMkZGXFx1MDM3MC1cXHUwMzdEXFx1MDM3Ri1cXHUxRkZGXFx1MjAwQy1cXHUyMDBEXFx1MjA3MC1cXHUyMThGXFx1MkMwMC1cXHUyRkVGXFx1MzAwMS1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkZEXS9cblxuICB2YXIgbmFtZUJvZHkgPSAvWzpfQS1aYS16XFx1MDBDMC1cXHUwMEQ2XFx1MDBEOC1cXHUwMEY2XFx1MDBGOC1cXHUwMkZGXFx1MDM3MC1cXHUwMzdEXFx1MDM3Ri1cXHUxRkZGXFx1MjAwQy1cXHUyMDBEXFx1MjA3MC1cXHUyMThGXFx1MkMwMC1cXHUyRkVGXFx1MzAwMS1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkZEXFx1MDBCN1xcdTAzMDAtXFx1MDM2RlxcdTIwM0YtXFx1MjA0MC5cXGQtXS9cblxuICB2YXIgZW50aXR5U3RhcnQgPSAvWyM6X0EtWmEtelxcdTAwQzAtXFx1MDBENlxcdTAwRDgtXFx1MDBGNlxcdTAwRjgtXFx1MDJGRlxcdTAzNzAtXFx1MDM3RFxcdTAzN0YtXFx1MUZGRlxcdTIwMEMtXFx1MjAwRFxcdTIwNzAtXFx1MjE4RlxcdTJDMDAtXFx1MkZFRlxcdTMwMDEtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZGRF0vXG4gIHZhciBlbnRpdHlCb2R5ID0gL1sjOl9BLVphLXpcXHUwMEMwLVxcdTAwRDZcXHUwMEQ4LVxcdTAwRjZcXHUwMEY4LVxcdTAyRkZcXHUwMzcwLVxcdTAzN0RcXHUwMzdGLVxcdTFGRkZcXHUyMDBDLVxcdTIwMERcXHUyMDcwLVxcdTIxOEZcXHUyQzAwLVxcdTJGRUZcXHUzMDAxLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRkRcXHUwMEI3XFx1MDMwMC1cXHUwMzZGXFx1MjAzRi1cXHUyMDQwLlxcZC1dL1xuXG4gIGZ1bmN0aW9uIGlzV2hpdGVzcGFjZSAoYykge1xuICAgIHJldHVybiBjID09PSAnICcgfHwgYyA9PT0gJ1xcbicgfHwgYyA9PT0gJ1xccicgfHwgYyA9PT0gJ1xcdCdcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzUXVvdGUgKGMpIHtcbiAgICByZXR1cm4gYyA9PT0gJ1wiJyB8fCBjID09PSAnXFwnJ1xuICB9XG5cbiAgZnVuY3Rpb24gaXNBdHRyaWJFbmQgKGMpIHtcbiAgICByZXR1cm4gYyA9PT0gJz4nIHx8IGlzV2hpdGVzcGFjZShjKVxuICB9XG5cbiAgZnVuY3Rpb24gaXNNYXRjaCAocmVnZXgsIGMpIHtcbiAgICByZXR1cm4gcmVnZXgudGVzdChjKVxuICB9XG5cbiAgZnVuY3Rpb24gbm90TWF0Y2ggKHJlZ2V4LCBjKSB7XG4gICAgcmV0dXJuICFpc01hdGNoKHJlZ2V4LCBjKVxuICB9XG5cbiAgdmFyIFMgPSAwXG4gIHNheC5TVEFURSA9IHtcbiAgICBCRUdJTjogUysrLCAvLyBsZWFkaW5nIGJ5dGUgb3JkZXIgbWFyayBvciB3aGl0ZXNwYWNlXG4gICAgQkVHSU5fV0hJVEVTUEFDRTogUysrLCAvLyBsZWFkaW5nIHdoaXRlc3BhY2VcbiAgICBURVhUOiBTKyssIC8vIGdlbmVyYWwgc3R1ZmZcbiAgICBURVhUX0VOVElUWTogUysrLCAvLyAmYW1wIGFuZCBzdWNoLlxuICAgIE9QRU5fV0FLQTogUysrLCAvLyA8XG4gICAgU0dNTF9ERUNMOiBTKyssIC8vIDwhQkxBUkdcbiAgICBTR01MX0RFQ0xfUVVPVEVEOiBTKyssIC8vIDwhQkxBUkcgZm9vIFwiYmFyXG4gICAgRE9DVFlQRTogUysrLCAvLyA8IURPQ1RZUEVcbiAgICBET0NUWVBFX1FVT1RFRDogUysrLCAvLyA8IURPQ1RZUEUgXCIvL2JsYWhcbiAgICBET0NUWVBFX0RURDogUysrLCAvLyA8IURPQ1RZUEUgXCIvL2JsYWhcIiBbIC4uLlxuICAgIERPQ1RZUEVfRFREX1FVT1RFRDogUysrLCAvLyA8IURPQ1RZUEUgXCIvL2JsYWhcIiBbIFwiZm9vXG4gICAgQ09NTUVOVF9TVEFSVElORzogUysrLCAvLyA8IS1cbiAgICBDT01NRU5UOiBTKyssIC8vIDwhLS1cbiAgICBDT01NRU5UX0VORElORzogUysrLCAvLyA8IS0tIGJsYWggLVxuICAgIENPTU1FTlRfRU5ERUQ6IFMrKywgLy8gPCEtLSBibGFoIC0tXG4gICAgQ0RBVEE6IFMrKywgLy8gPCFbQ0RBVEFbIHNvbWV0aGluZ1xuICAgIENEQVRBX0VORElORzogUysrLCAvLyBdXG4gICAgQ0RBVEFfRU5ESU5HXzI6IFMrKywgLy8gXV1cbiAgICBQUk9DX0lOU1Q6IFMrKywgLy8gPD9oaVxuICAgIFBST0NfSU5TVF9CT0RZOiBTKyssIC8vIDw/aGkgdGhlcmVcbiAgICBQUk9DX0lOU1RfRU5ESU5HOiBTKyssIC8vIDw/aGkgXCJ0aGVyZVwiID9cbiAgICBPUEVOX1RBRzogUysrLCAvLyA8c3Ryb25nXG4gICAgT1BFTl9UQUdfU0xBU0g6IFMrKywgLy8gPHN0cm9uZyAvXG4gICAgQVRUUklCOiBTKyssIC8vIDxhXG4gICAgQVRUUklCX05BTUU6IFMrKywgLy8gPGEgZm9vXG4gICAgQVRUUklCX05BTUVfU0FXX1dISVRFOiBTKyssIC8vIDxhIGZvbyBfXG4gICAgQVRUUklCX1ZBTFVFOiBTKyssIC8vIDxhIGZvbz1cbiAgICBBVFRSSUJfVkFMVUVfUVVPVEVEOiBTKyssIC8vIDxhIGZvbz1cImJhclxuICAgIEFUVFJJQl9WQUxVRV9DTE9TRUQ6IFMrKywgLy8gPGEgZm9vPVwiYmFyXCJcbiAgICBBVFRSSUJfVkFMVUVfVU5RVU9URUQ6IFMrKywgLy8gPGEgZm9vPWJhclxuICAgIEFUVFJJQl9WQUxVRV9FTlRJVFlfUTogUysrLCAvLyA8Zm9vIGJhcj1cIiZxdW90O1wiXG4gICAgQVRUUklCX1ZBTFVFX0VOVElUWV9VOiBTKyssIC8vIDxmb28gYmFyPSZxdW90XG4gICAgQ0xPU0VfVEFHOiBTKyssIC8vIDwvYVxuICAgIENMT1NFX1RBR19TQVdfV0hJVEU6IFMrKywgLy8gPC9hICAgPlxuICAgIFNDUklQVDogUysrLCAvLyA8c2NyaXB0PiAuLi5cbiAgICBTQ1JJUFRfRU5ESU5HOiBTKysgLy8gPHNjcmlwdD4gLi4uIDxcbiAgfVxuXG4gIHNheC5YTUxfRU5USVRJRVMgPSB7XG4gICAgJ2FtcCc6ICcmJyxcbiAgICAnZ3QnOiAnPicsXG4gICAgJ2x0JzogJzwnLFxuICAgICdxdW90JzogJ1wiJyxcbiAgICAnYXBvcyc6IFwiJ1wiXG4gIH1cblxuICBzYXguRU5USVRJRVMgPSB7XG4gICAgJ2FtcCc6ICcmJyxcbiAgICAnZ3QnOiAnPicsXG4gICAgJ2x0JzogJzwnLFxuICAgICdxdW90JzogJ1wiJyxcbiAgICAnYXBvcyc6IFwiJ1wiLFxuICAgICdBRWxpZyc6IDE5OCxcbiAgICAnQWFjdXRlJzogMTkzLFxuICAgICdBY2lyYyc6IDE5NCxcbiAgICAnQWdyYXZlJzogMTkyLFxuICAgICdBcmluZyc6IDE5NyxcbiAgICAnQXRpbGRlJzogMTk1LFxuICAgICdBdW1sJzogMTk2LFxuICAgICdDY2VkaWwnOiAxOTksXG4gICAgJ0VUSCc6IDIwOCxcbiAgICAnRWFjdXRlJzogMjAxLFxuICAgICdFY2lyYyc6IDIwMixcbiAgICAnRWdyYXZlJzogMjAwLFxuICAgICdFdW1sJzogMjAzLFxuICAgICdJYWN1dGUnOiAyMDUsXG4gICAgJ0ljaXJjJzogMjA2LFxuICAgICdJZ3JhdmUnOiAyMDQsXG4gICAgJ0l1bWwnOiAyMDcsXG4gICAgJ050aWxkZSc6IDIwOSxcbiAgICAnT2FjdXRlJzogMjExLFxuICAgICdPY2lyYyc6IDIxMixcbiAgICAnT2dyYXZlJzogMjEwLFxuICAgICdPc2xhc2gnOiAyMTYsXG4gICAgJ090aWxkZSc6IDIxMyxcbiAgICAnT3VtbCc6IDIxNCxcbiAgICAnVEhPUk4nOiAyMjIsXG4gICAgJ1VhY3V0ZSc6IDIxOCxcbiAgICAnVWNpcmMnOiAyMTksXG4gICAgJ1VncmF2ZSc6IDIxNyxcbiAgICAnVXVtbCc6IDIyMCxcbiAgICAnWWFjdXRlJzogMjIxLFxuICAgICdhYWN1dGUnOiAyMjUsXG4gICAgJ2FjaXJjJzogMjI2LFxuICAgICdhZWxpZyc6IDIzMCxcbiAgICAnYWdyYXZlJzogMjI0LFxuICAgICdhcmluZyc6IDIyOSxcbiAgICAnYXRpbGRlJzogMjI3LFxuICAgICdhdW1sJzogMjI4LFxuICAgICdjY2VkaWwnOiAyMzEsXG4gICAgJ2VhY3V0ZSc6IDIzMyxcbiAgICAnZWNpcmMnOiAyMzQsXG4gICAgJ2VncmF2ZSc6IDIzMixcbiAgICAnZXRoJzogMjQwLFxuICAgICdldW1sJzogMjM1LFxuICAgICdpYWN1dGUnOiAyMzcsXG4gICAgJ2ljaXJjJzogMjM4LFxuICAgICdpZ3JhdmUnOiAyMzYsXG4gICAgJ2l1bWwnOiAyMzksXG4gICAgJ250aWxkZSc6IDI0MSxcbiAgICAnb2FjdXRlJzogMjQzLFxuICAgICdvY2lyYyc6IDI0NCxcbiAgICAnb2dyYXZlJzogMjQyLFxuICAgICdvc2xhc2gnOiAyNDgsXG4gICAgJ290aWxkZSc6IDI0NSxcbiAgICAnb3VtbCc6IDI0NixcbiAgICAnc3psaWcnOiAyMjMsXG4gICAgJ3Rob3JuJzogMjU0LFxuICAgICd1YWN1dGUnOiAyNTAsXG4gICAgJ3VjaXJjJzogMjUxLFxuICAgICd1Z3JhdmUnOiAyNDksXG4gICAgJ3V1bWwnOiAyNTIsXG4gICAgJ3lhY3V0ZSc6IDI1MyxcbiAgICAneXVtbCc6IDI1NSxcbiAgICAnY29weSc6IDE2OSxcbiAgICAncmVnJzogMTc0LFxuICAgICduYnNwJzogMTYwLFxuICAgICdpZXhjbCc6IDE2MSxcbiAgICAnY2VudCc6IDE2MixcbiAgICAncG91bmQnOiAxNjMsXG4gICAgJ2N1cnJlbic6IDE2NCxcbiAgICAneWVuJzogMTY1LFxuICAgICdicnZiYXInOiAxNjYsXG4gICAgJ3NlY3QnOiAxNjcsXG4gICAgJ3VtbCc6IDE2OCxcbiAgICAnb3JkZic6IDE3MCxcbiAgICAnbGFxdW8nOiAxNzEsXG4gICAgJ25vdCc6IDE3MixcbiAgICAnc2h5JzogMTczLFxuICAgICdtYWNyJzogMTc1LFxuICAgICdkZWcnOiAxNzYsXG4gICAgJ3BsdXNtbic6IDE3NyxcbiAgICAnc3VwMSc6IDE4NSxcbiAgICAnc3VwMic6IDE3OCxcbiAgICAnc3VwMyc6IDE3OSxcbiAgICAnYWN1dGUnOiAxODAsXG4gICAgJ21pY3JvJzogMTgxLFxuICAgICdwYXJhJzogMTgyLFxuICAgICdtaWRkb3QnOiAxODMsXG4gICAgJ2NlZGlsJzogMTg0LFxuICAgICdvcmRtJzogMTg2LFxuICAgICdyYXF1byc6IDE4NyxcbiAgICAnZnJhYzE0JzogMTg4LFxuICAgICdmcmFjMTInOiAxODksXG4gICAgJ2ZyYWMzNCc6IDE5MCxcbiAgICAnaXF1ZXN0JzogMTkxLFxuICAgICd0aW1lcyc6IDIxNSxcbiAgICAnZGl2aWRlJzogMjQ3LFxuICAgICdPRWxpZyc6IDMzOCxcbiAgICAnb2VsaWcnOiAzMzksXG4gICAgJ1NjYXJvbic6IDM1MixcbiAgICAnc2Nhcm9uJzogMzUzLFxuICAgICdZdW1sJzogMzc2LFxuICAgICdmbm9mJzogNDAyLFxuICAgICdjaXJjJzogNzEwLFxuICAgICd0aWxkZSc6IDczMixcbiAgICAnQWxwaGEnOiA5MTMsXG4gICAgJ0JldGEnOiA5MTQsXG4gICAgJ0dhbW1hJzogOTE1LFxuICAgICdEZWx0YSc6IDkxNixcbiAgICAnRXBzaWxvbic6IDkxNyxcbiAgICAnWmV0YSc6IDkxOCxcbiAgICAnRXRhJzogOTE5LFxuICAgICdUaGV0YSc6IDkyMCxcbiAgICAnSW90YSc6IDkyMSxcbiAgICAnS2FwcGEnOiA5MjIsXG4gICAgJ0xhbWJkYSc6IDkyMyxcbiAgICAnTXUnOiA5MjQsXG4gICAgJ051JzogOTI1LFxuICAgICdYaSc6IDkyNixcbiAgICAnT21pY3Jvbic6IDkyNyxcbiAgICAnUGknOiA5MjgsXG4gICAgJ1Jobyc6IDkyOSxcbiAgICAnU2lnbWEnOiA5MzEsXG4gICAgJ1RhdSc6IDkzMixcbiAgICAnVXBzaWxvbic6IDkzMyxcbiAgICAnUGhpJzogOTM0LFxuICAgICdDaGknOiA5MzUsXG4gICAgJ1BzaSc6IDkzNixcbiAgICAnT21lZ2EnOiA5MzcsXG4gICAgJ2FscGhhJzogOTQ1LFxuICAgICdiZXRhJzogOTQ2LFxuICAgICdnYW1tYSc6IDk0NyxcbiAgICAnZGVsdGEnOiA5NDgsXG4gICAgJ2Vwc2lsb24nOiA5NDksXG4gICAgJ3pldGEnOiA5NTAsXG4gICAgJ2V0YSc6IDk1MSxcbiAgICAndGhldGEnOiA5NTIsXG4gICAgJ2lvdGEnOiA5NTMsXG4gICAgJ2thcHBhJzogOTU0LFxuICAgICdsYW1iZGEnOiA5NTUsXG4gICAgJ211JzogOTU2LFxuICAgICdudSc6IDk1NyxcbiAgICAneGknOiA5NTgsXG4gICAgJ29taWNyb24nOiA5NTksXG4gICAgJ3BpJzogOTYwLFxuICAgICdyaG8nOiA5NjEsXG4gICAgJ3NpZ21hZic6IDk2MixcbiAgICAnc2lnbWEnOiA5NjMsXG4gICAgJ3RhdSc6IDk2NCxcbiAgICAndXBzaWxvbic6IDk2NSxcbiAgICAncGhpJzogOTY2LFxuICAgICdjaGknOiA5NjcsXG4gICAgJ3BzaSc6IDk2OCxcbiAgICAnb21lZ2EnOiA5NjksXG4gICAgJ3RoZXRhc3ltJzogOTc3LFxuICAgICd1cHNpaCc6IDk3OCxcbiAgICAncGl2JzogOTgyLFxuICAgICdlbnNwJzogODE5NCxcbiAgICAnZW1zcCc6IDgxOTUsXG4gICAgJ3RoaW5zcCc6IDgyMDEsXG4gICAgJ3p3bmonOiA4MjA0LFxuICAgICd6d2onOiA4MjA1LFxuICAgICdscm0nOiA4MjA2LFxuICAgICdybG0nOiA4MjA3LFxuICAgICduZGFzaCc6IDgyMTEsXG4gICAgJ21kYXNoJzogODIxMixcbiAgICAnbHNxdW8nOiA4MjE2LFxuICAgICdyc3F1byc6IDgyMTcsXG4gICAgJ3NicXVvJzogODIxOCxcbiAgICAnbGRxdW8nOiA4MjIwLFxuICAgICdyZHF1byc6IDgyMjEsXG4gICAgJ2JkcXVvJzogODIyMixcbiAgICAnZGFnZ2VyJzogODIyNCxcbiAgICAnRGFnZ2VyJzogODIyNSxcbiAgICAnYnVsbCc6IDgyMjYsXG4gICAgJ2hlbGxpcCc6IDgyMzAsXG4gICAgJ3Blcm1pbCc6IDgyNDAsXG4gICAgJ3ByaW1lJzogODI0MixcbiAgICAnUHJpbWUnOiA4MjQzLFxuICAgICdsc2FxdW8nOiA4MjQ5LFxuICAgICdyc2FxdW8nOiA4MjUwLFxuICAgICdvbGluZSc6IDgyNTQsXG4gICAgJ2ZyYXNsJzogODI2MCxcbiAgICAnZXVybyc6IDgzNjQsXG4gICAgJ2ltYWdlJzogODQ2NSxcbiAgICAnd2VpZXJwJzogODQ3MixcbiAgICAncmVhbCc6IDg0NzYsXG4gICAgJ3RyYWRlJzogODQ4MixcbiAgICAnYWxlZnN5bSc6IDg1MDEsXG4gICAgJ2xhcnInOiA4NTkyLFxuICAgICd1YXJyJzogODU5MyxcbiAgICAncmFycic6IDg1OTQsXG4gICAgJ2RhcnInOiA4NTk1LFxuICAgICdoYXJyJzogODU5NixcbiAgICAnY3JhcnInOiA4NjI5LFxuICAgICdsQXJyJzogODY1NixcbiAgICAndUFycic6IDg2NTcsXG4gICAgJ3JBcnInOiA4NjU4LFxuICAgICdkQXJyJzogODY1OSxcbiAgICAnaEFycic6IDg2NjAsXG4gICAgJ2ZvcmFsbCc6IDg3MDQsXG4gICAgJ3BhcnQnOiA4NzA2LFxuICAgICdleGlzdCc6IDg3MDcsXG4gICAgJ2VtcHR5JzogODcwOSxcbiAgICAnbmFibGEnOiA4NzExLFxuICAgICdpc2luJzogODcxMixcbiAgICAnbm90aW4nOiA4NzEzLFxuICAgICduaSc6IDg3MTUsXG4gICAgJ3Byb2QnOiA4NzE5LFxuICAgICdzdW0nOiA4NzIxLFxuICAgICdtaW51cyc6IDg3MjIsXG4gICAgJ2xvd2FzdCc6IDg3MjcsXG4gICAgJ3JhZGljJzogODczMCxcbiAgICAncHJvcCc6IDg3MzMsXG4gICAgJ2luZmluJzogODczNCxcbiAgICAnYW5nJzogODczNixcbiAgICAnYW5kJzogODc0MyxcbiAgICAnb3InOiA4NzQ0LFxuICAgICdjYXAnOiA4NzQ1LFxuICAgICdjdXAnOiA4NzQ2LFxuICAgICdpbnQnOiA4NzQ3LFxuICAgICd0aGVyZTQnOiA4NzU2LFxuICAgICdzaW0nOiA4NzY0LFxuICAgICdjb25nJzogODc3MyxcbiAgICAnYXN5bXAnOiA4Nzc2LFxuICAgICduZSc6IDg4MDAsXG4gICAgJ2VxdWl2JzogODgwMSxcbiAgICAnbGUnOiA4ODA0LFxuICAgICdnZSc6IDg4MDUsXG4gICAgJ3N1Yic6IDg4MzQsXG4gICAgJ3N1cCc6IDg4MzUsXG4gICAgJ25zdWInOiA4ODM2LFxuICAgICdzdWJlJzogODgzOCxcbiAgICAnc3VwZSc6IDg4MzksXG4gICAgJ29wbHVzJzogODg1MyxcbiAgICAnb3RpbWVzJzogODg1NSxcbiAgICAncGVycCc6IDg4NjksXG4gICAgJ3Nkb3QnOiA4OTAxLFxuICAgICdsY2VpbCc6IDg5NjgsXG4gICAgJ3JjZWlsJzogODk2OSxcbiAgICAnbGZsb29yJzogODk3MCxcbiAgICAncmZsb29yJzogODk3MSxcbiAgICAnbGFuZyc6IDkwMDEsXG4gICAgJ3JhbmcnOiA5MDAyLFxuICAgICdsb3onOiA5Njc0LFxuICAgICdzcGFkZXMnOiA5ODI0LFxuICAgICdjbHVicyc6IDk4MjcsXG4gICAgJ2hlYXJ0cyc6IDk4MjksXG4gICAgJ2RpYW1zJzogOTgzMFxuICB9XG5cbiAgT2JqZWN0LmtleXMoc2F4LkVOVElUSUVTKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgZSA9IHNheC5FTlRJVElFU1trZXldXG4gICAgdmFyIHMgPSB0eXBlb2YgZSA9PT0gJ251bWJlcicgPyBTdHJpbmcuZnJvbUNoYXJDb2RlKGUpIDogZVxuICAgIHNheC5FTlRJVElFU1trZXldID0gc1xuICB9KVxuXG4gIGZvciAodmFyIHMgaW4gc2F4LlNUQVRFKSB7XG4gICAgc2F4LlNUQVRFW3NheC5TVEFURVtzXV0gPSBzXG4gIH1cblxuICAvLyBzaG9ydGhhbmRcbiAgUyA9IHNheC5TVEFURVxuXG4gIGZ1bmN0aW9uIGVtaXQgKHBhcnNlciwgZXZlbnQsIGRhdGEpIHtcbiAgICBwYXJzZXJbZXZlbnRdICYmIHBhcnNlcltldmVudF0oZGF0YSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGVtaXROb2RlIChwYXJzZXIsIG5vZGVUeXBlLCBkYXRhKSB7XG4gICAgaWYgKHBhcnNlci50ZXh0Tm9kZSkgY2xvc2VUZXh0KHBhcnNlcilcbiAgICBlbWl0KHBhcnNlciwgbm9kZVR5cGUsIGRhdGEpXG4gIH1cblxuICBmdW5jdGlvbiBjbG9zZVRleHQgKHBhcnNlcikge1xuICAgIHBhcnNlci50ZXh0Tm9kZSA9IHRleHRvcHRzKHBhcnNlci5vcHQsIHBhcnNlci50ZXh0Tm9kZSlcbiAgICBpZiAocGFyc2VyLnRleHROb2RlKSBlbWl0KHBhcnNlciwgJ29udGV4dCcsIHBhcnNlci50ZXh0Tm9kZSlcbiAgICBwYXJzZXIudGV4dE5vZGUgPSAnJ1xuICB9XG5cbiAgZnVuY3Rpb24gdGV4dG9wdHMgKG9wdCwgdGV4dCkge1xuICAgIGlmIChvcHQudHJpbSkgdGV4dCA9IHRleHQudHJpbSgpXG4gICAgaWYgKG9wdC5ub3JtYWxpemUpIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xccysvZywgJyAnKVxuICAgIHJldHVybiB0ZXh0XG4gIH1cblxuICBmdW5jdGlvbiBlcnJvciAocGFyc2VyLCBlcikge1xuICAgIGNsb3NlVGV4dChwYXJzZXIpXG4gICAgaWYgKHBhcnNlci50cmFja1Bvc2l0aW9uKSB7XG4gICAgICBlciArPSAnXFxuTGluZTogJyArIHBhcnNlci5saW5lICtcbiAgICAgICAgJ1xcbkNvbHVtbjogJyArIHBhcnNlci5jb2x1bW4gK1xuICAgICAgICAnXFxuQ2hhcjogJyArIHBhcnNlci5jXG4gICAgfVxuICAgIGVyID0gbmV3IEVycm9yKGVyKVxuICAgIHBhcnNlci5lcnJvciA9IGVyXG4gICAgZW1pdChwYXJzZXIsICdvbmVycm9yJywgZXIpXG4gICAgcmV0dXJuIHBhcnNlclxuICB9XG5cbiAgZnVuY3Rpb24gZW5kIChwYXJzZXIpIHtcbiAgICBpZiAocGFyc2VyLnNhd1Jvb3QgJiYgIXBhcnNlci5jbG9zZWRSb290KSBzdHJpY3RGYWlsKHBhcnNlciwgJ1VuY2xvc2VkIHJvb3QgdGFnJylcbiAgICBpZiAoKHBhcnNlci5zdGF0ZSAhPT0gUy5CRUdJTikgJiZcbiAgICAgIChwYXJzZXIuc3RhdGUgIT09IFMuQkVHSU5fV0hJVEVTUEFDRSkgJiZcbiAgICAgIChwYXJzZXIuc3RhdGUgIT09IFMuVEVYVCkpIHtcbiAgICAgIGVycm9yKHBhcnNlciwgJ1VuZXhwZWN0ZWQgZW5kJylcbiAgICB9XG4gICAgY2xvc2VUZXh0KHBhcnNlcilcbiAgICBwYXJzZXIuYyA9ICcnXG4gICAgcGFyc2VyLmNsb3NlZCA9IHRydWVcbiAgICBlbWl0KHBhcnNlciwgJ29uZW5kJylcbiAgICBTQVhQYXJzZXIuY2FsbChwYXJzZXIsIHBhcnNlci5zdHJpY3QsIHBhcnNlci5vcHQpXG4gICAgcmV0dXJuIHBhcnNlclxuICB9XG5cbiAgZnVuY3Rpb24gc3RyaWN0RmFpbCAocGFyc2VyLCBtZXNzYWdlKSB7XG4gICAgaWYgKHR5cGVvZiBwYXJzZXIgIT09ICdvYmplY3QnIHx8ICEocGFyc2VyIGluc3RhbmNlb2YgU0FYUGFyc2VyKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdiYWQgY2FsbCB0byBzdHJpY3RGYWlsJylcbiAgICB9XG4gICAgaWYgKHBhcnNlci5zdHJpY3QpIHtcbiAgICAgIGVycm9yKHBhcnNlciwgbWVzc2FnZSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBuZXdUYWcgKHBhcnNlcikge1xuICAgIGlmICghcGFyc2VyLnN0cmljdCkgcGFyc2VyLnRhZ05hbWUgPSBwYXJzZXIudGFnTmFtZVtwYXJzZXIubG9vc2VDYXNlXSgpXG4gICAgdmFyIHBhcmVudCA9IHBhcnNlci50YWdzW3BhcnNlci50YWdzLmxlbmd0aCAtIDFdIHx8IHBhcnNlclxuICAgIHZhciB0YWcgPSBwYXJzZXIudGFnID0geyBuYW1lOiBwYXJzZXIudGFnTmFtZSwgYXR0cmlidXRlczoge30gfVxuXG4gICAgLy8gd2lsbCBiZSBvdmVycmlkZGVuIGlmIHRhZyBjb250YWlscyBhbiB4bWxucz1cImZvb1wiIG9yIHhtbG5zOmZvbz1cImJhclwiXG4gICAgaWYgKHBhcnNlci5vcHQueG1sbnMpIHtcbiAgICAgIHRhZy5ucyA9IHBhcmVudC5uc1xuICAgIH1cbiAgICBwYXJzZXIuYXR0cmliTGlzdC5sZW5ndGggPSAwXG4gICAgZW1pdE5vZGUocGFyc2VyLCAnb25vcGVudGFnc3RhcnQnLCB0YWcpXG4gIH1cblxuICBmdW5jdGlvbiBxbmFtZSAobmFtZSwgYXR0cmlidXRlKSB7XG4gICAgdmFyIGkgPSBuYW1lLmluZGV4T2YoJzonKVxuICAgIHZhciBxdWFsTmFtZSA9IGkgPCAwID8gWyAnJywgbmFtZSBdIDogbmFtZS5zcGxpdCgnOicpXG4gICAgdmFyIHByZWZpeCA9IHF1YWxOYW1lWzBdXG4gICAgdmFyIGxvY2FsID0gcXVhbE5hbWVbMV1cblxuICAgIC8vIDx4IFwieG1sbnNcIj1cImh0dHA6Ly9mb29cIj5cbiAgICBpZiAoYXR0cmlidXRlICYmIG5hbWUgPT09ICd4bWxucycpIHtcbiAgICAgIHByZWZpeCA9ICd4bWxucydcbiAgICAgIGxvY2FsID0gJydcbiAgICB9XG5cbiAgICByZXR1cm4geyBwcmVmaXg6IHByZWZpeCwgbG9jYWw6IGxvY2FsIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGF0dHJpYiAocGFyc2VyKSB7XG4gICAgaWYgKCFwYXJzZXIuc3RyaWN0KSB7XG4gICAgICBwYXJzZXIuYXR0cmliTmFtZSA9IHBhcnNlci5hdHRyaWJOYW1lW3BhcnNlci5sb29zZUNhc2VdKClcbiAgICB9XG5cbiAgICBpZiAocGFyc2VyLmF0dHJpYkxpc3QuaW5kZXhPZihwYXJzZXIuYXR0cmliTmFtZSkgIT09IC0xIHx8XG4gICAgICBwYXJzZXIudGFnLmF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkocGFyc2VyLmF0dHJpYk5hbWUpKSB7XG4gICAgICBwYXJzZXIuYXR0cmliTmFtZSA9IHBhcnNlci5hdHRyaWJWYWx1ZSA9ICcnXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAocGFyc2VyLm9wdC54bWxucykge1xuICAgICAgdmFyIHFuID0gcW5hbWUocGFyc2VyLmF0dHJpYk5hbWUsIHRydWUpXG4gICAgICB2YXIgcHJlZml4ID0gcW4ucHJlZml4XG4gICAgICB2YXIgbG9jYWwgPSBxbi5sb2NhbFxuXG4gICAgICBpZiAocHJlZml4ID09PSAneG1sbnMnKSB7XG4gICAgICAgIC8vIG5hbWVzcGFjZSBiaW5kaW5nIGF0dHJpYnV0ZS4gcHVzaCB0aGUgYmluZGluZyBpbnRvIHNjb3BlXG4gICAgICAgIGlmIChsb2NhbCA9PT0gJ3htbCcgJiYgcGFyc2VyLmF0dHJpYlZhbHVlICE9PSBYTUxfTkFNRVNQQUNFKSB7XG4gICAgICAgICAgc3RyaWN0RmFpbChwYXJzZXIsXG4gICAgICAgICAgICAneG1sOiBwcmVmaXggbXVzdCBiZSBib3VuZCB0byAnICsgWE1MX05BTUVTUEFDRSArICdcXG4nICtcbiAgICAgICAgICAgICdBY3R1YWw6ICcgKyBwYXJzZXIuYXR0cmliVmFsdWUpXG4gICAgICAgIH0gZWxzZSBpZiAobG9jYWwgPT09ICd4bWxucycgJiYgcGFyc2VyLmF0dHJpYlZhbHVlICE9PSBYTUxOU19OQU1FU1BBQ0UpIHtcbiAgICAgICAgICBzdHJpY3RGYWlsKHBhcnNlcixcbiAgICAgICAgICAgICd4bWxuczogcHJlZml4IG11c3QgYmUgYm91bmQgdG8gJyArIFhNTE5TX05BTUVTUEFDRSArICdcXG4nICtcbiAgICAgICAgICAgICdBY3R1YWw6ICcgKyBwYXJzZXIuYXR0cmliVmFsdWUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHRhZyA9IHBhcnNlci50YWdcbiAgICAgICAgICB2YXIgcGFyZW50ID0gcGFyc2VyLnRhZ3NbcGFyc2VyLnRhZ3MubGVuZ3RoIC0gMV0gfHwgcGFyc2VyXG4gICAgICAgICAgaWYgKHRhZy5ucyA9PT0gcGFyZW50Lm5zKSB7XG4gICAgICAgICAgICB0YWcubnMgPSBPYmplY3QuY3JlYXRlKHBhcmVudC5ucylcbiAgICAgICAgICB9XG4gICAgICAgICAgdGFnLm5zW2xvY2FsXSA9IHBhcnNlci5hdHRyaWJWYWx1ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGRlZmVyIG9uYXR0cmlidXRlIGV2ZW50cyB1bnRpbCBhbGwgYXR0cmlidXRlcyBoYXZlIGJlZW4gc2VlblxuICAgICAgLy8gc28gYW55IG5ldyBiaW5kaW5ncyBjYW4gdGFrZSBlZmZlY3QuIHByZXNlcnZlIGF0dHJpYnV0ZSBvcmRlclxuICAgICAgLy8gc28gZGVmZXJyZWQgZXZlbnRzIGNhbiBiZSBlbWl0dGVkIGluIGRvY3VtZW50IG9yZGVyXG4gICAgICBwYXJzZXIuYXR0cmliTGlzdC5wdXNoKFtwYXJzZXIuYXR0cmliTmFtZSwgcGFyc2VyLmF0dHJpYlZhbHVlXSlcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaW4gbm9uLXhtbG5zIG1vZGUsIHdlIGNhbiBlbWl0IHRoZSBldmVudCByaWdodCBhd2F5XG4gICAgICBwYXJzZXIudGFnLmF0dHJpYnV0ZXNbcGFyc2VyLmF0dHJpYk5hbWVdID0gcGFyc2VyLmF0dHJpYlZhbHVlXG4gICAgICBlbWl0Tm9kZShwYXJzZXIsICdvbmF0dHJpYnV0ZScsIHtcbiAgICAgICAgbmFtZTogcGFyc2VyLmF0dHJpYk5hbWUsXG4gICAgICAgIHZhbHVlOiBwYXJzZXIuYXR0cmliVmFsdWVcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcGFyc2VyLmF0dHJpYk5hbWUgPSBwYXJzZXIuYXR0cmliVmFsdWUgPSAnJ1xuICB9XG5cbiAgZnVuY3Rpb24gb3BlblRhZyAocGFyc2VyLCBzZWxmQ2xvc2luZykge1xuICAgIGlmIChwYXJzZXIub3B0LnhtbG5zKSB7XG4gICAgICAvLyBlbWl0IG5hbWVzcGFjZSBiaW5kaW5nIGV2ZW50c1xuICAgICAgdmFyIHRhZyA9IHBhcnNlci50YWdcblxuICAgICAgLy8gYWRkIG5hbWVzcGFjZSBpbmZvIHRvIHRhZ1xuICAgICAgdmFyIHFuID0gcW5hbWUocGFyc2VyLnRhZ05hbWUpXG4gICAgICB0YWcucHJlZml4ID0gcW4ucHJlZml4XG4gICAgICB0YWcubG9jYWwgPSBxbi5sb2NhbFxuICAgICAgdGFnLnVyaSA9IHRhZy5uc1txbi5wcmVmaXhdIHx8ICcnXG5cbiAgICAgIGlmICh0YWcucHJlZml4ICYmICF0YWcudXJpKSB7XG4gICAgICAgIHN0cmljdEZhaWwocGFyc2VyLCAnVW5ib3VuZCBuYW1lc3BhY2UgcHJlZml4OiAnICtcbiAgICAgICAgICBKU09OLnN0cmluZ2lmeShwYXJzZXIudGFnTmFtZSkpXG4gICAgICAgIHRhZy51cmkgPSBxbi5wcmVmaXhcbiAgICAgIH1cblxuICAgICAgdmFyIHBhcmVudCA9IHBhcnNlci50YWdzW3BhcnNlci50YWdzLmxlbmd0aCAtIDFdIHx8IHBhcnNlclxuICAgICAgaWYgKHRhZy5ucyAmJiBwYXJlbnQubnMgIT09IHRhZy5ucykge1xuICAgICAgICBPYmplY3Qua2V5cyh0YWcubnMpLmZvckVhY2goZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICBlbWl0Tm9kZShwYXJzZXIsICdvbm9wZW5uYW1lc3BhY2UnLCB7XG4gICAgICAgICAgICBwcmVmaXg6IHAsXG4gICAgICAgICAgICB1cmk6IHRhZy5uc1twXVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIC8vIGhhbmRsZSBkZWZlcnJlZCBvbmF0dHJpYnV0ZSBldmVudHNcbiAgICAgIC8vIE5vdGU6IGRvIG5vdCBhcHBseSBkZWZhdWx0IG5zIHRvIGF0dHJpYnV0ZXM6XG4gICAgICAvLyAgIGh0dHA6Ly93d3cudzMub3JnL1RSL1JFQy14bWwtbmFtZXMvI2RlZmF1bHRpbmdcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gcGFyc2VyLmF0dHJpYkxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBudiA9IHBhcnNlci5hdHRyaWJMaXN0W2ldXG4gICAgICAgIHZhciBuYW1lID0gbnZbMF1cbiAgICAgICAgdmFyIHZhbHVlID0gbnZbMV1cbiAgICAgICAgdmFyIHF1YWxOYW1lID0gcW5hbWUobmFtZSwgdHJ1ZSlcbiAgICAgICAgdmFyIHByZWZpeCA9IHF1YWxOYW1lLnByZWZpeFxuICAgICAgICB2YXIgbG9jYWwgPSBxdWFsTmFtZS5sb2NhbFxuICAgICAgICB2YXIgdXJpID0gcHJlZml4ID09PSAnJyA/ICcnIDogKHRhZy5uc1twcmVmaXhdIHx8ICcnKVxuICAgICAgICB2YXIgYSA9IHtcbiAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICBwcmVmaXg6IHByZWZpeCxcbiAgICAgICAgICBsb2NhbDogbG9jYWwsXG4gICAgICAgICAgdXJpOiB1cmlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoZXJlJ3MgYW55IGF0dHJpYnV0ZXMgd2l0aCBhbiB1bmRlZmluZWQgbmFtZXNwYWNlLFxuICAgICAgICAvLyB0aGVuIGZhaWwgb24gdGhlbSBub3cuXG4gICAgICAgIGlmIChwcmVmaXggJiYgcHJlZml4ICE9PSAneG1sbnMnICYmICF1cmkpIHtcbiAgICAgICAgICBzdHJpY3RGYWlsKHBhcnNlciwgJ1VuYm91bmQgbmFtZXNwYWNlIHByZWZpeDogJyArXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShwcmVmaXgpKVxuICAgICAgICAgIGEudXJpID0gcHJlZml4XG4gICAgICAgIH1cbiAgICAgICAgcGFyc2VyLnRhZy5hdHRyaWJ1dGVzW25hbWVdID0gYVxuICAgICAgICBlbWl0Tm9kZShwYXJzZXIsICdvbmF0dHJpYnV0ZScsIGEpXG4gICAgICB9XG4gICAgICBwYXJzZXIuYXR0cmliTGlzdC5sZW5ndGggPSAwXG4gICAgfVxuXG4gICAgcGFyc2VyLnRhZy5pc1NlbGZDbG9zaW5nID0gISFzZWxmQ2xvc2luZ1xuXG4gICAgLy8gcHJvY2VzcyB0aGUgdGFnXG4gICAgcGFyc2VyLnNhd1Jvb3QgPSB0cnVlXG4gICAgcGFyc2VyLnRhZ3MucHVzaChwYXJzZXIudGFnKVxuICAgIGVtaXROb2RlKHBhcnNlciwgJ29ub3BlbnRhZycsIHBhcnNlci50YWcpXG4gICAgaWYgKCFzZWxmQ2xvc2luZykge1xuICAgICAgLy8gc3BlY2lhbCBjYXNlIGZvciA8c2NyaXB0PiBpbiBub24tc3RyaWN0IG1vZGUuXG4gICAgICBpZiAoIXBhcnNlci5ub3NjcmlwdCAmJiBwYXJzZXIudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc2NyaXB0Jykge1xuICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLlNDUklQVFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5URVhUXG4gICAgICB9XG4gICAgICBwYXJzZXIudGFnID0gbnVsbFxuICAgICAgcGFyc2VyLnRhZ05hbWUgPSAnJ1xuICAgIH1cbiAgICBwYXJzZXIuYXR0cmliTmFtZSA9IHBhcnNlci5hdHRyaWJWYWx1ZSA9ICcnXG4gICAgcGFyc2VyLmF0dHJpYkxpc3QubGVuZ3RoID0gMFxuICB9XG5cbiAgZnVuY3Rpb24gY2xvc2VUYWcgKHBhcnNlcikge1xuICAgIGlmICghcGFyc2VyLnRhZ05hbWUpIHtcbiAgICAgIHN0cmljdEZhaWwocGFyc2VyLCAnV2VpcmQgZW1wdHkgY2xvc2UgdGFnLicpXG4gICAgICBwYXJzZXIudGV4dE5vZGUgKz0gJzwvPidcbiAgICAgIHBhcnNlci5zdGF0ZSA9IFMuVEVYVFxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHBhcnNlci5zY3JpcHQpIHtcbiAgICAgIGlmIChwYXJzZXIudGFnTmFtZSAhPT0gJ3NjcmlwdCcpIHtcbiAgICAgICAgcGFyc2VyLnNjcmlwdCArPSAnPC8nICsgcGFyc2VyLnRhZ05hbWUgKyAnPidcbiAgICAgICAgcGFyc2VyLnRhZ05hbWUgPSAnJ1xuICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLlNDUklQVFxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGVtaXROb2RlKHBhcnNlciwgJ29uc2NyaXB0JywgcGFyc2VyLnNjcmlwdClcbiAgICAgIHBhcnNlci5zY3JpcHQgPSAnJ1xuICAgIH1cblxuICAgIC8vIGZpcnN0IG1ha2Ugc3VyZSB0aGF0IHRoZSBjbG9zaW5nIHRhZyBhY3R1YWxseSBleGlzdHMuXG4gICAgLy8gPGE+PGI+PC9jPjwvYj48L2E+IHdpbGwgY2xvc2UgZXZlcnl0aGluZywgb3RoZXJ3aXNlLlxuICAgIHZhciB0ID0gcGFyc2VyLnRhZ3MubGVuZ3RoXG4gICAgdmFyIHRhZ05hbWUgPSBwYXJzZXIudGFnTmFtZVxuICAgIGlmICghcGFyc2VyLnN0cmljdCkge1xuICAgICAgdGFnTmFtZSA9IHRhZ05hbWVbcGFyc2VyLmxvb3NlQ2FzZV0oKVxuICAgIH1cbiAgICB2YXIgY2xvc2VUbyA9IHRhZ05hbWVcbiAgICB3aGlsZSAodC0tKSB7XG4gICAgICB2YXIgY2xvc2UgPSBwYXJzZXIudGFnc1t0XVxuICAgICAgaWYgKGNsb3NlLm5hbWUgIT09IGNsb3NlVG8pIHtcbiAgICAgICAgLy8gZmFpbCB0aGUgZmlyc3QgdGltZSBpbiBzdHJpY3QgbW9kZVxuICAgICAgICBzdHJpY3RGYWlsKHBhcnNlciwgJ1VuZXhwZWN0ZWQgY2xvc2UgdGFnJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGlkbid0IGZpbmQgaXQuICB3ZSBhbHJlYWR5IGZhaWxlZCBmb3Igc3RyaWN0LCBzbyBqdXN0IGFib3J0LlxuICAgIGlmICh0IDwgMCkge1xuICAgICAgc3RyaWN0RmFpbChwYXJzZXIsICdVbm1hdGNoZWQgY2xvc2luZyB0YWc6ICcgKyBwYXJzZXIudGFnTmFtZSlcbiAgICAgIHBhcnNlci50ZXh0Tm9kZSArPSAnPC8nICsgcGFyc2VyLnRhZ05hbWUgKyAnPidcbiAgICAgIHBhcnNlci5zdGF0ZSA9IFMuVEVYVFxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHBhcnNlci50YWdOYW1lID0gdGFnTmFtZVxuICAgIHZhciBzID0gcGFyc2VyLnRhZ3MubGVuZ3RoXG4gICAgd2hpbGUgKHMtLSA+IHQpIHtcbiAgICAgIHZhciB0YWcgPSBwYXJzZXIudGFnID0gcGFyc2VyLnRhZ3MucG9wKClcbiAgICAgIHBhcnNlci50YWdOYW1lID0gcGFyc2VyLnRhZy5uYW1lXG4gICAgICBlbWl0Tm9kZShwYXJzZXIsICdvbmNsb3NldGFnJywgcGFyc2VyLnRhZ05hbWUpXG5cbiAgICAgIHZhciB4ID0ge31cbiAgICAgIGZvciAodmFyIGkgaW4gdGFnLm5zKSB7XG4gICAgICAgIHhbaV0gPSB0YWcubnNbaV1cbiAgICAgIH1cblxuICAgICAgdmFyIHBhcmVudCA9IHBhcnNlci50YWdzW3BhcnNlci50YWdzLmxlbmd0aCAtIDFdIHx8IHBhcnNlclxuICAgICAgaWYgKHBhcnNlci5vcHQueG1sbnMgJiYgdGFnLm5zICE9PSBwYXJlbnQubnMpIHtcbiAgICAgICAgLy8gcmVtb3ZlIG5hbWVzcGFjZSBiaW5kaW5ncyBpbnRyb2R1Y2VkIGJ5IHRhZ1xuICAgICAgICBPYmplY3Qua2V5cyh0YWcubnMpLmZvckVhY2goZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICB2YXIgbiA9IHRhZy5uc1twXVxuICAgICAgICAgIGVtaXROb2RlKHBhcnNlciwgJ29uY2xvc2VuYW1lc3BhY2UnLCB7IHByZWZpeDogcCwgdXJpOiBuIH0pXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0ID09PSAwKSBwYXJzZXIuY2xvc2VkUm9vdCA9IHRydWVcbiAgICBwYXJzZXIudGFnTmFtZSA9IHBhcnNlci5hdHRyaWJWYWx1ZSA9IHBhcnNlci5hdHRyaWJOYW1lID0gJydcbiAgICBwYXJzZXIuYXR0cmliTGlzdC5sZW5ndGggPSAwXG4gICAgcGFyc2VyLnN0YXRlID0gUy5URVhUXG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUVudGl0eSAocGFyc2VyKSB7XG4gICAgdmFyIGVudGl0eSA9IHBhcnNlci5lbnRpdHlcbiAgICB2YXIgZW50aXR5TEMgPSBlbnRpdHkudG9Mb3dlckNhc2UoKVxuICAgIHZhciBudW1cbiAgICB2YXIgbnVtU3RyID0gJydcblxuICAgIGlmIChwYXJzZXIuRU5USVRJRVNbZW50aXR5XSkge1xuICAgICAgcmV0dXJuIHBhcnNlci5FTlRJVElFU1tlbnRpdHldXG4gICAgfVxuICAgIGlmIChwYXJzZXIuRU5USVRJRVNbZW50aXR5TENdKSB7XG4gICAgICByZXR1cm4gcGFyc2VyLkVOVElUSUVTW2VudGl0eUxDXVxuICAgIH1cbiAgICBlbnRpdHkgPSBlbnRpdHlMQ1xuICAgIGlmIChlbnRpdHkuY2hhckF0KDApID09PSAnIycpIHtcbiAgICAgIGlmIChlbnRpdHkuY2hhckF0KDEpID09PSAneCcpIHtcbiAgICAgICAgZW50aXR5ID0gZW50aXR5LnNsaWNlKDIpXG4gICAgICAgIG51bSA9IHBhcnNlSW50KGVudGl0eSwgMTYpXG4gICAgICAgIG51bVN0ciA9IG51bS50b1N0cmluZygxNilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVudGl0eSA9IGVudGl0eS5zbGljZSgxKVxuICAgICAgICBudW0gPSBwYXJzZUludChlbnRpdHksIDEwKVxuICAgICAgICBudW1TdHIgPSBudW0udG9TdHJpbmcoMTApXG4gICAgICB9XG4gICAgfVxuICAgIGVudGl0eSA9IGVudGl0eS5yZXBsYWNlKC9eMCsvLCAnJylcbiAgICBpZiAoaXNOYU4obnVtKSB8fCBudW1TdHIudG9Mb3dlckNhc2UoKSAhPT0gZW50aXR5KSB7XG4gICAgICBzdHJpY3RGYWlsKHBhcnNlciwgJ0ludmFsaWQgY2hhcmFjdGVyIGVudGl0eScpXG4gICAgICByZXR1cm4gJyYnICsgcGFyc2VyLmVudGl0eSArICc7J1xuICAgIH1cblxuICAgIHJldHVybiBTdHJpbmcuZnJvbUNvZGVQb2ludChudW0pXG4gIH1cblxuICBmdW5jdGlvbiBiZWdpbldoaXRlU3BhY2UgKHBhcnNlciwgYykge1xuICAgIGlmIChjID09PSAnPCcpIHtcbiAgICAgIHBhcnNlci5zdGF0ZSA9IFMuT1BFTl9XQUtBXG4gICAgICBwYXJzZXIuc3RhcnRUYWdQb3NpdGlvbiA9IHBhcnNlci5wb3NpdGlvblxuICAgIH0gZWxzZSBpZiAoIWlzV2hpdGVzcGFjZShjKSkge1xuICAgICAgLy8gaGF2ZSB0byBwcm9jZXNzIHRoaXMgYXMgYSB0ZXh0IG5vZGUuXG4gICAgICAvLyB3ZWlyZCwgYnV0IGhhcHBlbnMuXG4gICAgICBzdHJpY3RGYWlsKHBhcnNlciwgJ05vbi13aGl0ZXNwYWNlIGJlZm9yZSBmaXJzdCB0YWcuJylcbiAgICAgIHBhcnNlci50ZXh0Tm9kZSA9IGNcbiAgICAgIHBhcnNlci5zdGF0ZSA9IFMuVEVYVFxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoYXJBdCAoY2h1bmssIGkpIHtcbiAgICB2YXIgcmVzdWx0ID0gJydcbiAgICBpZiAoaSA8IGNodW5rLmxlbmd0aCkge1xuICAgICAgcmVzdWx0ID0gY2h1bmsuY2hhckF0KGkpXG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlIChjaHVuaykge1xuICAgIHZhciBwYXJzZXIgPSB0aGlzXG4gICAgaWYgKHRoaXMuZXJyb3IpIHtcbiAgICAgIHRocm93IHRoaXMuZXJyb3JcbiAgICB9XG4gICAgaWYgKHBhcnNlci5jbG9zZWQpIHtcbiAgICAgIHJldHVybiBlcnJvcihwYXJzZXIsXG4gICAgICAgICdDYW5ub3Qgd3JpdGUgYWZ0ZXIgY2xvc2UuIEFzc2lnbiBhbiBvbnJlYWR5IGhhbmRsZXIuJylcbiAgICB9XG4gICAgaWYgKGNodW5rID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gZW5kKHBhcnNlcilcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjaHVuayA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGNodW5rID0gY2h1bmsudG9TdHJpbmcoKVxuICAgIH1cbiAgICB2YXIgaSA9IDBcbiAgICB2YXIgYyA9ICcnXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGMgPSBjaGFyQXQoY2h1bmssIGkrKylcbiAgICAgIHBhcnNlci5jID0gY1xuXG4gICAgICBpZiAoIWMpIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcnNlci50cmFja1Bvc2l0aW9uKSB7XG4gICAgICAgIHBhcnNlci5wb3NpdGlvbisrXG4gICAgICAgIGlmIChjID09PSAnXFxuJykge1xuICAgICAgICAgIHBhcnNlci5saW5lKytcbiAgICAgICAgICBwYXJzZXIuY29sdW1uID0gMFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhcnNlci5jb2x1bW4rK1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCAocGFyc2VyLnN0YXRlKSB7XG4gICAgICAgIGNhc2UgUy5CRUdJTjpcbiAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkJFR0lOX1dISVRFU1BBQ0VcbiAgICAgICAgICBpZiAoYyA9PT0gJ1xcdUZFRkYnKSB7XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBiZWdpbldoaXRlU3BhY2UocGFyc2VyLCBjKVxuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLkJFR0lOX1dISVRFU1BBQ0U6XG4gICAgICAgICAgYmVnaW5XaGl0ZVNwYWNlKHBhcnNlciwgYylcbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5URVhUOlxuICAgICAgICAgIGlmIChwYXJzZXIuc2F3Um9vdCAmJiAhcGFyc2VyLmNsb3NlZFJvb3QpIHtcbiAgICAgICAgICAgIHZhciBzdGFydGkgPSBpIC0gMVxuICAgICAgICAgICAgd2hpbGUgKGMgJiYgYyAhPT0gJzwnICYmIGMgIT09ICcmJykge1xuICAgICAgICAgICAgICBjID0gY2hhckF0KGNodW5rLCBpKyspXG4gICAgICAgICAgICAgIGlmIChjICYmIHBhcnNlci50cmFja1Bvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgcGFyc2VyLnBvc2l0aW9uKytcbiAgICAgICAgICAgICAgICBpZiAoYyA9PT0gJ1xcbicpIHtcbiAgICAgICAgICAgICAgICAgIHBhcnNlci5saW5lKytcbiAgICAgICAgICAgICAgICAgIHBhcnNlci5jb2x1bW4gPSAwXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHBhcnNlci5jb2x1bW4rK1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyc2VyLnRleHROb2RlICs9IGNodW5rLnN1YnN0cmluZyhzdGFydGksIGkgLSAxKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYyA9PT0gJzwnICYmICEocGFyc2VyLnNhd1Jvb3QgJiYgcGFyc2VyLmNsb3NlZFJvb3QgJiYgIXBhcnNlci5zdHJpY3QpKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLk9QRU5fV0FLQVxuICAgICAgICAgICAgcGFyc2VyLnN0YXJ0VGFnUG9zaXRpb24gPSBwYXJzZXIucG9zaXRpb25cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFpc1doaXRlc3BhY2UoYykgJiYgKCFwYXJzZXIuc2F3Um9vdCB8fCBwYXJzZXIuY2xvc2VkUm9vdCkpIHtcbiAgICAgICAgICAgICAgc3RyaWN0RmFpbChwYXJzZXIsICdUZXh0IGRhdGEgb3V0c2lkZSBvZiByb290IG5vZGUuJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjID09PSAnJicpIHtcbiAgICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5URVhUX0VOVElUWVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcGFyc2VyLnRleHROb2RlICs9IGNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuU0NSSVBUOlxuICAgICAgICAgIC8vIG9ubHkgbm9uLXN0cmljdFxuICAgICAgICAgIGlmIChjID09PSAnPCcpIHtcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuU0NSSVBUX0VORElOR1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJzZXIuc2NyaXB0ICs9IGNcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuU0NSSVBUX0VORElORzpcbiAgICAgICAgICBpZiAoYyA9PT0gJy8nKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkNMT1NFX1RBR1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJzZXIuc2NyaXB0ICs9ICc8JyArIGNcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuU0NSSVBUXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLk9QRU5fV0FLQTpcbiAgICAgICAgICAvLyBlaXRoZXIgYSAvLCA/LCAhLCBvciB0ZXh0IGlzIGNvbWluZyBuZXh0LlxuICAgICAgICAgIGlmIChjID09PSAnIScpIHtcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuU0dNTF9ERUNMXG4gICAgICAgICAgICBwYXJzZXIuc2dtbERlY2wgPSAnJ1xuICAgICAgICAgIH0gZWxzZSBpZiAoaXNXaGl0ZXNwYWNlKGMpKSB7XG4gICAgICAgICAgICAvLyB3YWl0IGZvciBpdC4uLlxuICAgICAgICAgIH0gZWxzZSBpZiAoaXNNYXRjaChuYW1lU3RhcnQsIGMpKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLk9QRU5fVEFHXG4gICAgICAgICAgICBwYXJzZXIudGFnTmFtZSA9IGNcbiAgICAgICAgICB9IGVsc2UgaWYgKGMgPT09ICcvJykge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5DTE9TRV9UQUdcbiAgICAgICAgICAgIHBhcnNlci50YWdOYW1lID0gJydcbiAgICAgICAgICB9IGVsc2UgaWYgKGMgPT09ICc/Jykge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5QUk9DX0lOU1RcbiAgICAgICAgICAgIHBhcnNlci5wcm9jSW5zdE5hbWUgPSBwYXJzZXIucHJvY0luc3RCb2R5ID0gJydcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RyaWN0RmFpbChwYXJzZXIsICdVbmVuY29kZWQgPCcpXG4gICAgICAgICAgICAvLyBpZiB0aGVyZSB3YXMgc29tZSB3aGl0ZXNwYWNlLCB0aGVuIGFkZCB0aGF0IGluLlxuICAgICAgICAgICAgaWYgKHBhcnNlci5zdGFydFRhZ1Bvc2l0aW9uICsgMSA8IHBhcnNlci5wb3NpdGlvbikge1xuICAgICAgICAgICAgICB2YXIgcGFkID0gcGFyc2VyLnBvc2l0aW9uIC0gcGFyc2VyLnN0YXJ0VGFnUG9zaXRpb25cbiAgICAgICAgICAgICAgYyA9IG5ldyBBcnJheShwYWQpLmpvaW4oJyAnKSArIGNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcnNlci50ZXh0Tm9kZSArPSAnPCcgKyBjXG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLlRFWFRcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuU0dNTF9ERUNMOlxuICAgICAgICAgIGlmICgocGFyc2VyLnNnbWxEZWNsICsgYykudG9VcHBlckNhc2UoKSA9PT0gQ0RBVEEpIHtcbiAgICAgICAgICAgIGVtaXROb2RlKHBhcnNlciwgJ29ub3BlbmNkYXRhJylcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQ0RBVEFcbiAgICAgICAgICAgIHBhcnNlci5zZ21sRGVjbCA9ICcnXG4gICAgICAgICAgICBwYXJzZXIuY2RhdGEgPSAnJ1xuICAgICAgICAgIH0gZWxzZSBpZiAocGFyc2VyLnNnbWxEZWNsICsgYyA9PT0gJy0tJykge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5DT01NRU5UXG4gICAgICAgICAgICBwYXJzZXIuY29tbWVudCA9ICcnXG4gICAgICAgICAgICBwYXJzZXIuc2dtbERlY2wgPSAnJ1xuICAgICAgICAgIH0gZWxzZSBpZiAoKHBhcnNlci5zZ21sRGVjbCArIGMpLnRvVXBwZXJDYXNlKCkgPT09IERPQ1RZUEUpIHtcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuRE9DVFlQRVxuICAgICAgICAgICAgaWYgKHBhcnNlci5kb2N0eXBlIHx8IHBhcnNlci5zYXdSb290KSB7XG4gICAgICAgICAgICAgIHN0cmljdEZhaWwocGFyc2VyLFxuICAgICAgICAgICAgICAgICdJbmFwcHJvcHJpYXRlbHkgbG9jYXRlZCBkb2N0eXBlIGRlY2xhcmF0aW9uJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcnNlci5kb2N0eXBlID0gJydcbiAgICAgICAgICAgIHBhcnNlci5zZ21sRGVjbCA9ICcnXG4gICAgICAgICAgfSBlbHNlIGlmIChjID09PSAnPicpIHtcbiAgICAgICAgICAgIGVtaXROb2RlKHBhcnNlciwgJ29uc2dtbGRlY2xhcmF0aW9uJywgcGFyc2VyLnNnbWxEZWNsKVxuICAgICAgICAgICAgcGFyc2VyLnNnbWxEZWNsID0gJydcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuVEVYVFxuICAgICAgICAgIH0gZWxzZSBpZiAoaXNRdW90ZShjKSkge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5TR01MX0RFQ0xfUVVPVEVEXG4gICAgICAgICAgICBwYXJzZXIuc2dtbERlY2wgKz0gY1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJzZXIuc2dtbERlY2wgKz0gY1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5TR01MX0RFQ0xfUVVPVEVEOlxuICAgICAgICAgIGlmIChjID09PSBwYXJzZXIucSkge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5TR01MX0RFQ0xcbiAgICAgICAgICAgIHBhcnNlci5xID0gJydcbiAgICAgICAgICB9XG4gICAgICAgICAgcGFyc2VyLnNnbWxEZWNsICs9IGNcbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5ET0NUWVBFOlxuICAgICAgICAgIGlmIChjID09PSAnPicpIHtcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuVEVYVFxuICAgICAgICAgICAgZW1pdE5vZGUocGFyc2VyLCAnb25kb2N0eXBlJywgcGFyc2VyLmRvY3R5cGUpXG4gICAgICAgICAgICBwYXJzZXIuZG9jdHlwZSA9IHRydWUgLy8ganVzdCByZW1lbWJlciB0aGF0IHdlIHNhdyBpdC5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGFyc2VyLmRvY3R5cGUgKz0gY1xuICAgICAgICAgICAgaWYgKGMgPT09ICdbJykge1xuICAgICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkRPQ1RZUEVfRFREXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzUXVvdGUoYykpIHtcbiAgICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5ET0NUWVBFX1FVT1RFRFxuICAgICAgICAgICAgICBwYXJzZXIucSA9IGNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuRE9DVFlQRV9RVU9URUQ6XG4gICAgICAgICAgcGFyc2VyLmRvY3R5cGUgKz0gY1xuICAgICAgICAgIGlmIChjID09PSBwYXJzZXIucSkge1xuICAgICAgICAgICAgcGFyc2VyLnEgPSAnJ1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5ET0NUWVBFXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLkRPQ1RZUEVfRFREOlxuICAgICAgICAgIHBhcnNlci5kb2N0eXBlICs9IGNcbiAgICAgICAgICBpZiAoYyA9PT0gJ10nKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkRPQ1RZUEVcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzUXVvdGUoYykpIHtcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuRE9DVFlQRV9EVERfUVVPVEVEXG4gICAgICAgICAgICBwYXJzZXIucSA9IGNcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuRE9DVFlQRV9EVERfUVVPVEVEOlxuICAgICAgICAgIHBhcnNlci5kb2N0eXBlICs9IGNcbiAgICAgICAgICBpZiAoYyA9PT0gcGFyc2VyLnEpIHtcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuRE9DVFlQRV9EVERcbiAgICAgICAgICAgIHBhcnNlci5xID0gJydcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuQ09NTUVOVDpcbiAgICAgICAgICBpZiAoYyA9PT0gJy0nKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkNPTU1FTlRfRU5ESU5HXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcnNlci5jb21tZW50ICs9IGNcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuQ09NTUVOVF9FTkRJTkc6XG4gICAgICAgICAgaWYgKGMgPT09ICctJykge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5DT01NRU5UX0VOREVEXG4gICAgICAgICAgICBwYXJzZXIuY29tbWVudCA9IHRleHRvcHRzKHBhcnNlci5vcHQsIHBhcnNlci5jb21tZW50KVxuICAgICAgICAgICAgaWYgKHBhcnNlci5jb21tZW50KSB7XG4gICAgICAgICAgICAgIGVtaXROb2RlKHBhcnNlciwgJ29uY29tbWVudCcsIHBhcnNlci5jb21tZW50KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyc2VyLmNvbW1lbnQgPSAnJ1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJzZXIuY29tbWVudCArPSAnLScgKyBjXG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkNPTU1FTlRcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuQ09NTUVOVF9FTkRFRDpcbiAgICAgICAgICBpZiAoYyAhPT0gJz4nKSB7XG4gICAgICAgICAgICBzdHJpY3RGYWlsKHBhcnNlciwgJ01hbGZvcm1lZCBjb21tZW50JylcbiAgICAgICAgICAgIC8vIGFsbG93IDwhLS0gYmxhaCAtLSBibG9vIC0tPiBpbiBub24tc3RyaWN0IG1vZGUsXG4gICAgICAgICAgICAvLyB3aGljaCBpcyBhIGNvbW1lbnQgb2YgXCIgYmxhaCAtLSBibG9vIFwiXG4gICAgICAgICAgICBwYXJzZXIuY29tbWVudCArPSAnLS0nICsgY1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5DT01NRU5UXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuVEVYVFxuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5DREFUQTpcbiAgICAgICAgICBpZiAoYyA9PT0gJ10nKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkNEQVRBX0VORElOR1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJzZXIuY2RhdGEgKz0gY1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5DREFUQV9FTkRJTkc6XG4gICAgICAgICAgaWYgKGMgPT09ICddJykge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5DREFUQV9FTkRJTkdfMlxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJzZXIuY2RhdGEgKz0gJ10nICsgY1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5DREFUQVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5DREFUQV9FTkRJTkdfMjpcbiAgICAgICAgICBpZiAoYyA9PT0gJz4nKSB7XG4gICAgICAgICAgICBpZiAocGFyc2VyLmNkYXRhKSB7XG4gICAgICAgICAgICAgIGVtaXROb2RlKHBhcnNlciwgJ29uY2RhdGEnLCBwYXJzZXIuY2RhdGEpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbWl0Tm9kZShwYXJzZXIsICdvbmNsb3NlY2RhdGEnKVxuICAgICAgICAgICAgcGFyc2VyLmNkYXRhID0gJydcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuVEVYVFxuICAgICAgICAgIH0gZWxzZSBpZiAoYyA9PT0gJ10nKSB7XG4gICAgICAgICAgICBwYXJzZXIuY2RhdGEgKz0gJ10nXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcnNlci5jZGF0YSArPSAnXV0nICsgY1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5DREFUQVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5QUk9DX0lOU1Q6XG4gICAgICAgICAgaWYgKGMgPT09ICc/Jykge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5QUk9DX0lOU1RfRU5ESU5HXG4gICAgICAgICAgfSBlbHNlIGlmIChpc1doaXRlc3BhY2UoYykpIHtcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuUFJPQ19JTlNUX0JPRFlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGFyc2VyLnByb2NJbnN0TmFtZSArPSBjXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLlBST0NfSU5TVF9CT0RZOlxuICAgICAgICAgIGlmICghcGFyc2VyLnByb2NJbnN0Qm9keSAmJiBpc1doaXRlc3BhY2UoYykpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfSBlbHNlIGlmIChjID09PSAnPycpIHtcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuUFJPQ19JTlNUX0VORElOR1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJzZXIucHJvY0luc3RCb2R5ICs9IGNcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuUFJPQ19JTlNUX0VORElORzpcbiAgICAgICAgICBpZiAoYyA9PT0gJz4nKSB7XG4gICAgICAgICAgICBlbWl0Tm9kZShwYXJzZXIsICdvbnByb2Nlc3NpbmdpbnN0cnVjdGlvbicsIHtcbiAgICAgICAgICAgICAgbmFtZTogcGFyc2VyLnByb2NJbnN0TmFtZSxcbiAgICAgICAgICAgICAgYm9keTogcGFyc2VyLnByb2NJbnN0Qm9keVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHBhcnNlci5wcm9jSW5zdE5hbWUgPSBwYXJzZXIucHJvY0luc3RCb2R5ID0gJydcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuVEVYVFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJzZXIucHJvY0luc3RCb2R5ICs9ICc/JyArIGNcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuUFJPQ19JTlNUX0JPRFlcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuT1BFTl9UQUc6XG4gICAgICAgICAgaWYgKGlzTWF0Y2gobmFtZUJvZHksIGMpKSB7XG4gICAgICAgICAgICBwYXJzZXIudGFnTmFtZSArPSBjXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld1RhZyhwYXJzZXIpXG4gICAgICAgICAgICBpZiAoYyA9PT0gJz4nKSB7XG4gICAgICAgICAgICAgIG9wZW5UYWcocGFyc2VyKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChjID09PSAnLycpIHtcbiAgICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5PUEVOX1RBR19TTEFTSFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKCFpc1doaXRlc3BhY2UoYykpIHtcbiAgICAgICAgICAgICAgICBzdHJpY3RGYWlsKHBhcnNlciwgJ0ludmFsaWQgY2hhcmFjdGVyIGluIHRhZyBuYW1lJylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkFUVFJJQlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5PUEVOX1RBR19TTEFTSDpcbiAgICAgICAgICBpZiAoYyA9PT0gJz4nKSB7XG4gICAgICAgICAgICBvcGVuVGFnKHBhcnNlciwgdHJ1ZSlcbiAgICAgICAgICAgIGNsb3NlVGFnKHBhcnNlcilcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RyaWN0RmFpbChwYXJzZXIsICdGb3J3YXJkLXNsYXNoIGluIG9wZW5pbmcgdGFnIG5vdCBmb2xsb3dlZCBieSA+JylcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQVRUUklCXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLkFUVFJJQjpcbiAgICAgICAgICAvLyBoYXZlbid0IHJlYWQgdGhlIGF0dHJpYnV0ZSBuYW1lIHlldC5cbiAgICAgICAgICBpZiAoaXNXaGl0ZXNwYWNlKGMpKSB7XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH0gZWxzZSBpZiAoYyA9PT0gJz4nKSB7XG4gICAgICAgICAgICBvcGVuVGFnKHBhcnNlcilcbiAgICAgICAgICB9IGVsc2UgaWYgKGMgPT09ICcvJykge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5PUEVOX1RBR19TTEFTSFxuICAgICAgICAgIH0gZWxzZSBpZiAoaXNNYXRjaChuYW1lU3RhcnQsIGMpKSB7XG4gICAgICAgICAgICBwYXJzZXIuYXR0cmliTmFtZSA9IGNcbiAgICAgICAgICAgIHBhcnNlci5hdHRyaWJWYWx1ZSA9ICcnXG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkFUVFJJQl9OQU1FXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0cmljdEZhaWwocGFyc2VyLCAnSW52YWxpZCBhdHRyaWJ1dGUgbmFtZScpXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLkFUVFJJQl9OQU1FOlxuICAgICAgICAgIGlmIChjID09PSAnPScpIHtcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQVRUUklCX1ZBTFVFXG4gICAgICAgICAgfSBlbHNlIGlmIChjID09PSAnPicpIHtcbiAgICAgICAgICAgIHN0cmljdEZhaWwocGFyc2VyLCAnQXR0cmlidXRlIHdpdGhvdXQgdmFsdWUnKVxuICAgICAgICAgICAgcGFyc2VyLmF0dHJpYlZhbHVlID0gcGFyc2VyLmF0dHJpYk5hbWVcbiAgICAgICAgICAgIGF0dHJpYihwYXJzZXIpXG4gICAgICAgICAgICBvcGVuVGFnKHBhcnNlcilcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzV2hpdGVzcGFjZShjKSkge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5BVFRSSUJfTkFNRV9TQVdfV0hJVEVcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzTWF0Y2gobmFtZUJvZHksIGMpKSB7XG4gICAgICAgICAgICBwYXJzZXIuYXR0cmliTmFtZSArPSBjXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0cmljdEZhaWwocGFyc2VyLCAnSW52YWxpZCBhdHRyaWJ1dGUgbmFtZScpXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLkFUVFJJQl9OQU1FX1NBV19XSElURTpcbiAgICAgICAgICBpZiAoYyA9PT0gJz0nKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkFUVFJJQl9WQUxVRVxuICAgICAgICAgIH0gZWxzZSBpZiAoaXNXaGl0ZXNwYWNlKGMpKSB7XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHJpY3RGYWlsKHBhcnNlciwgJ0F0dHJpYnV0ZSB3aXRob3V0IHZhbHVlJylcbiAgICAgICAgICAgIHBhcnNlci50YWcuYXR0cmlidXRlc1twYXJzZXIuYXR0cmliTmFtZV0gPSAnJ1xuICAgICAgICAgICAgcGFyc2VyLmF0dHJpYlZhbHVlID0gJydcbiAgICAgICAgICAgIGVtaXROb2RlKHBhcnNlciwgJ29uYXR0cmlidXRlJywge1xuICAgICAgICAgICAgICBuYW1lOiBwYXJzZXIuYXR0cmliTmFtZSxcbiAgICAgICAgICAgICAgdmFsdWU6ICcnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcGFyc2VyLmF0dHJpYk5hbWUgPSAnJ1xuICAgICAgICAgICAgaWYgKGMgPT09ICc+Jykge1xuICAgICAgICAgICAgICBvcGVuVGFnKHBhcnNlcilcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNNYXRjaChuYW1lU3RhcnQsIGMpKSB7XG4gICAgICAgICAgICAgIHBhcnNlci5hdHRyaWJOYW1lID0gY1xuICAgICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkFUVFJJQl9OQU1FXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzdHJpY3RGYWlsKHBhcnNlciwgJ0ludmFsaWQgYXR0cmlidXRlIG5hbWUnKVxuICAgICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkFUVFJJQlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5BVFRSSUJfVkFMVUU6XG4gICAgICAgICAgaWYgKGlzV2hpdGVzcGFjZShjKSkge1xuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzUXVvdGUoYykpIHtcbiAgICAgICAgICAgIHBhcnNlci5xID0gY1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5BVFRSSUJfVkFMVUVfUVVPVEVEXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0cmljdEZhaWwocGFyc2VyLCAnVW5xdW90ZWQgYXR0cmlidXRlIHZhbHVlJylcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQVRUUklCX1ZBTFVFX1VOUVVPVEVEXG4gICAgICAgICAgICBwYXJzZXIuYXR0cmliVmFsdWUgPSBjXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLkFUVFJJQl9WQUxVRV9RVU9URUQ6XG4gICAgICAgICAgaWYgKGMgIT09IHBhcnNlci5xKSB7XG4gICAgICAgICAgICBpZiAoYyA9PT0gJyYnKSB7XG4gICAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQVRUUklCX1ZBTFVFX0VOVElUWV9RXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwYXJzZXIuYXR0cmliVmFsdWUgKz0gY1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICB9XG4gICAgICAgICAgYXR0cmliKHBhcnNlcilcbiAgICAgICAgICBwYXJzZXIucSA9ICcnXG4gICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5BVFRSSUJfVkFMVUVfQ0xPU0VEXG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuQVRUUklCX1ZBTFVFX0NMT1NFRDpcbiAgICAgICAgICBpZiAoaXNXaGl0ZXNwYWNlKGMpKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkFUVFJJQlxuICAgICAgICAgIH0gZWxzZSBpZiAoYyA9PT0gJz4nKSB7XG4gICAgICAgICAgICBvcGVuVGFnKHBhcnNlcilcbiAgICAgICAgICB9IGVsc2UgaWYgKGMgPT09ICcvJykge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5PUEVOX1RBR19TTEFTSFxuICAgICAgICAgIH0gZWxzZSBpZiAoaXNNYXRjaChuYW1lU3RhcnQsIGMpKSB7XG4gICAgICAgICAgICBzdHJpY3RGYWlsKHBhcnNlciwgJ05vIHdoaXRlc3BhY2UgYmV0d2VlbiBhdHRyaWJ1dGVzJylcbiAgICAgICAgICAgIHBhcnNlci5hdHRyaWJOYW1lID0gY1xuICAgICAgICAgICAgcGFyc2VyLmF0dHJpYlZhbHVlID0gJydcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQVRUUklCX05BTUVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RyaWN0RmFpbChwYXJzZXIsICdJbnZhbGlkIGF0dHJpYnV0ZSBuYW1lJylcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuQVRUUklCX1ZBTFVFX1VOUVVPVEVEOlxuICAgICAgICAgIGlmICghaXNBdHRyaWJFbmQoYykpIHtcbiAgICAgICAgICAgIGlmIChjID09PSAnJicpIHtcbiAgICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5BVFRSSUJfVkFMVUVfRU5USVRZX1VcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHBhcnNlci5hdHRyaWJWYWx1ZSArPSBjXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBhdHRyaWIocGFyc2VyKVxuICAgICAgICAgIGlmIChjID09PSAnPicpIHtcbiAgICAgICAgICAgIG9wZW5UYWcocGFyc2VyKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkFUVFJJQlxuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5DTE9TRV9UQUc6XG4gICAgICAgICAgaWYgKCFwYXJzZXIudGFnTmFtZSkge1xuICAgICAgICAgICAgaWYgKGlzV2hpdGVzcGFjZShjKSkge1xuICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgfSBlbHNlIGlmIChub3RNYXRjaChuYW1lU3RhcnQsIGMpKSB7XG4gICAgICAgICAgICAgIGlmIChwYXJzZXIuc2NyaXB0KSB7XG4gICAgICAgICAgICAgICAgcGFyc2VyLnNjcmlwdCArPSAnPC8nICsgY1xuICAgICAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuU0NSSVBUXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RyaWN0RmFpbChwYXJzZXIsICdJbnZhbGlkIHRhZ25hbWUgaW4gY2xvc2luZyB0YWcuJylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcGFyc2VyLnRhZ05hbWUgPSBjXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChjID09PSAnPicpIHtcbiAgICAgICAgICAgIGNsb3NlVGFnKHBhcnNlcilcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzTWF0Y2gobmFtZUJvZHksIGMpKSB7XG4gICAgICAgICAgICBwYXJzZXIudGFnTmFtZSArPSBjXG4gICAgICAgICAgfSBlbHNlIGlmIChwYXJzZXIuc2NyaXB0KSB7XG4gICAgICAgICAgICBwYXJzZXIuc2NyaXB0ICs9ICc8LycgKyBwYXJzZXIudGFnTmFtZVxuICAgICAgICAgICAgcGFyc2VyLnRhZ05hbWUgPSAnJ1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5TQ1JJUFRcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFpc1doaXRlc3BhY2UoYykpIHtcbiAgICAgICAgICAgICAgc3RyaWN0RmFpbChwYXJzZXIsICdJbnZhbGlkIHRhZ25hbWUgaW4gY2xvc2luZyB0YWcnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5DTE9TRV9UQUdfU0FXX1dISVRFXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLkNMT1NFX1RBR19TQVdfV0hJVEU6XG4gICAgICAgICAgaWYgKGlzV2hpdGVzcGFjZShjKSkge1xuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGMgPT09ICc+Jykge1xuICAgICAgICAgICAgY2xvc2VUYWcocGFyc2VyKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHJpY3RGYWlsKHBhcnNlciwgJ0ludmFsaWQgY2hhcmFjdGVycyBpbiBjbG9zaW5nIHRhZycpXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLlRFWFRfRU5USVRZOlxuICAgICAgICBjYXNlIFMuQVRUUklCX1ZBTFVFX0VOVElUWV9ROlxuICAgICAgICBjYXNlIFMuQVRUUklCX1ZBTFVFX0VOVElUWV9VOlxuICAgICAgICAgIHZhciByZXR1cm5TdGF0ZVxuICAgICAgICAgIHZhciBidWZmZXJcbiAgICAgICAgICBzd2l0Y2ggKHBhcnNlci5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBTLlRFWFRfRU5USVRZOlxuICAgICAgICAgICAgICByZXR1cm5TdGF0ZSA9IFMuVEVYVFxuICAgICAgICAgICAgICBidWZmZXIgPSAndGV4dE5vZGUnXG4gICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgIGNhc2UgUy5BVFRSSUJfVkFMVUVfRU5USVRZX1E6XG4gICAgICAgICAgICAgIHJldHVyblN0YXRlID0gUy5BVFRSSUJfVkFMVUVfUVVPVEVEXG4gICAgICAgICAgICAgIGJ1ZmZlciA9ICdhdHRyaWJWYWx1ZSdcbiAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgY2FzZSBTLkFUVFJJQl9WQUxVRV9FTlRJVFlfVTpcbiAgICAgICAgICAgICAgcmV0dXJuU3RhdGUgPSBTLkFUVFJJQl9WQUxVRV9VTlFVT1RFRFxuICAgICAgICAgICAgICBidWZmZXIgPSAnYXR0cmliVmFsdWUnXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGMgPT09ICc7Jykge1xuICAgICAgICAgICAgcGFyc2VyW2J1ZmZlcl0gKz0gcGFyc2VFbnRpdHkocGFyc2VyKVxuICAgICAgICAgICAgcGFyc2VyLmVudGl0eSA9ICcnXG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSByZXR1cm5TdGF0ZVxuICAgICAgICAgIH0gZWxzZSBpZiAoaXNNYXRjaChwYXJzZXIuZW50aXR5Lmxlbmd0aCA/IGVudGl0eUJvZHkgOiBlbnRpdHlTdGFydCwgYykpIHtcbiAgICAgICAgICAgIHBhcnNlci5lbnRpdHkgKz0gY1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHJpY3RGYWlsKHBhcnNlciwgJ0ludmFsaWQgY2hhcmFjdGVyIGluIGVudGl0eSBuYW1lJylcbiAgICAgICAgICAgIHBhcnNlcltidWZmZXJdICs9ICcmJyArIHBhcnNlci5lbnRpdHkgKyBjXG4gICAgICAgICAgICBwYXJzZXIuZW50aXR5ID0gJydcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IHJldHVyblN0YXRlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihwYXJzZXIsICdVbmtub3duIHN0YXRlOiAnICsgcGFyc2VyLnN0YXRlKVxuICAgICAgfVxuICAgIH0gLy8gd2hpbGVcblxuICAgIGlmIChwYXJzZXIucG9zaXRpb24gPj0gcGFyc2VyLmJ1ZmZlckNoZWNrUG9zaXRpb24pIHtcbiAgICAgIGNoZWNrQnVmZmVyTGVuZ3RoKHBhcnNlcilcbiAgICB9XG4gICAgcmV0dXJuIHBhcnNlclxuICB9XG5cbiAgLyohIGh0dHA6Ly9tdGhzLmJlL2Zyb21jb2RlcG9pbnQgdjAuMS4wIGJ5IEBtYXRoaWFzICovXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmICghU3RyaW5nLmZyb21Db2RlUG9pbnQpIHtcbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHN0cmluZ0Zyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGVcbiAgICAgIHZhciBmbG9vciA9IE1hdGguZmxvb3JcbiAgICAgIHZhciBmcm9tQ29kZVBvaW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgTUFYX1NJWkUgPSAweDQwMDBcbiAgICAgICAgdmFyIGNvZGVVbml0cyA9IFtdXG4gICAgICAgIHZhciBoaWdoU3Vycm9nYXRlXG4gICAgICAgIHZhciBsb3dTdXJyb2dhdGVcbiAgICAgICAgdmFyIGluZGV4ID0gLTFcbiAgICAgICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgICAgaWYgKCFsZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gJydcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0ID0gJydcbiAgICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgICB2YXIgY29kZVBvaW50ID0gTnVtYmVyKGFyZ3VtZW50c1tpbmRleF0pXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIWlzRmluaXRlKGNvZGVQb2ludCkgfHwgLy8gYE5hTmAsIGArSW5maW5pdHlgLCBvciBgLUluZmluaXR5YFxuICAgICAgICAgICAgY29kZVBvaW50IDwgMCB8fCAvLyBub3QgYSB2YWxpZCBVbmljb2RlIGNvZGUgcG9pbnRcbiAgICAgICAgICAgIGNvZGVQb2ludCA+IDB4MTBGRkZGIHx8IC8vIG5vdCBhIHZhbGlkIFVuaWNvZGUgY29kZSBwb2ludFxuICAgICAgICAgICAgZmxvb3IoY29kZVBvaW50KSAhPT0gY29kZVBvaW50IC8vIG5vdCBhbiBpbnRlZ2VyXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aHJvdyBSYW5nZUVycm9yKCdJbnZhbGlkIGNvZGUgcG9pbnQ6ICcgKyBjb2RlUG9pbnQpXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjb2RlUG9pbnQgPD0gMHhGRkZGKSB7IC8vIEJNUCBjb2RlIHBvaW50XG4gICAgICAgICAgICBjb2RlVW5pdHMucHVzaChjb2RlUG9pbnQpXG4gICAgICAgICAgfSBlbHNlIHsgLy8gQXN0cmFsIGNvZGUgcG9pbnQ7IHNwbGl0IGluIHN1cnJvZ2F0ZSBoYWx2ZXNcbiAgICAgICAgICAgIC8vIGh0dHA6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmcjc3Vycm9nYXRlLWZvcm11bGFlXG4gICAgICAgICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMFxuICAgICAgICAgICAgaGlnaFN1cnJvZ2F0ZSA9IChjb2RlUG9pbnQgPj4gMTApICsgMHhEODAwXG4gICAgICAgICAgICBsb3dTdXJyb2dhdGUgPSAoY29kZVBvaW50ICUgMHg0MDApICsgMHhEQzAwXG4gICAgICAgICAgICBjb2RlVW5pdHMucHVzaChoaWdoU3Vycm9nYXRlLCBsb3dTdXJyb2dhdGUpXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpbmRleCArIDEgPT09IGxlbmd0aCB8fCBjb2RlVW5pdHMubGVuZ3RoID4gTUFYX1NJWkUpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBzdHJpbmdGcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgY29kZVVuaXRzKVxuICAgICAgICAgICAgY29kZVVuaXRzLmxlbmd0aCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgfVxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFN0cmluZywgJ2Zyb21Db2RlUG9pbnQnLCB7XG4gICAgICAgICAgdmFsdWU6IGZyb21Db2RlUG9pbnQsXG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBTdHJpbmcuZnJvbUNvZGVQb2ludCA9IGZyb21Db2RlUG9pbnRcbiAgICAgIH1cbiAgICB9KCkpXG4gIH1cbn0pKHR5cGVvZiBleHBvcnRzID09PSAndW5kZWZpbmVkJyA/IHRoaXMuc2F4ID0ge30gOiBleHBvcnRzKVxuIl19
},{"buffer":"C:\\dev\\NEXUS\\node_modules\\buffer\\index.js","stream":"C:\\dev\\NEXUS\\node_modules\\stream-browserify\\index.js","string_decoder":"C:\\dev\\NEXUS\\node_modules\\string_decoder\\index.js"}],"C:\\dev\\NEXUS\\node_modules\\sprintf-js\\src\\sprintf.js":[function(require,module,exports){
/* global window, exports, define */

!function() {
    'use strict'

    var re = {
        not_string: /[^s]/,
        not_bool: /[^t]/,
        not_type: /[^T]/,
        not_primitive: /[^v]/,
        number: /[diefg]/,
        numeric_arg: /[bcdiefguxX]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[\+\-]/
    }

    function sprintf(key) {
        // `arguments` is not an array, but should be fine for this call
        return sprintf_format(sprintf_parse(key), arguments)
    }

    function vsprintf(fmt, argv) {
        return sprintf.apply(null, [fmt].concat(argv || []))
    }

    function sprintf_format(parse_tree, argv) {
        var cursor = 1, tree_length = parse_tree.length, arg, output = '', i, k, match, pad, pad_character, pad_length, is_positive, sign
        for (i = 0; i < tree_length; i++) {
            if (typeof parse_tree[i] === 'string') {
                output += parse_tree[i]
            }
            else if (Array.isArray(parse_tree[i])) {
                match = parse_tree[i] // convenience purposes only
                if (match[2]) { // keyword argument
                    arg = argv[cursor]
                    for (k = 0; k < match[2].length; k++) {
                        if (!arg.hasOwnProperty(match[2][k])) {
                            throw new Error(sprintf('[sprintf] property "%s" does not exist', match[2][k]))
                        }
                        arg = arg[match[2][k]]
                    }
                }
                else if (match[1]) { // positional argument (explicit)
                    arg = argv[match[1]]
                }
                else { // positional argument (implicit)
                    arg = argv[cursor++]
                }

                if (re.not_type.test(match[8]) && re.not_primitive.test(match[8]) && arg instanceof Function) {
                    arg = arg()
                }

                if (re.numeric_arg.test(match[8]) && (typeof arg !== 'number' && isNaN(arg))) {
                    throw new TypeError(sprintf('[sprintf] expecting number but found %T', arg))
                }

                if (re.number.test(match[8])) {
                    is_positive = arg >= 0
                }

                switch (match[8]) {
                    case 'b':
                        arg = parseInt(arg, 10).toString(2)
                        break
                    case 'c':
                        arg = String.fromCharCode(parseInt(arg, 10))
                        break
                    case 'd':
                    case 'i':
                        arg = parseInt(arg, 10)
                        break
                    case 'j':
                        arg = JSON.stringify(arg, null, match[6] ? parseInt(match[6]) : 0)
                        break
                    case 'e':
                        arg = match[7] ? parseFloat(arg).toExponential(match[7]) : parseFloat(arg).toExponential()
                        break
                    case 'f':
                        arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg)
                        break
                    case 'g':
                        arg = match[7] ? String(Number(arg.toPrecision(match[7]))) : parseFloat(arg)
                        break
                    case 'o':
                        arg = (parseInt(arg, 10) >>> 0).toString(8)
                        break
                    case 's':
                        arg = String(arg)
                        arg = (match[7] ? arg.substring(0, match[7]) : arg)
                        break
                    case 't':
                        arg = String(!!arg)
                        arg = (match[7] ? arg.substring(0, match[7]) : arg)
                        break
                    case 'T':
                        arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase()
                        arg = (match[7] ? arg.substring(0, match[7]) : arg)
                        break
                    case 'u':
                        arg = parseInt(arg, 10) >>> 0
                        break
                    case 'v':
                        arg = arg.valueOf()
                        arg = (match[7] ? arg.substring(0, match[7]) : arg)
                        break
                    case 'x':
                        arg = (parseInt(arg, 10) >>> 0).toString(16)
                        break
                    case 'X':
                        arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase()
                        break
                }
                if (re.json.test(match[8])) {
                    output += arg
                }
                else {
                    if (re.number.test(match[8]) && (!is_positive || match[3])) {
                        sign = is_positive ? '+' : '-'
                        arg = arg.toString().replace(re.sign, '')
                    }
                    else {
                        sign = ''
                    }
                    pad_character = match[4] ? match[4] === '0' ? '0' : match[4].charAt(1) : ' '
                    pad_length = match[6] - (sign + arg).length
                    pad = match[6] ? (pad_length > 0 ? pad_character.repeat(pad_length) : '') : ''
                    output += match[5] ? sign + arg + pad : (pad_character === '0' ? sign + pad + arg : pad + sign + arg)
                }
            }
        }
        return output
    }

    var sprintf_cache = Object.create(null)

    function sprintf_parse(fmt) {
        if (sprintf_cache[fmt]) {
            return sprintf_cache[fmt]
        }

        var _fmt = fmt, match, parse_tree = [], arg_names = 0
        while (_fmt) {
            if ((match = re.text.exec(_fmt)) !== null) {
                parse_tree.push(match[0])
            }
            else if ((match = re.modulo.exec(_fmt)) !== null) {
                parse_tree.push('%')
            }
            else if ((match = re.placeholder.exec(_fmt)) !== null) {
                if (match[2]) {
                    arg_names |= 1
                    var field_list = [], replacement_field = match[2], field_match = []
                    if ((field_match = re.key.exec(replacement_field)) !== null) {
                        field_list.push(field_match[1])
                        while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                            if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1])
                            }
                            else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1])
                            }
                            else {
                                throw new SyntaxError('[sprintf] failed to parse named argument key')
                            }
                        }
                    }
                    else {
                        throw new SyntaxError('[sprintf] failed to parse named argument key')
                    }
                    match[2] = field_list
                }
                else {
                    arg_names |= 2
                }
                if (arg_names === 3) {
                    throw new Error('[sprintf] mixing positional and named placeholders is not (yet) supported')
                }
                parse_tree.push(match)
            }
            else {
                throw new SyntaxError('[sprintf] unexpected placeholder')
            }
            _fmt = _fmt.substring(match[0].length)
        }
        return sprintf_cache[fmt] = parse_tree
    }

    /**
     * export to either browser or node.js
     */
    /* eslint-disable quote-props */
    if (typeof exports !== 'undefined') {
        exports['sprintf'] = sprintf
        exports['vsprintf'] = vsprintf
    }
    if (typeof window !== 'undefined') {
        window['sprintf'] = sprintf
        window['vsprintf'] = vsprintf

        if (typeof define === 'function' && define['amd']) {
            define(function() {
                return {
                    'sprintf': sprintf,
                    'vsprintf': vsprintf
                }
            })
        }
    }
    /* eslint-enable quote-props */
}()

},{}],"C:\\dev\\NEXUS\\node_modules\\stream-browserify\\index.js":[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = require('events').EventEmitter;
var inherits = require('inherits');

inherits(Stream, EE);
Stream.Readable = require('readable-stream/readable.js');
Stream.Writable = require('readable-stream/writable.js');
Stream.Duplex = require('readable-stream/duplex.js');
Stream.Transform = require('readable-stream/transform.js');
Stream.PassThrough = require('readable-stream/passthrough.js');

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"events":"C:\\dev\\NEXUS\\node_modules\\events\\events.js","inherits":"C:\\dev\\NEXUS\\node_modules\\inherits\\inherits_browser.js","readable-stream/duplex.js":"C:\\dev\\NEXUS\\node_modules\\readable-stream\\duplex.js","readable-stream/passthrough.js":"C:\\dev\\NEXUS\\node_modules\\readable-stream\\passthrough.js","readable-stream/readable.js":"C:\\dev\\NEXUS\\node_modules\\readable-stream\\readable.js","readable-stream/transform.js":"C:\\dev\\NEXUS\\node_modules\\readable-stream\\transform.js","readable-stream/writable.js":"C:\\dev\\NEXUS\\node_modules\\readable-stream\\writable.js"}],"C:\\dev\\NEXUS\\node_modules\\string_decoder\\index.js":[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var Buffer = require('buffer').Buffer;

function assertEncoding(encoding) {
  if (encoding && !Buffer.isEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

var StringDecoder = exports.StringDecoder = function(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  this.charBuffer = new Buffer(6);
  this.charReceived = 0;
  this.charLength = 0;
};


StringDecoder.prototype.write = function(buffer) {
  var charStr = '';
  var offset = 0;

  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var i = (buffer.length >= this.charLength - this.charReceived) ?
                this.charLength - this.charReceived :
                buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, offset, i);
    this.charReceived += (i - offset);
    offset = i;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (i == buffer.length) return charStr;

    // otherwise cut off the characters end from the beginning of this buffer
    buffer = buffer.slice(i, buffer.length);
    break;
  }

  var lenIncomplete = this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - lenIncomplete, end);
    this.charReceived = lenIncomplete;
    end -= lenIncomplete;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    this.charBuffer.write(charStr.charAt(charStr.length - 1), this.encoding);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

StringDecoder.prototype.detectIncompleteChar = function(buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = (buffer.length >= 3) ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }

  return i;
};

StringDecoder.prototype.end = function(buffer) {
  var res = '';
  if (buffer && buffer.length)
    res = this.write(buffer);

  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }

  return res;
};

function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}

function utf16DetectIncompleteChar(buffer) {
  var incomplete = this.charReceived = buffer.length % 2;
  this.charLength = incomplete ? 2 : 0;
  return incomplete;
}

function base64DetectIncompleteChar(buffer) {
  var incomplete = this.charReceived = buffer.length % 3;
  this.charLength = incomplete ? 3 : 0;
  return incomplete;
}

},{"buffer":"C:\\dev\\NEXUS\\node_modules\\buffer\\index.js"}],"C:\\dev\\NEXUS\\node_modules\\timers-browserify\\main.js":[function(require,module,exports){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
},{"process/browser.js":"C:\\dev\\NEXUS\\node_modules\\timers-browserify\\node_modules\\process\\browser.js"}],"C:\\dev\\NEXUS\\node_modules\\timers-browserify\\node_modules\\process\\browser.js":[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\camelize.js":[function(require,module,exports){
var trim = require('./trim');
var decap = require('./decapitalize');

module.exports = function camelize(str, decapitalize) {
  str = trim(str).replace(/[-_\s]+(.)?/g, function(match, c) {
    return c ? c.toUpperCase() : '';
  });

  if (decapitalize === true) {
    return decap(str);
  } else {
    return str;
  }
};

},{"./decapitalize":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\decapitalize.js","./trim":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\trim.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\capitalize.js":[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function capitalize(str, lowercaseRest) {
  str = makeString(str);
  var remainingChars = !lowercaseRest ? str.slice(1) : str.slice(1).toLowerCase();

  return str.charAt(0).toUpperCase() + remainingChars;
};

},{"./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\chars.js":[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function chars(str) {
  return makeString(str).split('');
};

},{"./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\chop.js":[function(require,module,exports){
module.exports = function chop(str, step) {
  if (str == null) return [];
  str = String(str);
  step = ~~step;
  return step > 0 ? str.match(new RegExp('.{1,' + step + '}', 'g')) : [str];
};

},{}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\classify.js":[function(require,module,exports){
var capitalize = require('./capitalize');
var camelize = require('./camelize');
var makeString = require('./helper/makeString');

module.exports = function classify(str) {
  str = makeString(str);
  return capitalize(camelize(str.replace(/[\W_]/g, ' ')).replace(/\s/g, ''));
};

},{"./camelize":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\camelize.js","./capitalize":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\capitalize.js","./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\clean.js":[function(require,module,exports){
var trim = require('./trim');

module.exports = function clean(str) {
  return trim(str).replace(/\s\s+/g, ' ');
};

},{"./trim":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\trim.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\cleanDiacritics.js":[function(require,module,exports){

var makeString = require('./helper/makeString');

var from  = 'ąàáäâãåæăćčĉęèéëêĝĥìíïîĵłľńňòóöőôõðøśșşšŝťțţŭùúüűûñÿýçżźž',
  to    = 'aaaaaaaaaccceeeeeghiiiijllnnoooooooossssstttuuuuuunyyczzz';

from += from.toUpperCase();
to += to.toUpperCase();

to = to.split('');

// for tokens requireing multitoken output
from += 'ß';
to.push('ss');


module.exports = function cleanDiacritics(str) {
  return makeString(str).replace(/.{1}/g, function(c){
    var index = from.indexOf(c);
    return index === -1 ? c : to[index];
  });
};

},{"./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\count.js":[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function(str, substr) {
  str = makeString(str);
  substr = makeString(substr);

  if (str.length === 0 || substr.length === 0) return 0;
  
  return str.split(substr).length - 1;
};

},{"./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\dasherize.js":[function(require,module,exports){
var trim = require('./trim');

module.exports = function dasherize(str) {
  return trim(str).replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
};

},{"./trim":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\trim.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\decapitalize.js":[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function decapitalize(str) {
  str = makeString(str);
  return str.charAt(0).toLowerCase() + str.slice(1);
};

},{"./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\dedent.js":[function(require,module,exports){
var makeString = require('./helper/makeString');

function getIndent(str) {
  var matches = str.match(/^[\s\\t]*/gm);
  var indent = matches[0].length;
  
  for (var i = 1; i < matches.length; i++) {
    indent = Math.min(matches[i].length, indent);
  }

  return indent;
}

module.exports = function dedent(str, pattern) {
  str = makeString(str);
  var indent = getIndent(str);
  var reg;

  if (indent === 0) return str;

  if (typeof pattern === 'string') {
    reg = new RegExp('^' + pattern, 'gm');
  } else {
    reg = new RegExp('^[ \\t]{' + indent + '}', 'gm');
  }

  return str.replace(reg, '');
};

},{"./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\endsWith.js":[function(require,module,exports){
var makeString = require('./helper/makeString');
var toPositive = require('./helper/toPositive');

module.exports = function endsWith(str, ends, position) {
  str = makeString(str);
  ends = '' + ends;
  if (typeof position == 'undefined') {
    position = str.length - ends.length;
  } else {
    position = Math.min(toPositive(position), str.length) - ends.length;
  }
  return position >= 0 && str.indexOf(ends, position) === position;
};

},{"./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js","./helper/toPositive":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\toPositive.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\escapeHTML.js":[function(require,module,exports){
var makeString = require('./helper/makeString');
var escapeChars = require('./helper/escapeChars');

var regexString = '[';
for(var key in escapeChars) {
  regexString += key;
}
regexString += ']';

var regex = new RegExp( regexString, 'g');

module.exports = function escapeHTML(str) {

  return makeString(str).replace(regex, function(m) {
    return '&' + escapeChars[m] + ';';
  });
};

},{"./helper/escapeChars":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\escapeChars.js","./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\exports.js":[function(require,module,exports){
module.exports = function() {
  var result = {};

  for (var prop in this) {
    if (!this.hasOwnProperty(prop) || prop.match(/^(?:include|contains|reverse|join|map|wrap)$/)) continue;
    result[prop] = this[prop];
  }

  return result;
};

},{}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\adjacent.js":[function(require,module,exports){
var makeString = require('./makeString');

module.exports = function adjacent(str, direction) {
  str = makeString(str);
  if (str.length === 0) {
    return '';
  }
  return str.slice(0, -1) + String.fromCharCode(str.charCodeAt(str.length - 1) + direction);
};

},{"./makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\defaultToWhiteSpace.js":[function(require,module,exports){
var escapeRegExp = require('./escapeRegExp');

module.exports = function defaultToWhiteSpace(characters) {
  if (characters == null)
    return '\\s';
  else if (characters.source)
    return characters.source;
  else
    return '[' + escapeRegExp(characters) + ']';
};

},{"./escapeRegExp":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\escapeRegExp.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\escapeChars.js":[function(require,module,exports){
/* We're explicitly defining the list of entities we want to escape.
nbsp is an HTML entity, but we don't want to escape all space characters in a string, hence its omission in this map.

*/
var escapeChars = {
  '¢' : 'cent',
  '£' : 'pound',
  '¥' : 'yen',
  '€': 'euro',
  '©' :'copy',
  '®' : 'reg',
  '<' : 'lt',
  '>' : 'gt',
  '"' : 'quot',
  '&' : 'amp',
  '\'' : '#39'
};

module.exports = escapeChars;

},{}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\escapeRegExp.js":[function(require,module,exports){
var makeString = require('./makeString');

module.exports = function escapeRegExp(str) {
  return makeString(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
};

},{"./makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\htmlEntities.js":[function(require,module,exports){
/*
We're explicitly defining the list of entities that might see in escape HTML strings
*/
var htmlEntities = {
  nbsp: ' ',
  cent: '¢',
  pound: '£',
  yen: '¥',
  euro: '€',
  copy: '©',
  reg: '®',
  lt: '<',
  gt: '>',
  quot: '"',
  amp: '&',
  apos: '\''
};

module.exports = htmlEntities;

},{}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js":[function(require,module,exports){
/**
 * Ensure some object is a coerced to a string
 **/
module.exports = function makeString(object) {
  if (object == null) return '';
  return '' + object;
};

},{}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\strRepeat.js":[function(require,module,exports){
module.exports = function strRepeat(str, qty){
  if (qty < 1) return '';
  var result = '';
  while (qty > 0) {
    if (qty & 1) result += str;
    qty >>= 1, str += str;
  }
  return result;
};

},{}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\toPositive.js":[function(require,module,exports){
module.exports = function toPositive(number) {
  return number < 0 ? 0 : (+number || 0);
};

},{}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\humanize.js":[function(require,module,exports){
var capitalize = require('./capitalize');
var underscored = require('./underscored');
var trim = require('./trim');

module.exports = function humanize(str) {
  return capitalize(trim(underscored(str).replace(/_id$/, '').replace(/_/g, ' ')));
};

},{"./capitalize":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\capitalize.js","./trim":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\trim.js","./underscored":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\underscored.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\include.js":[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function include(str, needle) {
  if (needle === '') return true;
  return makeString(str).indexOf(needle) !== -1;
};

},{"./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\index.js":[function(require,module,exports){
/*
* Underscore.string
* (c) 2010 Esa-Matti Suuronen <esa-matti aet suuronen dot org>
* Underscore.string is freely distributable under the terms of the MIT license.
* Documentation: https://github.com/epeli/underscore.string
* Some code is borrowed from MooTools and Alexandru Marasteanu.
* Version '3.3.4'
* @preserve
*/

'use strict';

function s(value) {
  /* jshint validthis: true */
  if (!(this instanceof s)) return new s(value);
  this._wrapped = value;
}

s.VERSION = '3.3.4';

s.isBlank          = require('./isBlank');
s.stripTags        = require('./stripTags');
s.capitalize       = require('./capitalize');
s.decapitalize     = require('./decapitalize');
s.chop             = require('./chop');
s.trim             = require('./trim');
s.clean            = require('./clean');
s.cleanDiacritics  = require('./cleanDiacritics');
s.count            = require('./count');
s.chars            = require('./chars');
s.swapCase         = require('./swapCase');
s.escapeHTML       = require('./escapeHTML');
s.unescapeHTML     = require('./unescapeHTML');
s.splice           = require('./splice');
s.insert           = require('./insert');
s.replaceAll       = require('./replaceAll');
s.include          = require('./include');
s.join             = require('./join');
s.lines            = require('./lines');
s.dedent           = require('./dedent');
s.reverse          = require('./reverse');
s.startsWith       = require('./startsWith');
s.endsWith         = require('./endsWith');
s.pred             = require('./pred');
s.succ             = require('./succ');
s.titleize         = require('./titleize');
s.camelize         = require('./camelize');
s.underscored      = require('./underscored');
s.dasherize        = require('./dasherize');
s.classify         = require('./classify');
s.humanize         = require('./humanize');
s.ltrim            = require('./ltrim');
s.rtrim            = require('./rtrim');
s.truncate         = require('./truncate');
s.prune            = require('./prune');
s.words            = require('./words');
s.pad              = require('./pad');
s.lpad             = require('./lpad');
s.rpad             = require('./rpad');
s.lrpad            = require('./lrpad');
s.sprintf          = require('./sprintf');
s.vsprintf         = require('./vsprintf');
s.toNumber         = require('./toNumber');
s.numberFormat     = require('./numberFormat');
s.strRight         = require('./strRight');
s.strRightBack     = require('./strRightBack');
s.strLeft          = require('./strLeft');
s.strLeftBack      = require('./strLeftBack');
s.toSentence       = require('./toSentence');
s.toSentenceSerial = require('./toSentenceSerial');
s.slugify          = require('./slugify');
s.surround         = require('./surround');
s.quote            = require('./quote');
s.unquote          = require('./unquote');
s.repeat           = require('./repeat');
s.naturalCmp       = require('./naturalCmp');
s.levenshtein      = require('./levenshtein');
s.toBoolean        = require('./toBoolean');
s.exports          = require('./exports');
s.escapeRegExp     = require('./helper/escapeRegExp');
s.wrap             = require('./wrap');
s.map              = require('./map');

// Aliases
s.strip     = s.trim;
s.lstrip    = s.ltrim;
s.rstrip    = s.rtrim;
s.center    = s.lrpad;
s.rjust     = s.lpad;
s.ljust     = s.rpad;
s.contains  = s.include;
s.q         = s.quote;
s.toBool    = s.toBoolean;
s.camelcase = s.camelize;
s.mapChars  = s.map;


// Implement chaining
s.prototype = {
  value: function value() {
    return this._wrapped;
  }
};

function fn2method(key, fn) {
  if (typeof fn !== 'function') return;
  s.prototype[key] = function() {
    var args = [this._wrapped].concat(Array.prototype.slice.call(arguments));
    var res = fn.apply(null, args);
    // if the result is non-string stop the chain and return the value
    return typeof res === 'string' ? new s(res) : res;
  };
}

// Copy functions to instance methods for chaining
for (var key in s) fn2method(key, s[key]);

fn2method('tap', function tap(string, fn) {
  return fn(string);
});

function prototype2method(methodName) {
  fn2method(methodName, function(context) {
    var args = Array.prototype.slice.call(arguments, 1);
    return String.prototype[methodName].apply(context, args);
  });
}

var prototypeMethods = [
  'toUpperCase',
  'toLowerCase',
  'split',
  'replace',
  'slice',
  'substring',
  'substr',
  'concat'
];

for (var method in prototypeMethods) prototype2method(prototypeMethods[method]);


module.exports = s;

},{"./camelize":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\camelize.js","./capitalize":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\capitalize.js","./chars":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\chars.js","./chop":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\chop.js","./classify":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\classify.js","./clean":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\clean.js","./cleanDiacritics":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\cleanDiacritics.js","./count":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\count.js","./dasherize":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\dasherize.js","./decapitalize":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\decapitalize.js","./dedent":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\dedent.js","./endsWith":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\endsWith.js","./escapeHTML":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\escapeHTML.js","./exports":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\exports.js","./helper/escapeRegExp":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\escapeRegExp.js","./humanize":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\humanize.js","./include":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\include.js","./insert":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\insert.js","./isBlank":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\isBlank.js","./join":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\join.js","./levenshtein":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\levenshtein.js","./lines":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\lines.js","./lpad":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\lpad.js","./lrpad":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\lrpad.js","./ltrim":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\ltrim.js","./map":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\map.js","./naturalCmp":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\naturalCmp.js","./numberFormat":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\numberFormat.js","./pad":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\pad.js","./pred":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\pred.js","./prune":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\prune.js","./quote":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\quote.js","./repeat":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\repeat.js","./replaceAll":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\replaceAll.js","./reverse":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\reverse.js","./rpad":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\rpad.js","./rtrim":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\rtrim.js","./slugify":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\slugify.js","./splice":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\splice.js","./sprintf":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\sprintf.js","./startsWith":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\startsWith.js","./strLeft":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\strLeft.js","./strLeftBack":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\strLeftBack.js","./strRight":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\strRight.js","./strRightBack":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\strRightBack.js","./stripTags":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\stripTags.js","./succ":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\succ.js","./surround":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\surround.js","./swapCase":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\swapCase.js","./titleize":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\titleize.js","./toBoolean":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\toBoolean.js","./toNumber":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\toNumber.js","./toSentence":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\toSentence.js","./toSentenceSerial":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\toSentenceSerial.js","./trim":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\trim.js","./truncate":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\truncate.js","./underscored":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\underscored.js","./unescapeHTML":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\unescapeHTML.js","./unquote":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\unquote.js","./vsprintf":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\vsprintf.js","./words":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\words.js","./wrap":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\wrap.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\insert.js":[function(require,module,exports){
var splice = require('./splice');

module.exports = function insert(str, i, substr) {
  return splice(str, i, 0, substr);
};

},{"./splice":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\splice.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\isBlank.js":[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function isBlank(str) {
  return (/^\s*$/).test(makeString(str));
};

},{"./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\join.js":[function(require,module,exports){
var makeString = require('./helper/makeString');
var slice = [].slice;

module.exports = function join() {
  var args = slice.call(arguments),
    separator = args.shift();

  return args.join(makeString(separator));
};

},{"./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\levenshtein.js":[function(require,module,exports){
var makeString = require('./helper/makeString');

/**
 * Based on the implementation here: https://github.com/hiddentao/fast-levenshtein
 */
module.exports = function levenshtein(str1, str2) {
  'use strict';
  str1 = makeString(str1);
  str2 = makeString(str2);

  // Short cut cases  
  if (str1 === str2) return 0;
  if (!str1 || !str2) return Math.max(str1.length, str2.length);

  // two rows
  var prevRow = new Array(str2.length + 1);

  // initialise previous row
  for (var i = 0; i < prevRow.length; ++i) {
    prevRow[i] = i;
  }

  // calculate current row distance from previous row
  for (i = 0; i < str1.length; ++i) {
    var nextCol = i + 1;

    for (var j = 0; j < str2.length; ++j) {
      var curCol = nextCol;

      // substution
      nextCol = prevRow[j] + ( (str1.charAt(i) === str2.charAt(j)) ? 0 : 1 );
      // insertion
      var tmp = curCol + 1;
      if (nextCol > tmp) {
        nextCol = tmp;
      }
      // deletion
      tmp = prevRow[j + 1] + 1;
      if (nextCol > tmp) {
        nextCol = tmp;
      }

      // copy current col value into previous (in preparation for next iteration)
      prevRow[j] = curCol;
    }

    // copy last col value into previous (in preparation for next iteration)
    prevRow[j] = nextCol;
  }

  return nextCol;
};

},{"./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\lines.js":[function(require,module,exports){
module.exports = function lines(str) {
  if (str == null) return [];
  return String(str).split(/\r\n?|\n/);
};

},{}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\lpad.js":[function(require,module,exports){
var pad = require('./pad');

module.exports = function lpad(str, length, padStr) {
  return pad(str, length, padStr);
};

},{"./pad":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\pad.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\lrpad.js":[function(require,module,exports){
var pad = require('./pad');

module.exports = function lrpad(str, length, padStr) {
  return pad(str, length, padStr, 'both');
};

},{"./pad":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\pad.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\ltrim.js":[function(require,module,exports){
var makeString = require('./helper/makeString');
var defaultToWhiteSpace = require('./helper/defaultToWhiteSpace');
var nativeTrimLeft = String.prototype.trimLeft;

module.exports = function ltrim(str, characters) {
  str = makeString(str);
  if (!characters && nativeTrimLeft) return nativeTrimLeft.call(str);
  characters = defaultToWhiteSpace(characters);
  return str.replace(new RegExp('^' + characters + '+'), '');
};

},{"./helper/defaultToWhiteSpace":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\defaultToWhiteSpace.js","./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\map.js":[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function(str, callback) {
  str = makeString(str);

  if (str.length === 0 || typeof callback !== 'function') return str;

  return str.replace(/./g, callback);
};

},{"./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\naturalCmp.js":[function(require,module,exports){
module.exports = function naturalCmp(str1, str2) {
  if (str1 == str2) return 0;
  if (!str1) return -1;
  if (!str2) return 1;

  var cmpRegex = /(\.\d+|\d+|\D+)/g,
    tokens1 = String(str1).match(cmpRegex),
    tokens2 = String(str2).match(cmpRegex),
    count = Math.min(tokens1.length, tokens2.length);

  for (var i = 0; i < count; i++) {
    var a = tokens1[i],
      b = tokens2[i];

    if (a !== b) {
      var num1 = +a;
      var num2 = +b;
      if (num1 === num1 && num2 === num2) {
        return num1 > num2 ? 1 : -1;
      }
      return a < b ? -1 : 1;
    }
  }

  if (tokens1.length != tokens2.length)
    return tokens1.length - tokens2.length;

  return str1 < str2 ? -1 : 1;
};

},{}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\numberFormat.js":[function(require,module,exports){
module.exports = function numberFormat(number, dec, dsep, tsep) {
  if (isNaN(number) || number == null) return '';

  number = number.toFixed(~~dec);
  tsep = typeof tsep == 'string' ? tsep : ',';

  var parts = number.split('.'),
    fnums = parts[0],
    decimals = parts[1] ? (dsep || '.') + parts[1] : '';

  return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals;
};

},{}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\pad.js":[function(require,module,exports){
var makeString = require('./helper/makeString');
var strRepeat = require('./helper/strRepeat');

module.exports = function pad(str, length, padStr, type) {
  str = makeString(str);
  length = ~~length;

  var padlen = 0;

  if (!padStr)
    padStr = ' ';
  else if (padStr.length > 1)
    padStr = padStr.charAt(0);

  switch (type) {
  case 'right':
    padlen = length - str.length;
    return str + strRepeat(padStr, padlen);
  case 'both':
    padlen = length - str.length;
    return strRepeat(padStr, Math.ceil(padlen / 2)) + str + strRepeat(padStr, Math.floor(padlen / 2));
  default: // 'left'
    padlen = length - str.length;
    return strRepeat(padStr, padlen) + str;
  }
};

},{"./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js","./helper/strRepeat":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\strRepeat.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\pred.js":[function(require,module,exports){
var adjacent = require('./helper/adjacent');

module.exports = function succ(str) {
  return adjacent(str, -1);
};

},{"./helper/adjacent":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\adjacent.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\prune.js":[function(require,module,exports){
/**
 * _s.prune: a more elegant version of truncate
 * prune extra chars, never leaving a half-chopped word.
 * @author github.com/rwz
 */
var makeString = require('./helper/makeString');
var rtrim = require('./rtrim');

module.exports = function prune(str, length, pruneStr) {
  str = makeString(str);
  length = ~~length;
  pruneStr = pruneStr != null ? String(pruneStr) : '...';

  if (str.length <= length) return str;

  var tmpl = function(c) {
      return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' ';
    },
    template = str.slice(0, length + 1).replace(/.(?=\W*\w*$)/g, tmpl); // 'Hello, world' -> 'HellAA AAAAA'

  if (template.slice(template.length - 2).match(/\w\w/))
    template = template.replace(/\s*\S+$/, '');
  else
    template = rtrim(template.slice(0, template.length - 1));

  return (template + pruneStr).length > str.length ? str : str.slice(0, template.length) + pruneStr;
};

},{"./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js","./rtrim":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\rtrim.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\quote.js":[function(require,module,exports){
var surround = require('./surround');

module.exports = function quote(str, quoteChar) {
  return surround(str, quoteChar || '"');
};

},{"./surround":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\surround.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\repeat.js":[function(require,module,exports){
var makeString = require('./helper/makeString');
var strRepeat = require('./helper/strRepeat');

module.exports = function repeat(str, qty, separator) {
  str = makeString(str);

  qty = ~~qty;

  // using faster implementation if separator is not needed;
  if (separator == null) return strRepeat(str, qty);

  // this one is about 300x slower in Google Chrome
  /*eslint no-empty: 0*/
  for (var repeat = []; qty > 0; repeat[--qty] = str) {}
  return repeat.join(separator);
};

},{"./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js","./helper/strRepeat":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\strRepeat.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\replaceAll.js":[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function replaceAll(str, find, replace, ignorecase) {
  var flags = (ignorecase === true)?'gi':'g';
  var reg = new RegExp(find, flags);

  return makeString(str).replace(reg, replace);
};

},{"./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\reverse.js":[function(require,module,exports){
var chars = require('./chars');

module.exports = function reverse(str) {
  return chars(str).reverse().join('');
};

},{"./chars":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\chars.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\rpad.js":[function(require,module,exports){
var pad = require('./pad');

module.exports = function rpad(str, length, padStr) {
  return pad(str, length, padStr, 'right');
};

},{"./pad":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\pad.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\rtrim.js":[function(require,module,exports){
var makeString = require('./helper/makeString');
var defaultToWhiteSpace = require('./helper/defaultToWhiteSpace');
var nativeTrimRight = String.prototype.trimRight;

module.exports = function rtrim(str, characters) {
  str = makeString(str);
  if (!characters && nativeTrimRight) return nativeTrimRight.call(str);
  characters = defaultToWhiteSpace(characters);
  return str.replace(new RegExp(characters + '+$'), '');
};

},{"./helper/defaultToWhiteSpace":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\defaultToWhiteSpace.js","./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\slugify.js":[function(require,module,exports){
var trim = require('./trim');
var dasherize = require('./dasherize');
var cleanDiacritics = require('./cleanDiacritics');

module.exports = function slugify(str) {
  return trim(dasherize(cleanDiacritics(str).replace(/[^\w\s-]/g, '-').toLowerCase()), '-');
};

},{"./cleanDiacritics":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\cleanDiacritics.js","./dasherize":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\dasherize.js","./trim":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\trim.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\splice.js":[function(require,module,exports){
var chars = require('./chars');

module.exports = function splice(str, i, howmany, substr) {
  var arr = chars(str);
  arr.splice(~~i, ~~howmany, substr);
  return arr.join('');
};

},{"./chars":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\chars.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\sprintf.js":[function(require,module,exports){
var deprecate = require('util-deprecate');

module.exports = deprecate(require('sprintf-js').sprintf,
  'sprintf() will be removed in the next major release, use the sprintf-js package instead.');

},{"sprintf-js":"C:\\dev\\NEXUS\\node_modules\\sprintf-js\\src\\sprintf.js","util-deprecate":"C:\\dev\\NEXUS\\node_modules\\util-deprecate\\browser.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\startsWith.js":[function(require,module,exports){
var makeString = require('./helper/makeString');
var toPositive = require('./helper/toPositive');

module.exports = function startsWith(str, starts, position) {
  str = makeString(str);
  starts = '' + starts;
  position = position == null ? 0 : Math.min(toPositive(position), str.length);
  return str.lastIndexOf(starts, position) === position;
};

},{"./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js","./helper/toPositive":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\toPositive.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\strLeft.js":[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function strLeft(str, sep) {
  str = makeString(str);
  sep = makeString(sep);
  var pos = !sep ? -1 : str.indexOf(sep);
  return~ pos ? str.slice(0, pos) : str;
};

},{"./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\strLeftBack.js":[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function strLeftBack(str, sep) {
  str = makeString(str);
  sep = makeString(sep);
  var pos = str.lastIndexOf(sep);
  return~ pos ? str.slice(0, pos) : str;
};

},{"./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\strRight.js":[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function strRight(str, sep) {
  str = makeString(str);
  sep = makeString(sep);
  var pos = !sep ? -1 : str.indexOf(sep);
  return~ pos ? str.slice(pos + sep.length, str.length) : str;
};

},{"./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\strRightBack.js":[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function strRightBack(str, sep) {
  str = makeString(str);
  sep = makeString(sep);
  var pos = !sep ? -1 : str.lastIndexOf(sep);
  return~ pos ? str.slice(pos + sep.length, str.length) : str;
};

},{"./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\stripTags.js":[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function stripTags(str) {
  return makeString(str).replace(/<\/?[^>]+>/g, '');
};

},{"./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\succ.js":[function(require,module,exports){
var adjacent = require('./helper/adjacent');

module.exports = function succ(str) {
  return adjacent(str, 1);
};

},{"./helper/adjacent":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\adjacent.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\surround.js":[function(require,module,exports){
module.exports = function surround(str, wrapper) {
  return [wrapper, str, wrapper].join('');
};

},{}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\swapCase.js":[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function swapCase(str) {
  return makeString(str).replace(/\S/g, function(c) {
    return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
  });
};

},{"./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\titleize.js":[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function titleize(str) {
  return makeString(str).toLowerCase().replace(/(?:^|\s|-)\S/g, function(c) {
    return c.toUpperCase();
  });
};

},{"./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\toBoolean.js":[function(require,module,exports){
var trim = require('./trim');

function boolMatch(s, matchers) {
  var i, matcher, down = s.toLowerCase();
  matchers = [].concat(matchers);
  for (i = 0; i < matchers.length; i += 1) {
    matcher = matchers[i];
    if (!matcher) continue;
    if (matcher.test && matcher.test(s)) return true;
    if (matcher.toLowerCase() === down) return true;
  }
}

module.exports = function toBoolean(str, trueValues, falseValues) {
  if (typeof str === 'number') str = '' + str;
  if (typeof str !== 'string') return !!str;
  str = trim(str);
  if (boolMatch(str, trueValues || ['true', '1'])) return true;
  if (boolMatch(str, falseValues || ['false', '0'])) return false;
};

},{"./trim":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\trim.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\toNumber.js":[function(require,module,exports){
module.exports = function toNumber(num, precision) {
  if (num == null) return 0;
  var factor = Math.pow(10, isFinite(precision) ? precision : 0);
  return Math.round(num * factor) / factor;
};

},{}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\toSentence.js":[function(require,module,exports){
var rtrim = require('./rtrim');

module.exports = function toSentence(array, separator, lastSeparator, serial) {
  separator = separator || ', ';
  lastSeparator = lastSeparator || ' and ';
  var a = array.slice(),
    lastMember = a.pop();

  if (array.length > 2 && serial) lastSeparator = rtrim(separator) + lastSeparator;

  return a.length ? a.join(separator) + lastSeparator + lastMember : lastMember;
};

},{"./rtrim":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\rtrim.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\toSentenceSerial.js":[function(require,module,exports){
var toSentence = require('./toSentence');

module.exports = function toSentenceSerial(array, sep, lastSep) {
  return toSentence(array, sep, lastSep, true);
};

},{"./toSentence":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\toSentence.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\trim.js":[function(require,module,exports){
var makeString = require('./helper/makeString');
var defaultToWhiteSpace = require('./helper/defaultToWhiteSpace');
var nativeTrim = String.prototype.trim;

module.exports = function trim(str, characters) {
  str = makeString(str);
  if (!characters && nativeTrim) return nativeTrim.call(str);
  characters = defaultToWhiteSpace(characters);
  return str.replace(new RegExp('^' + characters + '+|' + characters + '+$', 'g'), '');
};

},{"./helper/defaultToWhiteSpace":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\defaultToWhiteSpace.js","./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\truncate.js":[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function truncate(str, length, truncateStr) {
  str = makeString(str);
  truncateStr = truncateStr || '...';
  length = ~~length;
  return str.length > length ? str.slice(0, length) + truncateStr : str;
};

},{"./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\underscored.js":[function(require,module,exports){
var trim = require('./trim');

module.exports = function underscored(str) {
  return trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
};

},{"./trim":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\trim.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\unescapeHTML.js":[function(require,module,exports){
var makeString = require('./helper/makeString');
var htmlEntities = require('./helper/htmlEntities');

module.exports = function unescapeHTML(str) {
  return makeString(str).replace(/\&([^;]+);/g, function(entity, entityCode) {
    var match;

    if (entityCode in htmlEntities) {
      return htmlEntities[entityCode];
    /*eslint no-cond-assign: 0*/
    } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
      return String.fromCharCode(parseInt(match[1], 16));
    /*eslint no-cond-assign: 0*/
    } else if (match = entityCode.match(/^#(\d+)$/)) {
      return String.fromCharCode(~~match[1]);
    } else {
      return entity;
    }
  });
};

},{"./helper/htmlEntities":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\htmlEntities.js","./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\unquote.js":[function(require,module,exports){
module.exports = function unquote(str, quoteChar) {
  quoteChar = quoteChar || '"';
  if (str[0] === quoteChar && str[str.length - 1] === quoteChar)
    return str.slice(1, str.length - 1);
  else return str;
};

},{}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\vsprintf.js":[function(require,module,exports){
var deprecate = require('util-deprecate');

module.exports = deprecate(require('sprintf-js').vsprintf,
  'vsprintf() will be removed in the next major release, use the sprintf-js package instead.');

},{"sprintf-js":"C:\\dev\\NEXUS\\node_modules\\sprintf-js\\src\\sprintf.js","util-deprecate":"C:\\dev\\NEXUS\\node_modules\\util-deprecate\\browser.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\words.js":[function(require,module,exports){
var isBlank = require('./isBlank');
var trim = require('./trim');

module.exports = function words(str, delimiter) {
  if (isBlank(str)) return [];
  return trim(str, delimiter).split(delimiter || /\s+/);
};

},{"./isBlank":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\isBlank.js","./trim":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\trim.js"}],"C:\\dev\\NEXUS\\node_modules\\underscore.string\\wrap.js":[function(require,module,exports){
// Wrap
// wraps a string by a certain width

var makeString = require('./helper/makeString');

module.exports = function wrap(str, options){
  str = makeString(str);
  
  options = options || {};
  
  var width = options.width || 75;
  var seperator = options.seperator || '\n';
  var cut = options.cut || false;
  var preserveSpaces = options.preserveSpaces || false;
  var trailingSpaces = options.trailingSpaces || false;
  
  var result;
  
  if(width <= 0){
    return str;
  }
  
  else if(!cut){
  
    var words = str.split(' ');
    var current_column = 0;
    result = '';
  
    while(words.length > 0){
      
      // if adding a space and the next word would cause this line to be longer than width...
      if(1 + words[0].length + current_column > width){
        //start a new line if this line is not already empty
        if(current_column > 0){
          // add a space at the end of the line is preserveSpaces is true
          if (preserveSpaces){
            result += ' ';
            current_column++;
          }
          // fill the rest of the line with spaces if trailingSpaces option is true
          else if(trailingSpaces){
            while(current_column < width){
              result += ' ';
              current_column++;
            }            
          }
          //start new line
          result += seperator;
          current_column = 0;
        }
      }
  
      // if not at the begining of the line, add a space in front of the word
      if(current_column > 0){
        result += ' ';
        current_column++;
      }
  
      // tack on the next word, update current column, a pop words array
      result += words[0];
      current_column += words[0].length;
      words.shift();
  
    }
  
    // fill the rest of the line with spaces if trailingSpaces option is true
    if(trailingSpaces){
      while(current_column < width){
        result += ' ';
        current_column++;
      }            
    }
  
    return result;
  
  }
  
  else {
  
    var index = 0;
    result = '';
  
    // walk through each character and add seperators where appropriate
    while(index < str.length){
      if(index % width == 0 && index > 0){
        result += seperator;
      }
      result += str.charAt(index);
      index++;
    }
  
    // fill the rest of the line with spaces if trailingSpaces option is true
    if(trailingSpaces){
      while(index % width > 0){
        result += ' ';
        index++;
      }            
    }
    
    return result;
  }
};

},{"./helper/makeString":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\helper\\makeString.js"}],"C:\\dev\\NEXUS\\node_modules\\util-deprecate\\browser.js":[function(require,module,exports){
(function (global){

/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy91dGlsLWRlcHJlY2F0ZS9icm93c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBkZXByZWNhdGU7XG5cbi8qKlxuICogTWFyayB0aGF0IGEgbWV0aG9kIHNob3VsZCBub3QgYmUgdXNlZC5cbiAqIFJldHVybnMgYSBtb2RpZmllZCBmdW5jdGlvbiB3aGljaCB3YXJucyBvbmNlIGJ5IGRlZmF1bHQuXG4gKlxuICogSWYgYGxvY2FsU3RvcmFnZS5ub0RlcHJlY2F0aW9uID0gdHJ1ZWAgaXMgc2V0LCB0aGVuIGl0IGlzIGEgbm8tb3AuXG4gKlxuICogSWYgYGxvY2FsU3RvcmFnZS50aHJvd0RlcHJlY2F0aW9uID0gdHJ1ZWAgaXMgc2V0LCB0aGVuIGRlcHJlY2F0ZWQgZnVuY3Rpb25zXG4gKiB3aWxsIHRocm93IGFuIEVycm9yIHdoZW4gaW52b2tlZC5cbiAqXG4gKiBJZiBgbG9jYWxTdG9yYWdlLnRyYWNlRGVwcmVjYXRpb24gPSB0cnVlYCBpcyBzZXQsIHRoZW4gZGVwcmVjYXRlZCBmdW5jdGlvbnNcbiAqIHdpbGwgaW52b2tlIGBjb25zb2xlLnRyYWNlKClgIGluc3RlYWQgb2YgYGNvbnNvbGUuZXJyb3IoKWAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSB0aGUgZnVuY3Rpb24gdG8gZGVwcmVjYXRlXG4gKiBAcGFyYW0ge1N0cmluZ30gbXNnIC0gdGhlIHN0cmluZyB0byBwcmludCB0byB0aGUgY29uc29sZSB3aGVuIGBmbmAgaXMgaW52b2tlZFxuICogQHJldHVybnMge0Z1bmN0aW9ufSBhIG5ldyBcImRlcHJlY2F0ZWRcIiB2ZXJzaW9uIG9mIGBmbmBcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZGVwcmVjYXRlIChmbiwgbXNnKSB7XG4gIGlmIChjb25maWcoJ25vRGVwcmVjYXRpb24nKSkge1xuICAgIHJldHVybiBmbjtcbiAgfVxuXG4gIHZhciB3YXJuZWQgPSBmYWxzZTtcbiAgZnVuY3Rpb24gZGVwcmVjYXRlZCgpIHtcbiAgICBpZiAoIXdhcm5lZCkge1xuICAgICAgaWYgKGNvbmZpZygndGhyb3dEZXByZWNhdGlvbicpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgfSBlbHNlIGlmIChjb25maWcoJ3RyYWNlRGVwcmVjYXRpb24nKSkge1xuICAgICAgICBjb25zb2xlLnRyYWNlKG1zZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4obXNnKTtcbiAgICAgIH1cbiAgICAgIHdhcm5lZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIGRlcHJlY2F0ZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGBsb2NhbFN0b3JhZ2VgIGZvciBib29sZWFuIHZhbHVlcyBmb3IgdGhlIGdpdmVuIGBuYW1lYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBjb25maWcgKG5hbWUpIHtcbiAgLy8gYWNjZXNzaW5nIGdsb2JhbC5sb2NhbFN0b3JhZ2UgY2FuIHRyaWdnZXIgYSBET01FeGNlcHRpb24gaW4gc2FuZGJveGVkIGlmcmFtZXNcbiAgdHJ5IHtcbiAgICBpZiAoIWdsb2JhbC5sb2NhbFN0b3JhZ2UpIHJldHVybiBmYWxzZTtcbiAgfSBjYXRjaCAoXykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdmFsID0gZ2xvYmFsLmxvY2FsU3RvcmFnZVtuYW1lXTtcbiAgaWYgKG51bGwgPT0gdmFsKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBTdHJpbmcodmFsKS50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZSc7XG59XG4iXX0=
},{}],"C:\\dev\\NEXUS\\node_modules\\xml2js\\lib\\bom.js":[function(require,module,exports){
// Generated by CoffeeScript 1.12.7
(function() {
  "use strict";
  exports.stripBOM = function(str) {
    if (str[0] === '\uFEFF') {
      return str.substring(1);
    } else {
      return str;
    }
  };

}).call(this);

},{}],"C:\\dev\\NEXUS\\node_modules\\xml2js\\lib\\builder.js":[function(require,module,exports){
// Generated by CoffeeScript 1.12.7
(function() {
  "use strict";
  var builder, defaults, escapeCDATA, requiresCDATA, wrapCDATA,
    hasProp = {}.hasOwnProperty;

  builder = require('xmlbuilder');

  defaults = require('./defaults').defaults;

  requiresCDATA = function(entry) {
    return typeof entry === "string" && (entry.indexOf('&') >= 0 || entry.indexOf('>') >= 0 || entry.indexOf('<') >= 0);
  };

  wrapCDATA = function(entry) {
    return "<![CDATA[" + (escapeCDATA(entry)) + "]]>";
  };

  escapeCDATA = function(entry) {
    return entry.replace(']]>', ']]]]><![CDATA[>');
  };

  exports.Builder = (function() {
    function Builder(opts) {
      var key, ref, value;
      this.options = {};
      ref = defaults["0.2"];
      for (key in ref) {
        if (!hasProp.call(ref, key)) continue;
        value = ref[key];
        this.options[key] = value;
      }
      for (key in opts) {
        if (!hasProp.call(opts, key)) continue;
        value = opts[key];
        this.options[key] = value;
      }
    }

    Builder.prototype.buildObject = function(rootObj) {
      var attrkey, charkey, render, rootElement, rootName;
      attrkey = this.options.attrkey;
      charkey = this.options.charkey;
      if ((Object.keys(rootObj).length === 1) && (this.options.rootName === defaults['0.2'].rootName)) {
        rootName = Object.keys(rootObj)[0];
        rootObj = rootObj[rootName];
      } else {
        rootName = this.options.rootName;
      }
      render = (function(_this) {
        return function(element, obj) {
          var attr, child, entry, index, key, value;
          if (typeof obj !== 'object') {
            if (_this.options.cdata && requiresCDATA(obj)) {
              element.raw(wrapCDATA(obj));
            } else {
              element.txt(obj);
            }
          } else if (Array.isArray(obj)) {
            for (index in obj) {
              if (!hasProp.call(obj, index)) continue;
              child = obj[index];
              for (key in child) {
                entry = child[key];
                element = render(element.ele(key), entry).up();
              }
            }
          } else {
            for (key in obj) {
              if (!hasProp.call(obj, key)) continue;
              child = obj[key];
              if (key === attrkey) {
                if (typeof child === "object") {
                  for (attr in child) {
                    value = child[attr];
                    element = element.att(attr, value);
                  }
                }
              } else if (key === charkey) {
                if (_this.options.cdata && requiresCDATA(child)) {
                  element = element.raw(wrapCDATA(child));
                } else {
                  element = element.txt(child);
                }
              } else if (Array.isArray(child)) {
                for (index in child) {
                  if (!hasProp.call(child, index)) continue;
                  entry = child[index];
                  if (typeof entry === 'string') {
                    if (_this.options.cdata && requiresCDATA(entry)) {
                      element = element.ele(key).raw(wrapCDATA(entry)).up();
                    } else {
                      element = element.ele(key, entry).up();
                    }
                  } else {
                    element = render(element.ele(key), entry).up();
                  }
                }
              } else if (typeof child === "object") {
                element = render(element.ele(key), child).up();
              } else {
                if (typeof child === 'string' && _this.options.cdata && requiresCDATA(child)) {
                  element = element.ele(key).raw(wrapCDATA(child)).up();
                } else {
                  if (child == null) {
                    child = '';
                  }
                  element = element.ele(key, child.toString()).up();
                }
              }
            }
          }
          return element;
        };
      })(this);
      rootElement = builder.create(rootName, this.options.xmldec, this.options.doctype, {
        headless: this.options.headless,
        allowSurrogateChars: this.options.allowSurrogateChars
      });
      return render(rootElement, rootObj).end(this.options.renderOpts);
    };

    return Builder;

  })();

}).call(this);

},{"./defaults":"C:\\dev\\NEXUS\\node_modules\\xml2js\\lib\\defaults.js","xmlbuilder":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\index.js"}],"C:\\dev\\NEXUS\\node_modules\\xml2js\\lib\\defaults.js":[function(require,module,exports){
// Generated by CoffeeScript 1.12.7
(function() {
  exports.defaults = {
    "0.1": {
      explicitCharkey: false,
      trim: true,
      normalize: true,
      normalizeTags: false,
      attrkey: "@",
      charkey: "#",
      explicitArray: false,
      ignoreAttrs: false,
      mergeAttrs: false,
      explicitRoot: false,
      validator: null,
      xmlns: false,
      explicitChildren: false,
      childkey: '@@',
      charsAsChildren: false,
      includeWhiteChars: false,
      async: false,
      strict: true,
      attrNameProcessors: null,
      attrValueProcessors: null,
      tagNameProcessors: null,
      valueProcessors: null,
      emptyTag: ''
    },
    "0.2": {
      explicitCharkey: false,
      trim: false,
      normalize: false,
      normalizeTags: false,
      attrkey: "$",
      charkey: "_",
      explicitArray: true,
      ignoreAttrs: false,
      mergeAttrs: false,
      explicitRoot: true,
      validator: null,
      xmlns: false,
      explicitChildren: false,
      preserveChildrenOrder: false,
      childkey: '$$',
      charsAsChildren: false,
      includeWhiteChars: false,
      async: false,
      strict: true,
      attrNameProcessors: null,
      attrValueProcessors: null,
      tagNameProcessors: null,
      valueProcessors: null,
      rootName: 'root',
      xmldec: {
        'version': '1.0',
        'encoding': 'UTF-8',
        'standalone': true
      },
      doctype: null,
      renderOpts: {
        'pretty': true,
        'indent': '  ',
        'newline': '\n'
      },
      headless: false,
      chunkSize: 10000,
      emptyTag: '',
      cdata: false
    }
  };

}).call(this);

},{}],"C:\\dev\\NEXUS\\node_modules\\xml2js\\lib\\parser.js":[function(require,module,exports){
// Generated by CoffeeScript 1.12.7
(function() {
  "use strict";
  var bom, defaults, events, isEmpty, processItem, processors, sax, setImmediate,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  sax = require('sax');

  events = require('events');

  bom = require('./bom');

  processors = require('./processors');

  setImmediate = require('timers').setImmediate;

  defaults = require('./defaults').defaults;

  isEmpty = function(thing) {
    return typeof thing === "object" && (thing != null) && Object.keys(thing).length === 0;
  };

  processItem = function(processors, item, key) {
    var i, len, process;
    for (i = 0, len = processors.length; i < len; i++) {
      process = processors[i];
      item = process(item, key);
    }
    return item;
  };

  exports.Parser = (function(superClass) {
    extend(Parser, superClass);

    function Parser(opts) {
      this.parseString = bind(this.parseString, this);
      this.reset = bind(this.reset, this);
      this.assignOrPush = bind(this.assignOrPush, this);
      this.processAsync = bind(this.processAsync, this);
      var key, ref, value;
      if (!(this instanceof exports.Parser)) {
        return new exports.Parser(opts);
      }
      this.options = {};
      ref = defaults["0.2"];
      for (key in ref) {
        if (!hasProp.call(ref, key)) continue;
        value = ref[key];
        this.options[key] = value;
      }
      for (key in opts) {
        if (!hasProp.call(opts, key)) continue;
        value = opts[key];
        this.options[key] = value;
      }
      if (this.options.xmlns) {
        this.options.xmlnskey = this.options.attrkey + "ns";
      }
      if (this.options.normalizeTags) {
        if (!this.options.tagNameProcessors) {
          this.options.tagNameProcessors = [];
        }
        this.options.tagNameProcessors.unshift(processors.normalize);
      }
      this.reset();
    }

    Parser.prototype.processAsync = function() {
      var chunk, err;
      try {
        if (this.remaining.length <= this.options.chunkSize) {
          chunk = this.remaining;
          this.remaining = '';
          this.saxParser = this.saxParser.write(chunk);
          return this.saxParser.close();
        } else {
          chunk = this.remaining.substr(0, this.options.chunkSize);
          this.remaining = this.remaining.substr(this.options.chunkSize, this.remaining.length);
          this.saxParser = this.saxParser.write(chunk);
          return setImmediate(this.processAsync);
        }
      } catch (error1) {
        err = error1;
        if (!this.saxParser.errThrown) {
          this.saxParser.errThrown = true;
          return this.emit(err);
        }
      }
    };

    Parser.prototype.assignOrPush = function(obj, key, newValue) {
      if (!(key in obj)) {
        if (!this.options.explicitArray) {
          return obj[key] = newValue;
        } else {
          return obj[key] = [newValue];
        }
      } else {
        if (!(obj[key] instanceof Array)) {
          obj[key] = [obj[key]];
        }
        return obj[key].push(newValue);
      }
    };

    Parser.prototype.reset = function() {
      var attrkey, charkey, ontext, stack;
      this.removeAllListeners();
      this.saxParser = sax.parser(this.options.strict, {
        trim: false,
        normalize: false,
        xmlns: this.options.xmlns
      });
      this.saxParser.errThrown = false;
      this.saxParser.onerror = (function(_this) {
        return function(error) {
          _this.saxParser.resume();
          if (!_this.saxParser.errThrown) {
            _this.saxParser.errThrown = true;
            return _this.emit("error", error);
          }
        };
      })(this);
      this.saxParser.onend = (function(_this) {
        return function() {
          if (!_this.saxParser.ended) {
            _this.saxParser.ended = true;
            return _this.emit("end", _this.resultObject);
          }
        };
      })(this);
      this.saxParser.ended = false;
      this.EXPLICIT_CHARKEY = this.options.explicitCharkey;
      this.resultObject = null;
      stack = [];
      attrkey = this.options.attrkey;
      charkey = this.options.charkey;
      this.saxParser.onopentag = (function(_this) {
        return function(node) {
          var key, newValue, obj, processedKey, ref;
          obj = {};
          obj[charkey] = "";
          if (!_this.options.ignoreAttrs) {
            ref = node.attributes;
            for (key in ref) {
              if (!hasProp.call(ref, key)) continue;
              if (!(attrkey in obj) && !_this.options.mergeAttrs) {
                obj[attrkey] = {};
              }
              newValue = _this.options.attrValueProcessors ? processItem(_this.options.attrValueProcessors, node.attributes[key], key) : node.attributes[key];
              processedKey = _this.options.attrNameProcessors ? processItem(_this.options.attrNameProcessors, key) : key;
              if (_this.options.mergeAttrs) {
                _this.assignOrPush(obj, processedKey, newValue);
              } else {
                obj[attrkey][processedKey] = newValue;
              }
            }
          }
          obj["#name"] = _this.options.tagNameProcessors ? processItem(_this.options.tagNameProcessors, node.name) : node.name;
          if (_this.options.xmlns) {
            obj[_this.options.xmlnskey] = {
              uri: node.uri,
              local: node.local
            };
          }
          return stack.push(obj);
        };
      })(this);
      this.saxParser.onclosetag = (function(_this) {
        return function() {
          var cdata, emptyStr, key, node, nodeName, obj, objClone, old, s, xpath;
          obj = stack.pop();
          nodeName = obj["#name"];
          if (!_this.options.explicitChildren || !_this.options.preserveChildrenOrder) {
            delete obj["#name"];
          }
          if (obj.cdata === true) {
            cdata = obj.cdata;
            delete obj.cdata;
          }
          s = stack[stack.length - 1];
          if (obj[charkey].match(/^\s*$/) && !cdata) {
            emptyStr = obj[charkey];
            delete obj[charkey];
          } else {
            if (_this.options.trim) {
              obj[charkey] = obj[charkey].trim();
            }
            if (_this.options.normalize) {
              obj[charkey] = obj[charkey].replace(/\s{2,}/g, " ").trim();
            }
            obj[charkey] = _this.options.valueProcessors ? processItem(_this.options.valueProcessors, obj[charkey], nodeName) : obj[charkey];
            if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
              obj = obj[charkey];
            }
          }
          if (isEmpty(obj)) {
            obj = _this.options.emptyTag !== '' ? _this.options.emptyTag : emptyStr;
          }
          if (_this.options.validator != null) {
            xpath = "/" + ((function() {
              var i, len, results;
              results = [];
              for (i = 0, len = stack.length; i < len; i++) {
                node = stack[i];
                results.push(node["#name"]);
              }
              return results;
            })()).concat(nodeName).join("/");
            (function() {
              var err;
              try {
                return obj = _this.options.validator(xpath, s && s[nodeName], obj);
              } catch (error1) {
                err = error1;
                return _this.emit("error", err);
              }
            })();
          }
          if (_this.options.explicitChildren && !_this.options.mergeAttrs && typeof obj === 'object') {
            if (!_this.options.preserveChildrenOrder) {
              node = {};
              if (_this.options.attrkey in obj) {
                node[_this.options.attrkey] = obj[_this.options.attrkey];
                delete obj[_this.options.attrkey];
              }
              if (!_this.options.charsAsChildren && _this.options.charkey in obj) {
                node[_this.options.charkey] = obj[_this.options.charkey];
                delete obj[_this.options.charkey];
              }
              if (Object.getOwnPropertyNames(obj).length > 0) {
                node[_this.options.childkey] = obj;
              }
              obj = node;
            } else if (s) {
              s[_this.options.childkey] = s[_this.options.childkey] || [];
              objClone = {};
              for (key in obj) {
                if (!hasProp.call(obj, key)) continue;
                objClone[key] = obj[key];
              }
              s[_this.options.childkey].push(objClone);
              delete obj["#name"];
              if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
                obj = obj[charkey];
              }
            }
          }
          if (stack.length > 0) {
            return _this.assignOrPush(s, nodeName, obj);
          } else {
            if (_this.options.explicitRoot) {
              old = obj;
              obj = {};
              obj[nodeName] = old;
            }
            _this.resultObject = obj;
            _this.saxParser.ended = true;
            return _this.emit("end", _this.resultObject);
          }
        };
      })(this);
      ontext = (function(_this) {
        return function(text) {
          var charChild, s;
          s = stack[stack.length - 1];
          if (s) {
            s[charkey] += text;
            if (_this.options.explicitChildren && _this.options.preserveChildrenOrder && _this.options.charsAsChildren && (_this.options.includeWhiteChars || text.replace(/\\n/g, '').trim() !== '')) {
              s[_this.options.childkey] = s[_this.options.childkey] || [];
              charChild = {
                '#name': '__text__'
              };
              charChild[charkey] = text;
              if (_this.options.normalize) {
                charChild[charkey] = charChild[charkey].replace(/\s{2,}/g, " ").trim();
              }
              s[_this.options.childkey].push(charChild);
            }
            return s;
          }
        };
      })(this);
      this.saxParser.ontext = ontext;
      return this.saxParser.oncdata = (function(_this) {
        return function(text) {
          var s;
          s = ontext(text);
          if (s) {
            return s.cdata = true;
          }
        };
      })(this);
    };

    Parser.prototype.parseString = function(str, cb) {
      var err;
      if ((cb != null) && typeof cb === "function") {
        this.on("end", function(result) {
          this.reset();
          return cb(null, result);
        });
        this.on("error", function(err) {
          this.reset();
          return cb(err);
        });
      }
      try {
        str = str.toString();
        if (str.trim() === '') {
          this.emit("end", null);
          return true;
        }
        str = bom.stripBOM(str);
        if (this.options.async) {
          this.remaining = str;
          setImmediate(this.processAsync);
          return this.saxParser;
        }
        return this.saxParser.write(str).close();
      } catch (error1) {
        err = error1;
        if (!(this.saxParser.errThrown || this.saxParser.ended)) {
          this.emit('error', err);
          return this.saxParser.errThrown = true;
        } else if (this.saxParser.ended) {
          throw err;
        }
      }
    };

    return Parser;

  })(events.EventEmitter);

  exports.parseString = function(str, a, b) {
    var cb, options, parser;
    if (b != null) {
      if (typeof b === 'function') {
        cb = b;
      }
      if (typeof a === 'object') {
        options = a;
      }
    } else {
      if (typeof a === 'function') {
        cb = a;
      }
      options = {};
    }
    parser = new exports.Parser(options);
    return parser.parseString(str, cb);
  };

}).call(this);

},{"./bom":"C:\\dev\\NEXUS\\node_modules\\xml2js\\lib\\bom.js","./defaults":"C:\\dev\\NEXUS\\node_modules\\xml2js\\lib\\defaults.js","./processors":"C:\\dev\\NEXUS\\node_modules\\xml2js\\lib\\processors.js","events":"C:\\dev\\NEXUS\\node_modules\\events\\events.js","sax":"C:\\dev\\NEXUS\\node_modules\\sax\\lib\\sax.js","timers":"C:\\dev\\NEXUS\\node_modules\\timers-browserify\\main.js"}],"C:\\dev\\NEXUS\\node_modules\\xml2js\\lib\\processors.js":[function(require,module,exports){
// Generated by CoffeeScript 1.12.7
(function() {
  "use strict";
  var prefixMatch;

  prefixMatch = new RegExp(/(?!xmlns)^.*:/);

  exports.normalize = function(str) {
    return str.toLowerCase();
  };

  exports.firstCharLowerCase = function(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
  };

  exports.stripPrefix = function(str) {
    return str.replace(prefixMatch, '');
  };

  exports.parseNumbers = function(str) {
    if (!isNaN(str)) {
      str = str % 1 === 0 ? parseInt(str, 10) : parseFloat(str);
    }
    return str;
  };

  exports.parseBooleans = function(str) {
    if (/^(?:true|false)$/i.test(str)) {
      str = str.toLowerCase() === 'true';
    }
    return str;
  };

}).call(this);

},{}],"C:\\dev\\NEXUS\\node_modules\\xml2js\\lib\\xml2js.js":[function(require,module,exports){
// Generated by CoffeeScript 1.12.7
(function() {
  "use strict";
  var builder, defaults, parser, processors,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  defaults = require('./defaults');

  builder = require('./builder');

  parser = require('./parser');

  processors = require('./processors');

  exports.defaults = defaults.defaults;

  exports.processors = processors;

  exports.ValidationError = (function(superClass) {
    extend(ValidationError, superClass);

    function ValidationError(message) {
      this.message = message;
    }

    return ValidationError;

  })(Error);

  exports.Builder = builder.Builder;

  exports.Parser = parser.Parser;

  exports.parseString = parser.parseString;

}).call(this);

},{"./builder":"C:\\dev\\NEXUS\\node_modules\\xml2js\\lib\\builder.js","./defaults":"C:\\dev\\NEXUS\\node_modules\\xml2js\\lib\\defaults.js","./parser":"C:\\dev\\NEXUS\\node_modules\\xml2js\\lib\\parser.js","./processors":"C:\\dev\\NEXUS\\node_modules\\xml2js\\lib\\processors.js"}],"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\Utility.js":[function(require,module,exports){
// Generated by CoffeeScript 1.12.6
(function() {
  var assign, isArray, isEmpty, isFunction, isObject, isPlainObject,
    slice = [].slice,
    hasProp = {}.hasOwnProperty;

  assign = function() {
    var i, key, len, source, sources, target;
    target = arguments[0], sources = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    if (isFunction(Object.assign)) {
      Object.assign.apply(null, arguments);
    } else {
      for (i = 0, len = sources.length; i < len; i++) {
        source = sources[i];
        if (source != null) {
          for (key in source) {
            if (!hasProp.call(source, key)) continue;
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };

  isFunction = function(val) {
    return !!val && Object.prototype.toString.call(val) === '[object Function]';
  };

  isObject = function(val) {
    var ref;
    return !!val && ((ref = typeof val) === 'function' || ref === 'object');
  };

  isArray = function(val) {
    if (isFunction(Array.isArray)) {
      return Array.isArray(val);
    } else {
      return Object.prototype.toString.call(val) === '[object Array]';
    }
  };

  isEmpty = function(val) {
    var key;
    if (isArray(val)) {
      return !val.length;
    } else {
      for (key in val) {
        if (!hasProp.call(val, key)) continue;
        return false;
      }
      return true;
    }
  };

  isPlainObject = function(val) {
    var ctor, proto;
    return isObject(val) && (proto = Object.getPrototypeOf(val)) && (ctor = proto.constructor) && (typeof ctor === 'function') && (ctor instanceof ctor) && (Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object));
  };

  module.exports.assign = assign;

  module.exports.isFunction = isFunction;

  module.exports.isObject = isObject;

  module.exports.isArray = isArray;

  module.exports.isEmpty = isEmpty;

  module.exports.isPlainObject = isPlainObject;

}).call(this);

},{}],"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLAttribute.js":[function(require,module,exports){
// Generated by CoffeeScript 1.12.6
(function() {
  var XMLAttribute;

  module.exports = XMLAttribute = (function() {
    function XMLAttribute(parent, name, value) {
      this.options = parent.options;
      this.stringify = parent.stringify;
      if (name == null) {
        throw new Error("Missing attribute name of element " + parent.name);
      }
      if (value == null) {
        throw new Error("Missing attribute value for attribute " + name + " of element " + parent.name);
      }
      this.name = this.stringify.attName(name);
      this.value = this.stringify.attValue(value);
    }

    XMLAttribute.prototype.clone = function() {
      return Object.create(this);
    };

    XMLAttribute.prototype.toString = function(options) {
      return this.options.writer.set(options).attribute(this);
    };

    return XMLAttribute;

  })();

}).call(this);

},{}],"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLCData.js":[function(require,module,exports){
// Generated by CoffeeScript 1.12.6
(function() {
  var XMLCData, XMLNode,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = require('./XMLNode');

  module.exports = XMLCData = (function(superClass) {
    extend(XMLCData, superClass);

    function XMLCData(parent, text) {
      XMLCData.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing CDATA text");
      }
      this.text = this.stringify.cdata(text);
    }

    XMLCData.prototype.clone = function() {
      return Object.create(this);
    };

    XMLCData.prototype.toString = function(options) {
      return this.options.writer.set(options).cdata(this);
    };

    return XMLCData;

  })(XMLNode);

}).call(this);

},{"./XMLNode":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLNode.js"}],"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLComment.js":[function(require,module,exports){
// Generated by CoffeeScript 1.12.6
(function() {
  var XMLComment, XMLNode,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = require('./XMLNode');

  module.exports = XMLComment = (function(superClass) {
    extend(XMLComment, superClass);

    function XMLComment(parent, text) {
      XMLComment.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing comment text");
      }
      this.text = this.stringify.comment(text);
    }

    XMLComment.prototype.clone = function() {
      return Object.create(this);
    };

    XMLComment.prototype.toString = function(options) {
      return this.options.writer.set(options).comment(this);
    };

    return XMLComment;

  })(XMLNode);

}).call(this);

},{"./XMLNode":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLNode.js"}],"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDTDAttList.js":[function(require,module,exports){
// Generated by CoffeeScript 1.12.6
(function() {
  var XMLDTDAttList, XMLNode,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = require('./XMLNode');

  module.exports = XMLDTDAttList = (function(superClass) {
    extend(XMLDTDAttList, superClass);

    function XMLDTDAttList(parent, elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      XMLDTDAttList.__super__.constructor.call(this, parent);
      if (elementName == null) {
        throw new Error("Missing DTD element name");
      }
      if (attributeName == null) {
        throw new Error("Missing DTD attribute name");
      }
      if (!attributeType) {
        throw new Error("Missing DTD attribute type");
      }
      if (!defaultValueType) {
        throw new Error("Missing DTD attribute default");
      }
      if (defaultValueType.indexOf('#') !== 0) {
        defaultValueType = '#' + defaultValueType;
      }
      if (!defaultValueType.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/)) {
        throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT");
      }
      if (defaultValue && !defaultValueType.match(/^(#FIXED|#DEFAULT)$/)) {
        throw new Error("Default value only applies to #FIXED or #DEFAULT");
      }
      this.elementName = this.stringify.eleName(elementName);
      this.attributeName = this.stringify.attName(attributeName);
      this.attributeType = this.stringify.dtdAttType(attributeType);
      this.defaultValue = this.stringify.dtdAttDefault(defaultValue);
      this.defaultValueType = defaultValueType;
    }

    XMLDTDAttList.prototype.toString = function(options) {
      return this.options.writer.set(options).dtdAttList(this);
    };

    return XMLDTDAttList;

  })(XMLNode);

}).call(this);

},{"./XMLNode":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLNode.js"}],"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDTDElement.js":[function(require,module,exports){
// Generated by CoffeeScript 1.12.6
(function() {
  var XMLDTDElement, XMLNode,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = require('./XMLNode');

  module.exports = XMLDTDElement = (function(superClass) {
    extend(XMLDTDElement, superClass);

    function XMLDTDElement(parent, name, value) {
      XMLDTDElement.__super__.constructor.call(this, parent);
      if (name == null) {
        throw new Error("Missing DTD element name");
      }
      if (!value) {
        value = '(#PCDATA)';
      }
      if (Array.isArray(value)) {
        value = '(' + value.join(',') + ')';
      }
      this.name = this.stringify.eleName(name);
      this.value = this.stringify.dtdElementValue(value);
    }

    XMLDTDElement.prototype.toString = function(options) {
      return this.options.writer.set(options).dtdElement(this);
    };

    return XMLDTDElement;

  })(XMLNode);

}).call(this);

},{"./XMLNode":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLNode.js"}],"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDTDEntity.js":[function(require,module,exports){
// Generated by CoffeeScript 1.12.6
(function() {
  var XMLDTDEntity, XMLNode, isObject,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  isObject = require('./Utility').isObject;

  XMLNode = require('./XMLNode');

  module.exports = XMLDTDEntity = (function(superClass) {
    extend(XMLDTDEntity, superClass);

    function XMLDTDEntity(parent, pe, name, value) {
      XMLDTDEntity.__super__.constructor.call(this, parent);
      if (name == null) {
        throw new Error("Missing entity name");
      }
      if (value == null) {
        throw new Error("Missing entity value");
      }
      this.pe = !!pe;
      this.name = this.stringify.eleName(name);
      if (!isObject(value)) {
        this.value = this.stringify.dtdEntityValue(value);
      } else {
        if (!value.pubID && !value.sysID) {
          throw new Error("Public and/or system identifiers are required for an external entity");
        }
        if (value.pubID && !value.sysID) {
          throw new Error("System identifier is required for a public external entity");
        }
        if (value.pubID != null) {
          this.pubID = this.stringify.dtdPubID(value.pubID);
        }
        if (value.sysID != null) {
          this.sysID = this.stringify.dtdSysID(value.sysID);
        }
        if (value.nData != null) {
          this.nData = this.stringify.dtdNData(value.nData);
        }
        if (this.pe && this.nData) {
          throw new Error("Notation declaration is not allowed in a parameter entity");
        }
      }
    }

    XMLDTDEntity.prototype.toString = function(options) {
      return this.options.writer.set(options).dtdEntity(this);
    };

    return XMLDTDEntity;

  })(XMLNode);

}).call(this);

},{"./Utility":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\Utility.js","./XMLNode":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLNode.js"}],"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDTDNotation.js":[function(require,module,exports){
// Generated by CoffeeScript 1.12.6
(function() {
  var XMLDTDNotation, XMLNode,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = require('./XMLNode');

  module.exports = XMLDTDNotation = (function(superClass) {
    extend(XMLDTDNotation, superClass);

    function XMLDTDNotation(parent, name, value) {
      XMLDTDNotation.__super__.constructor.call(this, parent);
      if (name == null) {
        throw new Error("Missing notation name");
      }
      if (!value.pubID && !value.sysID) {
        throw new Error("Public or system identifiers are required for an external entity");
      }
      this.name = this.stringify.eleName(name);
      if (value.pubID != null) {
        this.pubID = this.stringify.dtdPubID(value.pubID);
      }
      if (value.sysID != null) {
        this.sysID = this.stringify.dtdSysID(value.sysID);
      }
    }

    XMLDTDNotation.prototype.toString = function(options) {
      return this.options.writer.set(options).dtdNotation(this);
    };

    return XMLDTDNotation;

  })(XMLNode);

}).call(this);

},{"./XMLNode":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLNode.js"}],"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDeclaration.js":[function(require,module,exports){
// Generated by CoffeeScript 1.12.6
(function() {
  var XMLDeclaration, XMLNode, isObject,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  isObject = require('./Utility').isObject;

  XMLNode = require('./XMLNode');

  module.exports = XMLDeclaration = (function(superClass) {
    extend(XMLDeclaration, superClass);

    function XMLDeclaration(parent, version, encoding, standalone) {
      var ref;
      XMLDeclaration.__super__.constructor.call(this, parent);
      if (isObject(version)) {
        ref = version, version = ref.version, encoding = ref.encoding, standalone = ref.standalone;
      }
      if (!version) {
        version = '1.0';
      }
      this.version = this.stringify.xmlVersion(version);
      if (encoding != null) {
        this.encoding = this.stringify.xmlEncoding(encoding);
      }
      if (standalone != null) {
        this.standalone = this.stringify.xmlStandalone(standalone);
      }
    }

    XMLDeclaration.prototype.toString = function(options) {
      return this.options.writer.set(options).declaration(this);
    };

    return XMLDeclaration;

  })(XMLNode);

}).call(this);

},{"./Utility":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\Utility.js","./XMLNode":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLNode.js"}],"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDocType.js":[function(require,module,exports){
// Generated by CoffeeScript 1.12.6
(function() {
  var XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDocType, XMLNode, isObject,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  isObject = require('./Utility').isObject;

  XMLNode = require('./XMLNode');

  XMLDTDAttList = require('./XMLDTDAttList');

  XMLDTDEntity = require('./XMLDTDEntity');

  XMLDTDElement = require('./XMLDTDElement');

  XMLDTDNotation = require('./XMLDTDNotation');

  module.exports = XMLDocType = (function(superClass) {
    extend(XMLDocType, superClass);

    function XMLDocType(parent, pubID, sysID) {
      var ref, ref1;
      XMLDocType.__super__.constructor.call(this, parent);
      this.documentObject = parent;
      if (isObject(pubID)) {
        ref = pubID, pubID = ref.pubID, sysID = ref.sysID;
      }
      if (sysID == null) {
        ref1 = [pubID, sysID], sysID = ref1[0], pubID = ref1[1];
      }
      if (pubID != null) {
        this.pubID = this.stringify.dtdPubID(pubID);
      }
      if (sysID != null) {
        this.sysID = this.stringify.dtdSysID(sysID);
      }
    }

    XMLDocType.prototype.element = function(name, value) {
      var child;
      child = new XMLDTDElement(this, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      var child;
      child = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.entity = function(name, value) {
      var child;
      child = new XMLDTDEntity(this, false, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.pEntity = function(name, value) {
      var child;
      child = new XMLDTDEntity(this, true, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.notation = function(name, value) {
      var child;
      child = new XMLDTDNotation(this, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.toString = function(options) {
      return this.options.writer.set(options).docType(this);
    };

    XMLDocType.prototype.ele = function(name, value) {
      return this.element(name, value);
    };

    XMLDocType.prototype.att = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      return this.attList(elementName, attributeName, attributeType, defaultValueType, defaultValue);
    };

    XMLDocType.prototype.ent = function(name, value) {
      return this.entity(name, value);
    };

    XMLDocType.prototype.pent = function(name, value) {
      return this.pEntity(name, value);
    };

    XMLDocType.prototype.not = function(name, value) {
      return this.notation(name, value);
    };

    XMLDocType.prototype.up = function() {
      return this.root() || this.documentObject;
    };

    return XMLDocType;

  })(XMLNode);

}).call(this);

},{"./Utility":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\Utility.js","./XMLDTDAttList":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDTDAttList.js","./XMLDTDElement":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDTDElement.js","./XMLDTDEntity":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDTDEntity.js","./XMLDTDNotation":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDTDNotation.js","./XMLNode":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLNode.js"}],"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDocument.js":[function(require,module,exports){
// Generated by CoffeeScript 1.12.6
(function() {
  var XMLDocument, XMLNode, XMLStringWriter, XMLStringifier, isPlainObject,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  isPlainObject = require('./Utility').isPlainObject;

  XMLNode = require('./XMLNode');

  XMLStringifier = require('./XMLStringifier');

  XMLStringWriter = require('./XMLStringWriter');

  module.exports = XMLDocument = (function(superClass) {
    extend(XMLDocument, superClass);

    function XMLDocument(options) {
      XMLDocument.__super__.constructor.call(this, null);
      options || (options = {});
      if (!options.writer) {
        options.writer = new XMLStringWriter();
      }
      this.options = options;
      this.stringify = new XMLStringifier(options);
      this.isDocument = true;
    }

    XMLDocument.prototype.end = function(writer) {
      var writerOptions;
      if (!writer) {
        writer = this.options.writer;
      } else if (isPlainObject(writer)) {
        writerOptions = writer;
        writer = this.options.writer.set(writerOptions);
      }
      return writer.document(this);
    };

    XMLDocument.prototype.toString = function(options) {
      return this.options.writer.set(options).document(this);
    };

    return XMLDocument;

  })(XMLNode);

}).call(this);

},{"./Utility":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\Utility.js","./XMLNode":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLNode.js","./XMLStringWriter":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLStringWriter.js","./XMLStringifier":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLStringifier.js"}],"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDocumentCB.js":[function(require,module,exports){
// Generated by CoffeeScript 1.12.6
(function() {
  var XMLAttribute, XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDeclaration, XMLDocType, XMLDocumentCB, XMLElement, XMLProcessingInstruction, XMLRaw, XMLStringWriter, XMLStringifier, XMLText, isFunction, isObject, isPlainObject, ref,
    hasProp = {}.hasOwnProperty;

  ref = require('./Utility'), isObject = ref.isObject, isFunction = ref.isFunction, isPlainObject = ref.isPlainObject;

  XMLElement = require('./XMLElement');

  XMLCData = require('./XMLCData');

  XMLComment = require('./XMLComment');

  XMLRaw = require('./XMLRaw');

  XMLText = require('./XMLText');

  XMLProcessingInstruction = require('./XMLProcessingInstruction');

  XMLDeclaration = require('./XMLDeclaration');

  XMLDocType = require('./XMLDocType');

  XMLDTDAttList = require('./XMLDTDAttList');

  XMLDTDEntity = require('./XMLDTDEntity');

  XMLDTDElement = require('./XMLDTDElement');

  XMLDTDNotation = require('./XMLDTDNotation');

  XMLAttribute = require('./XMLAttribute');

  XMLStringifier = require('./XMLStringifier');

  XMLStringWriter = require('./XMLStringWriter');

  module.exports = XMLDocumentCB = (function() {
    function XMLDocumentCB(options, onData, onEnd) {
      var writerOptions;
      options || (options = {});
      if (!options.writer) {
        options.writer = new XMLStringWriter(options);
      } else if (isPlainObject(options.writer)) {
        writerOptions = options.writer;
        options.writer = new XMLStringWriter(writerOptions);
      }
      this.options = options;
      this.writer = options.writer;
      this.stringify = new XMLStringifier(options);
      this.onDataCallback = onData || function() {};
      this.onEndCallback = onEnd || function() {};
      this.currentNode = null;
      this.currentLevel = -1;
      this.openTags = {};
      this.documentStarted = false;
      this.documentCompleted = false;
      this.root = null;
    }

    XMLDocumentCB.prototype.node = function(name, attributes, text) {
      var ref1;
      if (name == null) {
        throw new Error("Missing node name");
      }
      if (this.root && this.currentLevel === -1) {
        throw new Error("Document can only have one root node");
      }
      this.openCurrent();
      name = name.valueOf();
      if (attributes == null) {
        attributes = {};
      }
      attributes = attributes.valueOf();
      if (!isObject(attributes)) {
        ref1 = [attributes, text], text = ref1[0], attributes = ref1[1];
      }
      this.currentNode = new XMLElement(this, name, attributes);
      this.currentNode.children = false;
      this.currentLevel++;
      this.openTags[this.currentLevel] = this.currentNode;
      if (text != null) {
        this.text(text);
      }
      return this;
    };

    XMLDocumentCB.prototype.element = function(name, attributes, text) {
      if (this.currentNode && this.currentNode instanceof XMLDocType) {
        return this.dtdElement.apply(this, arguments);
      } else {
        return this.node(name, attributes, text);
      }
    };

    XMLDocumentCB.prototype.attribute = function(name, value) {
      var attName, attValue;
      if (!this.currentNode || this.currentNode.children) {
        throw new Error("att() can only be used immediately after an ele() call in callback mode");
      }
      if (name != null) {
        name = name.valueOf();
      }
      if (isObject(name)) {
        for (attName in name) {
          if (!hasProp.call(name, attName)) continue;
          attValue = name[attName];
          this.attribute(attName, attValue);
        }
      } else {
        if (isFunction(value)) {
          value = value.apply();
        }
        if (!this.options.skipNullAttributes || (value != null)) {
          this.currentNode.attributes[name] = new XMLAttribute(this, name, value);
        }
      }
      return this;
    };

    XMLDocumentCB.prototype.text = function(value) {
      var node;
      this.openCurrent();
      node = new XMLText(this, value);
      this.onData(this.writer.text(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.cdata = function(value) {
      var node;
      this.openCurrent();
      node = new XMLCData(this, value);
      this.onData(this.writer.cdata(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.comment = function(value) {
      var node;
      this.openCurrent();
      node = new XMLComment(this, value);
      this.onData(this.writer.comment(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.raw = function(value) {
      var node;
      this.openCurrent();
      node = new XMLRaw(this, value);
      this.onData(this.writer.raw(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.instruction = function(target, value) {
      var i, insTarget, insValue, len, node;
      this.openCurrent();
      if (target != null) {
        target = target.valueOf();
      }
      if (value != null) {
        value = value.valueOf();
      }
      if (Array.isArray(target)) {
        for (i = 0, len = target.length; i < len; i++) {
          insTarget = target[i];
          this.instruction(insTarget);
        }
      } else if (isObject(target)) {
        for (insTarget in target) {
          if (!hasProp.call(target, insTarget)) continue;
          insValue = target[insTarget];
          this.instruction(insTarget, insValue);
        }
      } else {
        if (isFunction(value)) {
          value = value.apply();
        }
        node = new XMLProcessingInstruction(this, target, value);
        this.onData(this.writer.processingInstruction(node, this.currentLevel + 1));
      }
      return this;
    };

    XMLDocumentCB.prototype.declaration = function(version, encoding, standalone) {
      var node;
      this.openCurrent();
      if (this.documentStarted) {
        throw new Error("declaration() must be the first node");
      }
      node = new XMLDeclaration(this, version, encoding, standalone);
      this.onData(this.writer.declaration(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.doctype = function(root, pubID, sysID) {
      this.openCurrent();
      if (root == null) {
        throw new Error("Missing root node name");
      }
      if (this.root) {
        throw new Error("dtd() must come before the root node");
      }
      this.currentNode = new XMLDocType(this, pubID, sysID);
      this.currentNode.rootNodeName = root;
      this.currentNode.children = false;
      this.currentLevel++;
      this.openTags[this.currentLevel] = this.currentNode;
      return this;
    };

    XMLDocumentCB.prototype.dtdElement = function(name, value) {
      var node;
      this.openCurrent();
      node = new XMLDTDElement(this, name, value);
      this.onData(this.writer.dtdElement(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      var node;
      this.openCurrent();
      node = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
      this.onData(this.writer.dtdAttList(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.entity = function(name, value) {
      var node;
      this.openCurrent();
      node = new XMLDTDEntity(this, false, name, value);
      this.onData(this.writer.dtdEntity(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.pEntity = function(name, value) {
      var node;
      this.openCurrent();
      node = new XMLDTDEntity(this, true, name, value);
      this.onData(this.writer.dtdEntity(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.notation = function(name, value) {
      var node;
      this.openCurrent();
      node = new XMLDTDNotation(this, name, value);
      this.onData(this.writer.dtdNotation(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.up = function() {
      if (this.currentLevel < 0) {
        throw new Error("The document node has no parent");
      }
      if (this.currentNode) {
        if (this.currentNode.children) {
          this.closeNode(this.currentNode);
        } else {
          this.openNode(this.currentNode);
        }
        this.currentNode = null;
      } else {
        this.closeNode(this.openTags[this.currentLevel]);
      }
      delete this.openTags[this.currentLevel];
      this.currentLevel--;
      return this;
    };

    XMLDocumentCB.prototype.end = function() {
      while (this.currentLevel >= 0) {
        this.up();
      }
      return this.onEnd();
    };

    XMLDocumentCB.prototype.openCurrent = function() {
      if (this.currentNode) {
        this.currentNode.children = true;
        return this.openNode(this.currentNode);
      }
    };

    XMLDocumentCB.prototype.openNode = function(node) {
      if (!node.isOpen) {
        if (!this.root && this.currentLevel === 0 && node instanceof XMLElement) {
          this.root = node;
        }
        this.onData(this.writer.openNode(node, this.currentLevel));
        return node.isOpen = true;
      }
    };

    XMLDocumentCB.prototype.closeNode = function(node) {
      if (!node.isClosed) {
        this.onData(this.writer.closeNode(node, this.currentLevel));
        return node.isClosed = true;
      }
    };

    XMLDocumentCB.prototype.onData = function(chunk) {
      this.documentStarted = true;
      return this.onDataCallback(chunk);
    };

    XMLDocumentCB.prototype.onEnd = function() {
      this.documentCompleted = true;
      return this.onEndCallback();
    };

    XMLDocumentCB.prototype.ele = function() {
      return this.element.apply(this, arguments);
    };

    XMLDocumentCB.prototype.nod = function(name, attributes, text) {
      return this.node(name, attributes, text);
    };

    XMLDocumentCB.prototype.txt = function(value) {
      return this.text(value);
    };

    XMLDocumentCB.prototype.dat = function(value) {
      return this.cdata(value);
    };

    XMLDocumentCB.prototype.com = function(value) {
      return this.comment(value);
    };

    XMLDocumentCB.prototype.ins = function(target, value) {
      return this.instruction(target, value);
    };

    XMLDocumentCB.prototype.dec = function(version, encoding, standalone) {
      return this.declaration(version, encoding, standalone);
    };

    XMLDocumentCB.prototype.dtd = function(root, pubID, sysID) {
      return this.doctype(root, pubID, sysID);
    };

    XMLDocumentCB.prototype.e = function(name, attributes, text) {
      return this.element(name, attributes, text);
    };

    XMLDocumentCB.prototype.n = function(name, attributes, text) {
      return this.node(name, attributes, text);
    };

    XMLDocumentCB.prototype.t = function(value) {
      return this.text(value);
    };

    XMLDocumentCB.prototype.d = function(value) {
      return this.cdata(value);
    };

    XMLDocumentCB.prototype.c = function(value) {
      return this.comment(value);
    };

    XMLDocumentCB.prototype.r = function(value) {
      return this.raw(value);
    };

    XMLDocumentCB.prototype.i = function(target, value) {
      return this.instruction(target, value);
    };

    XMLDocumentCB.prototype.att = function() {
      if (this.currentNode && this.currentNode instanceof XMLDocType) {
        return this.attList.apply(this, arguments);
      } else {
        return this.attribute.apply(this, arguments);
      }
    };

    XMLDocumentCB.prototype.a = function() {
      if (this.currentNode && this.currentNode instanceof XMLDocType) {
        return this.attList.apply(this, arguments);
      } else {
        return this.attribute.apply(this, arguments);
      }
    };

    XMLDocumentCB.prototype.ent = function(name, value) {
      return this.entity(name, value);
    };

    XMLDocumentCB.prototype.pent = function(name, value) {
      return this.pEntity(name, value);
    };

    XMLDocumentCB.prototype.not = function(name, value) {
      return this.notation(name, value);
    };

    return XMLDocumentCB;

  })();

}).call(this);

},{"./Utility":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\Utility.js","./XMLAttribute":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLAttribute.js","./XMLCData":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLCData.js","./XMLComment":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLComment.js","./XMLDTDAttList":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDTDAttList.js","./XMLDTDElement":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDTDElement.js","./XMLDTDEntity":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDTDEntity.js","./XMLDTDNotation":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDTDNotation.js","./XMLDeclaration":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDeclaration.js","./XMLDocType":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDocType.js","./XMLElement":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLElement.js","./XMLProcessingInstruction":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLProcessingInstruction.js","./XMLRaw":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLRaw.js","./XMLStringWriter":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLStringWriter.js","./XMLStringifier":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLStringifier.js","./XMLText":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLText.js"}],"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLElement.js":[function(require,module,exports){
// Generated by CoffeeScript 1.12.6
(function() {
  var XMLAttribute, XMLElement, XMLNode, isFunction, isObject, ref,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ref = require('./Utility'), isObject = ref.isObject, isFunction = ref.isFunction;

  XMLNode = require('./XMLNode');

  XMLAttribute = require('./XMLAttribute');

  module.exports = XMLElement = (function(superClass) {
    extend(XMLElement, superClass);

    function XMLElement(parent, name, attributes) {
      XMLElement.__super__.constructor.call(this, parent);
      if (name == null) {
        throw new Error("Missing element name");
      }
      this.name = this.stringify.eleName(name);
      this.attributes = {};
      if (attributes != null) {
        this.attribute(attributes);
      }
      if (parent.isDocument) {
        this.isRoot = true;
        this.documentObject = parent;
        parent.rootObject = this;
      }
    }

    XMLElement.prototype.clone = function() {
      var att, attName, clonedSelf, ref1;
      clonedSelf = Object.create(this);
      if (clonedSelf.isRoot) {
        clonedSelf.documentObject = null;
      }
      clonedSelf.attributes = {};
      ref1 = this.attributes;
      for (attName in ref1) {
        if (!hasProp.call(ref1, attName)) continue;
        att = ref1[attName];
        clonedSelf.attributes[attName] = att.clone();
      }
      clonedSelf.children = [];
      this.children.forEach(function(child) {
        var clonedChild;
        clonedChild = child.clone();
        clonedChild.parent = clonedSelf;
        return clonedSelf.children.push(clonedChild);
      });
      return clonedSelf;
    };

    XMLElement.prototype.attribute = function(name, value) {
      var attName, attValue;
      if (name != null) {
        name = name.valueOf();
      }
      if (isObject(name)) {
        for (attName in name) {
          if (!hasProp.call(name, attName)) continue;
          attValue = name[attName];
          this.attribute(attName, attValue);
        }
      } else {
        if (isFunction(value)) {
          value = value.apply();
        }
        if (!this.options.skipNullAttributes || (value != null)) {
          this.attributes[name] = new XMLAttribute(this, name, value);
        }
      }
      return this;
    };

    XMLElement.prototype.removeAttribute = function(name) {
      var attName, i, len;
      if (name == null) {
        throw new Error("Missing attribute name");
      }
      name = name.valueOf();
      if (Array.isArray(name)) {
        for (i = 0, len = name.length; i < len; i++) {
          attName = name[i];
          delete this.attributes[attName];
        }
      } else {
        delete this.attributes[name];
      }
      return this;
    };

    XMLElement.prototype.toString = function(options) {
      return this.options.writer.set(options).element(this);
    };

    XMLElement.prototype.att = function(name, value) {
      return this.attribute(name, value);
    };

    XMLElement.prototype.a = function(name, value) {
      return this.attribute(name, value);
    };

    return XMLElement;

  })(XMLNode);

}).call(this);

},{"./Utility":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\Utility.js","./XMLAttribute":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLAttribute.js","./XMLNode":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLNode.js"}],"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLNode.js":[function(require,module,exports){
// Generated by CoffeeScript 1.12.6
(function() {
  var XMLCData, XMLComment, XMLDeclaration, XMLDocType, XMLElement, XMLNode, XMLProcessingInstruction, XMLRaw, XMLText, isEmpty, isFunction, isObject, ref,
    hasProp = {}.hasOwnProperty;

  ref = require('./Utility'), isObject = ref.isObject, isFunction = ref.isFunction, isEmpty = ref.isEmpty;

  XMLElement = null;

  XMLCData = null;

  XMLComment = null;

  XMLDeclaration = null;

  XMLDocType = null;

  XMLRaw = null;

  XMLText = null;

  XMLProcessingInstruction = null;

  module.exports = XMLNode = (function() {
    function XMLNode(parent) {
      this.parent = parent;
      if (this.parent) {
        this.options = this.parent.options;
        this.stringify = this.parent.stringify;
      }
      this.children = [];
      if (!XMLElement) {
        XMLElement = require('./XMLElement');
        XMLCData = require('./XMLCData');
        XMLComment = require('./XMLComment');
        XMLDeclaration = require('./XMLDeclaration');
        XMLDocType = require('./XMLDocType');
        XMLRaw = require('./XMLRaw');
        XMLText = require('./XMLText');
        XMLProcessingInstruction = require('./XMLProcessingInstruction');
      }
    }

    XMLNode.prototype.element = function(name, attributes, text) {
      var childNode, item, j, k, key, lastChild, len, len1, ref1, val;
      lastChild = null;
      if (attributes == null) {
        attributes = {};
      }
      attributes = attributes.valueOf();
      if (!isObject(attributes)) {
        ref1 = [attributes, text], text = ref1[0], attributes = ref1[1];
      }
      if (name != null) {
        name = name.valueOf();
      }
      if (Array.isArray(name)) {
        for (j = 0, len = name.length; j < len; j++) {
          item = name[j];
          lastChild = this.element(item);
        }
      } else if (isFunction(name)) {
        lastChild = this.element(name.apply());
      } else if (isObject(name)) {
        for (key in name) {
          if (!hasProp.call(name, key)) continue;
          val = name[key];
          if (isFunction(val)) {
            val = val.apply();
          }
          if ((isObject(val)) && (isEmpty(val))) {
            val = null;
          }
          if (!this.options.ignoreDecorators && this.stringify.convertAttKey && key.indexOf(this.stringify.convertAttKey) === 0) {
            lastChild = this.attribute(key.substr(this.stringify.convertAttKey.length), val);
          } else if (!this.options.separateArrayItems && Array.isArray(val)) {
            for (k = 0, len1 = val.length; k < len1; k++) {
              item = val[k];
              childNode = {};
              childNode[key] = item;
              lastChild = this.element(childNode);
            }
          } else if (isObject(val)) {
            lastChild = this.element(key);
            lastChild.element(val);
          } else {
            lastChild = this.element(key, val);
          }
        }
      } else {
        if (!this.options.ignoreDecorators && this.stringify.convertTextKey && name.indexOf(this.stringify.convertTextKey) === 0) {
          lastChild = this.text(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertCDataKey && name.indexOf(this.stringify.convertCDataKey) === 0) {
          lastChild = this.cdata(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertCommentKey && name.indexOf(this.stringify.convertCommentKey) === 0) {
          lastChild = this.comment(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertRawKey && name.indexOf(this.stringify.convertRawKey) === 0) {
          lastChild = this.raw(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertPIKey && name.indexOf(this.stringify.convertPIKey) === 0) {
          lastChild = this.instruction(name.substr(this.stringify.convertPIKey.length), text);
        } else {
          lastChild = this.node(name, attributes, text);
        }
      }
      if (lastChild == null) {
        throw new Error("Could not create any elements with: " + name);
      }
      return lastChild;
    };

    XMLNode.prototype.insertBefore = function(name, attributes, text) {
      var child, i, removed;
      if (this.isRoot) {
        throw new Error("Cannot insert elements at root level");
      }
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i);
      child = this.parent.element(name, attributes, text);
      Array.prototype.push.apply(this.parent.children, removed);
      return child;
    };

    XMLNode.prototype.insertAfter = function(name, attributes, text) {
      var child, i, removed;
      if (this.isRoot) {
        throw new Error("Cannot insert elements at root level");
      }
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i + 1);
      child = this.parent.element(name, attributes, text);
      Array.prototype.push.apply(this.parent.children, removed);
      return child;
    };

    XMLNode.prototype.remove = function() {
      var i, ref1;
      if (this.isRoot) {
        throw new Error("Cannot remove the root element");
      }
      i = this.parent.children.indexOf(this);
      [].splice.apply(this.parent.children, [i, i - i + 1].concat(ref1 = [])), ref1;
      return this.parent;
    };

    XMLNode.prototype.node = function(name, attributes, text) {
      var child, ref1;
      if (name != null) {
        name = name.valueOf();
      }
      attributes || (attributes = {});
      attributes = attributes.valueOf();
      if (!isObject(attributes)) {
        ref1 = [attributes, text], text = ref1[0], attributes = ref1[1];
      }
      child = new XMLElement(this, name, attributes);
      if (text != null) {
        child.text(text);
      }
      this.children.push(child);
      return child;
    };

    XMLNode.prototype.text = function(value) {
      var child;
      child = new XMLText(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.cdata = function(value) {
      var child;
      child = new XMLCData(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.comment = function(value) {
      var child;
      child = new XMLComment(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.commentBefore = function(value) {
      var child, i, removed;
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i);
      child = this.parent.comment(value);
      Array.prototype.push.apply(this.parent.children, removed);
      return this;
    };

    XMLNode.prototype.commentAfter = function(value) {
      var child, i, removed;
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i + 1);
      child = this.parent.comment(value);
      Array.prototype.push.apply(this.parent.children, removed);
      return this;
    };

    XMLNode.prototype.raw = function(value) {
      var child;
      child = new XMLRaw(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.instruction = function(target, value) {
      var insTarget, insValue, instruction, j, len;
      if (target != null) {
        target = target.valueOf();
      }
      if (value != null) {
        value = value.valueOf();
      }
      if (Array.isArray(target)) {
        for (j = 0, len = target.length; j < len; j++) {
          insTarget = target[j];
          this.instruction(insTarget);
        }
      } else if (isObject(target)) {
        for (insTarget in target) {
          if (!hasProp.call(target, insTarget)) continue;
          insValue = target[insTarget];
          this.instruction(insTarget, insValue);
        }
      } else {
        if (isFunction(value)) {
          value = value.apply();
        }
        instruction = new XMLProcessingInstruction(this, target, value);
        this.children.push(instruction);
      }
      return this;
    };

    XMLNode.prototype.instructionBefore = function(target, value) {
      var child, i, removed;
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i);
      child = this.parent.instruction(target, value);
      Array.prototype.push.apply(this.parent.children, removed);
      return this;
    };

    XMLNode.prototype.instructionAfter = function(target, value) {
      var child, i, removed;
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i + 1);
      child = this.parent.instruction(target, value);
      Array.prototype.push.apply(this.parent.children, removed);
      return this;
    };

    XMLNode.prototype.declaration = function(version, encoding, standalone) {
      var doc, xmldec;
      doc = this.document();
      xmldec = new XMLDeclaration(doc, version, encoding, standalone);
      if (doc.children[0] instanceof XMLDeclaration) {
        doc.children[0] = xmldec;
      } else {
        doc.children.unshift(xmldec);
      }
      return doc.root() || doc;
    };

    XMLNode.prototype.doctype = function(pubID, sysID) {
      var child, doc, doctype, i, j, k, len, len1, ref1, ref2;
      doc = this.document();
      doctype = new XMLDocType(doc, pubID, sysID);
      ref1 = doc.children;
      for (i = j = 0, len = ref1.length; j < len; i = ++j) {
        child = ref1[i];
        if (child instanceof XMLDocType) {
          doc.children[i] = doctype;
          return doctype;
        }
      }
      ref2 = doc.children;
      for (i = k = 0, len1 = ref2.length; k < len1; i = ++k) {
        child = ref2[i];
        if (child.isRoot) {
          doc.children.splice(i, 0, doctype);
          return doctype;
        }
      }
      doc.children.push(doctype);
      return doctype;
    };

    XMLNode.prototype.up = function() {
      if (this.isRoot) {
        throw new Error("The root node has no parent. Use doc() if you need to get the document object.");
      }
      return this.parent;
    };

    XMLNode.prototype.root = function() {
      var node;
      node = this;
      while (node) {
        if (node.isDocument) {
          return node.rootObject;
        } else if (node.isRoot) {
          return node;
        } else {
          node = node.parent;
        }
      }
    };

    XMLNode.prototype.document = function() {
      var node;
      node = this;
      while (node) {
        if (node.isDocument) {
          return node;
        } else {
          node = node.parent;
        }
      }
    };

    XMLNode.prototype.end = function(options) {
      return this.document().end(options);
    };

    XMLNode.prototype.prev = function() {
      var i;
      i = this.parent.children.indexOf(this);
      if (i < 1) {
        throw new Error("Already at the first node");
      }
      return this.parent.children[i - 1];
    };

    XMLNode.prototype.next = function() {
      var i;
      i = this.parent.children.indexOf(this);
      if (i === -1 || i === this.parent.children.length - 1) {
        throw new Error("Already at the last node");
      }
      return this.parent.children[i + 1];
    };

    XMLNode.prototype.importDocument = function(doc) {
      var clonedRoot;
      clonedRoot = doc.root().clone();
      clonedRoot.parent = this;
      clonedRoot.isRoot = false;
      this.children.push(clonedRoot);
      return this;
    };

    XMLNode.prototype.ele = function(name, attributes, text) {
      return this.element(name, attributes, text);
    };

    XMLNode.prototype.nod = function(name, attributes, text) {
      return this.node(name, attributes, text);
    };

    XMLNode.prototype.txt = function(value) {
      return this.text(value);
    };

    XMLNode.prototype.dat = function(value) {
      return this.cdata(value);
    };

    XMLNode.prototype.com = function(value) {
      return this.comment(value);
    };

    XMLNode.prototype.ins = function(target, value) {
      return this.instruction(target, value);
    };

    XMLNode.prototype.doc = function() {
      return this.document();
    };

    XMLNode.prototype.dec = function(version, encoding, standalone) {
      return this.declaration(version, encoding, standalone);
    };

    XMLNode.prototype.dtd = function(pubID, sysID) {
      return this.doctype(pubID, sysID);
    };

    XMLNode.prototype.e = function(name, attributes, text) {
      return this.element(name, attributes, text);
    };

    XMLNode.prototype.n = function(name, attributes, text) {
      return this.node(name, attributes, text);
    };

    XMLNode.prototype.t = function(value) {
      return this.text(value);
    };

    XMLNode.prototype.d = function(value) {
      return this.cdata(value);
    };

    XMLNode.prototype.c = function(value) {
      return this.comment(value);
    };

    XMLNode.prototype.r = function(value) {
      return this.raw(value);
    };

    XMLNode.prototype.i = function(target, value) {
      return this.instruction(target, value);
    };

    XMLNode.prototype.u = function() {
      return this.up();
    };

    XMLNode.prototype.importXMLBuilder = function(doc) {
      return this.importDocument(doc);
    };

    return XMLNode;

  })();

}).call(this);

},{"./Utility":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\Utility.js","./XMLCData":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLCData.js","./XMLComment":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLComment.js","./XMLDeclaration":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDeclaration.js","./XMLDocType":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDocType.js","./XMLElement":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLElement.js","./XMLProcessingInstruction":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLProcessingInstruction.js","./XMLRaw":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLRaw.js","./XMLText":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLText.js"}],"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLProcessingInstruction.js":[function(require,module,exports){
// Generated by CoffeeScript 1.12.6
(function() {
  var XMLNode, XMLProcessingInstruction,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = require('./XMLNode');

  module.exports = XMLProcessingInstruction = (function(superClass) {
    extend(XMLProcessingInstruction, superClass);

    function XMLProcessingInstruction(parent, target, value) {
      XMLProcessingInstruction.__super__.constructor.call(this, parent);
      if (target == null) {
        throw new Error("Missing instruction target");
      }
      this.target = this.stringify.insTarget(target);
      if (value) {
        this.value = this.stringify.insValue(value);
      }
    }

    XMLProcessingInstruction.prototype.clone = function() {
      return Object.create(this);
    };

    XMLProcessingInstruction.prototype.toString = function(options) {
      return this.options.writer.set(options).processingInstruction(this);
    };

    return XMLProcessingInstruction;

  })(XMLNode);

}).call(this);

},{"./XMLNode":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLNode.js"}],"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLRaw.js":[function(require,module,exports){
// Generated by CoffeeScript 1.12.6
(function() {
  var XMLNode, XMLRaw,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = require('./XMLNode');

  module.exports = XMLRaw = (function(superClass) {
    extend(XMLRaw, superClass);

    function XMLRaw(parent, text) {
      XMLRaw.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing raw text");
      }
      this.value = this.stringify.raw(text);
    }

    XMLRaw.prototype.clone = function() {
      return Object.create(this);
    };

    XMLRaw.prototype.toString = function(options) {
      return this.options.writer.set(options).raw(this);
    };

    return XMLRaw;

  })(XMLNode);

}).call(this);

},{"./XMLNode":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLNode.js"}],"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLStreamWriter.js":[function(require,module,exports){
// Generated by CoffeeScript 1.12.6
(function() {
  var XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDeclaration, XMLDocType, XMLElement, XMLProcessingInstruction, XMLRaw, XMLStreamWriter, XMLText, XMLWriterBase,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLDeclaration = require('./XMLDeclaration');

  XMLDocType = require('./XMLDocType');

  XMLCData = require('./XMLCData');

  XMLComment = require('./XMLComment');

  XMLElement = require('./XMLElement');

  XMLRaw = require('./XMLRaw');

  XMLText = require('./XMLText');

  XMLProcessingInstruction = require('./XMLProcessingInstruction');

  XMLDTDAttList = require('./XMLDTDAttList');

  XMLDTDElement = require('./XMLDTDElement');

  XMLDTDEntity = require('./XMLDTDEntity');

  XMLDTDNotation = require('./XMLDTDNotation');

  XMLWriterBase = require('./XMLWriterBase');

  module.exports = XMLStreamWriter = (function(superClass) {
    extend(XMLStreamWriter, superClass);

    function XMLStreamWriter(stream, options) {
      this.stream = stream;
      XMLStreamWriter.__super__.constructor.call(this, options);
    }

    XMLStreamWriter.prototype.document = function(doc) {
      var child, i, j, len, len1, ref, ref1, results;
      ref = doc.children;
      for (i = 0, len = ref.length; i < len; i++) {
        child = ref[i];
        child.isLastRootNode = false;
      }
      doc.children[doc.children.length - 1].isLastRootNode = true;
      ref1 = doc.children;
      results = [];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        child = ref1[j];
        switch (false) {
          case !(child instanceof XMLDeclaration):
            results.push(this.declaration(child));
            break;
          case !(child instanceof XMLDocType):
            results.push(this.docType(child));
            break;
          case !(child instanceof XMLComment):
            results.push(this.comment(child));
            break;
          case !(child instanceof XMLProcessingInstruction):
            results.push(this.processingInstruction(child));
            break;
          default:
            results.push(this.element(child));
        }
      }
      return results;
    };

    XMLStreamWriter.prototype.attribute = function(att) {
      return this.stream.write(' ' + att.name + '="' + att.value + '"');
    };

    XMLStreamWriter.prototype.cdata = function(node, level) {
      return this.stream.write(this.space(level) + '<![CDATA[' + node.text + ']]>' + this.endline(node));
    };

    XMLStreamWriter.prototype.comment = function(node, level) {
      return this.stream.write(this.space(level) + '<!-- ' + node.text + ' -->' + this.endline(node));
    };

    XMLStreamWriter.prototype.declaration = function(node, level) {
      this.stream.write(this.space(level));
      this.stream.write('<?xml version="' + node.version + '"');
      if (node.encoding != null) {
        this.stream.write(' encoding="' + node.encoding + '"');
      }
      if (node.standalone != null) {
        this.stream.write(' standalone="' + node.standalone + '"');
      }
      this.stream.write(this.spacebeforeslash + '?>');
      return this.stream.write(this.endline(node));
    };

    XMLStreamWriter.prototype.docType = function(node, level) {
      var child, i, len, ref;
      level || (level = 0);
      this.stream.write(this.space(level));
      this.stream.write('<!DOCTYPE ' + node.root().name);
      if (node.pubID && node.sysID) {
        this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
      } else if (node.sysID) {
        this.stream.write(' SYSTEM "' + node.sysID + '"');
      }
      if (node.children.length > 0) {
        this.stream.write(' [');
        this.stream.write(this.endline(node));
        ref = node.children;
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          switch (false) {
            case !(child instanceof XMLDTDAttList):
              this.dtdAttList(child, level + 1);
              break;
            case !(child instanceof XMLDTDElement):
              this.dtdElement(child, level + 1);
              break;
            case !(child instanceof XMLDTDEntity):
              this.dtdEntity(child, level + 1);
              break;
            case !(child instanceof XMLDTDNotation):
              this.dtdNotation(child, level + 1);
              break;
            case !(child instanceof XMLCData):
              this.cdata(child, level + 1);
              break;
            case !(child instanceof XMLComment):
              this.comment(child, level + 1);
              break;
            case !(child instanceof XMLProcessingInstruction):
              this.processingInstruction(child, level + 1);
              break;
            default:
              throw new Error("Unknown DTD node type: " + child.constructor.name);
          }
        }
        this.stream.write(']');
      }
      this.stream.write(this.spacebeforeslash + '>');
      return this.stream.write(this.endline(node));
    };

    XMLStreamWriter.prototype.element = function(node, level) {
      var att, child, i, len, name, ref, ref1, space;
      level || (level = 0);
      space = this.space(level);
      this.stream.write(space + '<' + node.name);
      ref = node.attributes;
      for (name in ref) {
        if (!hasProp.call(ref, name)) continue;
        att = ref[name];
        this.attribute(att);
      }
      if (node.children.length === 0 || node.children.every(function(e) {
        return e.value === '';
      })) {
        if (this.allowEmpty) {
          this.stream.write('></' + node.name + '>');
        } else {
          this.stream.write(this.spacebeforeslash + '/>');
        }
      } else if (this.pretty && node.children.length === 1 && (node.children[0].value != null)) {
        this.stream.write('>');
        this.stream.write(node.children[0].value);
        this.stream.write('</' + node.name + '>');
      } else {
        this.stream.write('>' + this.newline);
        ref1 = node.children;
        for (i = 0, len = ref1.length; i < len; i++) {
          child = ref1[i];
          switch (false) {
            case !(child instanceof XMLCData):
              this.cdata(child, level + 1);
              break;
            case !(child instanceof XMLComment):
              this.comment(child, level + 1);
              break;
            case !(child instanceof XMLElement):
              this.element(child, level + 1);
              break;
            case !(child instanceof XMLRaw):
              this.raw(child, level + 1);
              break;
            case !(child instanceof XMLText):
              this.text(child, level + 1);
              break;
            case !(child instanceof XMLProcessingInstruction):
              this.processingInstruction(child, level + 1);
              break;
            default:
              throw new Error("Unknown XML node type: " + child.constructor.name);
          }
        }
        this.stream.write(space + '</' + node.name + '>');
      }
      return this.stream.write(this.endline(node));
    };

    XMLStreamWriter.prototype.processingInstruction = function(node, level) {
      this.stream.write(this.space(level) + '<?' + node.target);
      if (node.value) {
        this.stream.write(' ' + node.value);
      }
      return this.stream.write(this.spacebeforeslash + '?>' + this.endline(node));
    };

    XMLStreamWriter.prototype.raw = function(node, level) {
      return this.stream.write(this.space(level) + node.value + this.endline(node));
    };

    XMLStreamWriter.prototype.text = function(node, level) {
      return this.stream.write(this.space(level) + node.value + this.endline(node));
    };

    XMLStreamWriter.prototype.dtdAttList = function(node, level) {
      this.stream.write(this.space(level) + '<!ATTLIST ' + node.elementName + ' ' + node.attributeName + ' ' + node.attributeType);
      if (node.defaultValueType !== '#DEFAULT') {
        this.stream.write(' ' + node.defaultValueType);
      }
      if (node.defaultValue) {
        this.stream.write(' "' + node.defaultValue + '"');
      }
      return this.stream.write(this.spacebeforeslash + '>' + this.endline(node));
    };

    XMLStreamWriter.prototype.dtdElement = function(node, level) {
      this.stream.write(this.space(level) + '<!ELEMENT ' + node.name + ' ' + node.value);
      return this.stream.write(this.spacebeforeslash + '>' + this.endline(node));
    };

    XMLStreamWriter.prototype.dtdEntity = function(node, level) {
      this.stream.write(this.space(level) + '<!ENTITY');
      if (node.pe) {
        this.stream.write(' %');
      }
      this.stream.write(' ' + node.name);
      if (node.value) {
        this.stream.write(' "' + node.value + '"');
      } else {
        if (node.pubID && node.sysID) {
          this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
        } else if (node.sysID) {
          this.stream.write(' SYSTEM "' + node.sysID + '"');
        }
        if (node.nData) {
          this.stream.write(' NDATA ' + node.nData);
        }
      }
      return this.stream.write(this.spacebeforeslash + '>' + this.endline(node));
    };

    XMLStreamWriter.prototype.dtdNotation = function(node, level) {
      this.stream.write(this.space(level) + '<!NOTATION ' + node.name);
      if (node.pubID && node.sysID) {
        this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
      } else if (node.pubID) {
        this.stream.write(' PUBLIC "' + node.pubID + '"');
      } else if (node.sysID) {
        this.stream.write(' SYSTEM "' + node.sysID + '"');
      }
      return this.stream.write(this.spacebeforeslash + '>' + this.endline(node));
    };

    XMLStreamWriter.prototype.endline = function(node) {
      if (!node.isLastRootNode) {
        return this.newline;
      } else {
        return '';
      }
    };

    return XMLStreamWriter;

  })(XMLWriterBase);

}).call(this);

},{"./XMLCData":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLCData.js","./XMLComment":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLComment.js","./XMLDTDAttList":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDTDAttList.js","./XMLDTDElement":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDTDElement.js","./XMLDTDEntity":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDTDEntity.js","./XMLDTDNotation":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDTDNotation.js","./XMLDeclaration":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDeclaration.js","./XMLDocType":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDocType.js","./XMLElement":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLElement.js","./XMLProcessingInstruction":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLProcessingInstruction.js","./XMLRaw":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLRaw.js","./XMLText":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLText.js","./XMLWriterBase":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLWriterBase.js"}],"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLStringWriter.js":[function(require,module,exports){
// Generated by CoffeeScript 1.12.6
(function() {
  var XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDeclaration, XMLDocType, XMLElement, XMLProcessingInstruction, XMLRaw, XMLStringWriter, XMLText, XMLWriterBase,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLDeclaration = require('./XMLDeclaration');

  XMLDocType = require('./XMLDocType');

  XMLCData = require('./XMLCData');

  XMLComment = require('./XMLComment');

  XMLElement = require('./XMLElement');

  XMLRaw = require('./XMLRaw');

  XMLText = require('./XMLText');

  XMLProcessingInstruction = require('./XMLProcessingInstruction');

  XMLDTDAttList = require('./XMLDTDAttList');

  XMLDTDElement = require('./XMLDTDElement');

  XMLDTDEntity = require('./XMLDTDEntity');

  XMLDTDNotation = require('./XMLDTDNotation');

  XMLWriterBase = require('./XMLWriterBase');

  module.exports = XMLStringWriter = (function(superClass) {
    extend(XMLStringWriter, superClass);

    function XMLStringWriter(options) {
      XMLStringWriter.__super__.constructor.call(this, options);
    }

    XMLStringWriter.prototype.document = function(doc) {
      var child, i, len, r, ref;
      this.textispresent = false;
      r = '';
      ref = doc.children;
      for (i = 0, len = ref.length; i < len; i++) {
        child = ref[i];
        r += (function() {
          switch (false) {
            case !(child instanceof XMLDeclaration):
              return this.declaration(child);
            case !(child instanceof XMLDocType):
              return this.docType(child);
            case !(child instanceof XMLComment):
              return this.comment(child);
            case !(child instanceof XMLProcessingInstruction):
              return this.processingInstruction(child);
            default:
              return this.element(child, 0);
          }
        }).call(this);
      }
      if (this.pretty && r.slice(-this.newline.length) === this.newline) {
        r = r.slice(0, -this.newline.length);
      }
      return r;
    };

    XMLStringWriter.prototype.attribute = function(att) {
      return ' ' + att.name + '="' + att.value + '"';
    };

    XMLStringWriter.prototype.cdata = function(node, level) {
      return this.space(level) + '<![CDATA[' + node.text + ']]>' + this.newline;
    };

    XMLStringWriter.prototype.comment = function(node, level) {
      return this.space(level) + '<!-- ' + node.text + ' -->' + this.newline;
    };

    XMLStringWriter.prototype.declaration = function(node, level) {
      var r;
      r = this.space(level);
      r += '<?xml version="' + node.version + '"';
      if (node.encoding != null) {
        r += ' encoding="' + node.encoding + '"';
      }
      if (node.standalone != null) {
        r += ' standalone="' + node.standalone + '"';
      }
      r += this.spacebeforeslash + '?>';
      r += this.newline;
      return r;
    };

    XMLStringWriter.prototype.docType = function(node, level) {
      var child, i, len, r, ref;
      level || (level = 0);
      r = this.space(level);
      r += '<!DOCTYPE ' + node.root().name;
      if (node.pubID && node.sysID) {
        r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
      } else if (node.sysID) {
        r += ' SYSTEM "' + node.sysID + '"';
      }
      if (node.children.length > 0) {
        r += ' [';
        r += this.newline;
        ref = node.children;
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          r += (function() {
            switch (false) {
              case !(child instanceof XMLDTDAttList):
                return this.dtdAttList(child, level + 1);
              case !(child instanceof XMLDTDElement):
                return this.dtdElement(child, level + 1);
              case !(child instanceof XMLDTDEntity):
                return this.dtdEntity(child, level + 1);
              case !(child instanceof XMLDTDNotation):
                return this.dtdNotation(child, level + 1);
              case !(child instanceof XMLCData):
                return this.cdata(child, level + 1);
              case !(child instanceof XMLComment):
                return this.comment(child, level + 1);
              case !(child instanceof XMLProcessingInstruction):
                return this.processingInstruction(child, level + 1);
              default:
                throw new Error("Unknown DTD node type: " + child.constructor.name);
            }
          }).call(this);
        }
        r += ']';
      }
      r += this.spacebeforeslash + '>';
      r += this.newline;
      return r;
    };

    XMLStringWriter.prototype.element = function(node, level) {
      var att, child, i, j, len, len1, name, r, ref, ref1, ref2, space, textispresentwasset;
      level || (level = 0);
      textispresentwasset = false;
      if (this.textispresent) {
        this.newline = '';
        this.pretty = false;
      } else {
        this.newline = this.newlinedefault;
        this.pretty = this.prettydefault;
      }
      space = this.space(level);
      r = '';
      r += space + '<' + node.name;
      ref = node.attributes;
      for (name in ref) {
        if (!hasProp.call(ref, name)) continue;
        att = ref[name];
        r += this.attribute(att);
      }
      if (node.children.length === 0 || node.children.every(function(e) {
        return e.value === '';
      })) {
        if (this.allowEmpty) {
          r += '></' + node.name + '>' + this.newline;
        } else {
          r += this.spacebeforeslash + '/>' + this.newline;
        }
      } else if (this.pretty && node.children.length === 1 && (node.children[0].value != null)) {
        r += '>';
        r += node.children[0].value;
        r += '</' + node.name + '>' + this.newline;
      } else {
        if (this.dontprettytextnodes) {
          ref1 = node.children;
          for (i = 0, len = ref1.length; i < len; i++) {
            child = ref1[i];
            if (child.value != null) {
              this.textispresent++;
              textispresentwasset = true;
              break;
            }
          }
        }
        if (this.textispresent) {
          this.newline = '';
          this.pretty = false;
          space = this.space(level);
        }
        r += '>' + this.newline;
        ref2 = node.children;
        for (j = 0, len1 = ref2.length; j < len1; j++) {
          child = ref2[j];
          r += (function() {
            switch (false) {
              case !(child instanceof XMLCData):
                return this.cdata(child, level + 1);
              case !(child instanceof XMLComment):
                return this.comment(child, level + 1);
              case !(child instanceof XMLElement):
                return this.element(child, level + 1);
              case !(child instanceof XMLRaw):
                return this.raw(child, level + 1);
              case !(child instanceof XMLText):
                return this.text(child, level + 1);
              case !(child instanceof XMLProcessingInstruction):
                return this.processingInstruction(child, level + 1);
              default:
                throw new Error("Unknown XML node type: " + child.constructor.name);
            }
          }).call(this);
        }
        if (textispresentwasset) {
          this.textispresent--;
        }
        if (!this.textispresent) {
          this.newline = this.newlinedefault;
          this.pretty = this.prettydefault;
        }
        r += space + '</' + node.name + '>' + this.newline;
      }
      return r;
    };

    XMLStringWriter.prototype.processingInstruction = function(node, level) {
      var r;
      r = this.space(level) + '<?' + node.target;
      if (node.value) {
        r += ' ' + node.value;
      }
      r += this.spacebeforeslash + '?>' + this.newline;
      return r;
    };

    XMLStringWriter.prototype.raw = function(node, level) {
      return this.space(level) + node.value + this.newline;
    };

    XMLStringWriter.prototype.text = function(node, level) {
      return this.space(level) + node.value + this.newline;
    };

    XMLStringWriter.prototype.dtdAttList = function(node, level) {
      var r;
      r = this.space(level) + '<!ATTLIST ' + node.elementName + ' ' + node.attributeName + ' ' + node.attributeType;
      if (node.defaultValueType !== '#DEFAULT') {
        r += ' ' + node.defaultValueType;
      }
      if (node.defaultValue) {
        r += ' "' + node.defaultValue + '"';
      }
      r += this.spacebeforeslash + '>' + this.newline;
      return r;
    };

    XMLStringWriter.prototype.dtdElement = function(node, level) {
      return this.space(level) + '<!ELEMENT ' + node.name + ' ' + node.value + this.spacebeforeslash + '>' + this.newline;
    };

    XMLStringWriter.prototype.dtdEntity = function(node, level) {
      var r;
      r = this.space(level) + '<!ENTITY';
      if (node.pe) {
        r += ' %';
      }
      r += ' ' + node.name;
      if (node.value) {
        r += ' "' + node.value + '"';
      } else {
        if (node.pubID && node.sysID) {
          r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
        } else if (node.sysID) {
          r += ' SYSTEM "' + node.sysID + '"';
        }
        if (node.nData) {
          r += ' NDATA ' + node.nData;
        }
      }
      r += this.spacebeforeslash + '>' + this.newline;
      return r;
    };

    XMLStringWriter.prototype.dtdNotation = function(node, level) {
      var r;
      r = this.space(level) + '<!NOTATION ' + node.name;
      if (node.pubID && node.sysID) {
        r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
      } else if (node.pubID) {
        r += ' PUBLIC "' + node.pubID + '"';
      } else if (node.sysID) {
        r += ' SYSTEM "' + node.sysID + '"';
      }
      r += this.spacebeforeslash + '>' + this.newline;
      return r;
    };

    XMLStringWriter.prototype.openNode = function(node, level) {
      var att, name, r, ref;
      level || (level = 0);
      if (node instanceof XMLElement) {
        r = this.space(level) + '<' + node.name;
        ref = node.attributes;
        for (name in ref) {
          if (!hasProp.call(ref, name)) continue;
          att = ref[name];
          r += this.attribute(att);
        }
        r += (node.children ? '>' : '/>') + this.newline;
        return r;
      } else {
        r = this.space(level) + '<!DOCTYPE ' + node.rootNodeName;
        if (node.pubID && node.sysID) {
          r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
        } else if (node.sysID) {
          r += ' SYSTEM "' + node.sysID + '"';
        }
        r += (node.children ? ' [' : '>') + this.newline;
        return r;
      }
    };

    XMLStringWriter.prototype.closeNode = function(node, level) {
      level || (level = 0);
      switch (false) {
        case !(node instanceof XMLElement):
          return this.space(level) + '</' + node.name + '>' + this.newline;
        case !(node instanceof XMLDocType):
          return this.space(level) + ']>' + this.newline;
      }
    };

    return XMLStringWriter;

  })(XMLWriterBase);

}).call(this);

},{"./XMLCData":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLCData.js","./XMLComment":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLComment.js","./XMLDTDAttList":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDTDAttList.js","./XMLDTDElement":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDTDElement.js","./XMLDTDEntity":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDTDEntity.js","./XMLDTDNotation":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDTDNotation.js","./XMLDeclaration":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDeclaration.js","./XMLDocType":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDocType.js","./XMLElement":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLElement.js","./XMLProcessingInstruction":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLProcessingInstruction.js","./XMLRaw":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLRaw.js","./XMLText":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLText.js","./XMLWriterBase":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLWriterBase.js"}],"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLStringifier.js":[function(require,module,exports){
// Generated by CoffeeScript 1.12.6
(function() {
  var XMLStringifier,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    hasProp = {}.hasOwnProperty;

  module.exports = XMLStringifier = (function() {
    function XMLStringifier(options) {
      this.assertLegalChar = bind(this.assertLegalChar, this);
      var key, ref, value;
      options || (options = {});
      this.noDoubleEncoding = options.noDoubleEncoding;
      ref = options.stringify || {};
      for (key in ref) {
        if (!hasProp.call(ref, key)) continue;
        value = ref[key];
        this[key] = value;
      }
    }

    XMLStringifier.prototype.eleName = function(val) {
      val = '' + val || '';
      return this.assertLegalChar(val);
    };

    XMLStringifier.prototype.eleText = function(val) {
      val = '' + val || '';
      return this.assertLegalChar(this.elEscape(val));
    };

    XMLStringifier.prototype.cdata = function(val) {
      val = '' + val || '';
      val = val.replace(']]>', ']]]]><![CDATA[>');
      return this.assertLegalChar(val);
    };

    XMLStringifier.prototype.comment = function(val) {
      val = '' + val || '';
      if (val.match(/--/)) {
        throw new Error("Comment text cannot contain double-hypen: " + val);
      }
      return this.assertLegalChar(val);
    };

    XMLStringifier.prototype.raw = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.attName = function(val) {
      return val = '' + val || '';
    };

    XMLStringifier.prototype.attValue = function(val) {
      val = '' + val || '';
      return this.attEscape(val);
    };

    XMLStringifier.prototype.insTarget = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.insValue = function(val) {
      val = '' + val || '';
      if (val.match(/\?>/)) {
        throw new Error("Invalid processing instruction value: " + val);
      }
      return val;
    };

    XMLStringifier.prototype.xmlVersion = function(val) {
      val = '' + val || '';
      if (!val.match(/1\.[0-9]+/)) {
        throw new Error("Invalid version number: " + val);
      }
      return val;
    };

    XMLStringifier.prototype.xmlEncoding = function(val) {
      val = '' + val || '';
      if (!val.match(/^[A-Za-z](?:[A-Za-z0-9._-]|-)*$/)) {
        throw new Error("Invalid encoding: " + val);
      }
      return val;
    };

    XMLStringifier.prototype.xmlStandalone = function(val) {
      if (val) {
        return "yes";
      } else {
        return "no";
      }
    };

    XMLStringifier.prototype.dtdPubID = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdSysID = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdElementValue = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdAttType = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdAttDefault = function(val) {
      if (val != null) {
        return '' + val || '';
      } else {
        return val;
      }
    };

    XMLStringifier.prototype.dtdEntityValue = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdNData = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.convertAttKey = '@';

    XMLStringifier.prototype.convertPIKey = '?';

    XMLStringifier.prototype.convertTextKey = '#text';

    XMLStringifier.prototype.convertCDataKey = '#cdata';

    XMLStringifier.prototype.convertCommentKey = '#comment';

    XMLStringifier.prototype.convertRawKey = '#raw';

    XMLStringifier.prototype.assertLegalChar = function(str) {
      var res;
      res = str.match(/[\0\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/);
      if (res) {
        throw new Error("Invalid character in string: " + str + " at index " + res.index);
      }
      return str;
    };

    XMLStringifier.prototype.elEscape = function(str) {
      var ampregex;
      ampregex = this.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
      return str.replace(ampregex, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\r/g, '&#xD;');
    };

    XMLStringifier.prototype.attEscape = function(str) {
      var ampregex;
      ampregex = this.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
      return str.replace(ampregex, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/\t/g, '&#x9;').replace(/\n/g, '&#xA;').replace(/\r/g, '&#xD;');
    };

    return XMLStringifier;

  })();

}).call(this);

},{}],"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLText.js":[function(require,module,exports){
// Generated by CoffeeScript 1.12.6
(function() {
  var XMLNode, XMLText,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = require('./XMLNode');

  module.exports = XMLText = (function(superClass) {
    extend(XMLText, superClass);

    function XMLText(parent, text) {
      XMLText.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing element text");
      }
      this.value = this.stringify.eleText(text);
    }

    XMLText.prototype.clone = function() {
      return Object.create(this);
    };

    XMLText.prototype.toString = function(options) {
      return this.options.writer.set(options).text(this);
    };

    return XMLText;

  })(XMLNode);

}).call(this);

},{"./XMLNode":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLNode.js"}],"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLWriterBase.js":[function(require,module,exports){
// Generated by CoffeeScript 1.12.6
(function() {
  var XMLWriterBase,
    hasProp = {}.hasOwnProperty;

  module.exports = XMLWriterBase = (function() {
    function XMLWriterBase(options) {
      var key, ref, ref1, ref2, ref3, ref4, ref5, ref6, value;
      options || (options = {});
      this.pretty = options.pretty || false;
      this.allowEmpty = (ref = options.allowEmpty) != null ? ref : false;
      if (this.pretty) {
        this.indent = (ref1 = options.indent) != null ? ref1 : '  ';
        this.newline = (ref2 = options.newline) != null ? ref2 : '\n';
        this.offset = (ref3 = options.offset) != null ? ref3 : 0;
        this.dontprettytextnodes = (ref4 = options.dontprettytextnodes) != null ? ref4 : 0;
      } else {
        this.indent = '';
        this.newline = '';
        this.offset = 0;
        this.dontprettytextnodes = 0;
      }
      this.spacebeforeslash = (ref5 = options.spacebeforeslash) != null ? ref5 : '';
      if (this.spacebeforeslash === true) {
        this.spacebeforeslash = ' ';
      }
      this.newlinedefault = this.newline;
      this.prettydefault = this.pretty;
      ref6 = options.writer || {};
      for (key in ref6) {
        if (!hasProp.call(ref6, key)) continue;
        value = ref6[key];
        this[key] = value;
      }
    }

    XMLWriterBase.prototype.set = function(options) {
      var key, ref, value;
      options || (options = {});
      if ("pretty" in options) {
        this.pretty = options.pretty;
      }
      if ("allowEmpty" in options) {
        this.allowEmpty = options.allowEmpty;
      }
      if (this.pretty) {
        this.indent = "indent" in options ? options.indent : '  ';
        this.newline = "newline" in options ? options.newline : '\n';
        this.offset = "offset" in options ? options.offset : 0;
        this.dontprettytextnodes = "dontprettytextnodes" in options ? options.dontprettytextnodes : 0;
      } else {
        this.indent = '';
        this.newline = '';
        this.offset = 0;
        this.dontprettytextnodes = 0;
      }
      this.spacebeforeslash = "spacebeforeslash" in options ? options.spacebeforeslash : '';
      if (this.spacebeforeslash === true) {
        this.spacebeforeslash = ' ';
      }
      this.newlinedefault = this.newline;
      this.prettydefault = this.pretty;
      ref = options.writer || {};
      for (key in ref) {
        if (!hasProp.call(ref, key)) continue;
        value = ref[key];
        this[key] = value;
      }
      return this;
    };

    XMLWriterBase.prototype.space = function(level) {
      var indent;
      if (this.pretty) {
        indent = (level || 0) + this.offset + 1;
        if (indent > 0) {
          return new Array(indent).join(this.indent);
        } else {
          return '';
        }
      } else {
        return '';
      }
    };

    return XMLWriterBase;

  })();

}).call(this);

},{}],"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\index.js":[function(require,module,exports){
// Generated by CoffeeScript 1.12.6
(function() {
  var XMLDocument, XMLDocumentCB, XMLStreamWriter, XMLStringWriter, assign, isFunction, ref;

  ref = require('./Utility'), assign = ref.assign, isFunction = ref.isFunction;

  XMLDocument = require('./XMLDocument');

  XMLDocumentCB = require('./XMLDocumentCB');

  XMLStringWriter = require('./XMLStringWriter');

  XMLStreamWriter = require('./XMLStreamWriter');

  module.exports.create = function(name, xmldec, doctype, options) {
    var doc, root;
    if (name == null) {
      throw new Error("Root element needs a name");
    }
    options = assign({}, xmldec, doctype, options);
    doc = new XMLDocument(options);
    root = doc.element(name);
    if (!options.headless) {
      doc.declaration(options);
      if ((options.pubID != null) || (options.sysID != null)) {
        doc.doctype(options);
      }
    }
    return root;
  };

  module.exports.begin = function(options, onData, onEnd) {
    var ref1;
    if (isFunction(options)) {
      ref1 = [options, onData], onData = ref1[0], onEnd = ref1[1];
      options = {};
    }
    if (onData) {
      return new XMLDocumentCB(options, onData, onEnd);
    } else {
      return new XMLDocument(options);
    }
  };

  module.exports.stringWriter = function(options) {
    return new XMLStringWriter(options);
  };

  module.exports.streamWriter = function(stream, options) {
    return new XMLStreamWriter(stream, options);
  };

}).call(this);

},{"./Utility":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\Utility.js","./XMLDocument":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDocument.js","./XMLDocumentCB":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLDocumentCB.js","./XMLStreamWriter":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLStreamWriter.js","./XMLStringWriter":"C:\\dev\\NEXUS\\node_modules\\xmlbuilder\\lib\\XMLStringWriter.js"}],"C:\\dev\\NEXUS\\packages\\entities\\src\\entity-registry.js":[function(require,module,exports){
function EntityRegistry()
{
    this.allEntities = {};
    this.tracked = {};
    this.trackRef = 0;
}

EntityRegistry.prototype = {
    implements: ['ready', 'registerRenderer', 'unregisterRenderer', 'getRenderers',
        'registerDefaultRenderer', 'unregisterDefaultRenderer', 'getDefaultRenderers',
        'registerEntity', 'getEntities', 'reapEntities', 'rerender',
        'registerRendererEnricher', 'unregisterRendererEnricher', 'getRendererEnrichers'] ,

    register : function() {
        SYMPHONY.services.make('entity-registry', this, this.implements, true);
    },

    ready : function() {
        this.servicesList = SYMPHONY.services.subscribe('services-list');
    },

    trackObject : function(id, object) {
        this.tracked[id] = this.tracked[id] || [];
        this.tracked[id].push(object);
    },

    fillServices : function(category) {
        var list = this.servicesList.get(category);
        var newList = Object.assign({}, list);
        _.each(newList, function(name, key) {
            newList[key] = SYMPHONY.services.subscribe(name);
        }, this);

        return newList;
    },

    fillServicesMaps : function(category) {
        var list = this.servicesList.get(category);
        var newList = Object.assign({}, list);
        _.each(newList, function(list, key) {
            var services = list.map(function(name) {
                return SYMPHONY.services.subscribe(name);
            }, this);
            newList[key] = services;
        }, this);

        return newList;
    },

    registerEntity : function(id, type, serviceName, wrapper) {
        wrapper.type = type;
        wrapper.trackRef = this.trackRef++;
        wrapper.trackId = id;
        wrapper.serviceName = serviceName;

        this.trackObject(id, wrapper);
        this.allEntities[type] = this.allEntities[type] || [];
        this.allEntities[type].push(wrapper);
    },

    rerender : function(type) {
        if (!this.allEntities[type]) {
            return;
        }

        _.each(this.allEntities[type], function(wrapper) {
            var service = SYMPHONY.services.subscribe(wrapper.service);
            if (service) {
                service.invoke('rerender', wrapper);
            }

        }, this);

    },

    reap : function(type, ref) {
        if (!this.allEntities[type]) {
            return;
        }

        var idx = _.findIndex(this.allEntities[type], function(wrapper) {
            return wrapper.trackRef === ref;
        }, this);

        if (idx !== -1) {
            var wrapper = this.allEntities[type][idx];
            var service = SYMPHONY.services.subscribe(wrapper.service);
            if (service) {
                service.invoke('reap', wrapper);
            }
            this.allEntities[type].splice(idx, 1);
        }
    },

    reapEntities : function(id) {
        if (!this.tracked[id]) {
            return;
        }

        _.each(this.tracked[id], function(wrapper) {
            this.reap(wrapper.type, wrapper.trackRef);
        }, this);

        delete this.tracked[id];
    },

    getEntities : function(type) {
        return this.allEntities[type] || [];
    },

    registerRenderer : function(type, serviceName) {
        var entities = this.servicesList.get('renderers') || {};
        entities[type] = serviceName;
        this.servicesList.set('renderers', entities);

        this.rerender(type);
    },

    unregisterRenderer : function(type) {
        var entities = this.servicesList.get('renderers') || {};
        delete entities[type];
        this.servicesList.set('renderers', entities);

        this.rerender(type);
    },

    getRenderers : function() {
        return this.fillServices('renderers');
    },

    registerDefaultRenderer : function(type, serviceName) {
        var defaults = this.servicesList.get('defaultRenderers') || {};
        defaults[type] = serviceName;
        this.servicesList.set('defaultRenderers', defaults);
    },

    unregisterDefaultRenderer : function(type) {
        var defaults = this.servicesList.get('defaultRenderers') || {};
        delete defaults[type];
        this.servicesList.set('defaultRenderers', defaults);
    },

    getDefaultRenderers : function() {
        return this.fillServices('defaultRenderers');
    },

    registerRendererEnricher : function(type, serviceName) {
        var enrichers = this.servicesList.get('renderer-enrichers') || {};
        enrichers[type] = enrichers[type] || [];
        enrichers[type].push(serviceName);
        this.servicesList.set('renderer-enrichers', enrichers);

        this.rerender(type);
    },

    unregisterRendererEnricher : function(type, serviceName) {
        var enrichers = this.servicesList.get('renderer-enrichers') || {};
        enrichers[type] = enrichers[type] || [];
        var idx = enrichers[type].indexOf(serviceName);
        if (idx !== -1) {
            enrichers[type].splice(idx, 1);
        }
        this.servicesList.set('renderer-enrichers', enrichers);

        this.rerender(type);
    },

    getRendererEnrichers : function() {
        return this.fillServicesMaps('renderer-enrichers');
    }

}

var registry = new EntityRegistry();
registry.register();

},{}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\advanced\\index.js":[function(require,module,exports){
require('./services');

},{"./services":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\advanced\\services\\index.js"}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\advanced\\services\\card.js":[function(require,module,exports){
var entityTemplate = require('../templates/card.hbs');

function CardPrimitive() {
    this.template = $(entityTemplate());
    this.entities = {};
}

CardPrimitive.prototype = {
    implements : ['ready', 'add', 'render'],

    register : function() {
        SYMPHONY.services.make('card-primitive', this, this.implements, true);
    },

    ready : function() {
        this.registry = SYMPHONY.services.subscribe('primitive-registry');
        this.renderer = SYMPHONY.services.subscribe('extensionml-renderer');
        this.registry.registerPrimitive('card', 'card-primitive');
        this.registry.registerPrimitive('header', 'card-primitive');
        this.registry.registerPrimitive('body', 'card-primitive');
    },

    hasClass : function(node, className)
    {
        if (!node['$'] || !node['$']['class']) {
            return false;
        }

        var classList = node['$']['class'].split(' ');

        return classList.indexOf(className) !== -1;
    },

    getNonTextNodes : function(node) {
        if (!node['$$']) return [];
        var result = [];
        _.each(node['$$'], function(node) {
            if (node['#name'] !== '__text__') {
                result.push(node);
            }
        }, this);

        return result;
    },


//    (builderId, type, entity, message, preview) {
    renderCard : function(context) {
        var node = context.node;
        var id = context.id
        var data = (context.data) || {};

        var nonTextNodes = this.getNonTextNodes(node);
        var structured = nonTextNodes.length === 2 &&
            (this.hasClass(nonTextNodes[0], 'cardHeader') || nonTextNodes[0]['#name'] === 'header') &&
            (this.hasClass(nonTextNodes[1], 'cardBody') || nonTextNodes[1]['#name'] === 'body');

        var container = this.template.clone(true, true);
        var headerEl;
        var bodyEl;
        var iconSrc = node['$'] && node['$']['data-icon-src'];
        var accentColor = node['$'] && node['$']['data-accent-color'];

        iconSrc = iconSrc || data.icon;
        accent = accentColor || data.accent;

        if (!structured) {
            headerEl = $(context.getHTML('<span>'));
            this.renderer.renderFrom(context.newContext({container: headerEl, node: node, data: data}));
        } else {
            headerEl = $(context.getHTML('<span>'));
            bodyEl = $(context.getHTML('<span>'));
            this.renderer.renderFrom(context.newContext({container: headerEl, node: nonTextNodes[0], data: data}));
            this.renderer.renderFrom(context.newContext({container: bodyEl, node: nonTextNodes[1], data: data}));
        }

        if (iconSrc) {
            container.find('.card-sponsor').attr('src', iconSrc);
            container.addClass('has-sponsor');
        }

        if (accent) {
            container.find('.flair').addClass(accent);
        }

        container.find('.header').append(headerEl);

        if (bodyEl) {
            container.find('.body').append(bodyEl);
            container.find('.card').addClass('collapsed has-body');
            container.click(this.onOpenToggle.bind(this, container));
        } else {
            container.find('.body').removeClass('collapsed');
        }

        context.container.append(container);
    },

    renderOther : function (context) {
        var node = context.node;

        var classes = (node['$'] && node['$']['class']) || '';
        var html = $(context.getHTML('<span>'));
        html.addClass(classes);
        this.renderer.renderFrom(context.newContext({container: html}));
        context.container.append(html);
    },

    render : function(context) {
        var type = context.type;

        if (type === 'card') {
            this.renderCard(context);
        } else {
            this.renderOther(context);
        }
    },

    onOpenToggle : function(container, e) {
        var target = $(e.target);
        var top = container[0];

    // do nothing if there is a selection
        if (window.getSelection().toString() !== '') return;

        e.preventDefault();

    // if our parent is a button or a link, don't toggle
        for (var node = target[0]; node !== top; node = node.parentElement) {
            if (node.tagName.toLowerCase() === 'button' || node.tagName.toLowerCase() === 'a') {
                return;
           }
        }

    // toggle open state
        if (container.find('.card').hasClass('collapsed')) {
            container.find('.card').removeClass('collapsed');
        } else {
            container.find('.card').addClass('collapsed');
        }
    }
};

var entity = new CardPrimitive();
entity.register();


},{"../templates/card.hbs":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\advanced\\templates\\card.hbs"}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\advanced\\services\\index.js":[function(require,module,exports){
require('./card');


},{"./card":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\advanced\\services\\card.js"}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\advanced\\templates\\card.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"card-container\">\r\n	<div class=\"card-sponsor-container\">\r\n		<img class=\"card-sponsor\"/>\r\n	</div>\r\n	<div class=\"card\">\r\n	  <div class=\"flair\"></div>\r\n	  <div class=\"content\">\r\n	    <div class=\"header\">\r\n	    </div>\r\n	    <div class=\"body\">\r\n	    </div>\r\n	  </div>\r\n	</div>\r\n</div>";
  },"useData":true});

},{"hbsfy/runtime":"C:\\dev\\NEXUS\\node_modules\\hbsfy\\runtime.js"}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\defaults\\action.js":[function(require,module,exports){
function Action() {
}

Action.prototype = {
    implements : ['ready', 'render'],

    register : function() {
        SYMPHONY.services.make('action-primitive', this, this.implements, true);
    },

    ready : function() {
        this.registry = SYMPHONY.services.subscribe('primitive-registry');
        this.registry.registerPrimitive('action', 'action-primitive');
        this.colors = SYMPHONY.services.subscribe('render-color');
    },

    render : function(context) {
        var data = context.data[context.id];
        var node = context.node;
        if (!data) {
            return;
        }

        var classes = (node['$'] && node['$']['class']) || '';
        classes = classes.split(' ');
        classes = classes.concat(this.colors.findColorClasses(classes.join(' ')).split(' '));
        classes = classes.join(' ');

        var action = $(context.getHTML('<span class="entity-action ' + classes +'"><img class="action-icon"/><span>' + data.label + '</span></span>'));
        if (data.icon) {
            action.find('.action-icon').attr('src', data.icon);
        } else {
            action.find('.action-icon').css('display', 'none');
        }
        action.click(this.onClick.bind(this, data));
        context.container.append(action);
    },

    onClick : function(data, e) {
        var service = data.service && SYMPHONY.services.subscribe(data.service);

        if (!service) {
            return;
        }

        service.invoke('action', data.data);

        e.stopPropagation();
        e.preventDefault();
    }
};

var primitive = new Action();
primitive.register();

},{}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\defaults\\formatted-text.js":[function(require,module,exports){
var parseString = require('xml2js').parseString;

function FormattedText() {
}

FormattedText.prototype = {
    implements : ['ready', 'render'],

    register : function() {
        SYMPHONY.services.make('formatted-text-primitive', this, this.implements, true);
    },

    ready : function() {
        this.registry = SYMPHONY.services.subscribe('primitive-registry');
        this.renderer = SYMPHONY.services.subscribe('extensionml-renderer');
        this.registry.registerPrimitive('formatted', 'formatted-text-primitive');
    },

    render : function(context) {
        var data = context.data;
        var id = context.data;

        if (data[id]) {
            var xml = data[id];

            xml = '<formatted>' + xml + '</formatted>';

            var options = {
                charsAsChildren: true,
                explicitArray: true,
                explicitCharkey: true,
                explicitChildren: true,
                preserveChildrenOrder: true,
            };

            var parsed;

            parseString(xml, options, function(err, result) {
                parsed = result;
            });

            var node = parsed && parsed.formatted;

            this.renderer.renderFrom(context.newContext({node: node}));
        } else {
            var html = '<span>';
            this.renderer.renderFrom(context.newContext({container: html}));
            context.container.append(html);
        }
    }
};

var primitive = new FormattedText();
primitive.register();

},{"xml2js":"C:\\dev\\NEXUS\\node_modules\\xml2js\\lib\\xml2js.js"}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\defaults\\hashtag.js":[function(require,module,exports){
function HashTag() {
}

HashTag.prototype = {
    implements : ['ready', 'render'],

    register : function() {
        SYMPHONY.services.make('hashtag-primitive', this, this.implements, true);
    },

    ready : function() {
        this.messageRenderer = SYMPHONY.services.subscribe('message-renderer');
        this.registry = SYMPHONY.services.subscribe('primitive-registry');
        this.renderer = SYMPHONY.services.subscribe('extensionml-renderer');
        this.registry.registerPrimitive('hashtag', 'hashtag-primitive');
        this.registry.registerPrimitive('cashtag', 'hashtag-primitive');
        this.registry.registerPrimitive('hashTag', 'hashtag-primitive');
        this.registry.registerPrimitive('cashTag', 'hashtag-primitive');
        this.registry.registerPrimitive('hash', 'hashtag-primitive');
        this.registry.registerPrimitive('cash', 'hashtag-primitive');
    },

    render : function(context) {
        var data = context.data;
        var id = context.id
        var node = context.node;
        var keyword = (data && data[id]) || node['$']['tag'];

        if (!keyword) {
            var html = $(context.getHTML('<span>'));
            this.renderer.renderFrom(context.newContext({container: html}));
            keyword = html.text();
        }

        var entity = {
            id: keyword,
            indexStart: 0,
            indexEnd: 0,
            text: keyword,
            type: 'KEYWORD',
        }

        var html = this.messageRenderer.renderEntity('hashtags', entity);
        context.container.append(html);
    }
};

var primitive = new HashTag();
primitive.register();

},{}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\defaults\\html.js":[function(require,module,exports){
function Html() {
}

Html.prototype = {
    implements : ['ready', 'render'],

    register : function() {
        SYMPHONY.services.make('html-primitive', this, this.implements, true);
    },

    ready : function() {
        var tags = ['p', 'b', 'u', 'i', 'strong', 'br', 'hr', 'ul', 'ol', 'li', 'span', 'pre', 'div', 'tbody', 'thead', 'tfoot', 'th', 'tr', 'td', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        var terminal = ['br', 'hr'];

        this.registry = SYMPHONY.services.subscribe('primitive-registry');
        this.renderer = SYMPHONY.services.subscribe('extensionml-renderer');
        this.colors = SYMPHONY.services.subscribe('render-color');

        _.each(tags, function(tag) {
            this.registry.registerPrimitive(tag, 'html-primitive', terminal[tag] || false);
        }, this);
    },

    render : function(context) {
        var node = context.node;
        var type = context.type;
        var container = context.container;
        var classes = (node['$'] && node['$']['class']) || '';
        var html = $(document.createElement(type));

        classes = classes.split(' ');
        classes = classes.concat(this.colors.findColorClasses(classes.join(' ')).split(' '));
        classes = classes.join(' ');
        html.addClass(classes);

        this.renderer.renderFrom(context.newContext({container: html}));
        container.append(html);
    }
};

var primitive = new Html();
primitive.register();

},{}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\defaults\\iframe.js":[function(require,module,exports){
function IFrame() {
}

IFrame.prototype = {
    implements : ['ready', 'render'],

    register : function() {
        SYMPHONY.services.make('iframe-primitive', this, this.implements, true);
    },

    ready : function() {
        this.registry = SYMPHONY.services.subscribe('primitive-registry');
        this.parser = SYMPHONY.services.subscribe('messageml-parser');
        this.colors = SYMPHONY.services.subscribe('render-color');
        this.registry.registerPrimitive('iframe', 'iframe-primitive');
        this.renderer = SYMPHONY.services.subscribe('extensionml-renderer');
    },

    render : function(context) {
        var id = context.id;
        var node = context.node;
        var data = (context.data && context.data[id]) || {};
        var url = (node['$'] && node['$'].src) ? node['$'].src : data.src;
        var height = (node['$'] && node['$'].height) ? node['$'].height : data.height;

        if (!url) {
            return;
        }

        height = height || "50";
        height = parseInt(height, 10);
        height = height || 50;
        var html = $('<iframe class="embedded-iframe" src="' + url + '" height="' + height + '" width="100%">');
        context.container.append(html);
    }
};

var primitive = new IFrame();
primitive.register();

},{}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\defaults\\images.js":[function(require,module,exports){
function Image() {
}

Image.prototype = {
    implements : ['ready', 'render'],

    register : function() {
        SYMPHONY.services.make('image-primitive', this, this.implements, true);
    },

    ready : function() {
        this.registry = SYMPHONY.services.subscribe('primitive-registry');
        this.renderer = SYMPHONY.services.subscribe('extensionml-renderer');

        this.registry.registerPrimitive('img', 'image-primitive', true);
        this.registry.registerPrimitive('icon', 'image-primitive', true);
        this.registry.registerPrimitive('small-icon', 'image-primitive', true);
    },

    validUrl : function(url) {
        return url && url.indexOf('javascript:') !== 0;
    },

    render : function(context) {
        var node = context.node;
        var data = context.data;
        var id = context.id;
        var type = context.type;

        var classes = (node['$'] && node['$']['class']) || '';
        var data = data && node['$'] && data[node['$'].id] && data[node['$'].id] || {};

        var url = data.src || node['$'] && node['$']['src'];

        var typeClasses = {
            'icon': 'entity-icon',
            'small-icon': 'small-entity-icon'
        };

        if (!this.validUrl(url)) {
            return;
        }

        var html = $('<img>');
        classes = classes.split(' ');
        if (typeClasses[type]) {
            classes.unshift(typeClasses[type]);
        }
        if (data.classes) {
            classes = classes.concat(data.classes.split(' '));
        }
        classes = classes.join(' ');
        html.addClass(classes);

        html.css('max-height', '256px');
        html.attr('src', url);

        context.container.append(html);
    }
};

var primitive = new Image();
primitive.register();

},{}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\defaults\\index.js":[function(require,module,exports){
require('./action.js');
require('./formatted-text.js');
require('./text.js');
require('./mention.js');
require('./hashtag.js');
require('./html.js');
require('./table.js');
require('./links.js');
require('./images.js');
require('./iframe.js');
require('./multiline-input.js');

},{"./action.js":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\defaults\\action.js","./formatted-text.js":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\defaults\\formatted-text.js","./hashtag.js":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\defaults\\hashtag.js","./html.js":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\defaults\\html.js","./iframe.js":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\defaults\\iframe.js","./images.js":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\defaults\\images.js","./links.js":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\defaults\\links.js","./mention.js":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\defaults\\mention.js","./multiline-input.js":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\defaults\\multiline-input.js","./table.js":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\defaults\\table.js","./text.js":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\defaults\\text.js"}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\defaults\\links.js":[function(require,module,exports){
function Links() {
}

Links.prototype = {
    implements : ['ready', 'render'],

    register : function() {
        SYMPHONY.services.make('links-primitive', this, this.implements, true);
    },

    ready : function() {
        this.modules = SYMPHONY.services.subscribe('modules');
        this.registry = SYMPHONY.services.subscribe('primitive-registry');
        this.renderer = SYMPHONY.services.subscribe('extensionml-renderer');
        this.links = SYMPHONY.services.subscribe('links');

        this.registry.registerPrimitive('a', 'links-primitive');
    },

    validUrl : function(url) {
        return url && url.indexOf('javascript:') !== 0;
    },

    render : function(context) {
        var node = context.node;
        var data = context.data;
        var id = context.id;
        var type = context.type;

        var url = (node['$'] && node['$'].id) ? data[node['$'].id] : node['$'] && node['$']['href'];

        if (!this.validUrl(url)) {
            return;
        }

        var html = $('<' + type + '>');
        html.attr('href', url);

        html.click(this.onClick.bind(this, url));

        this.renderer.renderFrom(context.newContext({container: html}));

        context.container.append(html);
    },

    onClick : function(url, e) {
        this.links.open(url);
        e.preventDefault();
    }
};

var primitive = new Links();
primitive.register();

},{}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\defaults\\mention.js":[function(require,module,exports){
function Mention() {
}

Mention.prototype = {
    implements : ['ready', 'render'],

    register : function() {
        SYMPHONY.services.make('mention-primitive', this, this.implements, true);
    },

    ready : function() {
        this.registry = SYMPHONY.services.subscribe('primitive-registry');
        this.renderer = SYMPHONY.services.subscribe('extensionml-renderer');
        this.messageRenderer = SYMPHONY.services.subscribe('message-renderer');
        this.registry.registerPrimitive('mention', 'mention-primitive');
    },

    render : function(context) {
        var data = context.data && context.data[context.id];
        var node = context.node;
        var name;

        if (!data) {
            var html = $(context.getHTML('<span>'));
            this.renderer.renderFrom(context.newContext({container: html, data: data}));
            name = html.text();
            var url = node['$'] && node['$']['href'] || '';
            var parts = url.split('/');

            if (parts.length === 0)  {
                return;
            }

            id = parts[parts.length - 1];
        } else {
            id = data.id;
            name = data.name;
        }

        var entity = {
            id: id,
            indexStart: 0,
            indexEnd: 0,
            prettyName: name,
            screenName: name,
            text: '@' + name,
            type: 'USER_FOLLOW',
            userType: 'lc',
        }

        var html = $(context.getHTML('<span>'));
        html.append(this.messageRenderer.renderEntity('userMentions', entity));
        context.container.append(html);
    }
};

var primitive = new Mention();
primitive.register();

},{}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\defaults\\multiline-input.js":[function(require,module,exports){
var textareaTemplate = require('./templates/multiline-input.hbs');
function MultilineInput() {
    this.template = $(textareaTemplate());
}

MultilineInput.prototype = {
    implements: ['ready', 'render'],

    register: function () {
        SYMPHONY.services.make('multiline-input-primitive', this, this.implements, true);
    },

    ready: function () {
        this.registry = SYMPHONY.services.subscribe('primitive-registry');
        this.renderer = SYMPHONY.services.subscribe('extensionml-renderer');
        this.colors = SYMPHONY.services.subscribe('render-color');
        this.registry.registerPrimitive('multiline-input', 'multiline-input-primitive');
    },


    render: function (context) {
        var node = context.node;
        var container = context.container;
        var data = context.data && context.data[context.id];

        if (!data) {
            return;
        }

        var classes = (node['$'] && node['$']['class']) || '';
        var placeholder = (node['$'] && node['$']['placeholder'] || 'Place your text here...');
        var content = this.template;
        var textareaElem = content.find('textarea').first();
        var text = node['_'] || '';

        classes = classes.split(' ');
        classes = classes.concat(this.colors.findColorClasses(classes.join(' ')).split(' '));
        classes = classes.join(' ');

        textareaElem.addClass(classes);
        textareaElem.attr('placeholder', placeholder);
        textareaElem.on('change keyup', this.onChange.bind(this, data));
        textareaElem.val('');

        if (text) {
            textareaElem.val(text);
            container.append(content);
        } else {
            this.renderer.renderFrom(context.newContext({ container: content }));
            container.append(content);
        }
    },

    onChange: function (data, event) {
        var service = data.service && SYMPHONY.services.subscribe(data.service);

        if (!service) {
            return;
        }

        service.invoke('changed', event.target.value, data);
    }
};

var primitive = new MultilineInput();
primitive.register();

},{"./templates/multiline-input.hbs":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\defaults\\templates\\multiline-input.hbs"}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\defaults\\table.js":[function(require,module,exports){
function Table() {
}

Table.prototype = {
    implements : ['ready', 'render'],

    register : function() {
        SYMPHONY.services.make('table-primitive', this, this.implements, true);
    },

    ready : function() {
        this.registry = SYMPHONY.services.subscribe('primitive-registry');
        this.renderer = SYMPHONY.services.subscribe('extensionml-renderer');
        this.colors = SYMPHONY.services.subscribe('render-color');

        this.registry.registerPrimitive('table', 'table-primitive');
    },

    render : function(context) {
        var node = context.node;
        var container = context.container;

        var classes = (node['$'] && node['$']['class']) || '';
        var outer = $('<div class="table-container">');
        var html = $('<table>');
        classes = classes.split(' ');
        classes = classes.concat(this.colors.findColorClasses(classes.join(' ')).split(' '));
        classes = classes.join(' ');
        html.addClass(classes);
        this.renderer.renderFrom(context.newContext({container: html}));
        outer.append(html);
        container.append(outer);
    }
};

var primitive = new Table();
primitive.register();

},{}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\defaults\\templates\\multiline-input.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<span class=\"textarea--container\">\n    <textarea class=\"textarea--element\"></textarea>\n</span>";
  },"useData":true});

},{"hbsfy/runtime":"C:\\dev\\NEXUS\\node_modules\\hbsfy\\runtime.js"}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\defaults\\text.js":[function(require,module,exports){
function Text() {
}

Text.prototype = {
    implements : ['ready', 'render'],

    register : function() {
        SYMPHONY.services.make('text-primitive', this, this.implements, true);
    },

    ready : function() {
        this.registry = SYMPHONY.services.subscribe('primitive-registry');
        this.renderer = SYMPHONY.services.subscribe('extensionml-renderer');
        this.colors = SYMPHONY.services.subscribe('render-color');
        this.registry.registerPrimitive('text', 'text-primitive');
        this.registry.registerPrimitive('label', 'text-primitive');
    },


    render : function(context) {
        var node = context.node;
        var container = context.container;

        var classes = (node['$'] && node['$']['class']) || '';
        var html = $(context.getHTML('<span>'));
        var text = context.id && data[context.id];

        if (context.type === 'label') {
            html.addClass('label');
        }
        classes = classes.split(' ');
        classes = classes.concat(this.colors.findColorClasses(classes.join(' ')).split(' '));
        classes = classes.join(' ');

        html.addClass(classes);
        if (text) {
            html.text(text);
            container.append(html);
        } else {
            this.renderer.renderFrom(context.newContext({container: html}));
            container.append(html);
        }
    }
};

var primitive = new Text();
primitive.register();

},{}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\entity\\index.js":[function(require,module,exports){
require('./services');

},{"./services":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\entity\\services\\index.js"}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\entity\\services\\default-entity.js":[function(require,module,exports){
function DefaultEntity() {
}

DefaultEntity.prototype = {
    implements : ['ready', 'render'],

    register : function() {
        SYMPHONY.services.make('default-entity', this, this.implements, true);
    },

    ready : function() {
        this.renderer = SYMPHONY.services.subscribe('extensionml-renderer');
        this.registry = SYMPHONY.services.subscribe('entity-registry');
    },

    isBlock : function(element) {
        var elements = element.find('*');
    //!TODO: do a _.find on elements.get();
        return elements.is(function(idx, element) {
            var styles = window.getComputedStyle(element, null);
            var display = styles.getPropertyValue('display');
            return display !== 'inline' &&  display !== 'inline-block' &&  display !== 'none';
        }.bind(this));
    },

    render : function(context) {
        var type = context.type;
        var data = context.data;
        var html = $(context.getHTML('<span>'));
        var renderers = this.registry.getDefaultRenderers();
        var rendered = false;
        var service;

        if (renderers[type]) {
            service = renderers[type];
            rendered = service.render(type, data, {id: context.reference}, context.content);
            if (rendered) {
                html = rendered;
            }
        }

        if (!rendered) {
            this.renderer.renderFrom(context.newContext({container: html}));
        }

/*
        setTimeout(function() {
            var block = this.isBlock(html);
        }.bind(this), 1);
*/

        context.container.append(html);
    }
};

var defaultEntity = new DefaultEntity();
defaultEntity.register();



},{}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\entity\\services\\entity.js":[function(require,module,exports){
function Entity() {
}

Entity.prototype = {
    implements : ['ready', 'render', 'rerender', 'reap'],

    register : function() {
        SYMPHONY.services.make('entity-primitive', this, this.implements, true);
    },

    ready : function() {
        this.entityRegistry = SYMPHONY.services.subscribe('entity-registry');
        this.registry = SYMPHONY.services.subscribe('primitive-registry');
        this.defaultEntity = SYMPHONY.services.subscribe('default-entity');
        this.toXml = SYMPHONY.services.subscribe('to-xml');

        this.registry.registerPrimitive('entity', 'entity-primitive');
    },

    rerender : function(wrapper) {
        var context = wrapper.context;

        context.container.empty();

        this.renderEntity(context);
    },

    enrich : function(context) {
        var type = context.type;
        var selector = context.container;
        var allEnrichers = this.entityRegistry.getRendererEnrichers();
        var enrichers = allEnrichers[type];

        if (!enrichers || !enrichers.length) {
            return;
        }

        var where = selector.find('.enrich');
        if (where.length === 0) {
            selector.append('<span class="enrich">');
            where = selector.find('.enrich');
        }

        _.each(enrichers, function(service) {
            var content = service.enrich(context.type, context.data, context.reference);
            where.append(content);
        }, this);
    },

    renderEntity : function(context) {
        var type = context.type;

        var entityRenderers = this.entityRegistry.getRenderers();

        if (!entityRenderers[type] || !entityRenderers[type].render) {
            var rendered = $(context.getHTML('<span>'));
            this.defaultEntity.render(context.newContext({container: rendered}));
            this.enrich(context.newContext({container: rendered}));
            context.container.append(rendered);
        } else {
            var service = entityRenderers[type];
            var rendered = service.render(context.type, context.data, {id: context.reference}, context.content);
            if (rendered.then)
            {
                var temp = $(context.getHTML('<span>'));
                context.container.append(temp);
                rendered.then(function(rendered)
                {
                    temp.append(rendered);
                    this.enrich(context.newContext({container: temp}));
                }.bind(this))
                .fail(function(e)
                {
                    console.warn('could not render remote entity');
                    console.warn(e);

                    this.defaultEntity.render(messageId, temp, type, data, node, content);
                }.bind(this));
            } else {
                this.enrich(context.newContext({container: rendered}));
                context.container.append(rendered);
            }
        }
    },

    copyNode : function(node)
    {
        try {
            var newNode = JSON.parse(JSON.stringify(node));
            return newNode;
        } catch (e) {
            console.warn('could not copy node', node);
            console.warn(e.stack);
            return node;
        }
    },

    render : function(context) {
        var node = context.node;
        var data = context.data;
        var name = (node['$'] && (node['$'].id || node['$']['data-entity-id'])) || '';
        var data = data[name];
        var type = (node['$'] && node['$'].type) || '';
        var html = $(context.getHTML('<span>'));
        var content = this.toXml.parse(node);

        if (data) {
            type = data.type || type;
        }

        var newContext = context.newContext({container: html, type: type, data: data, node: this.copyNode(node), content: content});
        this.renderEntity(newContext)

        context.container.append(html);

        var wrapper = {
            context: newContext,
            messageType: 'com.symphony.messageml.v2',
            type: type,
            service: 'entity-primitive'
        };

        this.entityRegistry.registerEntity(context.reference, type, 'entity-primitive', wrapper);
    },

    reap: function(wrapper) {
        wrapper.context.container.empty();
    }
};

var primitive = new Entity();
primitive.register();


},{}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\entity\\services\\index.js":[function(require,module,exports){
require('./entity');
require('./default-entity');

},{"./default-entity":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\entity\\services\\default-entity.js","./entity":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\entity\\services\\entity.js"}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\logic\\if.js":[function(require,module,exports){
function If() {
}

If.prototype = {
    implements : ['ready', 'render'],

    register : function() {
        SYMPHONY.services.make('if-primitive', this, this.implements, true);
    },

    ready : function() {
        this.registry = SYMPHONY.services.subscribe('primitive-registry');
        this.renderer = SYMPHONY.services.subscribe('extensionml-renderer');

        this.registry.registerPrimitive('if', 'if-primitive');
        this.registry.registerPrimitive('if:not-last', 'if-primitive');
        this.registry.registerPrimitive('if:last', 'if-primitive');
        this.registry.registerPrimitive('if:fewer', 'if-primitive');
        this.registry.registerPrimitive('if:greater', 'if-primitive');
    },

    getCount : function(data, node) {
        if (!node) {
            return 0;
        }
        var countStr = node['$'] && node['$'].count || '0';
        var count = parseInt(countStr, 10);
        if (!count) {
            count = 0;
        }

        return count;
    },

    render : function(context) {
        var idx = context.idx;
        var length = context.length;
        var type = context.type;
        var data = context.data;

        var last = idx === length - 1;

        switch (type) {
            case 'if':
                if (data[id]) {
                    this.renderer.renderFrom(context);
                }
                break;
            case 'if:not-last':
                if (!last) {
                    this.renderer.renderFrom(context);
                }
                break;
            case 'if:last':
                if (!last) {
                    this.renderer.renderFrom(context);
                }
                break;
            case 'if:fewer':
                var count = this.getCount(data, node);
                if (!data[id] || !Array.isArray(data[id])) {
                    return;
                }

                var length = data[id].length;

                if (length < count) {
                    this.renderer.renderFrom(context);
                }
                break;
            case 'if:greater':
                var count = this.getCount(data, node);
                if (!data[id] || !Array.isArray(data[id])) {
                    return;
                }

                var length = data[id].length;

                if (length > count) {
                    this.renderer.renderFrom(context);
                }
                break;
        }
    }
};

var primitive = new If();
primitive.register();

},{}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\logic\\index.js":[function(require,module,exports){
require('./if.js');
require('./iterate.js');

},{"./if.js":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\logic\\if.js","./iterate.js":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\logic\\iterate.js"}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\logic\\iterate.js":[function(require,module,exports){
function Iterate() {
}

Iterate.prototype = {
    implements : ['ready', 'render'],

    register : function() {
        SYMPHONY.services.make('iterate-primitive', this, this.implements, true);
    },

    ready : function() {
        this.registry = SYMPHONY.services.subscribe('primitive-registry');
        this.renderer = SYMPHONY.services.subscribe('extensionml-renderer');
        this.registry.registerPrimitive('iterate', 'iterate-primitive');
    },

    render : function(context) {
        var type = context.type;
        var data = context.data;

        if (data[id] && Array.isArray(data[id])) {
            var toIterate = data[id];
            var length = toIterate.length;
            var html = $(context.getHTML('<span>'));
            _.each(toIterate, function(data, idx) {
                this.renderer.renderFrom(context.newContext({container: html, data: data, idx: idx, length: length}));
            }, this);

            context.container.append(html);
        } else {
            return;
        }
    }
};

var primitive = new Iterate();
primitive.register();

},{}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\renderers\\emoji.js":[function(require,module,exports){
function EmojiRenderer() {
    this.baseUrl = './img/emoji';
    this.size = 18;
}

EmojiRenderer.prototype = {
    implements : ['ready', 'render', 'configure'],

    register : function() {
        SYMPHONY.services.make('emoji-renderer', this, this.implements, true);
    },

    configure : function(baseUrl, size)
    {
        this.baseUrl = baseUrl || this.baseUrl;
        this.size = size || this.baseSize;;
    },

    ready: function() {
        this.registry = SYMPHONY.services.subscribe('entity-registry');
        this.renderer = SYMPHONY.services.subscribe('message-renderer');
        this.registry.registerDefaultRenderer('com.symphony.emoji', 'emoji-renderer');
    },

    render : function(type, data, message, content) {
        var shortcode = data && data.data && (data.data.shortcode || data.data.annotation);
        if (!shortcode) {
            return false;
        }
        var failNode = $('<span>:')
        failNode.text(':' + shortcode + ':');

        var url = this.baseUrl + '/' + encodeURIComponent(shortcode) + '.png';
//        var imageNode = $('<img class="emoji final-render" title=":' + shortcode + ':" alt="' + shortcode + '" src="' + url + '" height="' +  this.size + '" />"');
        var imageNode = $('<img>');
        imageNode.addClass('emoji final-render');
        imageNode.attr('title', ':' + shortcode + ':')
        imageNode.attr('alt', shortcode);
        imageNode.attr('src', url);
        imageNode.attr('height', this.size);

        imageNode.error(function(e) {
            if (e.stack) {
                console.warn(e.stack);
            }
            imageNode.replaceWith(failNode);
        });

        return imageNode;
    }
};

var renderer = new EmojiRenderer();
renderer.register();

},{}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\renderers\\fin-security.js":[function(require,module,exports){
function FinSecurityRenderer() {
}

FinSecurityRenderer.prototype = {
    implements : ['ready', 'render'],

    register : function() {
        SYMPHONY.services.make('fin-security-renderer', this, this.implements, true);
    },

    ready: function() {
        this.registry = SYMPHONY.services.subscribe('entity-registry');
        this.renderer = SYMPHONY.services.subscribe('message-renderer');
        this.registry.registerDefaultRenderer('org.symphonyoss.fin.security', 'fin-security-renderer');
    },

    render : function(type, data, message, content) {
        var id = data.id.length && data.id[0].value;

        if (!id) return false;
        id = '$' + id;

        if (content != id) return false; // they have a better rendering in mind

        var entity = {
            id: id,
            indexStart: 0,
            indexEnd: 0,
            text: id,
            type: 'KEYWORD',
        }

        return this.renderer.renderEntity('hashtags', entity);
    }
};

var renderer = new FinSecurityRenderer();
renderer.register();

},{}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\renderers\\index.js":[function(require,module,exports){
require('./fin-security');
require('./taxonomy');
require('./mention');
require('./emoji');

},{"./emoji":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\renderers\\emoji.js","./fin-security":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\renderers\\fin-security.js","./mention":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\renderers\\mention.js","./taxonomy":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\renderers\\taxonomy.js"}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\renderers\\mention.js":[function(require,module,exports){
function MentionRenderer() {
}

MentionRenderer.prototype = {
    implements : ['ready', 'render'],

    register : function() {
        SYMPHONY.services.make('mention-renderer', this, this.implements, true);
    },

    ready: function() {
        this.registry = SYMPHONY.services.subscribe('entity-registry');
        this.renderer = SYMPHONY.services.subscribe('message-renderer');
        this.registry.registerDefaultRenderer('com.symphony.user.mention', 'mention-renderer');
    },

    render : function(type, data, message, content) {
        var name = content;
        var id = data.id && data.id.length && data.id[0].value;

        if (!id) return false;
        if (!name) return false;

        if (name.charAt(0) === '@') {
            name = name.slice(1);
        }

        var entity = {
            id: id,
            indexStart: 0,
            indexEnd: 0,
            prettyName: name,
            screenName: name,
            text: '@' + name,
            type: 'USER_FOLLOW',
            userType: 'lc',
        }

        return this.renderer.renderEntity('userMentions', entity);
    }
};

var renderer = new MentionRenderer();
renderer.register();

},{}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\renderers\\taxonomy.js":[function(require,module,exports){
function TaxonomyRenderer() {
}

TaxonomyRenderer.prototype = {
    implements : ['ready', 'render'],

    register : function() {
        SYMPHONY.services.make('taxonomy-renderer', this, this.implements, true);
    },

    ready: function() {
        this.registry = SYMPHONY.services.subscribe('entity-registry');
        this.renderer = SYMPHONY.services.subscribe('message-renderer');
        this.registry.registerDefaultRenderer('org.symphonyoss.taxonomy', 'taxonomy-renderer');
    },

    render : function(type, data, message, content) {
        var id = data.id.length && data.id[0].value;

        if (!id) return false;
        id = '#' + id;

        if (content != id) return false; // they have a better rendering in mind

        var entity = {
            id: id,
            indexStart: 0,
            indexEnd: 0,
            text: id,
            type: 'KEYWORD',
        }

        return this.renderer.renderEntity('hashtags', entity);
    }
};

var renderer = new TaxonomyRenderer();
renderer.register();

},{}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\services\\color.js":[function(require,module,exports){
var COLOR_CLASSES = {
    red                    : 'color-red',
    purple                 : 'color-purple',
    green                  : 'color-green',
    blue                   : 'color-blue',
    orange                 : 'color-orange',
    grey                   : 'color-grey',
    darkBlue               : 'color-darkBlue',
    yellow                 : 'color-yellow',
    darkGreen              : 'color-darkGreen',
    label                  : 'color-grey',
    alert                  : 'color-red',
    warning                : 'color-yellow',
    info                   : 'color-blue',
    action                 : 'color-orange',
    confirmation           : 'color-green',

    redHighlight           : 'background-red',
    purpleHighlight        : 'background-purple',
    greenHighlight         : 'background-green',
    blueHighlight          : 'background-blue',
    orangeHighlight        : 'background-orange',
    greyHighlight          : 'background-grey',
    darkBlueHighlight      : 'background-darkBlue',
    yellowHighlight        : 'background-yellow',
    darkGreenHighlight     : 'background-darkGreen',
    labelHighlight         : 'background-grey',
    alertHighlight         : 'background-red',
    warningHighlight       : 'background-yellow',
    infoHighlight          : 'background-blue',
    actionHighlight        : 'background-orange',
    confirmationHighlight  : 'background-green',
}

function ColorService() {
}

ColorService.prototype = {
    implements: ['findColorClasses'],

    register : function()
    {
        SYMPHONY.services.make('render-color', this, this.implements, true);
    },

    findColorClasses : function(classList) {
        var classes = classList.split(' ');
        var result = [];
        _.each(classes, function(className) {
            if (COLOR_CLASSES[className]) {
                result.push(COLOR_CLASSES[className]);
            }
        }, this);

        return result.join(' ');
    }
};

var service = new ColorService();
service.register();

},{}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\services\\context.js":[function(require,module,exports){
function Context(context) {
    _.extendOwn(this, context)
}

Context.prototype = {
    newContext : function(changes) {
        var context = new Context(this);
        _.extendOwn(context, changes);
        return context;
    },

    getHTML: function(str) {
        var tmp = document.createElement('span');
        tmp.innerHTML = str;
        return tmp.firstChild;
    }
}

module.exports = Context;

},{}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\services\\index.js":[function(require,module,exports){
require('./color.js');
require('./context.js');
require('./registry.js');
require('./renderer.js');
require('./to-xml.js');

},{"./color.js":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\services\\color.js","./context.js":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\services\\context.js","./registry.js":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\services\\registry.js","./renderer.js":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\services\\renderer.js","./to-xml.js":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\services\\to-xml.js"}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\services\\registry.js":[function(require,module,exports){
function PrimitiveRegistry() {
}

PrimitiveRegistry.prototype = {
    implements : ['ready', 'registerPrimitive', 'getPrimitives', 'isTerminal', 'classesToPrimitive'],

    register : function() {
        SYMPHONY.services.make('primitive-registry', this, this.implements, true);
    },

    ready : function() {
        this.primitives = {};
        this.cache = {};
    },

    registerPrimitive : function(name, serviceName, terminal, blacklist) {
        this.primitives[name.toLowerCase()] = {service: SYMPHONY.services.subscribe(serviceName), terminal: terminal || false, blacklist : blacklist || []};
        this.cache = {};
    },

    getPrimitives : function(use) {
        use = use || 'message';

        if (this.cache[use]) {
            return this.cache[use];
        }

        var result = {}
        _.each(this.primitives, function(primitive, key) {
            if (primitive.blacklist.indexOf(use) === -1) {
                result[key] = primitive.service;
            }
        }, this);
        this.cache[use] = result;

        return result;
    },

    isTerminal : function(type) {
        var primitive = this.primitives[type];
        if (!primitive) {
            return true;
        } else {
            return primitive.terminal;
        }
    },

    classesToPrimitive : function(classesStr, use) {
        var primitives = this.getPrimitives(use);
        var classes = classesStr.toLowerCase().split(' ');
        var types = Object.keys(primitives);
        var result = false;

        var result = _.find(classes, function(className) {
            return types.indexOf(className) !== -1;
        }, this);

        return result;
    }
};

var registry = new PrimitiveRegistry();
registry.register();

},{}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\services\\renderer.js":[function(require,module,exports){
var xml2js = require('xml2js');
var parseString = xml2js.parseString;
var Builder = xml2js.Builder;
var Context = require('./context');

function ExtensionMlRenderer() {
}

ExtensionMlRenderer.prototype = {
    implements : ['ready', 'renderFrom', 'render', 'renderEntity', 'renderEnricher', 'parseEntity'],

    register : function() {
        SYMPHONY.services.make('extensionml-renderer', this, this.implements, true);
    },

    ready : function() {
        this.entities = {};
        this.registry = SYMPHONY.services.subscribe('primitive-registry');
    },

    goodNode : function(type) {
        var goodNodes = ['entity', '__text__'];

        if (goodNodes.indexOf(type.toLowerCase()) !== -1) {
            return true;
        }

        return Boolean(this.primitives[type.toLowerCase()]);
    },

    getText: function(str) {
        var tmp = document.createElement('span');
        tmp.textContent = str;
        return tmp;
    },

    renderFrom : function(context) {
        this.primitives = this.registry.getPrimitives(context.use);
        var container = context.container;

        function parseOne(node) {
            if (!node) {
                return;
            }

            var type = node['#name'];

            if (!this.goodNode(type)) {
                return;
            }

            switch(type) {
                case '__text__':
                    container.append($(this.getText(node._)));
                    return;
                default:
                    var id = node['$'] && node['$'].id;
                    var service = this.primitives[type];
                    if (service) {
                        return service.render(context.newContext({type: type, id: id, node : node}));
                    } else {
                        console.warn('unknown tag during render', type);
                        return;
                    }
            }
        }

        function parseMany(nodes) {
            _.each(nodes, function(node) {
                parseOne.call(this, node);
            }, this);
        }

        parseMany.call(this, context.node['$$']);
    },

    getHTML: function(str) {
        var tmp = document.createElement('span');
        tmp.innerHTML = str;
        return tmp.firstChild;
    },

    renderEngine : function(use, reference, template, data, outerNames) {
        var result = $(this.getHTML('<span class="' + outerNames[0] + '">'));
        var node = this.parse(template, outerNames);
        var context = new Context({use: use, reference: reference, node: node, container: result, data: data});

        if (node) {
            this.renderFrom(context);
        }

        return result;
    },

    parse : function(template, outerNames)
    {
        var options = {
            charsAsChildren: true,
            includeWhiteChars: true,
            explicitArray: true,
            explicitCharkey: true,
            explicitChildren: true,
            preserveChildrenOrder: true,
        };

        var parsed;

        parseString(template, options, function(err, result) {
            if (err) {
                console.warn('error parsing presentationML', template);
                console.log(err);
            }
            parsed = result;
        });

        if (!parsed) {
            return result;
        }

        for (var idx = 0; idx < outerNames.length; idx++) {
            var name = outerNames[idx];
            if (parsed && parsed[name]) {
                return parsed[name];
            }
        }
        return;
    },

    renderEntity : function(use, reference, template, data) {
        return this.renderEngine(use, reference, template, data, ['entity', 'messageML']);
    },

    renderEnricher : function(use, reference, template, data) {
        return this.renderEngine(use, reference, template, data, ['enricher', 'messageML']);
    },

    parseEntity : function(template) {
        return this.parseEngine(template, ['entity', 'messageML']);
    },

    render : function(use, reference, template, data, types) {
        types = types || ['presentationML'];
        return this.renderEngine(use, reference, template, data, types);
    }
}

var renderer = new ExtensionMlRenderer();
renderer.register();

},{"./context":"C:\\dev\\NEXUS\\packages\\extensionml\\src\\services\\context.js","xml2js":"C:\\dev\\NEXUS\\node_modules\\xml2js\\lib\\xml2js.js"}],"C:\\dev\\NEXUS\\packages\\extensionml\\src\\services\\to-xml.js":[function(require,module,exports){
var ESC_MAP = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    "=": '&#61;'
};

function escapeHTML(s, forAttribute) {
    return s.replace(forAttribute ? /[&<>'"=]/g : /[&<>=]/g, function(c) {
        return ESC_MAP[c];
    });
}

function Decompiler() {

}

Decompiler.prototype = {
    implements : ['ready', 'parse'],

    register : function() {
        SYMPHONY.services.make('to-xml', this, this.implements, true);
    },

    ready : function() {
        this.registry = SYMPHONY.services.subscribe('primitive-registry');
        this.primitives = this.registry.getPrimitives();
    },

    goodNode : function(type) {
        var goodNodes = ['__text__'];

        if (goodNodes.indexOf(type.toLowerCase()) !== -1) {
            return true;
        }

        return Boolean(this.primitives[type.toLowerCase()]);
    },

    parseOne : function(type, node) {
        var terminal = this.registry.isTerminal(type);
        var attributes = [];

        if (node['$']) {
            _.each(node['$'], function(value, key) {
                attributes.push(key + '="' + value +'"');
            }, this);
        }

        var result = '<' + type + ' ' + attributes.join(' ');

        if (terminal) {
            result += '/>';
        } else {
            result += '>';
            result += this.parse(node);
            result += '</' + type + '>';
        }

        return result;
    },

    parse : function(node) {
        function parseOne(node) {
            if (!node) {
                return '';
            }

            var type = node['#name'];

            if (!this.goodNode(type)) {
                console.warn('unknown tag during decompile', type);
                return '';
            }

            switch(type) {
                case '__text__':
                    return escapeHTML(node._, true);
                default:
                    var primitive = this.primitives[type];
                    if (!primitive) {
                        console.warn('unknown tag during compile', type);
                        return '';
                    }

                    return this.parseOne(type, node);
            }
        }

        function parseMany(nodes) {
            var result = '';
            _.each(nodes, function(node) {
                result += parseOne.call(this, node);
            }, this);

            return result;
        }

        return parseMany.call(this, node['$$']);
    }
};

var decompiler = new Decompiler();
decompiler.register();

},{}],"C:\\dev\\NEXUS\\packages\\messageml-renderer\\src\\services\\compiler.js":[function(require,module,exports){
var parseString = require('xml2js').parseString;

var ESC_MAP = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    "=": '&#61;'
};

function escapeHTML(s, forAttribute) {
    return s.replace(forAttribute ? /[&<>'"=]/g : /[&<>=]/g, function(c) {
        return ESC_MAP[c];
    });
}

function Compiler() {

}

Compiler.prototype = {
    implements : ['ready', 'parse', 'compile'],

    register : function() {
        SYMPHONY.services.make('presentationml-compiler', this, this.implements, true);
    },

    ready : function() {
        this.registry = SYMPHONY.services.subscribe('primitive-registry');
    },

    goodNode : function(type) {
        var goodNodes = ['__text__'];

        if (goodNodes.indexOf(type.toLowerCase()) !== -1) {
            return true;
        }

        return Boolean(this.primitives[type.toLowerCase()]);
    },

    parseOne : function(type, node) {
        var terminal = this.registry.isTerminal(type);
        var attributes = [];

        if (node['$']) {
            _.each(node['$'], function(value, key) {
                value = value.replace(/</g, '&lt;');
                value = value.replace(/>/g, '&gt;');
                value = value.replace(/&/g, '&amp;');
                attributes.push(key + '="' + value +'"');
            }, this);
        }

        var result = '<' + type + ' ' + attributes.join(' ');

        if (terminal) {
            result += '/>';
        } else {
            result += '>';
            result += this.parse(node);
            result += '</' + type + '>';
        }

        return result;
    },

    parse : function(node) {
        function parseOne(node) {
            if (!node) {
                return '';
            }

            var type = node['#name'];

            if (!this.goodNode(type)) {
                console.warn('unknown tag during decompile', type);
                return '';
            }

            switch(type) {
                case '__text__':
                    return escapeHTML(node._, true);
                default:
                    var classes = node['$'] && node['$']['class'];

                    if (classes) {
                        type = this.registry.classesToPrimitive(classes) || type;
                    }

                    var primitive = this.primitives[type];
                    if (!primitive) {
                        console.warn('unknown tag during compile', type);
                        return '';
                    }

                    return this.parseOne(type, node);
            }
        }

        function parseMany(nodes) {
            var result = '';
            _.each(nodes, function(node) {
                result += parseOne.call(this, node);
            }, this);

            return result;
        }

        return parseMany.call(this, node['$$']);
    },

    getHTML: function(str) {
        var tmp = document.createElement('span');
        tmp.innerHTML = str;
        return tmp;
    },

    xmlize : function(str) {
        var e = this.getHTML(str);
        return new XMLSerializer().serializeToString(e.childNodes[0]);
    },

    compile : function(source) {
        var options = {
            charsAsChildren: true,
            includeWhiteChars: true,
            explicitArray: true,
            explicitCharkey: true,
            explicitChildren: true,
            preserveChildrenOrder: true,
        };

        var parsed;

        source = this.xmlize(source);

        parseString(source, options, function(err, result) {
            parsed = result;
        });


        if (!parsed) {
            return '';
        }

        this.primitives = this.registry.getPrimitives();
        var node = parsed && (parsed.presentationml || parsed.div || parsed.span);

        var result = this.parse(node);
        result = '<presentationML>' + result + '</presentationML>';
        result = result.replace(/presentationml/g, 'presentationML');
        return result;
    }
}

var compiler = new Compiler();
compiler.register();

},{"xml2js":"C:\\dev\\NEXUS\\node_modules\\xml2js\\lib\\xml2js.js"}],"C:\\dev\\NEXUS\\packages\\messageml-renderer\\src\\services\\index.js":[function(require,module,exports){
require('./compiler.js');
require('./renderer.js');

},{"./compiler.js":"C:\\dev\\NEXUS\\packages\\messageml-renderer\\src\\services\\compiler.js","./renderer.js":"C:\\dev\\NEXUS\\packages\\messageml-renderer\\src\\services\\renderer.js"}],"C:\\dev\\NEXUS\\packages\\messageml-renderer\\src\\services\\renderer.js":[function(require,module,exports){
var parseString = require('xml2js').parseString;

function MessageMlRenderer() {
}

MessageMlRenderer.prototype = {
    implements : ['ready', 'render', 'rerender'],

    register : function() {
        SYMPHONY.services.make('messageml-renderer', this, this.implements, true);
    },

    ready : function() {
        this.primitives = {};
        this.entities = {};
        this.renderer = SYMPHONY.services.subscribe('extensionml-renderer');
        this.renderingRegistry = SYMPHONY.services.subscribe('rendering-registry');
        this.compiler = SYMPHONY.services.subscribe('presentationml-compiler');

        this.renderingRegistry.registerMessageRenderer('com.symphony.messageml', 'messageml-renderer');
        this.renderingRegistry.registerMessageRenderer('com.symphony.messageml.v2', 'messageml-renderer');
    },

    render : function(message) {
        var presentationML = message.presentationML || '';
        var entityJSON = message.entityJSON;

    // sometimes the presentationML string is JSON encoded.
        if (presentationML.length > 0 && presentationML.charAt(0) === '"') {
            presentationML = JSON.parse(presentationML);
        }

        if (typeof entityJSON === 'string') {
            entityJSON = JSON.parse(entityJSON);
        }

        if (typeof entityJSON === 'string' && entityJSON.length > 0 && entityJSON.charAt(0) === '"') {
            entityJSON = JSON.parse(entityJSON);
        }

        presentationML = this.compiler.compile(presentationML);

        return this.renderer.render('message', message.id, presentationML, entityJSON);
    }
}

var renderer = new MessageMlRenderer();
renderer.register();






},{"xml2js":"C:\\dev\\NEXUS\\node_modules\\xml2js\\lib\\xml2js.js"}],"C:\\dev\\NEXUS\\packages\\renderer\\src\\renderers\\emojis.js":[function(require,module,exports){
function EmojiRenderer() {
    this.baseUrl = './img/emoji';
    this.size = 18;
}

EmojiRenderer.prototype = {
    implements : ['ready', 'render', 'editable'],

    register : function() {
        SYMPHONY.services.make('emoji-renderer-markdown', this, this.implements, true);
    },

    ready: function() {
        this.renderService = SYMPHONY.services.subscribe('message-renderer');
        this.renderService.registerEntity('com.symphony.emoji.markdown', 'emoji-renderer-markdown');
    },

    render : function(name, data, message) {
        var type = data.data.type || 'smiley';
        var url = this.baseUrl + '/' + encodeURIComponent(type) + '.png';
        var imageNode = $('<img class="emoji final-render" title=":' + type + ':" alt="' + type + '" src="' + url + '" height="' +  this.size + '" />"');
        var defaultText = message.text.slice(data.indexStart, data.indexEnd);
        defaultText = defaultText.replace(/\\_/g, '_');
        defaultText = defaultText.replace(/\\-/g, '-');
        var failNode = $('<span>' + defaultText + '</span>');

        imageNode.error(function(e) {
            if (e.stack) {
                console.warn(e.stack);
            }
            imageNode.replaceWith(failNode);
        });

        return imageNode;
    },

    editable : function(name, data, message)
    {
        var type = data.data.type || 'smiley';
        return $('<span>:' + type + ':</span>');
    }
};

var renderer = new EmojiRenderer();
renderer.register();

},{}],"C:\\dev\\NEXUS\\packages\\renderer\\src\\services\\linkParser.js":[function(require,module,exports){
var s = require('underscore.string');

var URL_PROTOCOLS = 'mms|ftp|http|https';
var URL_PATTERN = new RegExp('(?:^|\\s)(?:(?:((?:' + URL_PROTOCOLS + '):\/\/)(.+))|(www[.][^.]+[.][^.]{1,7}))', 'i');
var URL_CHARACTER_LIMIT = 30;

function LinkParser() {
    SYMPHONY.services.make('link-parser', this, this.implements, true);
}

LinkParser.prototype = {
    implements: [ 'parse' ],

/**
 * Call this function to extract all the data necessary to populate the dom for a media entity
 *
 * @param {Object} link the url to be parsed
 * @returns {Object} data
 * @returns {String} data.url the full url for the link
 * @returns {String} data.ellipsis either an empty string, or the string '...' if the url was truncated
 * @returns {String} data.prefix the first part of the url that does nto need to be displayed because it can be assumed
 * @returns {String} data.text the truncated visible part of the link
 * @returns {String} data.suffix the text that was truncated
 */
    parse: function(link) {
        var match = URL_PATTERN.exec(link);
        var spec = {
            url: link,
            ellipsis: '',
            suffix: ''
        };

        if (match) {
            spec.prefix = match[ 1 ];
            // the full link without 'http(s)://'
            var url = match[ 2 ] || match[ 3 ];

            var chopIndex = url.indexOf('/', url.indexOf('/') + 1);

            if (chopIndex >= 0 || url.length > URL_CHARACTER_LIMIT) {
            // remove anything beyond the second '/', subject to the link character limit
                if (chopIndex > URL_CHARACTER_LIMIT || url.length > URL_CHARACTER_LIMIT) {
                    chopIndex = URL_CHARACTER_LIMIT;
                }

                spec.ellipsis = '...';
                spec.suffix = url.substring(chopIndex);
                spec.text = url.substring(0, chopIndex);
            } else {
                spec.text = url;
            }
        }

        spec.prefix = spec.prefix || 'https://';

        if (!match) {
            spec.url = 'https://' + spec.url;
        }

        return spec;
    }
};

new LinkParser();

},{"underscore.string":"C:\\dev\\NEXUS\\node_modules\\underscore.string\\index.js"}],"C:\\dev\\NEXUS\\packages\\renderer\\src\\services\\markdown-renderer.js":[function(require,module,exports){
var Marked = require('../vendor/marked');

function MarkdownRenderer() {
    this.adapters = {};
}


MarkdownRenderer.prototype = {
    implements : ['ready', 'rerender', 'reap', 'renderEntity', 'render', 'registerAdapter', 'editable', 'messageML'],

    register : function()
    {
        SYMPHONY.services.make('markdown-renderer', this, this.implements, true);
    },

    ready : function() {
        this.entityRegistry = SYMPHONY.services.subscribe('entity-registry');
        this.renderingRegistry = SYMPHONY.services.subscribe('rendering-registry');

        this.renderingRegistry.registerMessageRenderer('', 'markdown-renderer');
        this.renderingRegistry.registerMessageRenderer('com.symphony.markdown', 'markdown-renderer');
    },

    enrich : function(message)
    {
        try {
        // The original message may still be in use, let's make a copy before modifying it
            var enrichers = this.renderingRegistry.getEnrichers();
            message = JSON.parse(JSON.stringify(message));

        // give the enrichers an opportunity to update the message
            _.each(enrichers, function(service) {
                try {
                    service.invoke('enrich', message);
                } catch (e) {
                    console.warn(e.stack);
                }
            }, this);

            return message;
        } catch (e) {
            console.warn(e);
            return message;
        }
    },

    rerender : function(wrapper) {
        var entityRenderers = this.entityRegistry.getRenderers();
        var type = wrapper.entityType;
        var entities = this.renderingRegistry.getEntities();
        var service = entities[type];

        var defaultNode = $('<span>' + wrapper.entity.defaultText + '</span>');
        var entityNode;

        if (service) {
            try {
                entityNode = service.invoke('render', type, wrapper.entity.entity, wrapper.message);

                if (entityNode.then) {
                    var wait = entityNode;
                    entityNode = $('<span>');
                    wait.then(function(rendered)
                    {
                        entityNode.append(rendered);
                    }.bind(this))
                    .fail(function(e)
                    {
                        console.warn('could not render remote entity');
                        console.warn(e);
                    }.bind(this));
                } else {
                    if (!entityNode.jquery) {
                        entityNode = $(entityNode);
                    }
                }
            } catch (e) {
                entityNode = defaultNode;
                console.log('error rendering entity', wrapper.entity);
                console.log(e.stack);
            }
        }

        entityNode = entityNode || defaultNode;
        wrapper.selector.replaceWith(entityNode);
        wrapper.selector = entityNode;
    },

    reap : function(wrapper) {
        wrapper.selector.empty();
    },

    renderEntity : function(type, entity, preview) {
        var renderers = this.entityRegistry.getRenderers()

        var service = renderers[type];

        if (!service) {
            return;
        }

        return service.invoke('render', type, entity, {}, preview);
    },

    getMessageType : function(message) {
        return 'markdown';
    },

    parseHTML: function(str) {
        var tmp = document.implementation.createHTMLDocument('');
        tmp.body.innerHTML = str;
        return tmp.body.children;
    },

    render: function(message) {
        message = this.enrich(message);

        var entityRenderers = this.entityRegistry.getRenderers();
        var text = message.text || '';
        var type = this.getMessageType(message);
        var adapter = this.adapters[type];

        if (!adapter) {
            return $('<span>' + text + '</span>');
        }

        var parsed = adapter.invoke('parse', message) || {text: '', entities: {}};
        var entities = parsed.entities || {};

    // the parsed text is HTML with empty spans where each entity is to appear
    // the parsed entities is an object indexed by a unique id assiged to each entity,
    // containing the type and data for that entity

   // use native methods, jquery is slow!
        var textNode = $(this.parseHTML(parsed.text));

        _.each(entities, function(entity, id) {
            entity = entity
            var service = entityRenderers[entity.type];
            var entityNode;
            var defaultNode = $('<span>' + entity.defaultText + '</span>');

            if (service) {
                try {
                    entityNode = service.invoke('render', entity.type, entity.entity, message);

                    if (entityNode.then) {
                        var wait = entityNode;
                        entityNode = $('<span>');
                        wait.then(function(rendered)
                        {
                            entityNode.append(rendered);
                        }.bind(this))
                        .fail(function(e)
                        {
                            console.warn('could not render remote entity');
                            console.warn(e);
                        }.bind(this));
                    } else {
                        if (!entityNode.jquery) {
                            entityNode = $(entityNode);
                        }
                    }
                } catch (e) {
                    entityNode = defaultNode;
                    console.log('error rendering entity', entity);
                    console.log(e.stack);
                }
            }

            entityNode = entityNode || defaultNode;
            if (!entityNode.hasClass('final-render')) {
                var wrapper = {
                    messageType: 'com.symphony.markdown',
                    entityType: entity.type,
                    selector : entityNode,
                    entity : entity,
                    message: message
                };
                this.entityRegistry.registerEntity(message.id, entity.type, 'markdown-renderer', wrapper);
            }

            var replace = textNode.find('#' + id);
            replace.attr('id', '');
            replace.replaceWith(entityNode)
        }, this);

        return textNode;
    },

// This function is nearly identical to the parse function. Do something about that.
    editable : function(message) {
        var text = message.text || '';
        var type = this.getMessageType(message);
        var renderers = this.entityRegistry.getRenderers();

        var adapter = this.adapters[type];

        if (!adapter) {
            return $('<span>' + text + '</span>');
        }

        var parsed = adapter.invoke('parse', message) || {text: '', entities: {}};
        var entities = parsed.entities || {};

    // the parsed text is HTML with empty spans where each entity is to appear
    // the parsed entities is an object indexed by a unique id assiged to each entity,
    // containing the type and data for that entity

        var textNode = $(parsed.text);

        _.each(entities, function(entity, id) {
            entity = entity
            var service = renderers[entity.type];
            var entityNode;
            var defaultNode = $('<span>' + entity.defaultText + '</span>');

            if (service) {
                try {
                    entityNode = service.invoke('editable', entity.type, entity.entity, message);
                } catch (e) {
                    entityNode = defaultNode;
                    console.log('error rendering entity', entity);
                    console.log(e.stack);
                }
            }

            entityNode = entityNode || defaultNode;

            var replace = textNode.find('#' + id);
            replace.attr('id', '');
            replace.replaceWith(entityNode)
        }, this);

        var html = $('<div>').append(textNode).html();
        html = html.replace(/\<em\>/g, '<i>');
        html = html.replace(/\<\/em\>/g, '</i>');
        html = html.replace(/\<strong\>/g, '<b>');
        html = html.replace(/\<\/strong\>/g, '</b>');

        return html
    },

    messageML : function(message) {
        var text = message.text || '';
        var type = this.getMessageType(message);
        var renderers = this.entityRegistry.getRenderers();
        var adapter = this.adapters[type];
        var entityJSON = {};

        if (!adapter) {
            return $('<span>' + text + '</span>');
        }

        var parsed = adapter.invoke('parse', message) || {text: '', entities: {}};
        var entities = parsed.entities || {};

    // the parsed text is HTML with empty spans where each entity is to appear
    // the parsed entities is an object indexed by a unique id assiged to each entity,
    // containing the type and data for that entity

        var textNode = $(parsed.text);

        _.each(entities, function(entity, id) {
        // for now we will special case each entity based on type, this can be made to be a plugin
            var entityNode;

            entity = entity.entity;

            switch (entity.type) {
                case 'URL':
                    entityNode = $('<a href="' + entity.expandedUrl + '">' + entity.expandedUrl + '</a>');
                    break;
                case 'USER_FOLLOW':
                    entityNode = $('<span class="entity" id="' + id +'">' + entity.text + '</span>');
                    entityJSON[id] = {
                        id: [{
                            type: 'com.symphony.user.userId',
                            value: entity.id
                        }],
                        type: 'com.symphony.user.mention',
                        version: '1.0'
                    };
                    break;
                case 'KEYWORD':
                    entityNode = $('<span class="entity" id="' + id +'">' + entity.text + '</span>');
                    if (entity.id[0] === '$') {
                        entityJSON[id] = {
                            id: [{
                                type: 'org.symphonyoss.fin.security.id.ticker',
                                value: entity.text.slice(1)
                            }],
                            type: 'org.symphonyoss.fin.security',
                            version: '1.0'
                        }
                    } else {
                        entityJSON[id] = {
                            id: [{
                                type: 'org.symphonyoss.taxonomy.hashtag',
                                value: entity.text.slice(1)
                            }],
                            type: 'org.symphonyoss.taxonomy',
                            version: '1.0'
                        }
                    }
                    break;
                default:
                    var defaultNode = $('<span>' + entity.defaultText + '</span>');
                    break;
            }

            var defaultNode = $('<span>' + entity.defaultText + '</span>');
            var replace = textNode.find('#' + id);
            entityNode = entityNode || defaultNode;

            var replace = textNode.find('#' + id);
            replace.replaceWith(entityNode)
        }, this);

        var html = $('<div>').append(textNode).html();
        html = html.replace(/\<em\>/g, '<i>');
        html = html.replace(/\<\/em\>/g, '</i>');
        html = html.replace(/\<strong\>/g, '<b>');
        html = html.replace(/\<\/strong\>/g, '</b>');

        return {
            presentationML : '<div data-format="PresentationML" data-version="2.0">' + html + '</div>',
            entityJSON: entityJSON,
            format: 'com.symphony.messageml.v2'
        }
    },

    registerAdapter : function(type, serviceName) {
        this.adapters[type] = SYMPHONY.services.subscribe(serviceName);
    }

};

var renderer = new MarkdownRenderer();
renderer.register();

},{"../vendor/marked":"C:\\dev\\NEXUS\\packages\\renderer\\src\\vendor\\marked.js"}],"C:\\dev\\NEXUS\\packages\\renderer\\src\\services\\markdown.js":[function(require,module,exports){
var Marked = require('../vendor/marked');

function spliceString(str, idx, rem, s) {
    return (str.slice(0, idx) + s + str.slice(idx + Math.abs(rem)));
}

function MarkdownAdapter() {
    this.entityIdx = 0;
}

MarkdownAdapter.prototype = {
    implements : ['start', 'parse'],

    register : function() {
        SYMPHONY.services.make('markdown-adapter', this, this.implements, true);
    },

    start : function() {
        this.renderer = SYMPHONY.services.subscribe('message-renderer');
        this.markdownRenderer = SYMPHONY.services.subscribe('markdown-renderer');
        this.markdownRenderer.registerAdapter('markdown', 'markdown-adapter');
    },

    getOneEmojiSet : function(text, regex, overrideMatch) {
        var matches = [];

        var match = regex.exec(text);
        while(match) {
            var type = overrideMatch || match[1];
            type = type.slice(1, -1);
            type = type.replace(/\\_/g, '_');

            matches.push({data: {type: type}, indexStart: match.index, indexEnd: match.index + match[1].length});
            match = regex.exec(text);
        }

        return matches;
    },

    fillStr : function(text, start, stop, char) {
        var fill = '';
        var count = stop - start + 1;

        for (var idx = 0; idx < count; idx++) {
            fill += char;
        }

        return spliceString(text, start, count, fill);
    },

    convertEmojis : function(text) {
    // special markdown charcters have been escaped, these emoji regex have to take that into account
        var special = {
            '(o:\\))': ':innocent:',
            '(:D)\\b': ':laughing:',
            '(:\\))': ':smiley:',
            '(:P)\\b': ':stuck_out_tongue:',
            '(:\\(\\()': ':cry:',
            '(:\\()': ':anguished:',
            '(:\\|)': ':expressionless:',
            '(x\\()': ':rage:',
            '(:">)': ':blush:',
            '(~:>)': ':chicken:',
            '(:\\\\-S)\\b': ':confused:',
            '(#\\\\-o)\\b': ':facepalm:',
            '(:o)\\b': ':open_mouth:',
            '(:x)\\b': ':kissing_heart:',
            '(:@\\))': ':pig:',
            '(\\|\\\\-\\))': ':sleeping:',
            '(\\\\\\*\\\\\\*==)': ':us:',
            '(;\\))': ':wink:',
            '(B\\\\-\\))': ':sunglasses:',
        };
        var pattern = '(\\:[a-z0-9_\\-\\+\\\\]+\\:)';
        var matches = [];
        var text = text;

        _.each(special, function(type, search) {
            var theseMatches = this.getOneEmojiSet(text, new RegExp(search, 'gi'), type);
            _.each(theseMatches, function(match) {
                text = this.fillStr(text, match.indexStart, match.indexEnd, ' ');
            }, this);
            matches = matches.concat(theseMatches);
        }, this);

        matches = matches.concat(this.getOneEmojiSet(text, new RegExp(pattern, 'gi')));
        _.each(matches, function(match) {
            text = this.fillStr(text, match.indexStart, match.indexEnd, ' ');
        }, this);

        return matches;
    },

    parse : function(message) {
        var replacements = [];
        var entities = message.entities || {};
        var text = message.text || '';

    // convert emoji text into emoji entities
        entities['com.symphony.emoji.markdown'] = this.convertEmojis(text);

    // get replacement data for each entity
        _.each(entities, function(entityList, entityType) {
            _.each(entityList, function(entity) {
                var start = entity.indexStart || 0;
                var stop = entity.indexEnd || 0;
                var clean = $('<span>').text(text.slice(start, stop)).html();
                var defaultText = clean;

                replacements.push({type: entityType, entity: entity, start: start, stop: stop, id: '-ENTITY-' + this.entityIdx, text: defaultText});
                this.entityIdx++;
            }, this);
        }, this);

    // sort the array in ascending order so that we can filter out overlapping entities
        replacements.sort(function(a, b) {
            return a.start - b.start;
        });

    // find overlapping replacements, keep outer most
        var recentStart = -1;
        var recentStop = -1;

        var replacements = replacements.filter(function(replacement) {
            if (replacement.stop < recentStop) return false;
            recentStart = replacement.start;
            recentStop = replacement.stop;

            return true;
        }, this);

    // sort the array in descending order so that start positions are not changed
        replacements.sort(function(a, b) {
            return b.start - a.start;
        });

    // We have to turn the text from markdown into html. In order to do that, we need to mark
    // the text with tokens that represent each entity, because when done, the start and stop
    // indices will no longer be valid
        _.each(replacements, function(replacement) {
            text = spliceString(text, replacement.start, replacement.stop - replacement.start, replacement.id);
        }, this);

        text = text || '';
        text = $('<div>').text(text).html();

        text = Marked(text);

        entities = {};

    // The markup still contains the entity id as text, replace every one of these with an empty span
    // with the id of the entity. We need to do it this way, because we don't just insert html text
    // for each entity, we insert the constructed selector
        _.each(replacements, function(replacement) {
            entities[replacement.id] = {type: replacement.type, entity: replacement.entity, defaultText: Marked(replacement.text)}
            text = text.replace(replacement.id, '<span id="' + replacement.id + '"></span>');
        }, this);

        return {
            text: text,
            entities: entities
        }
    },

    editable : function(message) {
        var replacements = [];
        var entities = message.entities || {};
        var text = message.text || '';

    // get replacement data for each entity
        _.each(entities, function(entityList, entityType) {
            _.each(entityList, function(entity) {
                var start = entity.indexStart || 0;
                var stop = entity.indexEnd || 0;
                var defaultText = $(Marked(text.slice(start, stop))).html();

                replacements.push({type: entityType, entity: entity, start: start, stop: stop, id: '-ENTITY-' + this.entityIdx, text: defaultText});
                this.entityIdx++;
            }, this);
        }, this);

    // sort the array in descending order so that start positions are not changed
        replacements.sort(function(a, b) {
            return b.start - a.start;
        });

    // We have to turn the text from markdown into html. In order to do that, we need to mark
    // the text with tokens that represent each entity, because when done, the start and stop
    // indices will no longer be valid
        _.each(replacements, function(replacement) {
            text = spliceString(text, replacement.start, replacement.stop - replacement.start+ 1, replacement.id);
        }, this);

        text = text || '';
        text = $('<div>').text(text).html();

        text = Marked(text);

        entities = {};

    // The markup still contains the entity id as text, replace every one of these with an empty span
    // with the id of the entity. We need to do it this way, because we don't just insert html text
    // for each entity, we insert the constructed selector
        _.each(replacements, function(replacement) {
            entities[replacement.id] = {type: replacement.type, entity: replacement.entity, defaultText: replacement.text}
            text = text.replace(replacement.id, '<span id="' + replacement.id + '"></span>');
        }, this);

        return {
            text: text,
            entities: entities
        }
    }
}

var adapter = new MarkdownAdapter();
adapter.register();

},{"../vendor/marked":"C:\\dev\\NEXUS\\packages\\renderer\\src\\vendor\\marked.js"}],"C:\\dev\\NEXUS\\packages\\renderer\\src\\services\\message-renderer.js":[function(require,module,exports){
function MessageRenderer() {
    this.renderers = {};
    this.messages = {};
}

MessageRenderer.prototype = {
    implements: ['ready', 'editable', 'render', 'renderAsText', 'unrender', 'rerender', 'renderEntity', 'registerEntity',
        'unregisterEntity', 'registerEnricher', 'unregisterEnricher', 'registerTransform',
        'registerMessageRenderer'
    ],

    register : function() {
        SYMPHONY.services.make('message-renderer', this, this.implements, true);
    },

    ready: function() {
        this.renderingRegistry = SYMPHONY.services.subscribe('rendering-registry');
        this.entityRegistry = SYMPHONY.services.subscribe('entity-registry');
    },

    editable : function(message) {
        var renderers = this.renderingRegistry.getMessageRenderers();
        var renderingService = renderers['com.symphony.markdown'];
        return renderingService.editable(message);
    },

    render: function(message) {
        try {
            var messageType = message.format || '';
        /* HACK */
            if (message.presentationML) {
                messageType = 'com.symphony.messageml.v2';
            }
    /* /HACK */
            var renderers = this.renderingRegistry.getMessageRenderers();
            var renderingService = renderers[messageType];

            if (!renderingService) {
                console.warn('no rendering engine found for type ' +  messageType);
                return;
            }

            var result = renderingService.render(message);
//            this.messages[message.id] = result;
            return result;

        } catch (e) {
            console.warn('could not render message', message);
            console.warn(e.stack);

            var result = $('<span>Error rendering message</span>');
//            this.messages[message.id] = result;
            return result;
        }
    },

    unrender : function(messageId) {
/*
        if (this.messages[messageId] && this.messages[messageId].empty) {
            this.messages[messageId].empty();
            delete this.messages[messageId];
        }
*/
        this.entityRegistry.reapEntities(messageId);
    },

    renderAsText : function(message) {
        var markdown = message.text || '';

        markdown = markdown.replace(/\*\*\b/gim, '');
        markdown = markdown.replace(/\b\*\*/gim, '');
        markdown = markdown.replace(/\b_/gim, '');
        markdown = markdown.replace(/_\b/gim, '');
        markdown = markdown.replace(/ +/gim, ' ');
        markdown = markdown.replace(/^ /gim, '');
        markdown = markdown.replace(/ $/gim, '');
        markdown = markdown.replace(/\n+/gim, '\n');

        return markdown;
    },

    renderEntity : function(type, entity, preview) {
    // for now assume markdown, since this is used for article share
        var renderers = this.renderingRegistry.getMessageRenderers();
        var renderingService = renderers['com.symphony.markdown'];

        try {
            return renderingService.renderEntity(type, entity, preview);
        } catch (e) {
            console.warn(e);
            return $('<span></span>');
        }
    },

    rerender : function(type) {
        this.entityRegistry.rerender(type);
    },

/* DEPRECATE THESE METHODS, USE RENDERING-REGISTRY INSTEAD */
    registerEntity : function(name, serviceName) {
        this.entityRegistry.registerRenderer(name, serviceName);
    },

    unregisterEntity : function(name) {
        this.entityRegistry.unregisterRenderer(name);
    },

    registerEnricher : function(serviceName) {
        this.renderingRegistry.registerEnricher(serviceName);
    },

    unregisterEnricher : function(name) {
        this.renderingRegistry.unregisterEnricher(serviceName);
    },

    registerTransform : function(serviceName) {
        this.renderingRegistry.registerTransform(serviceName);
    }
};

var renderer = new MessageRenderer();
renderer.register();

},{}],"C:\\dev\\NEXUS\\packages\\renderer\\src\\services\\rendering-registry.js":[function(require,module,exports){
function RenderingRegistry()
{
    this.entities = {};
    this.defaults = {};
    this.enrichers = {};
    this.transforms = [];
    this.messageRenderers = {};
}

RenderingRegistry.prototype = {
    implements: ['ready', 'registerEnricher', 'unregisterEnricher',
        'registerTransform', 'registerMessageRenderer',
        'getEntities', 'getDefaultRenderers', 'getEnrichers', 'getTransforms',
        'getMessageRenderers'
    ],

    register: function() {
        SYMPHONY.services.make('rendering-registry', this, this.implements, true);
    },

    ready : function() {
        this.servicesList = SYMPHONY.services.subscribe('services-list');
    },

    registerEnricher : function(serviceName) {
        this.servicesList.add('enrichers', serviceName);
    },

    unregisterEnricher : function(serviceName) {
    },

    registerTransform : function(serviceName) {
        this.servicesList.add('transforms', serviceName);
    },

    registerMessageRenderer : function(type, serviceName) {
        var messageRenderers = this.servicesList.get('messageRenderers') || {};
        messageRenderers[type] = serviceName;
        this.servicesList.set('messageRenderers', messageRenderers);
    },

    fillServices : function(category) {
        var list = this.servicesList.get(category);
        var newList = Object.assign({}, list);
        _.each(newList, function(name, key) {
            newList[key] = SYMPHONY.services.subscribe(name);
        }, this);

        return newList;
    },

    fillServicesArray : function(category) {
        var list = this.servicesList.get(category) || [];
        var newList = list.map(function(name) {
            return SYMPHONY.services.subscribe(name);
        }, this);

        return newList;
    },

    getEnrichers : function() {
        return this.fillServicesArray('enrichers');
    },

    getTransforms : function() {
        return this.fillServicesArray('transforms');
    },

    getMessageRenderers : function() {
        return this.fillServices('messageRenderers');
    }
}

var registry = new RenderingRegistry();
registry.register();

},{}],"C:\\dev\\NEXUS\\packages\\renderer\\src\\services\\services-list.js":[function(require,module,exports){
ServicesList = function()
{
},

ServicesList.prototype = {
    implements : ['start', 'add', 'set', 'get'],

    register : function() {
        SYMPHONY.services.make('services-list', this, this.implements, true, true);
    },

    start : function() {
        this.services = {};
    },

    add : function(category, value) {
        this.services[category] = this.services[category] || [];

        this.services[category].push(value);
    },

    set : function(category, value) {
        this.services[category] = value;
    },

    get : function(category) {
        return this.services[category];
    }
};

var list = new ServicesList();
list.register();

},{}],"C:\\dev\\NEXUS\\packages\\renderer\\src\\vendor\\marked.js":[function(require,module,exports){
(function (global){
/**
/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */

/* modified by symphony to include only support for bold, italic, list (bullet and num) and paragraph,
   other types of Markdown are not supported.
   sanitize is turned on by default, so any html will be escape.
 */

;(function() {

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  //code: noop,
  //fences: noop,
  //hr: /^( *[-*_]){3,} *(?:\n+|$)/,
  //heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  //nptable: noop,
  //lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  //blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
  list: /^( *)(bull) [\s\S]*?(?:\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
  //def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
  //table: noop,
  paragraph: /^((?:[^\n]+\n?)+)\n*/,
  text: /^[^\n]+/
};

// block.bullet = /(?:[*+-]|\d+\.)/;
// currently we only support dash for bullet
block.bullet = /(?:[-])/;
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
block.item = replace(block.item, 'gm')
  (/bull/g, block.bullet)
  ();

block.list = replace(block.list)
  (/bull/g, block.bullet)
  //('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
  //('def', '\\n+(?=' + block.def.source + ')')
  ();

//block.blockquote = replace(block.blockquote)
//  ('def', block.def)
//  ();

block._tag = '(?!(?:'
  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';

block.html = replace(block.html)
  ('comment', /<!--[\s\S]*?-->/)
  ('closed', /<(tag)[\s\S]+?<\/\1>/)
  ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
  (/tag/g, block._tag)
  ();

block.paragraph = replace(block.paragraph)
  //('hr', block.hr)
  //('heading', block.heading)
  //('lheading', block.lheading)
  //('blockquote', block.blockquote)
  //('tag', '<' + block._tag)
  //('def', block.def)
  ();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  //fences: /^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,
  paragraph: /^/
});

block.gfm.paragraph = replace(block.paragraph)
  ('(?!', '(?!'
    //+ block.gfm.fences.source.replace('\\1', '\\2') + '|'
    + block.list.source.replace('\\1', '\\3') + '|')
  ();

/**
 * GFM + Tables Block Grammar
 */

//block.tables = merge({}, block.gfm, {
//  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
//  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
//});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = {};
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.gfm) {
    //if (this.options.tables) {
    //  this.rules = block.tables;
    //} else {
      this.rules = block.gfm;
    //}
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top, bq) {
  var src = src.replace(/^ +$/gm, '')
    , next
    , loose
    , cap
    , bull
    , b
    , item
    , space
    , i
    , l;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    //if (cap = this.rules.code.exec(src)) {
    //  src = src.substring(cap[0].length);
    //  cap = cap[0].replace(/^ {4}/gm, '');
    //  this.tokens.push({
    //    type: 'code',
    //    text: !this.options.pedantic
    //      ? cap.replace(/\n+$/, '')
    //      : cap
    //  });
    //  continue;
    //}

    // fences (gfm)
    //if (cap = this.rules.fences.exec(src)) {
    //  src = src.substring(cap[0].length);
    //  this.tokens.push({
    //    type: 'code',
    //    lang: cap[2],
    //    text: cap[3]
    //  });
    //  continue;
    //}

    // heading
    //if (cap = this.rules.heading.exec(src)) {
    //  src = src.substring(cap[0].length);
    //  this.tokens.push({
    //    type: 'heading',
    //    depth: cap[1].length,
    //    text: cap[2]
    //  });
    //  continue;
    //}

    // table no leading pipe (gfm)
    //if (top && (cap = this.rules.nptable.exec(src))) {
    //  src = src.substring(cap[0].length);
    //
    //  item = {
    //    type: 'table',
    //    header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
    //    align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
    //    cells: cap[3].replace(/\n$/, '').split('\n')
    //  };
    //
    //  for (i = 0; i < item.align.length; i++) {
    //    if (/^ *-+: *$/.test(item.align[i])) {
    //      item.align[i] = 'right';
    //    } else if (/^ *:-+: *$/.test(item.align[i])) {
    //      item.align[i] = 'center';
    //    } else if (/^ *:-+ *$/.test(item.align[i])) {
    //      item.align[i] = 'left';
    //    } else {
    //      item.align[i] = null;
    //    }
    //  }
    //
    //  for (i = 0; i < item.cells.length; i++) {
    //    item.cells[i] = item.cells[i].split(/ *\| */);
    //  }
    //
    //  this.tokens.push(item);
    //
    //  continue;
    //}

    // lheading
    //if (cap = this.rules.lheading.exec(src)) {
    //  src = src.substring(cap[0].length);
    //  this.tokens.push({
    //    type: 'heading',
    //    depth: cap[2] === '=' ? 1 : 2,
    //    text: cap[1]
    //  });
    //  continue;
    //}

    // hr
    //if (cap = this.rules.hr.exec(src)) {
    //  src = src.substring(cap[0].length);
    //  this.tokens.push({
    //    type: 'hr'
    //  });
    //  continue;
    //}

    // blockquote
    //if (cap = this.rules.blockquote.exec(src)) {
    //  src = src.substring(cap[0].length);
    //
    //  this.tokens.push({
    //    type: 'blockquote_start'
    //  });
    //
    //  cap = cap[0].replace(/^ *> ?/gm, '');
    //
    //  // Pass `top` to keep the current
    //  // "toplevel" state. This is exactly
    //  // how markdown.pl works.
    //  this.token(cap, top, true);
    //
    //  this.tokens.push({
    //    type: 'blockquote_end'
    //  });
    //
    //  continue;
    //}

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      bull = cap[2];

      this.tokens.push({
        type: 'list_start',
        ordered: bull.length > 1
      });

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (this.options.smartLists && i !== l - 1) {
          b = block.bullet.exec(cap[i + 1])[0];
          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
            src = cap.slice(i + 1).join('\n') + src;
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        this.tokens.push({
          type: loose
            ? 'loose_item_start'
            : 'list_item_start'
        });

        // Recurse.
        this.token(item, false, bq);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style',
        text: cap[0]
      });
      continue;
    }

    // def
    //if ((!bq && top) && (cap = this.rules.def.exec(src))) {
    //  src = src.substring(cap[0].length);
    //  this.tokens.links[cap[1].toLowerCase()] = {
    //    href: cap[2],
    //    title: cap[3]
    //  };
    //  continue;
    //}

    // table (gfm)
    //if (top && (cap = this.rules.table.exec(src))) {
    //  src = src.substring(cap[0].length);
    //
    //  item = {
    //    type: 'table',
    //    header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
    //    align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
    //    cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
    //  };
    //
    //  for (i = 0; i < item.align.length; i++) {
    //    if (/^ *-+: *$/.test(item.align[i])) {
    //      item.align[i] = 'right';
    //    } else if (/^ *:-+: *$/.test(item.align[i])) {
    //      item.align[i] = 'center';
    //    } else if (/^ *:-+ *$/.test(item.align[i])) {
    //      item.align[i] = 'left';
    //    } else {
    //      item.align[i] = null;
    //    }
    //  }
    //
    //  for (i = 0; i < item.cells.length; i++) {
    //    item.cells[i] = item.cells[i]
    //      .replace(/^ *\| *| *\| *$/g, '')
    //      .split(/ *\| */);
    //  }
    //
    //  this.tokens.push(item);
    //
    //  continue;
    //}

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([*\-_])/,
  //autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
  //url: noop,
  tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
  //link: /^!?\[(inside)\]\(href\)/,
  //reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  //nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,

  // in wireFormatter.js we are escaping md chars, modify strong
  // regex to ignore trailing escaped items: \*.  also remove neative
  // lookahead so we can have abutted items:
  // **bold1****bold2** --> <strong>bold1</strong><strong>bold2</strong>
  strong: /^__((?:\\_|[\s\S])+?)__|^\*\*((?:\\\*|[\s\S])+?)\*\*/,
  // strong: /^__([\s\S]+?)__|^\*\*([\s\S]+?)\*\*/,

  em: /^_((?:__|[\s\S])+?[^\\])_|^\*((?:\*\*|[\s\S])+?[^\\])\*(?!\*)/,
  //code: noop,
  br: /^ {2,}\n(?!\s*$)/,
  //del: noop,
  text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
};

//inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
//inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

//inline.link = replace(inline.link)
//  ('inside', inline._inside)
//  ('href', inline._href)
//  ();
//
//inline.reflink = replace(inline.reflink)
//  ('inside', inline._inside)
//  ();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: replace(inline.escape)('])', '~|])')(),
  //url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
  //del: /^~~(?=\S)([\s\S]*?\S)~~/,
  text: replace(inline.text)
    (']|', '~]|')
    ('|', '|https?://|')
    ()
});

/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: replace(inline.br)('{2,}', '*')(),
  text: replace(inline.gfm.text)('{2,}', '*')()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;
  this.renderer = this.options.renderer || new Renderer;
  this.renderer.options = this.options;

  if (!this.links) {
    throw new
      Error('Tokens array requires a `links` property.');
  }

  if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  } else if (this.options.pedantic) {
    this.rules = inline.pedantic;
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, options) {
  var inline = new InlineLexer(links, options);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = ''
    , link
    , text
    , href
    , cap;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    //if (cap = this.rules.autolink.exec(src)) {
    //  src = src.substring(cap[0].length);
    //  if (cap[2] === '@') {
    //    text = cap[1].charAt(6) === ':'
    //      ? this.mangle(cap[1].substring(7))
    //      : this.mangle(cap[1]);
    //    href = this.mangle('mailto:') + text;
    //  } else {
    //    text = escape(cap[1]);
    //    href = text;
    //  }
    //  out += this.renderer.link(href, null, text);
    //  continue;
    //}

    // url (gfm)
    //if (!this.inLink && (cap = this.rules.url.exec(src))) {
    //  src = src.substring(cap[0].length);
    //  text = escape(cap[1]);
    //  href = text;
    //  out += this.renderer.link(href, null, text);
    //  continue;
    //}

    //tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? escape(cap[0])
        : cap[0];
      continue;
    }

    // link
    //if (cap = this.rules.link.exec(src)) {
    //  src = src.substring(cap[0].length);
    //  this.inLink = true;
    //  out += this.outputLink(cap, {
    //    href: cap[2],
    //    title: cap[3]
    //  });
    //  this.inLink = false;
    //  continue;
    //}

    // reflink, nolink
    //if ((cap = this.rules.reflink.exec(src))
    //    || (cap = this.rules.nolink.exec(src))) {
    //  src = src.substring(cap[0].length);
    //  link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
    //  link = this.links[link.toLowerCase()];
    //  if (!link || !link.href) {
    //    out += cap[0].charAt(0);
    //    src = cap[0].substring(1) + src;
    //    continue;
    //  }
    //  this.inLink = true;
    //  out += this.outputLink(cap, link);
    //  this.inLink = false;
    //  continue;
    //}

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.strong(this.output(cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.em(this.output(cap[2] || cap[1]));
      continue;
    }

    // code
    //if (cap = this.rules.code.exec(src)) {
    //  src = src.substring(cap[0].length);
    //  out += this.renderer.codespan(escape(cap[2], true));
    //  continue;
    //}

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.br();
      continue;
    }

    // del (gfm)
    //if (cap = this.rules.del.exec(src)) {
    //  src = src.substring(cap[0].length);
    //  out += this.renderer.del(this.output(cap[1]));
    //  continue;
    //}

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      out += escape(this.smartypants(cap[0]));
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

/**
 * Compile Link
 */

//InlineLexer.prototype.outputLink = function(cap, link) {
//  var href = escape(link.href)
//    , title = link.title ? escape(link.title) : null;
//
//  return cap[0].charAt(0) !== '!'
//    ? this.renderer.link(href, title, this.output(cap[1]))
//    : this.renderer.image(href, title, escape(cap[1]));
//};

/**
 * Smartypants Transformations
 */

InlineLexer.prototype.smartypants = function(text) {
  if (!this.options.smartypants) return text;
  return text
    // em-dashes
    .replace(/--/g, '\u2014')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  var out = ''
    , l = text.length
    , i = 0
    , ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Renderer
 */

function Renderer(options) {
  this.options = options || {};
}

//Renderer.prototype.code = function(code, lang, escaped) {
//  if (this.options.highlight) {
//    var out = this.options.highlight(code, lang);
//    if (out != null && out !== code) {
//      escaped = true;
//      code = out;
//    }
//  }
//
//  if (!lang) {
//    return '<pre><code>'
//      + (escaped ? code : escape(code, true))
//      + '\n</code></pre>';
//  }
//
//  return '<pre><code class="'
//    + this.options.langPrefix
//    + escape(lang, true)
//    + '">'
//    + (escaped ? code : escape(code, true))
//    + '\n</code></pre>\n';
//};

//Renderer.prototype.blockquote = function(quote) {
//  return '<blockquote>\n' + quote + '</blockquote>\n';
//};

Renderer.prototype.html = function(html) {
  return html;
};

//Renderer.prototype.heading = function(text, level, raw) {
//  return '<h'
//    + level
//    + ' id="'
//    + this.options.headerPrefix
//    + raw.toLowerCase().replace(/[^\w]+/g, '-')
//    + '">'
//    + text
//    + '</h'
//    + level
//    + '>\n';
//};

//Renderer.prototype.hr = function() {
//  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
//};

Renderer.prototype.list = function(body, ordered) {
  var type = ordered ? 'ol' : 'ul';
  return '<' + type + '>\n' + body + '</' + type + '>\n';
};

Renderer.prototype.listitem = function(text) {
  return '<li>' + text + '</li>\n';
};

Renderer.prototype.paragraph = function(text) {
  return '<p>' + text + '</p>\n';
};

//Renderer.prototype.table = function(header, body) {
//  return '<table>\n'
//    + '<thead>\n'
//    + header
//    + '</thead>\n'
//    + '<tbody>\n'
//    + body
//    + '</tbody>\n'
//    + '</table>\n';
//};

//Renderer.prototype.tablerow = function(content) {
//  return '<tr>\n' + content + '</tr>\n';
//};

//Renderer.prototype.tablecell = function(content, flags) {
//  var type = flags.header ? 'th' : 'td';
//  var tag = flags.align
//    ? '<' + type + ' style="text-align:' + flags.align + '">'
//    : '<' + type + '>';
//  return tag + content + '</' + type + '>\n';
//};

// span level renderer
Renderer.prototype.strong = function(text) {
  return '<strong>' + text + '</strong>';
};

Renderer.prototype.em = function(text) {
  return '<em>' + text + '</em>';
};

//Renderer.prototype.codespan = function(text) {
//  return '<code>' + text + '</code>';
//};

Renderer.prototype.br = function() {
  return this.options.xhtml ? '<br/>' : '<br>';
};

//Renderer.prototype.del = function(text) {
//  return '<del>' + text + '</del>';
//};

//Renderer.prototype.link = function(href, title, text) {
//  if (this.options.sanitize) {
//    try {
//      var prot = decodeURIComponent(unescape(href))
//        .replace(/[^\w:]/g, '')
//        .toLowerCase();
//    } catch (e) {
//      return '';
//    }
//    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
//      return '';
//    }
//  }
//  var out = '<a href="' + href + '"';
//  if (title) {
//    out += ' title="' + title + '"';
//  }
//  out += '>' + text + '</a>';
//  return out;
//};

//Renderer.prototype.image = function(href, title, text) {
//  var out = '<img src="' + href + '" alt="' + text + '"';
//  if (title) {
//    out += ' title="' + title + '"';
//  }
//  out += this.options.xhtml ? '/>' : '>';
//  return out;
//};

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
  this.options.renderer = this.options.renderer || new Renderer;
  this.renderer = this.options.renderer;
  this.renderer.options = this.options;
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options, renderer) {
  var parser = new Parser(options, renderer);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options, this.renderer);
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  return this.token = this.tokens.pop();
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length - 1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    //case 'hr': {
    //  return this.renderer.hr();
    //}
    //case 'heading': {
    //  return this.renderer.heading(
    //    this.inline.output(this.token.text),
    //    this.token.depth,
    //    this.token.text);
    //}
    //case 'code': {
    //  return this.renderer.code(this.token.text,
    //    this.token.lang,
    //    this.token.escaped);
    //}
    //case 'table': {
    //  var header = ''
    //    , body = ''
    //    , i
    //    , row
    //    , cell
    //    , flags
    //    , j;
    //
    //  // header
    //  cell = '';
    //  for (i = 0; i < this.token.header.length; i++) {
    //    flags = { header: true, align: this.token.align[i] };
    //    cell += this.renderer.tablecell(
    //      this.inline.output(this.token.header[i]),
    //      { header: true, align: this.token.align[i] }
    //    );
    //  }
    //  header += this.renderer.tablerow(cell);
    //
    //  for (i = 0; i < this.token.cells.length; i++) {
    //    row = this.token.cells[i];
    //
    //    cell = '';
    //    for (j = 0; j < row.length; j++) {
    //      cell += this.renderer.tablecell(
    //        this.inline.output(row[j]),
    //        { header: false, align: this.token.align[j] }
    //      );
    //    }
    //
    //    body += this.renderer.tablerow(cell);
    //  }
    //  return this.renderer.table(header, body);
    //}
    //case 'blockquote_start': {
    //  var body = '';
    //
    //  while (this.next().type !== 'blockquote_end') {
    //    body += this.tok();
    //  }
    //
    //  return this.renderer.blockquote(body);
    //}
    case 'list_start': {
      var body = ''
        , ordered = this.token.ordered;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered);
    }
    case 'list_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'loose_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'html': {
      var html = !this.token.pre && !this.options.pedantic
        ? this.inline.output(this.token.text)
        : this.token.text;
      return this.renderer.html(html);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
  }
};

/**
 * Helpers
 */

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function unescape(html) {
  return html.replace(/&([#\w]+);/g, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

function replace(regex, opt) {
  regex = regex.source;
  opt = opt || '';
  return function self(name, val) {
    if (!name) return new RegExp(regex, opt);
    val = val.source || val;
    val = val.replace(/(^|[^\[])\^/g, '$1');
    regex = regex.replace(name, val);
    return self;
  };
}

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1
    , target
    , key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}


/**
 * Marked
 */

function marked(src, opt, callback) {
  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});

    var highlight = opt.highlight
      , tokens
      , pending
      , i = 0;

    try {
      tokens = Lexer.lex(src, opt)
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    var done = function(err) {
      if (err) {
        opt.highlight = highlight;
        return callback(err);
      }

      var out;

      try {
        out = Parser.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (err) return done(err);
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/chjj/marked.';
    if ((opt || marked.defaults).silent) {
      return '<p>An error occured:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

marked.defaults = {
  gfm: true,
  tables: false,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: false,
  silent: false,
  highlight: null,
  langPrefix: 'lang-',
  smartypants: false,
  headerPrefix: '',
  renderer: new Renderer,
  xhtml: false
};

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Renderer = Renderer;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.parse = marked;

if (typeof module !== 'undefined' && typeof exports === 'object') {
  module.exports = marked;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return marked; });
} else {
  this.marked = marked;
}

}).call(function() {
  return this || (typeof window !== 'undefined' ? window : global);
}());

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhY2thZ2VzL3JlbmRlcmVyL3NyYy92ZW5kb3IvbWFya2VkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4vKipcbiAqIG1hcmtlZCAtIGEgbWFya2Rvd24gcGFyc2VyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTEtMjAxNCwgQ2hyaXN0b3BoZXIgSmVmZnJleS4gKE1JVCBMaWNlbnNlZClcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9jaGpqL21hcmtlZFxuICovXG5cbi8qIG1vZGlmaWVkIGJ5IHN5bXBob255IHRvIGluY2x1ZGUgb25seSBzdXBwb3J0IGZvciBib2xkLCBpdGFsaWMsIGxpc3QgKGJ1bGxldCBhbmQgbnVtKSBhbmQgcGFyYWdyYXBoLFxuICAgb3RoZXIgdHlwZXMgb2YgTWFya2Rvd24gYXJlIG5vdCBzdXBwb3J0ZWQuXG4gICBzYW5pdGl6ZSBpcyB0dXJuZWQgb24gYnkgZGVmYXVsdCwgc28gYW55IGh0bWwgd2lsbCBiZSBlc2NhcGUuXG4gKi9cblxuOyhmdW5jdGlvbigpIHtcblxuLyoqXG4gKiBCbG9jay1MZXZlbCBHcmFtbWFyXG4gKi9cblxudmFyIGJsb2NrID0ge1xuICBuZXdsaW5lOiAvXlxcbisvLFxuICAvL2NvZGU6IG5vb3AsXG4gIC8vZmVuY2VzOiBub29wLFxuICAvL2hyOiAvXiggKlstKl9dKXszLH0gKig/Olxcbit8JCkvLFxuICAvL2hlYWRpbmc6IC9eICooI3sxLDZ9KSAqKFteXFxuXSs/KSAqIyogKig/Olxcbit8JCkvLFxuICAvL25wdGFibGU6IG5vb3AsXG4gIC8vbGhlYWRpbmc6IC9eKFteXFxuXSspXFxuICooPXwtKXsyLH0gKig/Olxcbit8JCkvLFxuICAvL2Jsb2NrcXVvdGU6IC9eKCAqPlteXFxuXSsoXFxuKD8hZGVmKVteXFxuXSspKlxcbiopKy8sXG4gIGxpc3Q6IC9eKCAqKShidWxsKSBbXFxzXFxTXSo/KD86XFxuezIsfSg/ISApKD8hXFwxYnVsbCApXFxuKnxcXHMqJCkvLFxuICBodG1sOiAvXiAqKD86Y29tbWVudCAqKD86XFxufFxccyokKXxjbG9zZWQgKig/OlxcbnsyLH18XFxzKiQpfGNsb3NpbmcgKig/OlxcbnsyLH18XFxzKiQpKS8sXG4gIC8vZGVmOiAvXiAqXFxbKFteXFxdXSspXFxdOiAqPD8oW15cXHM+XSspPj8oPzogK1tcIihdKFteXFxuXSspW1wiKV0pPyAqKD86XFxuK3wkKS8sXG4gIC8vdGFibGU6IG5vb3AsXG4gIHBhcmFncmFwaDogL14oKD86W15cXG5dK1xcbj8pKylcXG4qLyxcbiAgdGV4dDogL15bXlxcbl0rL1xufTtcblxuLy8gYmxvY2suYnVsbGV0ID0gLyg/OlsqKy1dfFxcZCtcXC4pLztcbi8vIGN1cnJlbnRseSB3ZSBvbmx5IHN1cHBvcnQgZGFzaCBmb3IgYnVsbGV0XG5ibG9jay5idWxsZXQgPSAvKD86Wy1dKS87XG5ibG9jay5pdGVtID0gL14oICopKGJ1bGwpIFteXFxuXSooPzpcXG4oPyFcXDFidWxsIClbXlxcbl0qKSovO1xuYmxvY2suaXRlbSA9IHJlcGxhY2UoYmxvY2suaXRlbSwgJ2dtJylcbiAgKC9idWxsL2csIGJsb2NrLmJ1bGxldClcbiAgKCk7XG5cbmJsb2NrLmxpc3QgPSByZXBsYWNlKGJsb2NrLmxpc3QpXG4gICgvYnVsbC9nLCBibG9jay5idWxsZXQpXG4gIC8vKCdocicsICdcXFxcbisoPz1cXFxcMT8oPzpbLSpfXSAqKXszLH0oPzpcXFxcbit8JCkpJylcbiAgLy8oJ2RlZicsICdcXFxcbisoPz0nICsgYmxvY2suZGVmLnNvdXJjZSArICcpJylcbiAgKCk7XG5cbi8vYmxvY2suYmxvY2txdW90ZSA9IHJlcGxhY2UoYmxvY2suYmxvY2txdW90ZSlcbi8vICAoJ2RlZicsIGJsb2NrLmRlZilcbi8vICAoKTtcblxuYmxvY2suX3RhZyA9ICcoPyEoPzonXG4gICsgJ2F8ZW18c3Ryb25nfHNtYWxsfHN8Y2l0ZXxxfGRmbnxhYmJyfGRhdGF8dGltZXxjb2RlJ1xuICArICd8dmFyfHNhbXB8a2JkfHN1YnxzdXB8aXxifHV8bWFya3xydWJ5fHJ0fHJwfGJkaXxiZG8nXG4gICsgJ3xzcGFufGJyfHdicnxpbnN8ZGVsfGltZylcXFxcYilcXFxcdysoPyE6L3xbXlxcXFx3XFxcXHNAXSpAKVxcXFxiJztcblxuYmxvY2suaHRtbCA9IHJlcGxhY2UoYmxvY2suaHRtbClcbiAgKCdjb21tZW50JywgLzwhLS1bXFxzXFxTXSo/LS0+LylcbiAgKCdjbG9zZWQnLCAvPCh0YWcpW1xcc1xcU10rPzxcXC9cXDE+LylcbiAgKCdjbG9zaW5nJywgLzx0YWcoPzpcIlteXCJdKlwifCdbXiddKid8W14nXCI+XSkqPz4vKVxuICAoL3RhZy9nLCBibG9jay5fdGFnKVxuICAoKTtcblxuYmxvY2sucGFyYWdyYXBoID0gcmVwbGFjZShibG9jay5wYXJhZ3JhcGgpXG4gIC8vKCdocicsIGJsb2NrLmhyKVxuICAvLygnaGVhZGluZycsIGJsb2NrLmhlYWRpbmcpXG4gIC8vKCdsaGVhZGluZycsIGJsb2NrLmxoZWFkaW5nKVxuICAvLygnYmxvY2txdW90ZScsIGJsb2NrLmJsb2NrcXVvdGUpXG4gIC8vKCd0YWcnLCAnPCcgKyBibG9jay5fdGFnKVxuICAvLygnZGVmJywgYmxvY2suZGVmKVxuICAoKTtcblxuLyoqXG4gKiBOb3JtYWwgQmxvY2sgR3JhbW1hclxuICovXG5cbmJsb2NrLm5vcm1hbCA9IG1lcmdlKHt9LCBibG9jayk7XG5cbi8qKlxuICogR0ZNIEJsb2NrIEdyYW1tYXJcbiAqL1xuXG5ibG9jay5nZm0gPSBtZXJnZSh7fSwgYmxvY2subm9ybWFsLCB7XG4gIC8vZmVuY2VzOiAvXiAqKGB7Myx9fH57Myx9KSAqKFxcUyspPyAqXFxuKFtcXHNcXFNdKz8pXFxzKlxcMSAqKD86XFxuK3wkKS8sXG4gIHBhcmFncmFwaDogL14vXG59KTtcblxuYmxvY2suZ2ZtLnBhcmFncmFwaCA9IHJlcGxhY2UoYmxvY2sucGFyYWdyYXBoKVxuICAoJyg/IScsICcoPyEnXG4gICAgLy8rIGJsb2NrLmdmbS5mZW5jZXMuc291cmNlLnJlcGxhY2UoJ1xcXFwxJywgJ1xcXFwyJykgKyAnfCdcbiAgICArIGJsb2NrLmxpc3Quc291cmNlLnJlcGxhY2UoJ1xcXFwxJywgJ1xcXFwzJykgKyAnfCcpXG4gICgpO1xuXG4vKipcbiAqIEdGTSArIFRhYmxlcyBCbG9jayBHcmFtbWFyXG4gKi9cblxuLy9ibG9jay50YWJsZXMgPSBtZXJnZSh7fSwgYmxvY2suZ2ZtLCB7XG4vLyAgbnB0YWJsZTogL14gKihcXFMuKlxcfC4qKVxcbiAqKFstOl0rICpcXHxbLXwgOl0qKVxcbigoPzouKlxcfC4qKD86XFxufCQpKSopXFxuKi8sXG4vLyAgdGFibGU6IC9eICpcXHwoLispXFxuICpcXHwoICpbLTpdK1stfCA6XSopXFxuKCg/OiAqXFx8LiooPzpcXG58JCkpKilcXG4qL1xuLy99KTtcblxuLyoqXG4gKiBCbG9jayBMZXhlclxuICovXG5cbmZ1bmN0aW9uIExleGVyKG9wdGlvbnMpIHtcbiAgdGhpcy50b2tlbnMgPSBbXTtcbiAgdGhpcy50b2tlbnMubGlua3MgPSB7fTtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCBtYXJrZWQuZGVmYXVsdHM7XG4gIHRoaXMucnVsZXMgPSBibG9jay5ub3JtYWw7XG5cbiAgaWYgKHRoaXMub3B0aW9ucy5nZm0pIHtcbiAgICAvL2lmICh0aGlzLm9wdGlvbnMudGFibGVzKSB7XG4gICAgLy8gIHRoaXMucnVsZXMgPSBibG9jay50YWJsZXM7XG4gICAgLy99IGVsc2Uge1xuICAgICAgdGhpcy5ydWxlcyA9IGJsb2NrLmdmbTtcbiAgICAvL31cbiAgfVxufVxuXG4vKipcbiAqIEV4cG9zZSBCbG9jayBSdWxlc1xuICovXG5cbkxleGVyLnJ1bGVzID0gYmxvY2s7XG5cbi8qKlxuICogU3RhdGljIExleCBNZXRob2RcbiAqL1xuXG5MZXhlci5sZXggPSBmdW5jdGlvbihzcmMsIG9wdGlvbnMpIHtcbiAgdmFyIGxleGVyID0gbmV3IExleGVyKG9wdGlvbnMpO1xuICByZXR1cm4gbGV4ZXIubGV4KHNyYyk7XG59O1xuXG4vKipcbiAqIFByZXByb2Nlc3NpbmdcbiAqL1xuXG5MZXhlci5wcm90b3R5cGUubGV4ID0gZnVuY3Rpb24oc3JjKSB7XG4gIHNyYyA9IHNyY1xuICAgIC5yZXBsYWNlKC9cXHJcXG58XFxyL2csICdcXG4nKVxuICAgIC5yZXBsYWNlKC9cXHQvZywgJyAgICAnKVxuICAgIC5yZXBsYWNlKC9cXHUwMGEwL2csICcgJylcbiAgICAucmVwbGFjZSgvXFx1MjQyNC9nLCAnXFxuJyk7XG5cbiAgcmV0dXJuIHRoaXMudG9rZW4oc3JjLCB0cnVlKTtcbn07XG5cbi8qKlxuICogTGV4aW5nXG4gKi9cblxuTGV4ZXIucHJvdG90eXBlLnRva2VuID0gZnVuY3Rpb24oc3JjLCB0b3AsIGJxKSB7XG4gIHZhciBzcmMgPSBzcmMucmVwbGFjZSgvXiArJC9nbSwgJycpXG4gICAgLCBuZXh0XG4gICAgLCBsb29zZVxuICAgICwgY2FwXG4gICAgLCBidWxsXG4gICAgLCBiXG4gICAgLCBpdGVtXG4gICAgLCBzcGFjZVxuICAgICwgaVxuICAgICwgbDtcblxuICB3aGlsZSAoc3JjKSB7XG4gICAgLy8gbmV3bGluZVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLm5ld2xpbmUuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgaWYgKGNhcFswXS5sZW5ndGggPiAxKSB7XG4gICAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICAgIHR5cGU6ICdzcGFjZSdcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gY29kZVxuICAgIC8vaWYgKGNhcCA9IHRoaXMucnVsZXMuY29kZS5leGVjKHNyYykpIHtcbiAgICAvLyAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAvLyAgY2FwID0gY2FwWzBdLnJlcGxhY2UoL14gezR9L2dtLCAnJyk7XG4gICAgLy8gIHRoaXMudG9rZW5zLnB1c2goe1xuICAgIC8vICAgIHR5cGU6ICdjb2RlJyxcbiAgICAvLyAgICB0ZXh0OiAhdGhpcy5vcHRpb25zLnBlZGFudGljXG4gICAgLy8gICAgICA/IGNhcC5yZXBsYWNlKC9cXG4rJC8sICcnKVxuICAgIC8vICAgICAgOiBjYXBcbiAgICAvLyAgfSk7XG4gICAgLy8gIGNvbnRpbnVlO1xuICAgIC8vfVxuXG4gICAgLy8gZmVuY2VzIChnZm0pXG4gICAgLy9pZiAoY2FwID0gdGhpcy5ydWxlcy5mZW5jZXMuZXhlYyhzcmMpKSB7XG4gICAgLy8gIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgLy8gIHRoaXMudG9rZW5zLnB1c2goe1xuICAgIC8vICAgIHR5cGU6ICdjb2RlJyxcbiAgICAvLyAgICBsYW5nOiBjYXBbMl0sXG4gICAgLy8gICAgdGV4dDogY2FwWzNdXG4gICAgLy8gIH0pO1xuICAgIC8vICBjb250aW51ZTtcbiAgICAvL31cblxuICAgIC8vIGhlYWRpbmdcbiAgICAvL2lmIChjYXAgPSB0aGlzLnJ1bGVzLmhlYWRpbmcuZXhlYyhzcmMpKSB7XG4gICAgLy8gIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgLy8gIHRoaXMudG9rZW5zLnB1c2goe1xuICAgIC8vICAgIHR5cGU6ICdoZWFkaW5nJyxcbiAgICAvLyAgICBkZXB0aDogY2FwWzFdLmxlbmd0aCxcbiAgICAvLyAgICB0ZXh0OiBjYXBbMl1cbiAgICAvLyAgfSk7XG4gICAgLy8gIGNvbnRpbnVlO1xuICAgIC8vfVxuXG4gICAgLy8gdGFibGUgbm8gbGVhZGluZyBwaXBlIChnZm0pXG4gICAgLy9pZiAodG9wICYmIChjYXAgPSB0aGlzLnJ1bGVzLm5wdGFibGUuZXhlYyhzcmMpKSkge1xuICAgIC8vICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgIC8vXG4gICAgLy8gIGl0ZW0gPSB7XG4gICAgLy8gICAgdHlwZTogJ3RhYmxlJyxcbiAgICAvLyAgICBoZWFkZXI6IGNhcFsxXS5yZXBsYWNlKC9eICp8ICpcXHwgKiQvZywgJycpLnNwbGl0KC8gKlxcfCAqLyksXG4gICAgLy8gICAgYWxpZ246IGNhcFsyXS5yZXBsYWNlKC9eICp8XFx8ICokL2csICcnKS5zcGxpdCgvICpcXHwgKi8pLFxuICAgIC8vICAgIGNlbGxzOiBjYXBbM10ucmVwbGFjZSgvXFxuJC8sICcnKS5zcGxpdCgnXFxuJylcbiAgICAvLyAgfTtcbiAgICAvL1xuICAgIC8vICBmb3IgKGkgPSAwOyBpIDwgaXRlbS5hbGlnbi5sZW5ndGg7IGkrKykge1xuICAgIC8vICAgIGlmICgvXiAqLSs6ICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgLy8gICAgICBpdGVtLmFsaWduW2ldID0gJ3JpZ2h0JztcbiAgICAvLyAgICB9IGVsc2UgaWYgKC9eICo6LSs6ICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgLy8gICAgICBpdGVtLmFsaWduW2ldID0gJ2NlbnRlcic7XG4gICAgLy8gICAgfSBlbHNlIGlmICgvXiAqOi0rICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgLy8gICAgICBpdGVtLmFsaWduW2ldID0gJ2xlZnQnO1xuICAgIC8vICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICBpdGVtLmFsaWduW2ldID0gbnVsbDtcbiAgICAvLyAgICB9XG4gICAgLy8gIH1cbiAgICAvL1xuICAgIC8vICBmb3IgKGkgPSAwOyBpIDwgaXRlbS5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgIC8vICAgIGl0ZW0uY2VsbHNbaV0gPSBpdGVtLmNlbGxzW2ldLnNwbGl0KC8gKlxcfCAqLyk7XG4gICAgLy8gIH1cbiAgICAvL1xuICAgIC8vICB0aGlzLnRva2Vucy5wdXNoKGl0ZW0pO1xuICAgIC8vXG4gICAgLy8gIGNvbnRpbnVlO1xuICAgIC8vfVxuXG4gICAgLy8gbGhlYWRpbmdcbiAgICAvL2lmIChjYXAgPSB0aGlzLnJ1bGVzLmxoZWFkaW5nLmV4ZWMoc3JjKSkge1xuICAgIC8vICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgIC8vICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAvLyAgICB0eXBlOiAnaGVhZGluZycsXG4gICAgLy8gICAgZGVwdGg6IGNhcFsyXSA9PT0gJz0nID8gMSA6IDIsXG4gICAgLy8gICAgdGV4dDogY2FwWzFdXG4gICAgLy8gIH0pO1xuICAgIC8vICBjb250aW51ZTtcbiAgICAvL31cblxuICAgIC8vIGhyXG4gICAgLy9pZiAoY2FwID0gdGhpcy5ydWxlcy5oci5leGVjKHNyYykpIHtcbiAgICAvLyAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAvLyAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgLy8gICAgdHlwZTogJ2hyJ1xuICAgIC8vICB9KTtcbiAgICAvLyAgY29udGludWU7XG4gICAgLy99XG5cbiAgICAvLyBibG9ja3F1b3RlXG4gICAgLy9pZiAoY2FwID0gdGhpcy5ydWxlcy5ibG9ja3F1b3RlLmV4ZWMoc3JjKSkge1xuICAgIC8vICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgIC8vXG4gICAgLy8gIHRoaXMudG9rZW5zLnB1c2goe1xuICAgIC8vICAgIHR5cGU6ICdibG9ja3F1b3RlX3N0YXJ0J1xuICAgIC8vICB9KTtcbiAgICAvL1xuICAgIC8vICBjYXAgPSBjYXBbMF0ucmVwbGFjZSgvXiAqPiA/L2dtLCAnJyk7XG4gICAgLy9cbiAgICAvLyAgLy8gUGFzcyBgdG9wYCB0byBrZWVwIHRoZSBjdXJyZW50XG4gICAgLy8gIC8vIFwidG9wbGV2ZWxcIiBzdGF0ZS4gVGhpcyBpcyBleGFjdGx5XG4gICAgLy8gIC8vIGhvdyBtYXJrZG93bi5wbCB3b3Jrcy5cbiAgICAvLyAgdGhpcy50b2tlbihjYXAsIHRvcCwgdHJ1ZSk7XG4gICAgLy9cbiAgICAvLyAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgLy8gICAgdHlwZTogJ2Jsb2NrcXVvdGVfZW5kJ1xuICAgIC8vICB9KTtcbiAgICAvL1xuICAgIC8vICBjb250aW51ZTtcbiAgICAvL31cblxuICAgIC8vIGxpc3RcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5saXN0LmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIGJ1bGwgPSBjYXBbMl07XG5cbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnbGlzdF9zdGFydCcsXG4gICAgICAgIG9yZGVyZWQ6IGJ1bGwubGVuZ3RoID4gMVxuICAgICAgfSk7XG5cbiAgICAgIC8vIEdldCBlYWNoIHRvcC1sZXZlbCBpdGVtLlxuICAgICAgY2FwID0gY2FwWzBdLm1hdGNoKHRoaXMucnVsZXMuaXRlbSk7XG5cbiAgICAgIG5leHQgPSBmYWxzZTtcbiAgICAgIGwgPSBjYXAubGVuZ3RoO1xuICAgICAgaSA9IDA7XG5cbiAgICAgIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGl0ZW0gPSBjYXBbaV07XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBsaXN0IGl0ZW0ncyBidWxsZXRcbiAgICAgICAgLy8gc28gaXQgaXMgc2VlbiBhcyB0aGUgbmV4dCB0b2tlbi5cbiAgICAgICAgc3BhY2UgPSBpdGVtLmxlbmd0aDtcbiAgICAgICAgaXRlbSA9IGl0ZW0ucmVwbGFjZSgvXiAqKFsqKy1dfFxcZCtcXC4pICsvLCAnJyk7XG5cbiAgICAgICAgLy8gT3V0ZGVudCB3aGF0ZXZlciB0aGVcbiAgICAgICAgLy8gbGlzdCBpdGVtIGNvbnRhaW5zLiBIYWNreS5cbiAgICAgICAgaWYgKH5pdGVtLmluZGV4T2YoJ1xcbiAnKSkge1xuICAgICAgICAgIHNwYWNlIC09IGl0ZW0ubGVuZ3RoO1xuICAgICAgICAgIGl0ZW0gPSAhdGhpcy5vcHRpb25zLnBlZGFudGljXG4gICAgICAgICAgICA/IGl0ZW0ucmVwbGFjZShuZXcgUmVnRXhwKCdeIHsxLCcgKyBzcGFjZSArICd9JywgJ2dtJyksICcnKVxuICAgICAgICAgICAgOiBpdGVtLnJlcGxhY2UoL14gezEsNH0vZ20sICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERldGVybWluZSB3aGV0aGVyIHRoZSBuZXh0IGxpc3QgaXRlbSBiZWxvbmdzIGhlcmUuXG4gICAgICAgIC8vIEJhY2twZWRhbCBpZiBpdCBkb2VzIG5vdCBiZWxvbmcgaW4gdGhpcyBsaXN0LlxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnNtYXJ0TGlzdHMgJiYgaSAhPT0gbCAtIDEpIHtcbiAgICAgICAgICBiID0gYmxvY2suYnVsbGV0LmV4ZWMoY2FwW2kgKyAxXSlbMF07XG4gICAgICAgICAgaWYgKGJ1bGwgIT09IGIgJiYgIShidWxsLmxlbmd0aCA+IDEgJiYgYi5sZW5ndGggPiAxKSkge1xuICAgICAgICAgICAgc3JjID0gY2FwLnNsaWNlKGkgKyAxKS5qb2luKCdcXG4nKSArIHNyYztcbiAgICAgICAgICAgIGkgPSBsIC0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZXRlcm1pbmUgd2hldGhlciBpdGVtIGlzIGxvb3NlIG9yIG5vdC5cbiAgICAgICAgLy8gVXNlOiAvKF58XFxuKSg/ISApW15cXG5dK1xcblxcbig/IVxccyokKS9cbiAgICAgICAgLy8gZm9yIGRpc2NvdW50IGJlaGF2aW9yLlxuICAgICAgICBsb29zZSA9IG5leHQgfHwgL1xcblxcbig/IVxccyokKS8udGVzdChpdGVtKTtcbiAgICAgICAgaWYgKGkgIT09IGwgLSAxKSB7XG4gICAgICAgICAgbmV4dCA9IGl0ZW0uY2hhckF0KGl0ZW0ubGVuZ3RoIC0gMSkgPT09ICdcXG4nO1xuICAgICAgICAgIGlmICghbG9vc2UpIGxvb3NlID0gbmV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICAgIHR5cGU6IGxvb3NlXG4gICAgICAgICAgICA/ICdsb29zZV9pdGVtX3N0YXJ0J1xuICAgICAgICAgICAgOiAnbGlzdF9pdGVtX3N0YXJ0J1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZWN1cnNlLlxuICAgICAgICB0aGlzLnRva2VuKGl0ZW0sIGZhbHNlLCBicSk7XG5cbiAgICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogJ2xpc3RfaXRlbV9lbmQnXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2xpc3RfZW5kJ1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGh0bWxcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5odG1sLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiB0aGlzLm9wdGlvbnMuc2FuaXRpemVcbiAgICAgICAgICA/ICdwYXJhZ3JhcGgnXG4gICAgICAgICAgOiAnaHRtbCcsXG4gICAgICAgIHByZTogY2FwWzFdID09PSAncHJlJyB8fCBjYXBbMV0gPT09ICdzY3JpcHQnIHx8IGNhcFsxXSA9PT0gJ3N0eWxlJyxcbiAgICAgICAgdGV4dDogY2FwWzBdXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGRlZlxuICAgIC8vaWYgKCghYnEgJiYgdG9wKSAmJiAoY2FwID0gdGhpcy5ydWxlcy5kZWYuZXhlYyhzcmMpKSkge1xuICAgIC8vICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgIC8vICB0aGlzLnRva2Vucy5saW5rc1tjYXBbMV0udG9Mb3dlckNhc2UoKV0gPSB7XG4gICAgLy8gICAgaHJlZjogY2FwWzJdLFxuICAgIC8vICAgIHRpdGxlOiBjYXBbM11cbiAgICAvLyAgfTtcbiAgICAvLyAgY29udGludWU7XG4gICAgLy99XG5cbiAgICAvLyB0YWJsZSAoZ2ZtKVxuICAgIC8vaWYgKHRvcCAmJiAoY2FwID0gdGhpcy5ydWxlcy50YWJsZS5leGVjKHNyYykpKSB7XG4gICAgLy8gIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgLy9cbiAgICAvLyAgaXRlbSA9IHtcbiAgICAvLyAgICB0eXBlOiAndGFibGUnLFxuICAgIC8vICAgIGhlYWRlcjogY2FwWzFdLnJlcGxhY2UoL14gKnwgKlxcfCAqJC9nLCAnJykuc3BsaXQoLyAqXFx8ICovKSxcbiAgICAvLyAgICBhbGlnbjogY2FwWzJdLnJlcGxhY2UoL14gKnxcXHwgKiQvZywgJycpLnNwbGl0KC8gKlxcfCAqLyksXG4gICAgLy8gICAgY2VsbHM6IGNhcFszXS5yZXBsYWNlKC8oPzogKlxcfCAqKT9cXG4kLywgJycpLnNwbGl0KCdcXG4nKVxuICAgIC8vICB9O1xuICAgIC8vXG4gICAgLy8gIGZvciAoaSA9IDA7IGkgPCBpdGVtLmFsaWduLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gICAgaWYgKC9eICotKzogKiQvLnRlc3QoaXRlbS5hbGlnbltpXSkpIHtcbiAgICAvLyAgICAgIGl0ZW0uYWxpZ25baV0gPSAncmlnaHQnO1xuICAgIC8vICAgIH0gZWxzZSBpZiAoL14gKjotKzogKiQvLnRlc3QoaXRlbS5hbGlnbltpXSkpIHtcbiAgICAvLyAgICAgIGl0ZW0uYWxpZ25baV0gPSAnY2VudGVyJztcbiAgICAvLyAgICB9IGVsc2UgaWYgKC9eICo6LSsgKiQvLnRlc3QoaXRlbS5hbGlnbltpXSkpIHtcbiAgICAvLyAgICAgIGl0ZW0uYWxpZ25baV0gPSAnbGVmdCc7XG4gICAgLy8gICAgfSBlbHNlIHtcbiAgICAvLyAgICAgIGl0ZW0uYWxpZ25baV0gPSBudWxsO1xuICAgIC8vICAgIH1cbiAgICAvLyAgfVxuICAgIC8vXG4gICAgLy8gIGZvciAoaSA9IDA7IGkgPCBpdGVtLmNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gICAgaXRlbS5jZWxsc1tpXSA9IGl0ZW0uY2VsbHNbaV1cbiAgICAvLyAgICAgIC5yZXBsYWNlKC9eICpcXHwgKnwgKlxcfCAqJC9nLCAnJylcbiAgICAvLyAgICAgIC5zcGxpdCgvICpcXHwgKi8pO1xuICAgIC8vICB9XG4gICAgLy9cbiAgICAvLyAgdGhpcy50b2tlbnMucHVzaChpdGVtKTtcbiAgICAvL1xuICAgIC8vICBjb250aW51ZTtcbiAgICAvL31cblxuICAgIC8vIHRvcC1sZXZlbCBwYXJhZ3JhcGhcbiAgICBpZiAodG9wICYmIChjYXAgPSB0aGlzLnJ1bGVzLnBhcmFncmFwaC5leGVjKHNyYykpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdwYXJhZ3JhcGgnLFxuICAgICAgICB0ZXh0OiBjYXBbMV0uY2hhckF0KGNhcFsxXS5sZW5ndGggLSAxKSA9PT0gJ1xcbidcbiAgICAgICAgICA/IGNhcFsxXS5zbGljZSgwLCAtMSlcbiAgICAgICAgICA6IGNhcFsxXVxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyB0ZXh0XG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMudGV4dC5leGVjKHNyYykpIHtcbiAgICAgIC8vIFRvcC1sZXZlbCBzaG91bGQgbmV2ZXIgcmVhY2ggaGVyZS5cbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICB0ZXh0OiBjYXBbMF1cbiAgICAgIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHNyYykge1xuICAgICAgdGhyb3cgbmV3XG4gICAgICAgIEVycm9yKCdJbmZpbml0ZSBsb29wIG9uIGJ5dGU6ICcgKyBzcmMuY2hhckNvZGVBdCgwKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXMudG9rZW5zO1xufTtcblxuLyoqXG4gKiBJbmxpbmUtTGV2ZWwgR3JhbW1hclxuICovXG5cbnZhciBpbmxpbmUgPSB7XG4gIGVzY2FwZTogL15cXFxcKFsqXFwtX10pLyxcbiAgLy9hdXRvbGluazogL148KFteID5dKyhAfDpcXC8pW14gPl0rKT4vLFxuICAvL3VybDogbm9vcCxcbiAgdGFnOiAvXjwhLS1bXFxzXFxTXSo/LS0+fF48XFwvP1xcdysoPzpcIlteXCJdKlwifCdbXiddKid8W14nXCI+XSkqPz4vLFxuICAvL2xpbms6IC9eIT9cXFsoaW5zaWRlKVxcXVxcKGhyZWZcXCkvLFxuICAvL3JlZmxpbms6IC9eIT9cXFsoaW5zaWRlKVxcXVxccypcXFsoW15cXF1dKilcXF0vLFxuICAvL25vbGluazogL14hP1xcWygoPzpcXFtbXlxcXV0qXFxdfFteXFxbXFxdXSkqKVxcXS8sXG5cbiAgLy8gaW4gd2lyZUZvcm1hdHRlci5qcyB3ZSBhcmUgZXNjYXBpbmcgbWQgY2hhcnMsIG1vZGlmeSBzdHJvbmdcbiAgLy8gcmVnZXggdG8gaWdub3JlIHRyYWlsaW5nIGVzY2FwZWQgaXRlbXM6IFxcKi4gIGFsc28gcmVtb3ZlIG5lYXRpdmVcbiAgLy8gbG9va2FoZWFkIHNvIHdlIGNhbiBoYXZlIGFidXR0ZWQgaXRlbXM6XG4gIC8vICoqYm9sZDEqKioqYm9sZDIqKiAtLT4gPHN0cm9uZz5ib2xkMTwvc3Ryb25nPjxzdHJvbmc+Ym9sZDI8L3N0cm9uZz5cbiAgc3Ryb25nOiAvXl9fKCg/OlxcXFxffFtcXHNcXFNdKSs/KV9ffF5cXCpcXCooKD86XFxcXFxcKnxbXFxzXFxTXSkrPylcXCpcXCovLFxuICAvLyBzdHJvbmc6IC9eX18oW1xcc1xcU10rPylfX3xeXFwqXFwqKFtcXHNcXFNdKz8pXFwqXFwqLyxcblxuICBlbTogL15fKCg/Ol9ffFtcXHNcXFNdKSs/W15cXFxcXSlffF5cXCooKD86XFwqXFwqfFtcXHNcXFNdKSs/W15cXFxcXSlcXCooPyFcXCopLyxcbiAgLy9jb2RlOiBub29wLFxuICBicjogL14gezIsfVxcbig/IVxccyokKS8sXG4gIC8vZGVsOiBub29wLFxuICB0ZXh0OiAvXltcXHNcXFNdKz8oPz1bXFxcXDwhXFxbXypgXXwgezIsfVxcbnwkKS9cbn07XG5cbi8vaW5saW5lLl9pbnNpZGUgPSAvKD86XFxbW15cXF1dKlxcXXxbXlxcW1xcXV18XFxdKD89W15cXFtdKlxcXSkpKi87XG4vL2lubGluZS5faHJlZiA9IC9cXHMqPD8oW1xcc1xcU10qPyk+Pyg/OlxccytbJ1wiXShbXFxzXFxTXSo/KVsnXCJdKT9cXHMqLztcblxuLy9pbmxpbmUubGluayA9IHJlcGxhY2UoaW5saW5lLmxpbmspXG4vLyAgKCdpbnNpZGUnLCBpbmxpbmUuX2luc2lkZSlcbi8vICAoJ2hyZWYnLCBpbmxpbmUuX2hyZWYpXG4vLyAgKCk7XG4vL1xuLy9pbmxpbmUucmVmbGluayA9IHJlcGxhY2UoaW5saW5lLnJlZmxpbmspXG4vLyAgKCdpbnNpZGUnLCBpbmxpbmUuX2luc2lkZSlcbi8vICAoKTtcblxuLyoqXG4gKiBOb3JtYWwgSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUubm9ybWFsID0gbWVyZ2Uoe30sIGlubGluZSk7XG5cbi8qKlxuICogUGVkYW50aWMgSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUucGVkYW50aWMgPSBtZXJnZSh7fSwgaW5saW5lLm5vcm1hbCwge1xuICBzdHJvbmc6IC9eX18oPz1cXFMpKFtcXHNcXFNdKj9cXFMpX18oPyFfKXxeXFwqXFwqKD89XFxTKShbXFxzXFxTXSo/XFxTKVxcKlxcKig/IVxcKikvLFxuICBlbTogL15fKD89XFxTKShbXFxzXFxTXSo/XFxTKV8oPyFfKXxeXFwqKD89XFxTKShbXFxzXFxTXSo/XFxTKVxcKig/IVxcKikvXG59KTtcblxuLyoqXG4gKiBHRk0gSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUuZ2ZtID0gbWVyZ2Uoe30sIGlubGluZS5ub3JtYWwsIHtcbiAgZXNjYXBlOiByZXBsYWNlKGlubGluZS5lc2NhcGUpKCddKScsICd+fF0pJykoKSxcbiAgLy91cmw6IC9eKGh0dHBzPzpcXC9cXC9bXlxcczxdK1tePC4sOjtcIicpXFxdXFxzXSkvLFxuICAvL2RlbDogL15+fig/PVxcUykoW1xcc1xcU10qP1xcUyl+fi8sXG4gIHRleHQ6IHJlcGxhY2UoaW5saW5lLnRleHQpXG4gICAgKCddfCcsICd+XXwnKVxuICAgICgnfCcsICd8aHR0cHM/Oi8vfCcpXG4gICAgKClcbn0pO1xuXG4vKipcbiAqIEdGTSArIExpbmUgQnJlYWtzIElubGluZSBHcmFtbWFyXG4gKi9cblxuaW5saW5lLmJyZWFrcyA9IG1lcmdlKHt9LCBpbmxpbmUuZ2ZtLCB7XG4gIGJyOiByZXBsYWNlKGlubGluZS5icikoJ3syLH0nLCAnKicpKCksXG4gIHRleHQ6IHJlcGxhY2UoaW5saW5lLmdmbS50ZXh0KSgnezIsfScsICcqJykoKVxufSk7XG5cbi8qKlxuICogSW5saW5lIExleGVyICYgQ29tcGlsZXJcbiAqL1xuXG5mdW5jdGlvbiBJbmxpbmVMZXhlcihsaW5rcywgb3B0aW9ucykge1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IG1hcmtlZC5kZWZhdWx0cztcbiAgdGhpcy5saW5rcyA9IGxpbmtzO1xuICB0aGlzLnJ1bGVzID0gaW5saW5lLm5vcm1hbDtcbiAgdGhpcy5yZW5kZXJlciA9IHRoaXMub3B0aW9ucy5yZW5kZXJlciB8fCBuZXcgUmVuZGVyZXI7XG4gIHRoaXMucmVuZGVyZXIub3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblxuICBpZiAoIXRoaXMubGlua3MpIHtcbiAgICB0aHJvdyBuZXdcbiAgICAgIEVycm9yKCdUb2tlbnMgYXJyYXkgcmVxdWlyZXMgYSBgbGlua3NgIHByb3BlcnR5LicpO1xuICB9XG5cbiAgaWYgKHRoaXMub3B0aW9ucy5nZm0pIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmJyZWFrcykge1xuICAgICAgdGhpcy5ydWxlcyA9IGlubGluZS5icmVha3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucnVsZXMgPSBpbmxpbmUuZ2ZtO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMucGVkYW50aWMpIHtcbiAgICB0aGlzLnJ1bGVzID0gaW5saW5lLnBlZGFudGljO1xuICB9XG59XG5cbi8qKlxuICogRXhwb3NlIElubGluZSBSdWxlc1xuICovXG5cbklubGluZUxleGVyLnJ1bGVzID0gaW5saW5lO1xuXG4vKipcbiAqIFN0YXRpYyBMZXhpbmcvQ29tcGlsaW5nIE1ldGhvZFxuICovXG5cbklubGluZUxleGVyLm91dHB1dCA9IGZ1bmN0aW9uKHNyYywgbGlua3MsIG9wdGlvbnMpIHtcbiAgdmFyIGlubGluZSA9IG5ldyBJbmxpbmVMZXhlcihsaW5rcywgb3B0aW9ucyk7XG4gIHJldHVybiBpbmxpbmUub3V0cHV0KHNyYyk7XG59O1xuXG4vKipcbiAqIExleGluZy9Db21waWxpbmdcbiAqL1xuXG5JbmxpbmVMZXhlci5wcm90b3R5cGUub3V0cHV0ID0gZnVuY3Rpb24oc3JjKSB7XG4gIHZhciBvdXQgPSAnJ1xuICAgICwgbGlua1xuICAgICwgdGV4dFxuICAgICwgaHJlZlxuICAgICwgY2FwO1xuXG4gIHdoaWxlIChzcmMpIHtcbiAgICAvLyBlc2NhcGVcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5lc2NhcGUuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IGNhcFsxXTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGF1dG9saW5rXG4gICAgLy9pZiAoY2FwID0gdGhpcy5ydWxlcy5hdXRvbGluay5leGVjKHNyYykpIHtcbiAgICAvLyAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAvLyAgaWYgKGNhcFsyXSA9PT0gJ0AnKSB7XG4gICAgLy8gICAgdGV4dCA9IGNhcFsxXS5jaGFyQXQoNikgPT09ICc6J1xuICAgIC8vICAgICAgPyB0aGlzLm1hbmdsZShjYXBbMV0uc3Vic3RyaW5nKDcpKVxuICAgIC8vICAgICAgOiB0aGlzLm1hbmdsZShjYXBbMV0pO1xuICAgIC8vICAgIGhyZWYgPSB0aGlzLm1hbmdsZSgnbWFpbHRvOicpICsgdGV4dDtcbiAgICAvLyAgfSBlbHNlIHtcbiAgICAvLyAgICB0ZXh0ID0gZXNjYXBlKGNhcFsxXSk7XG4gICAgLy8gICAgaHJlZiA9IHRleHQ7XG4gICAgLy8gIH1cbiAgICAvLyAgb3V0ICs9IHRoaXMucmVuZGVyZXIubGluayhocmVmLCBudWxsLCB0ZXh0KTtcbiAgICAvLyAgY29udGludWU7XG4gICAgLy99XG5cbiAgICAvLyB1cmwgKGdmbSlcbiAgICAvL2lmICghdGhpcy5pbkxpbmsgJiYgKGNhcCA9IHRoaXMucnVsZXMudXJsLmV4ZWMoc3JjKSkpIHtcbiAgICAvLyAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAvLyAgdGV4dCA9IGVzY2FwZShjYXBbMV0pO1xuICAgIC8vICBocmVmID0gdGV4dDtcbiAgICAvLyAgb3V0ICs9IHRoaXMucmVuZGVyZXIubGluayhocmVmLCBudWxsLCB0ZXh0KTtcbiAgICAvLyAgY29udGludWU7XG4gICAgLy99XG5cbiAgICAvL3RhZ1xuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLnRhZy5leGVjKHNyYykpIHtcbiAgICAgIGlmICghdGhpcy5pbkxpbmsgJiYgL148YSAvaS50ZXN0KGNhcFswXSkpIHtcbiAgICAgICAgdGhpcy5pbkxpbmsgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmluTGluayAmJiAvXjxcXC9hPi9pLnRlc3QoY2FwWzBdKSkge1xuICAgICAgICB0aGlzLmluTGluayA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSB0aGlzLm9wdGlvbnMuc2FuaXRpemVcbiAgICAgICAgPyBlc2NhcGUoY2FwWzBdKVxuICAgICAgICA6IGNhcFswXTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGxpbmtcbiAgICAvL2lmIChjYXAgPSB0aGlzLnJ1bGVzLmxpbmsuZXhlYyhzcmMpKSB7XG4gICAgLy8gIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgLy8gIHRoaXMuaW5MaW5rID0gdHJ1ZTtcbiAgICAvLyAgb3V0ICs9IHRoaXMub3V0cHV0TGluayhjYXAsIHtcbiAgICAvLyAgICBocmVmOiBjYXBbMl0sXG4gICAgLy8gICAgdGl0bGU6IGNhcFszXVxuICAgIC8vICB9KTtcbiAgICAvLyAgdGhpcy5pbkxpbmsgPSBmYWxzZTtcbiAgICAvLyAgY29udGludWU7XG4gICAgLy99XG5cbiAgICAvLyByZWZsaW5rLCBub2xpbmtcbiAgICAvL2lmICgoY2FwID0gdGhpcy5ydWxlcy5yZWZsaW5rLmV4ZWMoc3JjKSlcbiAgICAvLyAgICB8fCAoY2FwID0gdGhpcy5ydWxlcy5ub2xpbmsuZXhlYyhzcmMpKSkge1xuICAgIC8vICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgIC8vICBsaW5rID0gKGNhcFsyXSB8fCBjYXBbMV0pLnJlcGxhY2UoL1xccysvZywgJyAnKTtcbiAgICAvLyAgbGluayA9IHRoaXMubGlua3NbbGluay50b0xvd2VyQ2FzZSgpXTtcbiAgICAvLyAgaWYgKCFsaW5rIHx8ICFsaW5rLmhyZWYpIHtcbiAgICAvLyAgICBvdXQgKz0gY2FwWzBdLmNoYXJBdCgwKTtcbiAgICAvLyAgICBzcmMgPSBjYXBbMF0uc3Vic3RyaW5nKDEpICsgc3JjO1xuICAgIC8vICAgIGNvbnRpbnVlO1xuICAgIC8vICB9XG4gICAgLy8gIHRoaXMuaW5MaW5rID0gdHJ1ZTtcbiAgICAvLyAgb3V0ICs9IHRoaXMub3V0cHV0TGluayhjYXAsIGxpbmspO1xuICAgIC8vICB0aGlzLmluTGluayA9IGZhbHNlO1xuICAgIC8vICBjb250aW51ZTtcbiAgICAvL31cblxuICAgIC8vIHN0cm9uZ1xuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLnN0cm9uZy5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5zdHJvbmcodGhpcy5vdXRwdXQoY2FwWzJdIHx8IGNhcFsxXSkpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gZW1cbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5lbS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5lbSh0aGlzLm91dHB1dChjYXBbMl0gfHwgY2FwWzFdKSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBjb2RlXG4gICAgLy9pZiAoY2FwID0gdGhpcy5ydWxlcy5jb2RlLmV4ZWMoc3JjKSkge1xuICAgIC8vICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgIC8vICBvdXQgKz0gdGhpcy5yZW5kZXJlci5jb2Rlc3Bhbihlc2NhcGUoY2FwWzJdLCB0cnVlKSk7XG4gICAgLy8gIGNvbnRpbnVlO1xuICAgIC8vfVxuXG4gICAgLy8gYnJcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5ici5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5icigpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gZGVsIChnZm0pXG4gICAgLy9pZiAoY2FwID0gdGhpcy5ydWxlcy5kZWwuZXhlYyhzcmMpKSB7XG4gICAgLy8gIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgLy8gIG91dCArPSB0aGlzLnJlbmRlcmVyLmRlbCh0aGlzLm91dHB1dChjYXBbMV0pKTtcbiAgICAvLyAgY29udGludWU7XG4gICAgLy99XG5cbiAgICAvLyB0ZXh0XG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMudGV4dC5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gZXNjYXBlKHRoaXMuc21hcnR5cGFudHMoY2FwWzBdKSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoc3JjKSB7XG4gICAgICB0aHJvdyBuZXdcbiAgICAgICAgRXJyb3IoJ0luZmluaXRlIGxvb3Agb24gYnl0ZTogJyArIHNyYy5jaGFyQ29kZUF0KDApKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDb21waWxlIExpbmtcbiAqL1xuXG4vL0lubGluZUxleGVyLnByb3RvdHlwZS5vdXRwdXRMaW5rID0gZnVuY3Rpb24oY2FwLCBsaW5rKSB7XG4vLyAgdmFyIGhyZWYgPSBlc2NhcGUobGluay5ocmVmKVxuLy8gICAgLCB0aXRsZSA9IGxpbmsudGl0bGUgPyBlc2NhcGUobGluay50aXRsZSkgOiBudWxsO1xuLy9cbi8vICByZXR1cm4gY2FwWzBdLmNoYXJBdCgwKSAhPT0gJyEnXG4vLyAgICA/IHRoaXMucmVuZGVyZXIubGluayhocmVmLCB0aXRsZSwgdGhpcy5vdXRwdXQoY2FwWzFdKSlcbi8vICAgIDogdGhpcy5yZW5kZXJlci5pbWFnZShocmVmLCB0aXRsZSwgZXNjYXBlKGNhcFsxXSkpO1xuLy99O1xuXG4vKipcbiAqIFNtYXJ0eXBhbnRzIFRyYW5zZm9ybWF0aW9uc1xuICovXG5cbklubGluZUxleGVyLnByb3RvdHlwZS5zbWFydHlwYW50cyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgaWYgKCF0aGlzLm9wdGlvbnMuc21hcnR5cGFudHMpIHJldHVybiB0ZXh0O1xuICByZXR1cm4gdGV4dFxuICAgIC8vIGVtLWRhc2hlc1xuICAgIC5yZXBsYWNlKC8tLS9nLCAnXFx1MjAxNCcpXG4gICAgLy8gb3BlbmluZyBzaW5nbGVzXG4gICAgLnJlcGxhY2UoLyhefFstXFx1MjAxNC8oXFxbe1wiXFxzXSknL2csICckMVxcdTIwMTgnKVxuICAgIC8vIGNsb3Npbmcgc2luZ2xlcyAmIGFwb3N0cm9waGVzXG4gICAgLnJlcGxhY2UoLycvZywgJ1xcdTIwMTknKVxuICAgIC8vIG9wZW5pbmcgZG91Ymxlc1xuICAgIC5yZXBsYWNlKC8oXnxbLVxcdTIwMTQvKFxcW3tcXHUyMDE4XFxzXSlcIi9nLCAnJDFcXHUyMDFjJylcbiAgICAvLyBjbG9zaW5nIGRvdWJsZXNcbiAgICAucmVwbGFjZSgvXCIvZywgJ1xcdTIwMWQnKVxuICAgIC8vIGVsbGlwc2VzXG4gICAgLnJlcGxhY2UoL1xcLnszfS9nLCAnXFx1MjAyNicpO1xufTtcblxuLyoqXG4gKiBNYW5nbGUgTGlua3NcbiAqL1xuXG5JbmxpbmVMZXhlci5wcm90b3R5cGUubWFuZ2xlID0gZnVuY3Rpb24odGV4dCkge1xuICB2YXIgb3V0ID0gJydcbiAgICAsIGwgPSB0ZXh0Lmxlbmd0aFxuICAgICwgaSA9IDBcbiAgICAsIGNoO1xuXG4gIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgY2ggPSB0ZXh0LmNoYXJDb2RlQXQoaSk7XG4gICAgaWYgKE1hdGgucmFuZG9tKCkgPiAwLjUpIHtcbiAgICAgIGNoID0gJ3gnICsgY2gudG9TdHJpbmcoMTYpO1xuICAgIH1cbiAgICBvdXQgKz0gJyYjJyArIGNoICsgJzsnO1xuICB9XG5cbiAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUmVuZGVyZXJcbiAqL1xuXG5mdW5jdGlvbiBSZW5kZXJlcihvcHRpb25zKSB7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG59XG5cbi8vUmVuZGVyZXIucHJvdG90eXBlLmNvZGUgPSBmdW5jdGlvbihjb2RlLCBsYW5nLCBlc2NhcGVkKSB7XG4vLyAgaWYgKHRoaXMub3B0aW9ucy5oaWdobGlnaHQpIHtcbi8vICAgIHZhciBvdXQgPSB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0KGNvZGUsIGxhbmcpO1xuLy8gICAgaWYgKG91dCAhPSBudWxsICYmIG91dCAhPT0gY29kZSkge1xuLy8gICAgICBlc2NhcGVkID0gdHJ1ZTtcbi8vICAgICAgY29kZSA9IG91dDtcbi8vICAgIH1cbi8vICB9XG4vL1xuLy8gIGlmICghbGFuZykge1xuLy8gICAgcmV0dXJuICc8cHJlPjxjb2RlPidcbi8vICAgICAgKyAoZXNjYXBlZCA/IGNvZGUgOiBlc2NhcGUoY29kZSwgdHJ1ZSkpXG4vLyAgICAgICsgJ1xcbjwvY29kZT48L3ByZT4nO1xuLy8gIH1cbi8vXG4vLyAgcmV0dXJuICc8cHJlPjxjb2RlIGNsYXNzPVwiJ1xuLy8gICAgKyB0aGlzLm9wdGlvbnMubGFuZ1ByZWZpeFxuLy8gICAgKyBlc2NhcGUobGFuZywgdHJ1ZSlcbi8vICAgICsgJ1wiPidcbi8vICAgICsgKGVzY2FwZWQgPyBjb2RlIDogZXNjYXBlKGNvZGUsIHRydWUpKVxuLy8gICAgKyAnXFxuPC9jb2RlPjwvcHJlPlxcbic7XG4vL307XG5cbi8vUmVuZGVyZXIucHJvdG90eXBlLmJsb2NrcXVvdGUgPSBmdW5jdGlvbihxdW90ZSkge1xuLy8gIHJldHVybiAnPGJsb2NrcXVvdGU+XFxuJyArIHF1b3RlICsgJzwvYmxvY2txdW90ZT5cXG4nO1xuLy99O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuaHRtbCA9IGZ1bmN0aW9uKGh0bWwpIHtcbiAgcmV0dXJuIGh0bWw7XG59O1xuXG4vL1JlbmRlcmVyLnByb3RvdHlwZS5oZWFkaW5nID0gZnVuY3Rpb24odGV4dCwgbGV2ZWwsIHJhdykge1xuLy8gIHJldHVybiAnPGgnXG4vLyAgICArIGxldmVsXG4vLyAgICArICcgaWQ9XCInXG4vLyAgICArIHRoaXMub3B0aW9ucy5oZWFkZXJQcmVmaXhcbi8vICAgICsgcmF3LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvW15cXHddKy9nLCAnLScpXG4vLyAgICArICdcIj4nXG4vLyAgICArIHRleHRcbi8vICAgICsgJzwvaCdcbi8vICAgICsgbGV2ZWxcbi8vICAgICsgJz5cXG4nO1xuLy99O1xuXG4vL1JlbmRlcmVyLnByb3RvdHlwZS5ociA9IGZ1bmN0aW9uKCkge1xuLy8gIHJldHVybiB0aGlzLm9wdGlvbnMueGh0bWwgPyAnPGhyLz5cXG4nIDogJzxocj5cXG4nO1xuLy99O1xuXG5SZW5kZXJlci5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uKGJvZHksIG9yZGVyZWQpIHtcbiAgdmFyIHR5cGUgPSBvcmRlcmVkID8gJ29sJyA6ICd1bCc7XG4gIHJldHVybiAnPCcgKyB0eXBlICsgJz5cXG4nICsgYm9keSArICc8LycgKyB0eXBlICsgJz5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmxpc3RpdGVtID0gZnVuY3Rpb24odGV4dCkge1xuICByZXR1cm4gJzxsaT4nICsgdGV4dCArICc8L2xpPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUucGFyYWdyYXBoID0gZnVuY3Rpb24odGV4dCkge1xuICByZXR1cm4gJzxwPicgKyB0ZXh0ICsgJzwvcD5cXG4nO1xufTtcblxuLy9SZW5kZXJlci5wcm90b3R5cGUudGFibGUgPSBmdW5jdGlvbihoZWFkZXIsIGJvZHkpIHtcbi8vICByZXR1cm4gJzx0YWJsZT5cXG4nXG4vLyAgICArICc8dGhlYWQ+XFxuJ1xuLy8gICAgKyBoZWFkZXJcbi8vICAgICsgJzwvdGhlYWQ+XFxuJ1xuLy8gICAgKyAnPHRib2R5Plxcbidcbi8vICAgICsgYm9keVxuLy8gICAgKyAnPC90Ym9keT5cXG4nXG4vLyAgICArICc8L3RhYmxlPlxcbic7XG4vL307XG5cbi8vUmVuZGVyZXIucHJvdG90eXBlLnRhYmxlcm93ID0gZnVuY3Rpb24oY29udGVudCkge1xuLy8gIHJldHVybiAnPHRyPlxcbicgKyBjb250ZW50ICsgJzwvdHI+XFxuJztcbi8vfTtcblxuLy9SZW5kZXJlci5wcm90b3R5cGUudGFibGVjZWxsID0gZnVuY3Rpb24oY29udGVudCwgZmxhZ3MpIHtcbi8vICB2YXIgdHlwZSA9IGZsYWdzLmhlYWRlciA/ICd0aCcgOiAndGQnO1xuLy8gIHZhciB0YWcgPSBmbGFncy5hbGlnblxuLy8gICAgPyAnPCcgKyB0eXBlICsgJyBzdHlsZT1cInRleHQtYWxpZ246JyArIGZsYWdzLmFsaWduICsgJ1wiPidcbi8vICAgIDogJzwnICsgdHlwZSArICc+Jztcbi8vICByZXR1cm4gdGFnICsgY29udGVudCArICc8LycgKyB0eXBlICsgJz5cXG4nO1xuLy99O1xuXG4vLyBzcGFuIGxldmVsIHJlbmRlcmVyXG5SZW5kZXJlci5wcm90b3R5cGUuc3Ryb25nID0gZnVuY3Rpb24odGV4dCkge1xuICByZXR1cm4gJzxzdHJvbmc+JyArIHRleHQgKyAnPC9zdHJvbmc+Jztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5lbSA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuICc8ZW0+JyArIHRleHQgKyAnPC9lbT4nO1xufTtcblxuLy9SZW5kZXJlci5wcm90b3R5cGUuY29kZXNwYW4gPSBmdW5jdGlvbih0ZXh0KSB7XG4vLyAgcmV0dXJuICc8Y29kZT4nICsgdGV4dCArICc8L2NvZGU+Jztcbi8vfTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmJyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm9wdGlvbnMueGh0bWwgPyAnPGJyLz4nIDogJzxicj4nO1xufTtcblxuLy9SZW5kZXJlci5wcm90b3R5cGUuZGVsID0gZnVuY3Rpb24odGV4dCkge1xuLy8gIHJldHVybiAnPGRlbD4nICsgdGV4dCArICc8L2RlbD4nO1xuLy99O1xuXG4vL1JlbmRlcmVyLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24oaHJlZiwgdGl0bGUsIHRleHQpIHtcbi8vICBpZiAodGhpcy5vcHRpb25zLnNhbml0aXplKSB7XG4vLyAgICB0cnkge1xuLy8gICAgICB2YXIgcHJvdCA9IGRlY29kZVVSSUNvbXBvbmVudCh1bmVzY2FwZShocmVmKSlcbi8vICAgICAgICAucmVwbGFjZSgvW15cXHc6XS9nLCAnJylcbi8vICAgICAgICAudG9Mb3dlckNhc2UoKTtcbi8vICAgIH0gY2F0Y2ggKGUpIHtcbi8vICAgICAgcmV0dXJuICcnO1xuLy8gICAgfVxuLy8gICAgaWYgKHByb3QuaW5kZXhPZignamF2YXNjcmlwdDonKSA9PT0gMCB8fCBwcm90LmluZGV4T2YoJ3Zic2NyaXB0OicpID09PSAwKSB7XG4vLyAgICAgIHJldHVybiAnJztcbi8vICAgIH1cbi8vICB9XG4vLyAgdmFyIG91dCA9ICc8YSBocmVmPVwiJyArIGhyZWYgKyAnXCInO1xuLy8gIGlmICh0aXRsZSkge1xuLy8gICAgb3V0ICs9ICcgdGl0bGU9XCInICsgdGl0bGUgKyAnXCInO1xuLy8gIH1cbi8vICBvdXQgKz0gJz4nICsgdGV4dCArICc8L2E+Jztcbi8vICByZXR1cm4gb3V0O1xuLy99O1xuXG4vL1JlbmRlcmVyLnByb3RvdHlwZS5pbWFnZSA9IGZ1bmN0aW9uKGhyZWYsIHRpdGxlLCB0ZXh0KSB7XG4vLyAgdmFyIG91dCA9ICc8aW1nIHNyYz1cIicgKyBocmVmICsgJ1wiIGFsdD1cIicgKyB0ZXh0ICsgJ1wiJztcbi8vICBpZiAodGl0bGUpIHtcbi8vICAgIG91dCArPSAnIHRpdGxlPVwiJyArIHRpdGxlICsgJ1wiJztcbi8vICB9XG4vLyAgb3V0ICs9IHRoaXMub3B0aW9ucy54aHRtbCA/ICcvPicgOiAnPic7XG4vLyAgcmV0dXJuIG91dDtcbi8vfTtcblxuLyoqXG4gKiBQYXJzaW5nICYgQ29tcGlsaW5nXG4gKi9cblxuZnVuY3Rpb24gUGFyc2VyKG9wdGlvbnMpIHtcbiAgdGhpcy50b2tlbnMgPSBbXTtcbiAgdGhpcy50b2tlbiA9IG51bGw7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwgbWFya2VkLmRlZmF1bHRzO1xuICB0aGlzLm9wdGlvbnMucmVuZGVyZXIgPSB0aGlzLm9wdGlvbnMucmVuZGVyZXIgfHwgbmV3IFJlbmRlcmVyO1xuICB0aGlzLnJlbmRlcmVyID0gdGhpcy5vcHRpb25zLnJlbmRlcmVyO1xuICB0aGlzLnJlbmRlcmVyLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG59XG5cbi8qKlxuICogU3RhdGljIFBhcnNlIE1ldGhvZFxuICovXG5cblBhcnNlci5wYXJzZSA9IGZ1bmN0aW9uKHNyYywgb3B0aW9ucywgcmVuZGVyZXIpIHtcbiAgdmFyIHBhcnNlciA9IG5ldyBQYXJzZXIob3B0aW9ucywgcmVuZGVyZXIpO1xuICByZXR1cm4gcGFyc2VyLnBhcnNlKHNyYyk7XG59O1xuXG4vKipcbiAqIFBhcnNlIExvb3BcbiAqL1xuXG5QYXJzZXIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24oc3JjKSB7XG4gIHRoaXMuaW5saW5lID0gbmV3IElubGluZUxleGVyKHNyYy5saW5rcywgdGhpcy5vcHRpb25zLCB0aGlzLnJlbmRlcmVyKTtcbiAgdGhpcy50b2tlbnMgPSBzcmMucmV2ZXJzZSgpO1xuXG4gIHZhciBvdXQgPSAnJztcbiAgd2hpbGUgKHRoaXMubmV4dCgpKSB7XG4gICAgb3V0ICs9IHRoaXMudG9rKCk7XG4gIH1cblxuICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBOZXh0IFRva2VuXG4gKi9cblxuUGFyc2VyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnRva2VuID0gdGhpcy50b2tlbnMucG9wKCk7XG59O1xuXG4vKipcbiAqIFByZXZpZXcgTmV4dCBUb2tlblxuICovXG5cblBhcnNlci5wcm90b3R5cGUucGVlayA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy50b2tlbnNbdGhpcy50b2tlbnMubGVuZ3RoIC0gMV0gfHwgMDtcbn07XG5cbi8qKlxuICogUGFyc2UgVGV4dCBUb2tlbnNcbiAqL1xuXG5QYXJzZXIucHJvdG90eXBlLnBhcnNlVGV4dCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYm9keSA9IHRoaXMudG9rZW4udGV4dDtcblxuICB3aGlsZSAodGhpcy5wZWVrKCkudHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgYm9keSArPSAnXFxuJyArIHRoaXMubmV4dCgpLnRleHQ7XG4gIH1cblxuICByZXR1cm4gdGhpcy5pbmxpbmUub3V0cHV0KGJvZHkpO1xufTtcblxuLyoqXG4gKiBQYXJzZSBDdXJyZW50IFRva2VuXG4gKi9cblxuUGFyc2VyLnByb3RvdHlwZS50b2sgPSBmdW5jdGlvbigpIHtcbiAgc3dpdGNoICh0aGlzLnRva2VuLnR5cGUpIHtcbiAgICBjYXNlICdzcGFjZSc6IHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgLy9jYXNlICdocic6IHtcbiAgICAvLyAgcmV0dXJuIHRoaXMucmVuZGVyZXIuaHIoKTtcbiAgICAvL31cbiAgICAvL2Nhc2UgJ2hlYWRpbmcnOiB7XG4gICAgLy8gIHJldHVybiB0aGlzLnJlbmRlcmVyLmhlYWRpbmcoXG4gICAgLy8gICAgdGhpcy5pbmxpbmUub3V0cHV0KHRoaXMudG9rZW4udGV4dCksXG4gICAgLy8gICAgdGhpcy50b2tlbi5kZXB0aCxcbiAgICAvLyAgICB0aGlzLnRva2VuLnRleHQpO1xuICAgIC8vfVxuICAgIC8vY2FzZSAnY29kZSc6IHtcbiAgICAvLyAgcmV0dXJuIHRoaXMucmVuZGVyZXIuY29kZSh0aGlzLnRva2VuLnRleHQsXG4gICAgLy8gICAgdGhpcy50b2tlbi5sYW5nLFxuICAgIC8vICAgIHRoaXMudG9rZW4uZXNjYXBlZCk7XG4gICAgLy99XG4gICAgLy9jYXNlICd0YWJsZSc6IHtcbiAgICAvLyAgdmFyIGhlYWRlciA9ICcnXG4gICAgLy8gICAgLCBib2R5ID0gJydcbiAgICAvLyAgICAsIGlcbiAgICAvLyAgICAsIHJvd1xuICAgIC8vICAgICwgY2VsbFxuICAgIC8vICAgICwgZmxhZ3NcbiAgICAvLyAgICAsIGo7XG4gICAgLy9cbiAgICAvLyAgLy8gaGVhZGVyXG4gICAgLy8gIGNlbGwgPSAnJztcbiAgICAvLyAgZm9yIChpID0gMDsgaSA8IHRoaXMudG9rZW4uaGVhZGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gICAgZmxhZ3MgPSB7IGhlYWRlcjogdHJ1ZSwgYWxpZ246IHRoaXMudG9rZW4uYWxpZ25baV0gfTtcbiAgICAvLyAgICBjZWxsICs9IHRoaXMucmVuZGVyZXIudGFibGVjZWxsKFxuICAgIC8vICAgICAgdGhpcy5pbmxpbmUub3V0cHV0KHRoaXMudG9rZW4uaGVhZGVyW2ldKSxcbiAgICAvLyAgICAgIHsgaGVhZGVyOiB0cnVlLCBhbGlnbjogdGhpcy50b2tlbi5hbGlnbltpXSB9XG4gICAgLy8gICAgKTtcbiAgICAvLyAgfVxuICAgIC8vICBoZWFkZXIgKz0gdGhpcy5yZW5kZXJlci50YWJsZXJvdyhjZWxsKTtcbiAgICAvL1xuICAgIC8vICBmb3IgKGkgPSAwOyBpIDwgdGhpcy50b2tlbi5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgIC8vICAgIHJvdyA9IHRoaXMudG9rZW4uY2VsbHNbaV07XG4gICAgLy9cbiAgICAvLyAgICBjZWxsID0gJyc7XG4gICAgLy8gICAgZm9yIChqID0gMDsgaiA8IHJvdy5sZW5ndGg7IGorKykge1xuICAgIC8vICAgICAgY2VsbCArPSB0aGlzLnJlbmRlcmVyLnRhYmxlY2VsbChcbiAgICAvLyAgICAgICAgdGhpcy5pbmxpbmUub3V0cHV0KHJvd1tqXSksXG4gICAgLy8gICAgICAgIHsgaGVhZGVyOiBmYWxzZSwgYWxpZ246IHRoaXMudG9rZW4uYWxpZ25bal0gfVxuICAgIC8vICAgICAgKTtcbiAgICAvLyAgICB9XG4gICAgLy9cbiAgICAvLyAgICBib2R5ICs9IHRoaXMucmVuZGVyZXIudGFibGVyb3coY2VsbCk7XG4gICAgLy8gIH1cbiAgICAvLyAgcmV0dXJuIHRoaXMucmVuZGVyZXIudGFibGUoaGVhZGVyLCBib2R5KTtcbiAgICAvL31cbiAgICAvL2Nhc2UgJ2Jsb2NrcXVvdGVfc3RhcnQnOiB7XG4gICAgLy8gIHZhciBib2R5ID0gJyc7XG4gICAgLy9cbiAgICAvLyAgd2hpbGUgKHRoaXMubmV4dCgpLnR5cGUgIT09ICdibG9ja3F1b3RlX2VuZCcpIHtcbiAgICAvLyAgICBib2R5ICs9IHRoaXMudG9rKCk7XG4gICAgLy8gIH1cbiAgICAvL1xuICAgIC8vICByZXR1cm4gdGhpcy5yZW5kZXJlci5ibG9ja3F1b3RlKGJvZHkpO1xuICAgIC8vfVxuICAgIGNhc2UgJ2xpc3Rfc3RhcnQnOiB7XG4gICAgICB2YXIgYm9keSA9ICcnXG4gICAgICAgICwgb3JkZXJlZCA9IHRoaXMudG9rZW4ub3JkZXJlZDtcblxuICAgICAgd2hpbGUgKHRoaXMubmV4dCgpLnR5cGUgIT09ICdsaXN0X2VuZCcpIHtcbiAgICAgICAgYm9keSArPSB0aGlzLnRvaygpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5saXN0KGJvZHksIG9yZGVyZWQpO1xuICAgIH1cbiAgICBjYXNlICdsaXN0X2l0ZW1fc3RhcnQnOiB7XG4gICAgICB2YXIgYm9keSA9ICcnO1xuXG4gICAgICB3aGlsZSAodGhpcy5uZXh0KCkudHlwZSAhPT0gJ2xpc3RfaXRlbV9lbmQnKSB7XG4gICAgICAgIGJvZHkgKz0gdGhpcy50b2tlbi50eXBlID09PSAndGV4dCdcbiAgICAgICAgICA/IHRoaXMucGFyc2VUZXh0KClcbiAgICAgICAgICA6IHRoaXMudG9rKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmxpc3RpdGVtKGJvZHkpO1xuICAgIH1cbiAgICBjYXNlICdsb29zZV9pdGVtX3N0YXJ0Jzoge1xuICAgICAgdmFyIGJvZHkgPSAnJztcblxuICAgICAgd2hpbGUgKHRoaXMubmV4dCgpLnR5cGUgIT09ICdsaXN0X2l0ZW1fZW5kJykge1xuICAgICAgICBib2R5ICs9IHRoaXMudG9rKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmxpc3RpdGVtKGJvZHkpO1xuICAgIH1cbiAgICBjYXNlICdodG1sJzoge1xuICAgICAgdmFyIGh0bWwgPSAhdGhpcy50b2tlbi5wcmUgJiYgIXRoaXMub3B0aW9ucy5wZWRhbnRpY1xuICAgICAgICA/IHRoaXMuaW5saW5lLm91dHB1dCh0aGlzLnRva2VuLnRleHQpXG4gICAgICAgIDogdGhpcy50b2tlbi50ZXh0O1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuaHRtbChodG1sKTtcbiAgICB9XG4gICAgY2FzZSAncGFyYWdyYXBoJzoge1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIucGFyYWdyYXBoKHRoaXMuaW5saW5lLm91dHB1dCh0aGlzLnRva2VuLnRleHQpKTtcbiAgICB9XG4gICAgY2FzZSAndGV4dCc6IHtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLnBhcmFncmFwaCh0aGlzLnBhcnNlVGV4dCgpKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogSGVscGVyc1xuICovXG5cbmZ1bmN0aW9uIGVzY2FwZShodG1sLCBlbmNvZGUpIHtcbiAgcmV0dXJuIGh0bWxcbiAgICAucmVwbGFjZSghZW5jb2RlID8gLyYoPyEjP1xcdys7KS9nIDogLyYvZywgJyZhbXA7JylcbiAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKVxuICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcbiAgICAucmVwbGFjZSgvJy9nLCAnJiMzOTsnKTtcbn1cblxuZnVuY3Rpb24gdW5lc2NhcGUoaHRtbCkge1xuICByZXR1cm4gaHRtbC5yZXBsYWNlKC8mKFsjXFx3XSspOy9nLCBmdW5jdGlvbihfLCBuKSB7XG4gICAgbiA9IG4udG9Mb3dlckNhc2UoKTtcbiAgICBpZiAobiA9PT0gJ2NvbG9uJykgcmV0dXJuICc6JztcbiAgICBpZiAobi5jaGFyQXQoMCkgPT09ICcjJykge1xuICAgICAgcmV0dXJuIG4uY2hhckF0KDEpID09PSAneCdcbiAgICAgICAgPyBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KG4uc3Vic3RyaW5nKDIpLCAxNikpXG4gICAgICAgIDogU3RyaW5nLmZyb21DaGFyQ29kZSgrbi5zdWJzdHJpbmcoMSkpO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlKHJlZ2V4LCBvcHQpIHtcbiAgcmVnZXggPSByZWdleC5zb3VyY2U7XG4gIG9wdCA9IG9wdCB8fCAnJztcbiAgcmV0dXJuIGZ1bmN0aW9uIHNlbGYobmFtZSwgdmFsKSB7XG4gICAgaWYgKCFuYW1lKSByZXR1cm4gbmV3IFJlZ0V4cChyZWdleCwgb3B0KTtcbiAgICB2YWwgPSB2YWwuc291cmNlIHx8IHZhbDtcbiAgICB2YWwgPSB2YWwucmVwbGFjZSgvKF58W15cXFtdKVxcXi9nLCAnJDEnKTtcbiAgICByZWdleCA9IHJlZ2V4LnJlcGxhY2UobmFtZSwgdmFsKTtcbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5ub29wLmV4ZWMgPSBub29wO1xuXG5mdW5jdGlvbiBtZXJnZShvYmopIHtcbiAgdmFyIGkgPSAxXG4gICAgLCB0YXJnZXRcbiAgICAsIGtleTtcblxuICBmb3IgKDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHRhcmdldCA9IGFyZ3VtZW50c1tpXTtcbiAgICBmb3IgKGtleSBpbiB0YXJnZXQpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGFyZ2V0LCBrZXkpKSB7XG4gICAgICAgIG9ialtrZXldID0gdGFyZ2V0W2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuXG4vKipcbiAqIE1hcmtlZFxuICovXG5cbmZ1bmN0aW9uIG1hcmtlZChzcmMsIG9wdCwgY2FsbGJhY2spIHtcbiAgaWYgKGNhbGxiYWNrIHx8IHR5cGVvZiBvcHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayA9IG9wdDtcbiAgICAgIG9wdCA9IG51bGw7XG4gICAgfVxuXG4gICAgb3B0ID0gbWVyZ2Uoe30sIG1hcmtlZC5kZWZhdWx0cywgb3B0IHx8IHt9KTtcblxuICAgIHZhciBoaWdobGlnaHQgPSBvcHQuaGlnaGxpZ2h0XG4gICAgICAsIHRva2Vuc1xuICAgICAgLCBwZW5kaW5nXG4gICAgICAsIGkgPSAwO1xuXG4gICAgdHJ5IHtcbiAgICAgIHRva2VucyA9IExleGVyLmxleChzcmMsIG9wdClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZSk7XG4gICAgfVxuXG4gICAgcGVuZGluZyA9IHRva2Vucy5sZW5ndGg7XG5cbiAgICB2YXIgZG9uZSA9IGZ1bmN0aW9uKGVycikge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBvcHQuaGlnaGxpZ2h0ID0gaGlnaGxpZ2h0O1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgIH1cblxuICAgICAgdmFyIG91dDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgb3V0ID0gUGFyc2VyLnBhcnNlKHRva2Vucywgb3B0KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZXJyID0gZTtcbiAgICAgIH1cblxuICAgICAgb3B0LmhpZ2hsaWdodCA9IGhpZ2hsaWdodDtcblxuICAgICAgcmV0dXJuIGVyclxuICAgICAgICA/IGNhbGxiYWNrKGVycilcbiAgICAgICAgOiBjYWxsYmFjayhudWxsLCBvdXQpO1xuICAgIH07XG5cbiAgICBpZiAoIWhpZ2hsaWdodCB8fCBoaWdobGlnaHQubGVuZ3RoIDwgMykge1xuICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICB9XG5cbiAgICBkZWxldGUgb3B0LmhpZ2hsaWdodDtcblxuICAgIGlmICghcGVuZGluZykgcmV0dXJuIGRvbmUoKTtcblxuICAgIGZvciAoOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAoZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgIT09ICdjb2RlJykge1xuICAgICAgICAgIHJldHVybiAtLXBlbmRpbmcgfHwgZG9uZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoaWdobGlnaHQodG9rZW4udGV4dCwgdG9rZW4ubGFuZywgZnVuY3Rpb24oZXJyLCBjb2RlKSB7XG4gICAgICAgICAgaWYgKGVycikgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICBpZiAoY29kZSA9PSBudWxsIHx8IGNvZGUgPT09IHRva2VuLnRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiAtLXBlbmRpbmcgfHwgZG9uZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0b2tlbi50ZXh0ID0gY29kZTtcbiAgICAgICAgICB0b2tlbi5lc2NhcGVkID0gdHJ1ZTtcbiAgICAgICAgICAtLXBlbmRpbmcgfHwgZG9uZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pKHRva2Vuc1tpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuO1xuICB9XG4gIHRyeSB7XG4gICAgaWYgKG9wdCkgb3B0ID0gbWVyZ2Uoe30sIG1hcmtlZC5kZWZhdWx0cywgb3B0KTtcbiAgICByZXR1cm4gUGFyc2VyLnBhcnNlKExleGVyLmxleChzcmMsIG9wdCksIG9wdCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBlLm1lc3NhZ2UgKz0gJ1xcblBsZWFzZSByZXBvcnQgdGhpcyB0byBodHRwczovL2dpdGh1Yi5jb20vY2hqai9tYXJrZWQuJztcbiAgICBpZiAoKG9wdCB8fCBtYXJrZWQuZGVmYXVsdHMpLnNpbGVudCkge1xuICAgICAgcmV0dXJuICc8cD5BbiBlcnJvciBvY2N1cmVkOjwvcD48cHJlPidcbiAgICAgICAgKyBlc2NhcGUoZS5tZXNzYWdlICsgJycsIHRydWUpXG4gICAgICAgICsgJzwvcHJlPic7XG4gICAgfVxuICAgIHRocm93IGU7XG4gIH1cbn1cblxuLyoqXG4gKiBPcHRpb25zXG4gKi9cblxubWFya2VkLm9wdGlvbnMgPVxubWFya2VkLnNldE9wdGlvbnMgPSBmdW5jdGlvbihvcHQpIHtcbiAgbWVyZ2UobWFya2VkLmRlZmF1bHRzLCBvcHQpO1xuICByZXR1cm4gbWFya2VkO1xufTtcblxubWFya2VkLmRlZmF1bHRzID0ge1xuICBnZm06IHRydWUsXG4gIHRhYmxlczogZmFsc2UsXG4gIGJyZWFrczogZmFsc2UsXG4gIHBlZGFudGljOiBmYWxzZSxcbiAgc2FuaXRpemU6IGZhbHNlLFxuICBzbWFydExpc3RzOiBmYWxzZSxcbiAgc2lsZW50OiBmYWxzZSxcbiAgaGlnaGxpZ2h0OiBudWxsLFxuICBsYW5nUHJlZml4OiAnbGFuZy0nLFxuICBzbWFydHlwYW50czogZmFsc2UsXG4gIGhlYWRlclByZWZpeDogJycsXG4gIHJlbmRlcmVyOiBuZXcgUmVuZGVyZXIsXG4gIHhodG1sOiBmYWxzZVxufTtcblxuLyoqXG4gKiBFeHBvc2VcbiAqL1xuXG5tYXJrZWQuUGFyc2VyID0gUGFyc2VyO1xubWFya2VkLnBhcnNlciA9IFBhcnNlci5wYXJzZTtcblxubWFya2VkLlJlbmRlcmVyID0gUmVuZGVyZXI7XG5cbm1hcmtlZC5MZXhlciA9IExleGVyO1xubWFya2VkLmxleGVyID0gTGV4ZXIubGV4O1xuXG5tYXJrZWQuSW5saW5lTGV4ZXIgPSBJbmxpbmVMZXhlcjtcbm1hcmtlZC5pbmxpbmVMZXhlciA9IElubGluZUxleGVyLm91dHB1dDtcblxubWFya2VkLnBhcnNlID0gbWFya2VkO1xuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gbWFya2VkO1xufSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gbWFya2VkOyB9KTtcbn0gZWxzZSB7XG4gIHRoaXMubWFya2VkID0gbWFya2VkO1xufVxuXG59KS5jYWxsKGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcyB8fCAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWwpO1xufSgpKTtcbiJdfQ==
},{}]},{},["./packages/entities/src/index.js","./packages/extensionml/src/index.js","./packages/renderer/src/index.js","./packages/messageml-renderer/src/index.js"])
//# sourceMappingURL=renderer.js.map
