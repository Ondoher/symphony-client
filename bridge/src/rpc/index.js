var Rpc = require('sapphire-rpc').Rpc;
global.SERVER =  new Rpc();
SERVER.start('sc');
require('./user');
require('./messages');
