var fs = require('fs');

var content = fs.readFileSync('words.txt', 'utf8');
var words = content.split('\n');

var output = 'words = [';

words.forEach(function(word, idx)
{
	if (!word) return;
	output += '\'' + word + '\', ';
	if (Math.floor(idx % 10) == 9) output += '\n';
});

output += '];';

fs.writeFileSync('wordList.js', output);
