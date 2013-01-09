
var simplepipes = require('..');

exports['createPipe defined'] = function (test) {
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

exports['sends and receives'] = function (test) {
    var pipe = simplepipes.createPipe();
    pipe.send(1);
    pipe.send(2);
    test.equal(pipe.receive(), 1);
    test.equal(pipe.receive(), 2);
    test.done();
};

exports['count'] = function (test) {
    var pipe = simplepipes.createPipe();
    pipe.send(1);
    pipe.send(2);
    test.equal(pipe.count(), 2);
    test.done();
};