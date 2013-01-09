
var simplepipes = require('../..');

var flow = simplepipes.createFlow(
    'enter',
    function (vals) {
        if (vals[0] === 1)
            console.dir(vals);
        else if (vals[0] % 2 === 0)
            this.even.send(vals);
        else
            this.odd.send(vals);
    },
    'odd',
    function (vals) {
        var val = vals[0];
        vals.unshift( val * 3 + 1);
        this.enter.send(vals);
    },
    'even',
    function (vals) {
        var val = vals[0];
        vals.unshift(val / 2);
        this.enter.send(vals);
    }
);

flow.start();

for (var k = 1; k < 1000; k++)
    flow.enter.send([k]);

