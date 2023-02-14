const mongoose = require('mongoose');



const postSchema = new mongoose.Schema({		
  user_id:{type:mongoose.Schema.ObjectId},
  title: { type: String },
  description: { type: String},
  tags:{type:Array},
  file:{type:String}
 
});




const postModel = mongoose.model('Post', postSchema);

module.exports = postModel;



