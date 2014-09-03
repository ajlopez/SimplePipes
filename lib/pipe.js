
function Node(fn) {
    this.post = function (msg) {
        setTimeout(function () {
            fn(msg);
        });
    }
}

function pipe(fn) {
    return new Node(fn);
}

module.exports = pipe;

