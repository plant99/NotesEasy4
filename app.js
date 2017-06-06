var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var formidable = require('formidable')
var mongodb = require('mongodb')
var mongoose = require('mongoose')

var index = require('./routes/index');
var addHandler = require('./routes/addHandler').postAdd;
var listHandler = require('./routes/listHandler');
var show = require('./routes/show')
var delete1 = require('./routes/delete1')
var edit = require('./routes/edit')
var saveNote = require('./routes/saveNote')

app = express();
initDB = require('./routes/mongoStart').initDB;
initDB()
    // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.use('/add', addHandler)
app.use('/list', listHandler)
app.use('/show', show)
app.use('/delete', delete1)
app.use('/edit', edit)
app.use('/save', saveNote)
app.use('/cancel', function(req, res) {
    res.redirect('/list')
})
app.use('/getContent/:id', function(req, res) {
    Note.find({ _id: req.params.id }, function(err, notes) {
        if (err)
            console.log(err)
        else {
            console.log(notes[0]['content'])
            res.setHeader('Content-Type', 'text/plain')
            res.end(notes[0]['content'])
        }
    })
})

app.use(function(req, res) {
    res.render('error', {
        message: "God knows what's going on. What about you troubleshoot me at:",
        email: "shivashispadhi@gmail.com"
    })
})


module.exports = app;