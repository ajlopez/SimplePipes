
var pipe = require('../lib/pipe');

exports['create and post to pipe'] = function (test) {
    test.async();
    
    pipe(function (msg) {
        test.ok(msg);
        test.equal(msg, 1);
        test.done();
    }).post(1);
};
