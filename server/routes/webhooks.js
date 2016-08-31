'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (req, res) {

    run_cmd('sh', ['./restart.sh'], function (text) {
        console.log(text);
        res.end(text);
    });
};

function run_cmd(cmd, args, callback) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";

    child.stdout.on('data', function (buffer) {
        resp += buffer.toString();
    });
    child.stdout.on('end', function () {
        callback(resp);
    });
}

//# sourceMappingURL=webhooks.js.map