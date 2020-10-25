/* app.js Juneau Gawat 301076796 October 8, 2020 */

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');


let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');

// auth objs
let localStrategy = passportLocal.Strategy;
let userModel = require('./models/user');
let User = userModel.User;

// module for auth messaging and error management
let flash = require('connect-flash');

let indexRouter = require('./routes/index');
let contactsRouter = require('./routes/contacts');
let usersRouter = require('./routes/users');

let app = express();

// database stuff
let mongoose = require('mongoose');
let DB = require('./DB');
mongoose.connect(DB.URL, {useNewUrlParser: true, useUnifiedTopology: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connection Open.");
});
db.once('connected', function() {
  console.log("Connected to MongoDB!");
});
db.on('reconnected', function() {
  console.log("Reconnected to MongoDB!");
});
db.on('disconnected', function() {
  console.log("Disconnected to MongoDB!");
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

//setup express session
let Auth = require('./auth');
app.use(session({
  secret:  Auth.Secret,
  saveUninitialized: false,
  resave: false
}));

// init flash
app.use(flash());

//init passport
app.use(passport.initialize());
app.use(passport.session());

// implement auth strategy
passport.use(User.createStrategy());

// serialize and deserialize the user data
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/contacts', contactsRouter);
app.use('/users', usersRouter);

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
