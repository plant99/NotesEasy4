var express = require('express');
var router = express.Router();

module.exports.postAdd = function(req, res, next) {
    var data = req.body;
    var data = data.split('&')
    console.log(data)
    for (var i = 0; i < data.length; i++) {
        console.log(i)
        var obj = [];
        var key = data[i].split('=')[0]
        var value = replaceAll(data[i].split('=')[1], '+', ' ')
        if (key == "priority")
            var value1 = value;

        if (key == "content")
            var value2 = value;
    }
    setTimeout(function() {
        console.log(value1 + " " + value2)
    }, 1000)
    var note = new Note({
        content: value2,
        priority: value1
    })
    note.save(function(err, note) {
        if (err) {
            console.log(err);
            res.render('error', {
                message: "God knows what's going on. What about you troubleshoot the issue at:",
                email: "shivashispadhi@gmail.com"
            })
        } else {
            console.log('Data saved');
            console.log(note.content + " " + note.priority)
        }


    })


    setTimeout(function() {
            res.setHeader('Content-Type', 'text/plain')
            res.end('Note added')
        }, 1000)
        /*db.collection('notes').insert(fields)
        console.log('inserted')
        setTimeout(function(){
        	res.end('Your note was saved. To view the list please go to /list')
        },1000)*/

}

function replaceAll(string, charToBeReplaced, charToBeAdded) {
    while (string.indexOf(charToBeReplaced) != -1) {
        string = string.replace(charToBeReplaced, charToBeAdded)
    }
    return string
}