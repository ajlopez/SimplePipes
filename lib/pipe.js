
function Node(fn) {
    var nexts = [];
    
    this.post = function (msg) {
        setTimeout(function () {
            var newmsg = fn(msg);
            
            if (newmsg)
                nexts.forEach(function (next) {
                    next.post(newmsg);
                });
        });
    }
    
    this.pipe = function (nextfn) {
        var nextnode = new Node(nextfn);
    
        nexts.push(nextnode);
        
        return nextnode;
    }
}

function pipe(fn) {
    return new Node(fn);
}

module.exports = pipe;

