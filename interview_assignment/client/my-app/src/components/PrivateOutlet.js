import React from "react";
import {Navigate,Outlet} from "react-router-dom";


export default function PrivateOutlet(){

	
	var token = localStorage.getItem("token");
	
	return token ? <Outlet/>:<Navigate to="/"/>;
}
