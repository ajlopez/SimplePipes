
function Node(fn) {
    var nexts = [];
    var self = this;
    
    this.post = function (msg) {
        setTimeout(function () {
            var newmsg = fn.call(self, msg);
            
            if (newmsg)
                self.emit(newmsg);
        });
    }
    
    this.emit = function (msg) {
        nexts.forEach(function (next) {
            next.post(msg);
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

