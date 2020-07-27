function calculate(string) {
    var eqRegex = /(\d*\.?\d+)(([+\-/*]|\*\*)(\d*\.?\d+))+/;
    if(string.search(eqRegex) < 0) {
        return "INVALID";
    }

    var fx = new Function("return " + string);
    return fx();
}

module.exports = function(io, cache) {
    console.log('a user connected');
    console.log('Cache: ', cache);
    io.on('connection', (socket) => {
        console.log(cache);
        socket.on('calculation_input', (string) => {

            console.log("Someday, I'll compute this: " + string);
            var logEntry = { "calc": string, "answer": calculate(string) };
            io.emit('calculation_output', logEntry);
            console.dir(logEntry)
            cache.push(logEntry);

            if (cache.length > 10) {
                cache.shift();
            }
        });
    });
}