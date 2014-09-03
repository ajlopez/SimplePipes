
var pipe = require('../lib/pipe');

exports['create and post to pipe'] = function (test) {
    test.async();
    
    var p = pipe(function (msg) {
        test.ok(msg);
        test.equal(msg, 1);
        test.done();
    });
    
    p.post(1);
};

exports['create pipe, chain with pipe, post'] = function (test) {
    test.async();
    
    var p = pipe(function (msg) { return msg + 1; });
    
    p.pipe(function (msg) {
        test.ok(msg);
        test.equal(msg, 2);
        test.done();
    });
    
    p.post(1);
};
