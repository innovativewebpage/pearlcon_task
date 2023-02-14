const express = require('express')
const router = express.Router();


const Comment = require('../model/commentModel');






//create
router.post('/comment_create',  async(req,res) => {
	
	const comment = new Comment({	
		post_id :req.body.post_id,
		user_id : req.body.user_id,
		comments : req.body.comments		
	});
	
	const newComment = await comment.save();
	
	if (newComment) {
	  var findComment = await Comment.aggregate([
	   {
		    $lookup:{
				 from:"users",
				 localField:"user_id",
	             foreignField:"_id",
				 as:"join"
				 }		 		 
		},
		{
			$addFields:{
				join:{
					$ifNull : [
					{
						"$arrayElemAt":[
						"$join",
						0
						]
					},	
				[]
				]
			}
		}
	},

	{

	$addFields:{
		"commenterName":"$join.userName",		
         join:"$$REMOVE"
	}
}
])
res.json(findComment); 
  }
  else
  { 
  return res.status(500).send({ message: ' Error in Inserting Comments.' });
  }

});


//Get



router.get("/read",async (req,res) => {
var findComment = await Comment.aggregate([
	   {
		    $lookup:{
				 from:"users",
				 localField:"user_id",
	             foreignField:"_id",
				 as:"join"
				 }		 		 
		},
		
		{
			$addFields:{
				join:{
					$ifNull : [
					{
						"$arrayElemAt":[
						"$join",
						0
						]
					},	
				[]

				]
			}
		}
	},

	{
	$addFields:{
		"commenterName":"$join.userName",		
         join:"$$REMOVE"
	}
	}

])
res.json(findComment);
});




	



//Delete
/*router.delete('/deletecomment/:id', async (req, res) => {
  var deleteComment = await Comment.findById(req.params.id);
  if (deleteComment) {
     deleteComment = await deleteComment.remove();
   res.json( deleteComment );
  } else {
    res.send('Error in Deletion.');
  }
  
  
});
*/

router.delete('/deletecomment/:id', async (req, res) => {
   var commentPost = await Comment.find({post_id:req.params.id}  )
   console.log('commentPost==',commentPost)
   
   if(commentPost.length > 0)
{	
var commentPost=await Comment.deleteMany({post_id : commentPost[0].post_id});
 res.json( commentPost );
}
   
 
 else {
    res.send('Error in Deletion.');
  }
  
  
});


router.delete('/deletecommenttest/:id', async (req, res) => {
  var deletedComment = await Comment.find({user_id : req.params.id});
  console.log('deletedComment==',deletedComment);
  if (deletedComment.length > 0) 
  {
	var deletedComment=await Comment.deleteMany({user_id : deletedComment[0].user_id});  
	  
  } 
  res.json( deletedComment );
});


module.exports = router