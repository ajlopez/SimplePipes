'use strict';

function Pipe() {
    this.values = [];
}

Pipe.prototype.send = function (msg) {
    this.values.push(msg);
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
};

Flow.prototype.start = function () {
    var n = this.init.length;

    for (var k = 0; k < n; k++)
        process.nextTick(this.init[k]);
};

exports.Pipe = Pipe;

exports.createPipe = function () { return new Pipe(); }
exports.createFlow = function () { var flow = new Flow(); flow.define.apply(flow, arguments); return flow; }




