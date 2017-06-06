var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    Note.find(function(err, notes) {
        var obj = { content: [], ids: [] }
        for (var i = 0; i < notes.length; i++) {
            obj.content.push(notes[i]['content'] + notes[i]['priority'])
            obj.ids.push(notes[i]['_id'])
        }
        console.log(obj)
        res.setHeader('Content-Type', 'application/JSON')
        res.end(JSON.stringify(obj))
    })
})
router.use(function(req, res) {
    res.render('error', {
        message: "God knows what's going on. What about you troubleshoot the issue at:",
        email: "shivashispadhi@gmail.com"
    })
})
module.exports = router;