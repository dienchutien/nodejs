var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require('path');
var handlebars = require('express-handlebars'), hbs;
var logger = require('morgan');
var errorHandler = require('errorhandler');
var MongoStore = require('connect-mongo')(session);
//upload
var fileUpload = require('express-fileupload');//End upload
var Middleware = require('./utilities/Middleware');
var config = require('./config');
var http = require('http').Server(app);
var Model = require('./models/Models');
var io = require('socket.io')(http);
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log(msg);
    
    var content = msg.msg;
    var username = msg.user;
    
    var b = new Model.ChatModel({
        created: new Date(),
        content: content,
        username: username,
    });
    b.save(function (error) {
        if (error) {
            console.log('Error!!!');
        } else {
            console.log('Successs!!!');
        }
    });
    
  });
});

app.use(fileUpload());
app.use(Middleware.AppendNotifications);



app.set('port', config[config.environment].application.port);
app.set('views', path.join(__dirname, 'views'));
/* express-handlebars - https://github.com/ericf/express-handlebars
 A Handlebars view engine for Express. */
hbs = handlebars.create({
    helpers: {
        ifCond: function (v1, operator, v2, options) {
            v1 = v1.toString();
            v2 = v2.toString();
            switch (operator) {
                case '==':
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);
                case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                case '<':
                    return (v1 < v2) ? options.fn(this) : options.inverse(this);
                case '<=':
                    return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                case '>':
                    return (v1 > v2) ? options.fn(this) : options.inverse(this);
                case '>=':
                    return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                case '&&':
                    return (v1 && v2) ? options.fn(this) : options.inverse(this);
                case '||':
                    return (v1 || v2) ? options.fn(this) : options.inverse(this);
                default:
                    return
            }
            options.inverse(this);
        }
    },
    defaultLayout: 'Main'
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
/* Morgan - https://github.com/expressjs/morgan
 HTTP request logger middleware for node.js */
app.use(logger({format: 'dev', immediate: true}));

/* errorhandler - https://github.com/expressjs/errorhandler
 Show errors in development. */
app.use(errorHandler({dumpExceptions: true, showStack: true}));

//session and cooki
app.use(cookieParser(config[config.environment].application.cookieKey));
app.use(session({
    secret: config[config.environment].application.sessionKey,
    store: new MongoStore({
        url: 'mongodb://' + config[config.environment].database.host + '/' +
        config[config.environment].database.name
    })
}));

app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./router')(app);
http.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

