
function Node(fn) {
    var nexts = [];
    var namednexts = { };
    var self = this;
    
    if (fn.length > 1)
        this.post = function (msg) {
            setTimeout(function () {
                fn.call(self, msg, function (err, route, newmsg) {
                    if (!err)
                        emit(route, newmsg);
                });
            });
        }
    else
        this.post = function (msg) {
            setTimeout(function () {
                var newmsg = fn.call(self, msg);
                if (newmsg)
                    emit(newmsg);
            });
        }
    
    function emit(name, msg) {
        if (!msg) {
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
        if (typeof name != 'string') {
            nextfn = name;
            name = null;
        }
        
        if (!name) {        
            var nextnode;

            if (typeof nextfn == 'function')
                nextnode = new Node(nextfn);
            else
                nextnode = nextfn;
               
            nexts.push(nextnode);
            
            for (var n in namednexts) {
                var named = namednexts[n];
                named.pipe(nextnode);
            }
            
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

