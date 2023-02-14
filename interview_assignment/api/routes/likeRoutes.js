const express = require('express')
const router = express.Router();


const Likes = require('../model/likeModel');


router.post('/post_like',  async(req,res) => {	
	
//const findinLikes = await Likes.find({title: req.body.title});	

const findLikes = await Likes.find({$and:
								
								[{user_id:req.body.user_id }, 
									{post_id: req.body.post_id }		
	
							]} ) 

console.log('findLikes===',findLikes)							
	
//var findUser = await Test.findOne({$and:[{item:'abc'},{price:200}]});	
	//console.log('findLikes==',findLikes);
	//console.log('findLikes.length==',findLikes.length);
	//console.log('findLikes[0].status==',findLikes[0].status);
	var Status_check="";
	if(findLikes.length > 0)
	{	
		if(findLikes[0].status ==1)
		{
			 Status_check = await Likes.updateOne(
			{"post_id":findLikes[0].post_id},{$set: {status:0}})
		}	

		else if(findLikes[0].status ==0)
		{
			 Status_check = await Likes.updateOne(
			{"post_id":findLikes[0].post_id},{$set: {status:1}})
		}
		if(Status_check)
		{
			
			var updatedlikeresult = await Likes.findById({_id:findLikes[0]._id});
			res.json(updatedlikeresult);
		}		
	}
	
	else
	
	{
	const like = new Likes({	
		user_id : req.body.user_id,
		post_id : req.body.post_id,
		status:1
	});
	const newLike = await like.save();
	if (newLike) {
		
		
	var findStatus = await Likes.aggregate([
	   {	
			
				$lookup:{
					from:"posts",
					localField:"post_id",
					foreignField:"_id",
					as:"join"
				}
	   },	

	   {
		   	$match:{status:1}  
	   },

	   {
		   
			$addFields:{
						
					join:"$$REMOVE"
				} 
		   
		   
		   
	   } 


	   
	   		
		])
		
		//console.log('findStatus==',findStatus)
		 res.json(findStatus)
		
	}
	
   
	
	else
	{ 
		return res.status(500).send({ message: ' Error in Inserting User.' });
	}
		
	}
	})
	

router.get("/read",async (req,res) => {
	var findLikes = await Likes.find();
	res.json(findLikes);
})



router.delete('/deletelike/:id', async (req, res) => {
  var deletedLike = await Likes.find({user_id : req.params.id});
  if (deletedLike.length > 0) 
  {
	var deletedLike=await Likes.deleteMany({user_id : deletedLike[0].user_id});  
  } 
  res.json( deletedLike );
});


module.exports = router
