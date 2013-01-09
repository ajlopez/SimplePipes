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
};

Flow.prototype.define = function () {
    this.args = arguments;
};

Flow.prototype.start = function () {
    var n = this.args.length;

    for (var k = 0; k < n; k++)
        process.nextTick(this.args[k]);
};

exports.Pipe = Pipe;

exports.createPipe = function () { return new Pipe(); }
exports.createFlow = function () { var flow = new Flow(); flow.define.apply(flow, arguments); return flow; }




