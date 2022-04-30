let arg = process.argv.slice(2).join(' ');

const execSync = require('child_process').execSync;

execSync('npm run clean');
execSync('npm run pre-build -- ' + arg, {stdio:[0, 1, 2]});
execSync('node index.js ' + arg, {stdio:[0, 1, 2]});