const appendF = require('node:fs');

appendF.appendFileSync('users.json', '\n data to append', 'utf8'); 