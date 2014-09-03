
function Node(fn) {
    var nexts = [];
    var namednexts = { };
    var self = this;
    
    this.post = function (msg) {
        setTimeout(function () {
            var newmsg = fn.call(self, msg);
            
            if (newmsg)
                self.emit(newmsg);
        });
    }
    
    this.emit = function (name, msg) {
        if (arguments.length == 1) {
            msg = name;
            name = null;
        }
        
        if (name)
            namednexts[name].post(msg);
        else
            nexts.forEach(function (next) {
                next.post(msg);
            });
    }
    
    this.pipe = function (name, nextfn) {
        if (typeof name == 'function') {
            nextfn = name;
            name = null;
        }
        
        if (!name) {        
            var nextnode = new Node(nextfn);
            nexts.push(nextnode);
            
            return nextnode;
        }
        else {
            namednexts[name] = nextfn;
            
            return this;
        }
    }
}

function pipe(fn) {
    return new Node(fn);
}

module.exports = pipe;

