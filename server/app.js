var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

// initialise express app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// initialise any extensions
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// _______MORGAN ROUTING AND SETUP_______
// Adapted from https://medium.com/@tobydigz/logging-in-a-node-express-app-with-morgan-and-bunyan-30d9bf2c07a
morgan.token('id', function getId(req) {
    return req.connection.remoteAddress;
});

var loggerFormat = ':id [:date[web]] ":method :url" :status :response-time';

app.use(morgan(loggerFormat, {
    skip: function (req, res) {
        return res.statusCode < 400
    },
    stream: process.stderr
}));

app.use(morgan(loggerFormat, {
    skip: function (req, res) {
        return res.statusCode >= 400
    },
    stream: process.stdout
}));
//-----------------------------

// import database
const options = require('./knexfile');
const knex = require('knex')(options);

// _______ROUTES_______ 
// connect database
app.use((req, res, next) => {
 req.db = knex
 next()
 });

// import routes
var indexRouter = require('./routes/index');
var searchRouter = require('./routes/search');
var usersRouter = require('./routes/users');

// available routes of app
app.use('/', indexRouter, usersRouter);
app.use('/search', searchRouter);

//import swagger and swagger json
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
// home page
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// test knex connected
app.get('/knex', function(req, res, next) {
	req.db.raw("SELECT VERSION()").then(
		(version) => console.log((version[0][0]))
	).catch((err) => {console.log(err); throw err })
	res.send("Version Logged Successfully");
});


// _______ERROR HANDLING_______
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

module.exports = app;
