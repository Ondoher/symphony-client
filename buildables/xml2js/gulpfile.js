var requireDir = require('require-dir');
global.CONFIG = require('./config');

requireDir('./gulp/tasks', { recurse: true });
