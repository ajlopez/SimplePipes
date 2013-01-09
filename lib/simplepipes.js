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

exports.Pipe = Pipe;

exports.createPipe = function () { return new Pipe(); }


