var express = require('express');
var app = express();
const cors = require('cors');
const db = require('./db');

app.use(express.json());
app.use(cors());



const fileUpload = require('express-fileupload')
app.use(fileUpload());


const UserRoute = require('./routes/userRoutes');
app.use('/api/user',UserRoute);


const PostRoute = require('./routes/postRoutes');
app.use('/api/post',PostRoute);


const CommentRoute = require('./routes/commentRoutes');
app.use('/api/comment',CommentRoute);

const LikeRoute = require('./routes/likeRoutes');
app.use('/api/like',LikeRoute);



//Start the server
var port=process.env.PORT
app.listen(port,function(){
	console.log('server start on port' + port);
});