
function Node(fn) {
    var nexts = [];
    var namednexts = { };
    var self = this;
    
    if (fn.length > 1)
        this.post = function (msg) {
            setTimeout(function () {
                fn.call(self, msg, function (err, newmsg) {
                    if (!err)
                        self.emit(newmsg);
                });
            });
        }
    else
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
    
    this.process = function (nextfn) {
        var nextnode = new Node(function (msg) { nextfn(msg); return msg });
        nexts.push(nextnode);
        return nextnode;
    }
}

function pipe(fn) {
    return new Node(fn);
}

module.exports = pipe;

