const mongoose = require('mongoose');



const likeSchema = new mongoose.Schema({		
  user_id:{type:mongoose.Schema.ObjectId},
  post_id:{type:mongoose.Schema.ObjectId},
	status:{type:Number}  
});

const likeModel = mongoose.model('Likes', likeSchema);
module.exports = likeModel;



