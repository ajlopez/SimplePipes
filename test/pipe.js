
var simplepipes = require('..');

exports['createPupe defined'] = function (test) {
    test.ok(simplepipes.createPipe);
    test.equal(typeof simplepipes.createPipe, 'function');
    test.done();
};

exports['send and receive'] = function (test) {
    var pipe = simplepipes.createPipe();
    pipe.send(1);
    test.equal(pipe.receive(), 1);
    test.done();
};