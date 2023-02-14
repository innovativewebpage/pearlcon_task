import React,{useState,useEffect} from "react";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Row,Col,Container,Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

import {useSelector,useDispatch} from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
import { userLoginDetails } from '../actions';


const Signup = () => {
	
const clientId = "766807462402-igl54k4oiai8stkf891ivue6p9n72l5l.apps.googleusercontent.com";
	
const [googleLoginData,setGoogleLoginData] = useState([]);

const [user, setUser] = useState({
	userEmail:'',
	userPassword:''
});
	
const dispatch=useDispatch();
let navigate = useNavigate();
const initial = useSelector((state) => state.user);
//console.log('initial==',initial);



useEffect(()=> {
		if(initial.sign_in_success == 1)
		{
			navigate('../Dashboard');	
		}
			else
		{
			console.log('else');
		}	
},[initial.sign_in_success])

const userLogin =(e) => {
	e.preventDefault();
	//console.log('user==',user);
	dispatch(userLoginDetails(user));
}

const onLoginSuccess=(result)=> {
	//setGoogleLoginData(result.profileObj);
	dispatch(userLoginDetails(result.profileObj));
}


//console.log('googleLoginData==',googleLoginData)

	return(
		<div>
				
<Container>
	<Row>
		<Col sm={2}><pre>{JSON.stringify(googleLoginData,null,2)}</pre></Col>
		<Col sm={8}><h3>Signin</h3>
		
		
			<Link to='/signup'>Signup</Link>		
		
	<h4 className="invalidusername">{initial.sign_in_success == 2 ? 'Invalid Username or password':''} </h4>
			
			<Form onSubmit={userLogin} >
			

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
		
		<br /><br />
		<GoogleLogin
                    clientId={clientId}
                    buttonText="Sign In"
                    onSuccess={onLoginSuccess}
                   
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={false}
                />
		
		</div>
	
	)
	
}

export default Signup;