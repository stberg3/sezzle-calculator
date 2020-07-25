var createError = require('http-errors');
var express = require('express');
var path = require('path');
var socketServer = require('socket.io');

var indexRouter = require('./routes/index');
var app = express();
var http = require('http').createServer(app); 
var io = require('socket.io')(http);
// var calculator = require('./calculator.js')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var computationCache = [];

io.on('connection', (socket) => {
  console.log(computationCache);
  socket.on('calculation', (string) => {
    console.log("Someday, I'll compute this: " + string);
    io.emit('calculation', string);
    var logEntry = { string: "answer" };
    computationCache.push(logEntry);
    if (computationCache.length > 10) {
      computationCache.shift();
    }
  });   
});


app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




http.listen(3000, () => {
  console.log('listening on *:3000');
});


