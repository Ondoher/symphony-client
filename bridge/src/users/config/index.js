fs = require('fs');

var nexus1 = 'nexus1-dev.symphony.com';
var nexus1Api = 'nexus1-dev-api.symphony.com';
var nexus2 = 'nexus2-dev.symphony.com';
var nexus2Api = 'nexus2-dev-api.symphony.com';
//nexusApi = 'nexus-dev-ause1-all.symphony.com';

function base64EncodeUrl(str){
	return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
}

var n1CrazyThreadId = base64EncodeUrl('9FR+lyvLNttuARgs7av3D3///rCPekXbdA=='); //nexus
var n2CrazyThreadId = base64EncodeUrl('pnTN05AkpGivKFCNzEWkk3///qTgBnUtdA=='); //nexus2
var nexusThreadId = base64EncodeUrl('pnTN05AkpGivKFCNzEWkk3///qTgBnUtdA=='); //nexus2
var n2PrivateThreadId = base64EncodeUrl('DxbnV8++z3vny/SIX7NqGX///qPFMGuYdA==');
var corpTestThreadId = base64EncodeUrl('QBsRAH+GVNvyvRsK9AVufX///qOCFrt8dA==');

module.exports = {
	users: {
        '131' : {
            keyUrl: 'https://' + nexus1Api + ':8444/keyauth',
            sessionUrl: 'https://' + nexus1Api + ':8444/sessionauth',
            agentUrl: 'https://' + nexus1 + ':443/agent',
            podUrl: 'https://' + nexus1 + ':443/pod',
			auth: {
				cert: fs.readFileSync(__dirname + '/certs/bot.user2-cert.pem', {encoding: 'utf-8'}),
				key: fs.readFileSync(__dirname + '/certs/bot.user2-key.pem', {encoding: 'utf-8'}),
				passphrase: 'changeit',
			},
		}
	},
}
