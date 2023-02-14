import React,{useState,useEffect,useRef} from "react";

import { Row,Col,Container,Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { getAllPosts,postDataSubmit,getPostAuthorName,
signOut,Delete_Post,postCommentsSubmit,getAllComments,
getCommentAuthorName,Search_Title,postLikeSubmit,getAllLikes } from '../actions';

import {useSelector,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import CloseIcon from '@mui/icons-material/Close';


const Dashboard = () => {

	
	const[initial,setInitial]=useState([]);
	const [post, setPost] = useState({
	title:'',
	description:'',
	photo:'',
	file:null
	});
	
	const [comment, setComment] = React.useState({
	})
	
	const[commentsPostId,setCommentsPostId]=useState('');
	const[search,setSearch]=useState('');
	const[tagValue,setTagValue]=useState('');
	const [tags, setTags] = useState([]);
	const [status, setStatus] = useState(false);
	 const tagRef = useRef(null);
	const imageRef = useRef(null);
	
			
	
	const user_login_details = useSelector((state) => state.user);
	const posts = useSelector((state) => state.posts);
	//console.log('posts==',posts);
	console.log('posts.posts==',posts.posts);
	const comments = useSelector((state) => state.comments);
	//console.log('comments===',comments)
	//console.log('comments===',comments.comments)
	
	
	//console.log('tags==',tags);
	const likes = useSelector((state) => state.likes);
	console.log('likes==',likes);
	console.log('likes.likes==',likes.likes);
	console.log('likes.length==',likes.likes.length);
	const dispatch=useDispatch();
	let navigate = useNavigate();
	
	if(Object.keys(initial).length > 0)
	{
		var initial_id =initial[0]._id;
		var user_id = {
			['user_id']: initial[0]._id
		}
	}

	
	let userid_postvalue = {
    ...post,
    ...user_id,
	tags
	};
	
	const clear =() => {
		setPost({...post,title:'',description:''})
		imageRef.current.value = '';
	
		
		
	}
		
	

	
	
	//console.log('userid_postvalue==',userid_postvalue)
	
	const postSubmit=(e)=> {
		e.preventDefault();
		const formData = new FormData();
			console.log('userid_postvalue==',userid_postvalue)
	formData.append('user_id',userid_postvalue.user_id);
	formData.append('title',userid_postvalue.title);
	formData.append('description',userid_postvalue.description);
	formData.append('tags',userid_postvalue.tags);
	formData.append('photo',userid_postvalue.photo);	
	formData.append('file',userid_postvalue.file);		
		//dispatch(postDataSubmit(userid_postvalue));
		dispatch(postDataSubmit(formData));
		clear();
	}
	
	function handleChange(evt) {
	
	const post_id_filter = posts.posts.filter(post  => post.title === evt.target.name)	
	setCommentsPostId(post_id_filter[0]._id);		
	
	const value = evt.target.value;
		setComment({
			[evt.target.name]: value
			});
	}
	
	
	const DeletePosts =(id) => {
	dispatch(Delete_Post(id));
		
	}
	


const onKeyDown =(keyEvent) => {
 if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
    keyEvent.preventDefault();
  }	
	
}

	const commentSubmit=(e)=> {
		e.preventDefault();
		var comments_value =Object.values(comment).join('');
		
		var user_id_obj = {
			['user_id']: initial_id
		}
		
		var post_id_obj = {
			['post_id']: commentsPostId
		}
		
		var comments_value_obj = {
			['comments']: comments_value
		}
	
			let comments_data = {
				...post_id_obj,
				...user_id_obj,
				...comments_value_obj
			};
			//console.log('comments_data',comments_data);
		dispatch(postCommentsSubmit(comments_data))			
		
	}
	
		const searchForm=(e) => {
		e.preventDefault();
		//console.log('i');
		let searchObject = {
		['searchedvalue']: search	
		}
		dispatch(Search_Title(searchObject));
		
	}
	
	 const addTags = (event) => {
        if (event.key === "Enter" && event.target.value !== "") {
            setTags([...tags, event.target.value]);
            event.target.value = "";
			
        }
	}
	
	const removeTags = index => {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
	};
	
	
	
	
	const handlePhoto = (e) => {
	
	
	
		setPost({...post,
			photo:e.target.files[0].name,
			file:e.target.files[0]

			});
	

}
	
	
	
	
	const setLikes = (id) => {
		var user_id_obj = {
			['user_id']: initial_id
		}
		let post_id_obj ={
			['post_id']: id
		}
		let likes_data = {		
				...user_id_obj,
				...post_id_obj
			}
		dispatch(postLikeSubmit(likes_data));
		//console.log('post_id_obj==',post_id_obj)
	}
	
	
	useEffect(() => {	
	const token = localStorage.getItem('token');
	if(token) 
	{		
		const items = JSON.parse(localStorage.getItem('signin_data')); 
		setInitial(items);
	}
	},[]);

	useEffect(() => {
	if(user_login_details.users.length == 0)
	{
		navigate('..');  
	} 
	},[user_login_details.users.length]);
	
	
	
	useEffect(() => {
		dispatch(getAllPosts());
  },[]);
  
	useEffect(()=> {
		dispatch(getAllComments());	
	},[])
	
	useEffect(()=> {
		dispatch(getAllLikes());	
	},[])
	
	
  
	
	return(
	<>
		<h3>Dashboard Welcome, {initial[0]? initial[0].userName:''}</h3>  		
		<button onClick={()=>dispatch(signOut())} >Logout</button>
		
		<Container>
		<Row>
		
		<Col sm={6}>
			<h4>Search Posts</h4>
			<form onSubmit={searchForm}>
						<input type="text" placeholder="search"
						value={search}
						onChange={(e)=>setSearch(e.target.value)}/>
						<Button variant="info" type="submit">
						search
						</Button>
					</form>

		
			<h3>Add Post</h3>
	
			<Form onSubmit={postSubmit} onKeyDown={onKeyDown} encType="multipart/form-data" >	
	
				<Form.Group>
				<Form.Label>Title</Form.Label>
				<Form.Control 
				type="text" 
				placeholder="Enter user Title"
				value={post.title}	
				onChange={(e) => setPost({ ...post, title: e.target.value })}
					
					/>
			</Form.Group>
			
			
			
			
			<Form.Group>
				<Form.Label>Description</Form.Label>
				<Form.Control type="text" 
				placeholder="Enter user Description"
				value={post.description}	
				onChange={(e) => setPost({ ...post, description: e.target.value })}
				
				
					/>
			</Form.Group>
			
			
			
			 <ul>
            {tags.map((tag, index) => (
               <li key={index}>
                  <span  >{tag}</span><i onClick={() => removeTags(index)}> <CloseIcon/></i>
                   
               </li>
            ))}
         </ul>
			
			
			
			
			
			
			
			<Form.Group>
				<Form.Label>Keywords</Form.Label>
		
				<Form.Control input type="text" 
				placeholder="For Adding Tags Press Enter"
				onKeyUp={event => addTags(event)}	
				/>
			</Form.Group>
			
			
				
			<Form.Group>
				<Form.Label>Image</Form.Label>
		
				<Form.Control input type="file" 
				ref={imageRef}				
				 name="photo"
				onChange={handlePhoto}	
				/>
			</Form.Group>
			
			
		
		
		
	
		<br />
			
			<Button variant="success" type="submit">
				Submit
			</Button>

			</Form>
		</Col>
		
		
		
		
		<Col sm={6}>
		
		
			{posts.posts.map((post,index) => {
				


						var deletebutton =''
						if(initial.length > 0)
						{
					if(initial[0]._id== post.user_id)
						{
								deletebutton = <Button variant="danger" onClick={()=>DeletePosts(post._id)}>Delete</Button>	
						}	
						else
						{
								deletebutton='';
						}
			
						}
				
				
		
					/*var like_result=""
					
							if(likes.likes.length > 0)
							{
								var Likedresult =likes.likes.filter((like,index) => {
								    if(post._id === like.post_id && like.status==1 )
									{											
									      like_result = <button className="Likes" onClick={()=>setLikes(post._id)}>LIKED</button>
									//console.log('like_id==',like_id)
									}
									else
									{
										like_result = ''
									}	
										//return like_result
									//console.log('like_id==',like_id);		
								})
							
							}
		console.log('like_result==',like_result)
					*/
					
		
/*let status1 = likes.likes.map(like => like.status);
	console.log('status1==',status1)
let statusformat = status1[0];
 	console.log('statusformat==',statusformat)
	
	if(statusformat == 0)
	{	
	
	var button_display ='';
button_display=<button className="Likes" onClick={()=>setLikes(post._id)} >Like</button>
	}
	else
	{	
	
	button_display=<button className="Likes" onClick={()=>setLikes(post._id)} >LIKED</button>
	}*/
	
	
	/*
	var needresult =likes.likes.filter(like => like.post_id == post._id && like.status==1) 			
				console.log('needresult==',needresult);
				
				
		var likes_display = needresult.filter((need,value) => {
					return need.status 

			})	
			
			console.log('likes_display==',likes_display);
				
			
			var button_display ='';
			if(likes_display_format != undefined)
			{
				var likes_display_format =   likes.display[0];
				
				if(likes_display_format == 1)
				{
button_display=<button className="Likes" onClick={()=>setLikes(post._id)} >LIKED</button>
				}
				if(likes_display_format == 0)
				{
button_display=<button className="Likes" onClick={()=>setLikes(post._id)} >Like</button>
				}
				
			}		
			else
			{
button_display=<button className="Likes" onClick={()=>setLikes(post._id)} >Like</button>
				
			}		
			console.log('likes_display_format==',likes_display_format)
			*/	
				/*var neededresult_button_display =needresult[0] ;
					var button_display ='';
				if(needresult == undefined)
				{
				button_display=<button  className="Likes"  onClick={()=>setLikes(post._id)}  >Like</button>
				}	
				if(neededresult_button_display == 1)
				{
					button_display=<button className="Likes" onClick={()=>setLikes(post._id)} >LIKED</button>
				}
				
				
				if(neededresult_button_display == 0)
				{
					button_display=<button className="Likes" onClick={()=>setLikes(post._id)} >Like</button>
				}	
				*/
				
				
				/*if(needresult[0] != undefined)
				{	
				var neededresult_button_display =needresult[0] ;
		
				var button_display ='';
				if(neededresult_button_display == 1)
				{
					button_display=<button className="Likes" onClick={()=>setLikes(post._id)} >LIKED</button>
				}
				else
				{
					button_display=<button  className="Likes"  onClick={()=>setLikes(post._id)}  >Like</button>
				}
				}
				else
				{
					button_display=<button  className="Likes"  onClick={()=>setLikes(post._id)}  >Like</button>
				}		
			*/
					
			return <div key={index+1} className="posts_box">
					post No:{index+1} <h4>Author:{post.authorName}{deletebutton} </h4>	
					
				    <p className="title">Title:{post.title} {'   '}&nbsp;&nbsp;&nbsp;&nbsp;
					<a className="Likes" >{  } </a> </p>
					<p className="description">Description:{post.description}</p>
					<p className="tags">Tags:{post.tags? post.tags.map(value => value+' ,' + ' '):' '}</p>
					
					<p className="tags">Image<img style={{ width: '30%' }}  src={post ? '/uploads/'+post.file:''} alt=''   /></p>	
					
					
					<form onSubmit={commentSubmit} >	
						<input
							type="text"
							name={post.title}
							value={comment._id}
							onChange={handleChange}
							placeholder={"Enter Comments"}
						/>
  
						<Button variant="primary" type="submit">
							Comments
							</Button>
				
						</form>
	
				
	
	{
      comments.comments.map(comment => {
		var comments_msg = '';
		var commenterName = '';
		if(comment.post_id == post._id )
		{
				comments_msg = comment.comments;
				commenterName=comment.commenterName+'==>'
		}	
		
		
		return(
			<div key={comment._id}>
					<p>{commenterName}{comments_msg}</p>
					
			</div>
        )
      })
    }		
	
				</div>	

	
				
								
	
				})
		
			}
		</Col>		
		</Row>
		</Container>
		
	</>
)};

export default Dashboard;