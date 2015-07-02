var express = require('express');
var WebSocketServer = require('ws').Server;
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var $ = require('jquery');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var server = http.createServer(app);

//var wss = new WebSocketServer({server: server});
//wss.on('connection', function(ws) {
//    ws.on('message', function(message) {
//        wss.clients.forEach(function (client) {
//            client.send(message);
//             $("#typeArea").keydown(function(){
//    $("#writeTo").append(dPar)
//    dPar.text(name+": is typing...")
//    window.setTimeout(function(){
//        $(dPar).detach();
//    }, 2000)
//    })
//        });
//    })
//});

var wss = new WebSocketServer({server: server});
wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        wss.clients.forEach(function (client) {
            client.send(message);
        });
    })
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', (process.env.PORT || 5000));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = {
    app: app,
    server: server
};
