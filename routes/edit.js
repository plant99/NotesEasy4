var express = require('express');
var router = express.Router();

router.get('/:id',function(req,res){
	console.log('chutiya')
	res.setHeader('Content-Type','text/html')
	Note.find({_id:req.params.id},function(err,notes){
		if(notes!=null){
			console.log(notes[0])
			res.render('edit',{
				notes: notes[0]
			})
		}else{
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