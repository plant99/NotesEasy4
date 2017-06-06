var mongodb = require('mongodb')
var mongoose = require('mongoose')

module.exports.initDB = function() {
	mongoose.connect('mongodb://localhost:27017/notes');
	var db = mongoose.connection ;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open',function(){
		console.log('Connected');
		var noteSchema = mongoose.Schema({
			content: String,
			priority: Number
		})

		Note = mongoose.model('Note', noteSchema)
	})

}

/*
var note1 = new Note({
			content: 'Chutiya',
			sNo: 1,
			priority:1
		})

		console.log(note1.content)

		note1.save(function(err,note1){
			if(err)
				console.log("couldn't be saved");
			else{
				console.log(note1.priority);
			}
		})

		Note.find({sNo:1},function(err,notes){
			if(err)
				console.log(err)
			else
				console.log(notes)
		})
*/