import React,{useState,useEffect} from "react";
import { Row,Col,Container,Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

import {useSelector,useDispatch} from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
import { userDetails } from '../actions';

import '../App.css';

const Signup = () => {
	
const [user, setUser] = useState({
	userName:'',
	userEmail:'',
	userMobile:'',
	userPassword:''
});
	
//console.log(user);
const dispatch=useDispatch();	
 let navigate = useNavigate();
 
const initial = useSelector((state) => state.user);

console.log('initial==',initial);


useEffect(()=> {
		if(initial.sign_up_success == 1)
		{
			//console.log('redirect');
			navigate('../');	
		}
			else
		{
			console.log('else');
		}	
},[initial.sign_up_success])

const clear = () => 
({...setUser,userName:'',userEmail:'',userMobile:'',
userPassword:''
	
})

const userSubmit=(e)=> {
	e.preventDefault();
	//console.log(user);
	dispatch(userDetails(user));
	if(initial.sign_up_success == 1)
	{
		clear();
	}	
}
	
	return(
		<div>
				
<Container>
	<Row>
		<Col sm={2}></Col>
		<Col sm={8}><h4>Signup</h4>
		<Link to='/'>Signin</Link>
		<h4 className="alreadyexists">{initial.sign_up_success == 2 ? 'Email Already Exists':''} </h4>
			
			<Form onSubmit={userSubmit}>
			<Form.Group>
				<Form.Label>User Name</Form.Label>
					<Form.Control
					type="text" 	
					placeholder="Enter UserName"
					value={user.userName}	
					onChange={(e) => setUser({ ...user, userName: e.target.value })}
						/>
					</Form.Group>

			<Form.Group>
				<Form.Label>Email</Form.Label>
				<Form.Control 
				type="email" 
				placeholder="Enter user Email"
				value={user.userEmail}	
				onChange={(e) => setUser({ ...user, userEmail: e.target.value })}
					
					/>
			</Form.Group>
			
			<Form.Group>
				<Form.Label>Mobile</Form.Label>
				<Form.Control type="number" 
				placeholder="Enter user Mobile"
				value={user.userMobile}	
				onChange={(e) => setUser({ ...user, userMobile: e.target.value })}
				
				
					/>
			</Form.Group>
			
			<Form.Group>
				<Form.Label>Password</Form.Label>
				<Form.Control type="text" 
				placeholder="Enter user Password"
				value={user.userPassword}	
				onChange={(e) => setUser({ ...user, userPassword: e.target.value })}
				
				
					/>
			</Form.Group>


			<Button variant="primary" type="submit">
				Submit
				</Button>
			</Form>
     
	
				</Col>
			</Row>
		</Container>
		
		</div>
	
	)
	
}

export default Signup;