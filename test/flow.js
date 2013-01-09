
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

exports['two chained steps'] = function (test) {
    test.expect(2);

    var flow = simplepipes.createFlow(
        "pipe1",
        function (val) {
            test.equal(val, 1);
            this.pipe2.send(val + 1);
        },
        "pipe2",
        function (val) {
            test.equal(val, 2);
            test.done();
        }
    );

    flow.start();
    flow.pipe1.send(1);
};


exports['define pipes'] = function (test) {
    var flow = simplepipes.createFlow(
        "pipe1", "pipe2", "pipe3"
    );

    test.ok(flow.pipe1);
    test.ok(flow.pipe2);
    test.ok(flow.pipe3);
    test.done();
};
