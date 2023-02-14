const mongoose = require('mongoose');



const commentSchema = new mongoose.Schema({	
	
  post_id:{type:mongoose.Schema.ObjectId},		
  user_id:{type:mongoose.Schema.ObjectId},
  comments: { type: String }
});




const commentModel = mongoose.model('Comments', commentSchema);

module.exports = commentModel;



