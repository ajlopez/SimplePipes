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

exports.Pipe = Pipe;

exports.createPipe = function () { return new Pipe(); }


