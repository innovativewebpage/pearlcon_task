import React from 'react';

import './App.css';

import {BrowserRouter as Router,Routes,Route,Link

} from "react-router-dom";

import SignUp from "./components/Signup";
import SignIn from "./components/Signin";
import Dashboard from "./components/Dashboard";
import PrivateOutlet from "./components/PrivateOutlet";

import { Row,Col,Container,Form } from "react-bootstrap"

function App() {
  return (
   <Router>
		<div className="App">
			<Routes>
				<Route path="/signup"  element={<SignUp/> }>Sign Up
				</Route>

				<Route path="/"   element={<SignIn/> }>Sign In
				</Route>
				
			
			
				
			<Route path=""  element={<PrivateOutlet/>}>
				<Route path="/dashboard"   element={<Dashboard/> } >Dashboard
				</Route>
			</Route>
				
			</Routes>
		</div>
	  </Router>
		
	
  );
}

export default App;
