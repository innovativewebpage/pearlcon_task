const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const url = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.asgxn.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;


mongoose.set('strictQuery',false);
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true},(err) => {
if(!err)
{
		console.log("mongoose connectionjjj succedeed");
}
else
{
console.log("error in DB connection"+err);
}
});


