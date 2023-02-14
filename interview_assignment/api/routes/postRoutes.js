const express = require('express')
const router = express.Router();


const Post = require('../model/postModel');
const Comment = require('../model/commentModel');





//create
router.post('/post_create',  async(req,res) => {
	//console.log(req.files.file);
	
	//console.log(req.body);
	
	/*const findinPost = await Post.find({title: req.body.title});
	
	
	//res.json(findinPost);
	console.log('findinPost==',findinPost)
	console.log('findinPost.length==',findinPost.length)
	
	
	if(findinPost.length > 0)
	{
			
	var Title_increments = findinPost.length + 1
	var post_title=findinPost[0].title + '(' +Title_increments +')'
	}
	else
	{
			post_title = req.body.title
	}*/	
	
		
	if(req.files != null || req.files != undefined)
		{
	
		 target_file = req.files.file;
		var file_name = new Date().getTime()+'_'+target_file.name;
		
		target_file.mv(`D:/interview/pearlcons/New folder/client/my-app/public/uploads/${file_name}`)
		
		
		}

	
	
	
	
	
	const post = new Post({	
		user_id : req.body.user_id,
		title : req.body.title,
		description: req.body.description,
		tags:req.body.tags,
		file:file_name
		
	});
	
	const newPost = await post.save();
	
	if(newPost)
	{

			var find_Post_With_UserName = await Post.aggregate([
			{
				$lookup:{
					from:"users",
					localField:"user_id",
					foreignField:"_id",
					as:"posts"
						}		 
			},
			
			{
				$addFields:{
					posts:{
						$ifNull : [
						{
							"$arrayElemAt":[
							"$posts",
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
					"authorName":"$posts.userName",		
					 posts:"$$REMOVE"
					}
			}
		])
		res.json(find_Post_With_UserName);

	}	
else
{	
  return res.status(500).send({ message: ' Error in Inserting Post.' });

}
	
});







//Get


router.get("/read",async (req,res) => {
	//var findPost = await Post.find();
//res.json(findPost);

var find_Post_With_UserName = await Post.aggregate([
			{
				$lookup:{
					from:"users",
					localField:"user_id",
					foreignField:"_id",
					as:"posts"
						}		 
			},
			
			{
				$addFields:{
					posts:{
						$ifNull : [
						{
							"$arrayElemAt":[
							"$posts",
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
					"authorName":"$posts.userName",		
					 posts:"$$REMOVE"
					}
			}
		])
		res.json(find_Post_With_UserName);

	


});

//search
router.post("/searchpost",async (req,res) => {
	console.log('ok');
	console.log(req.body)
	console.log(req.body.searchedvalue)
	
	/*var findPost = await Post.find({'title':req.body.searchedvalue});
res.json(findPost);*/

var findPost = await Post.find({$or:
									
								[{'title':req.body.searchedvalue }, 
								{tags: {$in: [req.body.searchedvalue]} } 
								] } ) 


res.json(findPost);
});



router.get("/postwithauth",async (req,res) => {
		
var findPost = await Post.aggregate([
	   {
		    $lookup:{
				 from:"users",
				 localField:"user_id",
	             foreignField:"_id",
				 as:"users"
			 
				 }		 
		}
])
res.json(findPost);	
});







//Delete
router.delete('/deletepost/:id', async (req, res) => {
  var deletedPost = await Post.findById(req.params.id);
  if (deletedPost) {
     deletedPost = await deletedPost.remove();
	 var commentPost = await Comment.find({post_id:req.params.id}  )

	if(commentPost.length > 0)
	{	
	var commentPost=await Comment.deleteMany({post_id : commentPost[0].post_id});
	}
   res.json( deletedPost );
  } else {
    res.send('Error in Deletion.');
  }
});




router.delete('/deleteposttest/:id', async (req, res) => {
  var deletedPost = await Post.find({user_id : req.params.id});
  console.log('deletedPost==',deletedPost);
  if (deletedPost.length > 0) 
  {
	var deletedPost=await Post.deleteMany({user_id : deletedPost[0].user_id});  
	  
  } 
  
  res.json( deletedPost );
  
});


module.exports = router