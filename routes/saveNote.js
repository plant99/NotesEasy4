var express = require('express');
var router = express.Router();
/* GET home page. */
router.post('/:id', function(req, res) {

    var data = req.body;
    console.log(data)
    var parts = data.split('=')
    var requiredString = replaceAll(parts[1], '+', ' ')
    console.log(requiredString);
    Note.find({ _id: req.params.id }, function(err, notes) {
        notes[0].content = requiredString.slice(0, requiredString.length - 1);
        notes[0].priority = requiredString[requiredString.length - 1];
        notes[0].save(function(err, note) {
            console.log(note)
        })
    })
    console.log(req.params._id)
    setTimeout(function() {
        res.setHeader('Content-Type', 'text/plain')
        res.end('Edit saved')
    }, 1000)
})

function replaceAll(string, charToBeReplaced, charToBeAdded) {
    while (string.indexOf(charToBeReplaced) != -1) {
        string = string.replace(charToBeReplaced, charToBeAdded)
    }
    return string
}
module.exports = router;