
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

exports['listen two pipes'] = function (test) {
    test.expect(2);

    var flow = simplepipes.createFlow(
        "pipe1", "pipe2",
        function (val1, val2) {
            console.log('enter');
            test.equal(val1, 1);
            test.equal(val2, 2);
            test.done();
        }
    );

    flow.start();
    flow.pipe1.send(1);
    flow.pipe2.send(2);
};

exports['listen two pipes two fires'] = function (test) {
    test.expect(4);
    var ntimes = 0;

    var flow = simplepipes.createFlow(
        "pipe1", "pipe2",
        function (val1, val2) {
            console.log('enter');
            test.equal(val1, 1);
            test.equal(val2, 2);
            ntimes++;

            if (ntimes > 1)
                test.done();
        }
    );

    flow.start();
    flow.pipe1.send(1);
    flow.pipe2.send(2);
    flow.pipe1.send(1);
    flow.pipe2.send(2);
};
