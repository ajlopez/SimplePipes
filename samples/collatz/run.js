
var pipe = require('../..').pipe;

var collatz =
    pipe(function (vals) {
        if (vals[0] === 1)
            console.dir(vals);
        else if (vals[0] % 2 === 0)
            this.emit("even", vals);
        else
            this.emit("odd", vals);
    });
    
    
    collatz.pipe("odd", pipe(function (vals) {
        var val = vals[0];
        vals.unshift( val * 3 + 1);
        return vals;
    }))
    .pipe("even", pipe(function (vals) {
        var val = vals[0];
        vals.unshift( val / 2);
        return vals;
    }))
    .pipe(function (vals) {
        if (vals[0] === 1)
            console.dir(vals);
        else
            collatz.post(vals);
    });

for (var k = 1; k < 1000; k++)
    collatz.post([k]);

