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

function Flow() {
    this.init = [];
    this.steps = [];
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

        while (k < n && typeof(arguments[k] === 'string'))
            names.push(arguments[k++]);
        
        if (k < n)
            this.steps.push(new FlowStep(names, arguments[k++]));
    }
};

Flow.prototype.start = function () {
    var n = this.init.length;

    for (var k = 0; k < n; k++)
        process.nextTick(this.init[k]);
};

exports.Pipe = Pipe;

exports.createPipe = function () { return new Pipe(); }
exports.createFlow = function () { var flow = new Flow(); flow.define.apply(flow, arguments); return flow; }




