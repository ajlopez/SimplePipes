
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

exports['create pipe, chain with process and pipe, post'] = function (test) {
    var value = 0;
    
    test.async();
    
    var p = pipe(function (msg) { return msg + 1; });
    
    p
    .process(function (msg) {
        test.equal(msg, 2);
        value = msg;
    })
    .pipe(function (msg) {
        test.ok(msg);
        test.equal(msg, 2);
        test.equal(value, 2);
        test.done();
    });
    
    p.post(1);
};

exports['create pipe, chain with pipe using async'] = function (test) {
    test.async();
    
    var p = pipe(function (msg, next) { next(null, msg + 1); });
    
    p.pipe(function (msg) {
        test.ok(msg);
        test.equal(msg, 2);
        test.done();
    });
    
    p.post(1);
};

exports['emit to next pipe'] = function (test) {
    test.async();
    
    var p = pipe(function (msg) { this.emit(msg + 1); });
    
    p.pipe(function (msg) {
        test.ok(msg);
        test.equal(msg, 2);
        test.done();
    });
    
    p.post(1);
};

exports['emit to named pipe'] = function (test) {
    test.async();
    
    var p = pipe(function (msg) { 
        if (msg % 2)
            this.emit("odd", msg);
        else
            this.emit("even", msg);
    });
    
    p
    .pipe("even", pipe(function (msg) {
        test.ok(msg);
        test.equal(msg % 2, 0);
    }))
    .pipe("odd", pipe(function (msg) {
        test.ok(msg);
        test.equal(msg % 2, 1);
        test.done();
    }));
    
    p.post(2);
    p.post(1);
};

exports['emit to named pipe and continue'] = function (test) {
    test.async();
    
    var p = pipe(function (msg) { 
        if (msg % 2)
            this.emit("odd", msg);
        else
            this.emit("even", msg);
    });
    
    p
    .pipe("even", pipe(function (msg) {
        test.ok(msg);
        test.equal(msg % 2, 0);
        return msg;
    }))
    .pipe("odd", pipe(function (msg) {
        test.ok(msg);
        test.equal(msg % 2, 1);
        return msg;
    }))
    .pipe(function (msg) {
        test.ok(msg);
        
        if (msg == 1)
            test.done();
    });
    
    p.post(2);
    p.post(1);
};
