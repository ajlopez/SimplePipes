
var simplepipes = require('..');

exports['createFlow defined'] = function (test) {
    test.ok(simplepipes.createFlow);
    test.equal(typeof simplepipes.createFlow, 'function');
    test.done();
};

exports['start free functions'] = function (test) {
    test.expect(0);
    var flow = simplepipes.createFlow(
        function () {
            test.done();
        }
    );

    flow.start();
};

exports['listen pipe'] = function (test) {
    test.expect(1);

    var flow = simplepipes.createFlow(
        "pipe1",
        function (val1) {
            console.log('enter');
            test.equal(val1, 1);
            test.done();
        }
    );

    flow.start();
    flow.pipe1.send(1);
};
