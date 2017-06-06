var express = require('express');
var router = express.Router();

router.post('/:id', function(req, res) {
    Note.remove({ _id: req.params.id }, function(err, notes) {
        if (err) {
            console.log(err);
            res.render('error', {
                message: "God knows what's going on. What about you troubleshoot the issue at:",
                email: "shivashispadhi(at)gmail.com"
            })
        } else {
            res.setHeader('Content-Type', 'text/plain')
            res.end('Note deleted')
        }



    })
})
module.exports = router