
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
