var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require("mongoose");

var appRoutes = require('./routes/app');
var userRoutes = require('./routes/user');
var mangaRoutes = require('./routes/manga');
var genreRoutes = require('./routes/genre');
var authorRoutes = require('./routes/author');


var app = express();
mongoose.connect("mongodb+srv://Harry:1234@cluster0.4lits.mongodb.net/library?retryWrites=true&w=majority");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/', appRoutes);
app.use('/manga', mangaRoutes);
app.use('/genre', genreRoutes);
app.use('/author', authorRoutes);
app.use('/authenticacao', userRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app; 
 