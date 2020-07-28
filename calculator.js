function calculate(string) {
    var eqRegex = /(\d*\.?\d+)(([+\-/*%]|\*\*)(\d*\.?\d+))+/;
    cleanString = string.replace(/[\(\)\s]/g, "");

    if(cleanString.search(eqRegex) < 0) {
        return "INVALID";
    }

    var fx = new Function("return " + string);
    return fx();
}

module.exports = function(io, cache) {   
    io.on('connection', (socket) => {        
        socket.on('calculation_input', (string) => {
            var logEntry = { "calc": string, "answer": calculate(string) };
            io.emit('calculation_output', logEntry);
            cache.push(logEntry);
            
            if (cache.length > 10) {
                cache.shift();
            }
            
            console.dir(logEntry)
        });
    });
}