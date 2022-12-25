const { spawn } = require('node:child_process')
var fs = require("fs");

function exec(cmd, handler = function(error, stdout, stderr){console.log(stdout);if(error !== null){console.log(stderr)}})
{
    const childfork = require('child_process');
    return childfork.exec(cmd, handler);
}
var exec1 = exec('npm run build-tmp-funct');
exec1.stdout.on("data", function (c) {
	console.log(c);
})