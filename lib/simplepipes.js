'use strict';

function Pipe(flow) {
    this.values = [];
    this.flow = flow;
}

Pipe.prototype.send = function (msg) {
    this.values.push(msg);

    if (this.flow)
        this.flow.fire();
};

Pipe.prototype.receive = function () {
    return this.values.shift();
};

Pipe.prototype.count = function () {
    return this.values.length;
};

function FlowStep(flow, names, fn) {
    var n = names.length;

    this.check = function () {
        for (var k = 0; k < n; k++)
            if (!flow[names[k]].count())
                return;

        var values = [];

        for (k = 0; k < n; k++)
            values.push(flow[names[k]].receive());

        process.nextTick(function () { fn.apply(flow, values); });
    };
}

function Flow() {
    this.init = [];
    this.steps = [];
    this.fired = false;
};

Flow.prototype.define = function () {
    var n = arguments.length;

    for (var k = 0; k < n; k++) {
        if (typeof arguments[k] !== 'function')
            break;
        this.init.push(arguments[k]);
    }

    while (k < n) {
        var names = [];

        while (k < n && typeof arguments[k] === 'string') {
            var name = arguments[k];

            if (!this[name])
                this[name] = new Pipe(this);

            names.push(name);
            k++;
        }
        
        if (k < n)
            this.steps.push(new FlowStep(this, names, arguments[k++]));
    }
};

Flow.prototype.start = function () {
    var n = this.init.length;    

    for (var k = 0; k < n; k++)
        process.nextTick(this.init[k]);
};

Flow.prototype.fire = function () {
    console.log('fire');

    if (this.fired)
        return;

    this.fired = true;

    var self = this;

    process.nextTick(function() {
        self.step();
    });
};

Flow.prototype.step = function () {
    this.fired = false;
    this.steps.forEach(function (step) {
        step.check();
    });    
};

exports.Pipe = Pipe;

exports.createPipe = function () { return new Pipe(); }
exports.createFlow = function () { var flow = new Flow(); flow.define.apply(flow, arguments); return flow; }


