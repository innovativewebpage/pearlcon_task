const express = require('express')
const router = express.Router();


const User = require('../model/userModel');






//create
router.post('/create',  async(req,res) => {
	
 const signinUser = await User.findOne({
    userEmail: req.body.userEmail
  });
  
  //console.log('signinUser==',signinUser)
 	
if(signinUser)
{

return res
      
      .send({ message: 'Email already exists'});	
}	
	
	const user = new User({	
		userName : req.body.userName,
		userEmail : req.body.userEmail,
		userMobile: req.body.userMobile,
		userPassword:req.body.userPassword
	});
	
	const newUser = await user.save();
  
  if (newUser) {
    return res
      .status(201)
      .send({ message: 'New User Inserted', 
	  data: newUser });
  }
  return res.status(500).send({ message: ' Error in Inserting User.' });
});


//Get

router.get("/read",async (req,res) => {
	var findUser = await User.find();
res.json(findUser);
})

router.post("/getAuthorName",async (req,res) => {
	
	//console.log('ok');
	//console.log('getAuthorName',req.body);
	
	var findAuthorName = await User.find({_id:req.body._id});
	console.log(findAuthorName);

});




//Delete
router.delete('/:id', async (req, res) => {
  var deletedUser = await User.findById(req.params.id);
  if (deletedUser) {
     deletedUser = await deletedUser.remove();
   res.json( deletedUser );
  } else {
    res.send('Error in Deletion.');
  }
  
});


router.post('/signin', async(req,res) => {
//console.log('signin');
console.log('req.body==',req.body);
var query = {}
if(req.body.googleId)
{
		
		
		const signinUser = await User.findOne({
				userEmail: req.body.email
				});
  	
		console.log('signinUser==',signinUser)
		if(signinUser ==null)
		{
			const user = new User({	
					userEmail : req.body.email
				});
			
			
			const newUser = await user.save();
			if (newUser) {
				
					var email_not_registered=[{
						_id:newUser._id,
						userEmail:req.body.email,
						userName:req.body.name,
						}]
				
				}
	return res.status(200).send({ message: 'Signin Successfully', data: email_not_registered })
		}		
		else
		{
			let signInUserObj ={
				signinUser
			}
			
			
			var name_obj = {
			['userName']: req.body.name
		}
		
		//console.log('name_obj==',name_obj)
	
			var SignInUserObjvalue = {
				...signInUserObj,
				name_obj
				
			}
			
			//console.log(Object.assign(signInUserObj, name_obj));
			
			//console.log('SignInUserObjvalue==',SignInUserObjvalue)
			
			var email_registered_obj1=[{
						_id:SignInUserObjvalue.signinUser._id,
						userEmail:SignInUserObjvalue.signinUser.userEmail,
						userName:SignInUserObjvalue.name_obj.userName,
						}]
			
			//console.log('obj1==',obj1)
			return res.status(200).send({ message: 'Signin Successfully', data: email_registered_obj1 })

		}		
		
		/*return res.status(200)
		.send({ message: 'Signin Successfully', data: obj1 });*/

}

	
	

else
{



if(req.body.userEmail && req.body.userPassword) {
 query ={$and:[{userEmail:req.body.userEmail},{userPassword: req.body.userPassword}]}
}

}

User.find(query,function(error,data) {
	//console.log('error',error);
	//console.log('data',data);
	//console.log('data==',data.length)
	//console.log(typeof data.length);
	if(data)
	{	
	if(data.length == 1)
	{

	return res.status(200)
      .send({ message: 'Signin Successfully', 
	  data: data });
	
	}		
	
	
	else 
	{

return res
      .send({ message: 'Failed'});
	}
	
	}
	});

});






//Update

/*
router.put("/:id",  async (req, res) => {
	 try {
    let updateEmployee = await Employee.findById(req.params.id);
    const data = {
		empName : req.body.empName,
		empEmail : req.body.empEmail,
		empMobile: req.body.empMobile,
		empDob:req.body.empDob
    };
		
	//console.log('staff===',staff)	
		
    updateEmployee= await Employee.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(updateEmployee);
  } catch (err) {
    console.log(err);
  }
	
  
});
*/

router.get("/signout", (req,res) => {
res.status(200).json({
    message: "Signout successfully...!",
  });
})

module.exports = router