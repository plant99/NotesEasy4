var express = require('express');
var router = express.Router();
var serial;
router.get('/:id',function(req,res){
	//req.params.serial
	Note.find({_id:req.params.id},function(err,notes){
		if(notes!= null)
			res.render('show',{notes:notes[0]})
		else{
			res.render('error',{
				message: "God knows what's going on. What about you troubleshoot the issue at:",
				email: "shivashispadhi@gmail.com"
			})
		}
	})
})
router.use(function(req,res){
	res.render('error',{
				message: "God knows what's going on. What about you troubleshoot the issue at:",
				email: "shivashispadhi@gmail.com"
			})
})

module.exports = router ;