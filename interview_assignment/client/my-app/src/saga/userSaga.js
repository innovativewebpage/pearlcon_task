

import axios from "axios";

import {takeEvery,takeLatest,put,call} from 'redux-saga/effects';
import {
ADD_USER,
ADD_USER_SUCCESS,
ADD_USER_FAILURE,


USER_LOGIN,
USER_LOGIN_SUCCESS,
USER_LOGIN_FAILURE,

USER_ALREADY_EXISTS,

GET_POST_AUTHOR_NAME,
GET_COMMENT_AUTHOR_NAME,

SIGN_OUT,
USER_LOGOUT_SUCCESS




} from '../constant';


 	
function* addUsers(data) {	
	
	function postUsersData()
	{
		return axios.post('/user/create',data.payload)
	}	
//const add_new_users = yield call(postUsersData);
//console.log(add_new_users)

try {
 const add_new_users = yield call(postUsersData);
 //console.log(add_new_users);
	if(add_new_users.status == 201)
	{	
  yield put({ type:ADD_USER_SUCCESS, payload: add_new_users.data.data });
	}
	else if(add_new_users.data.message == 'Email already exists')
	{
		
	 yield put({ type:USER_ALREADY_EXISTS });	
	}	
 } catch (error) {
  yield put({ type: ADD_USER_FAILURE, message: error.message });
 }
	 
}


/*

function* getPostAuthorName(data)
{

console.log('data==',data)
		function getPostAuthorNameApi()
		{	
			return axios.post('/user/getAuthorName',data.payload)
		}
	const Posts_author_name_api = yield call(getPostAuthorNameApi);	
	console.log(Posts_author_name_api);
}	
*/


function* getCommentAuthorName(data)
{

console.log('data==',data)
		/*function getPostAuthorNameApi()
		{	
			return axios.post('/user/getAuthorName',data.payload)
		}
	const Posts_author_name_api = yield call(getPostAuthorNameApi);	
	console.log(Posts_author_name_api);*/
}	




function* getPostAuthorName(data)
{

console.log('data==',data)
		function getPostAuthorNameApi()
		{	
			return axios.post('/user/getAuthorName',data.payload)
		}
	const Posts_author_name_api = yield call(getPostAuthorNameApi);	
	console.log(Posts_author_name_api);
}



function* loginUsers(data) {
	
	//console.log('data',data)
	
		function signinUsersData()
	{
		return axios.post('/user/signin',data.payload)
	}	

 const sign_in_users = yield call(signinUsersData);
	
	
	console.log('sign_in_users==',sign_in_users)
	
	
	if(sign_in_users.data.message == 'Signin Successfully')
	{
		var token=1
		localStorage.setItem('token', token);
		localStorage.setItem('signin_data', JSON.stringify(sign_in_users.data.data));
		yield put({ type:USER_LOGIN_SUCCESS, payload: sign_in_users.data.data });
	}		
	else if(sign_in_users.data.message =='Failed')
	{
	
		yield put({ type:USER_LOGIN_FAILURE });	
	}
	
}


function* signoutUsers()
{
	//console.log('ok');
	
function signoutUsersData()
		{
			return axios.get('/user/signout')
		}	

const sign_out_users = yield call(signoutUsersData);
//console.log('sign_out_users==',sign_out_users)



if(sign_out_users.status == 200)
	{
		
		localStorage.clear();
		yield put({ type:USER_LOGOUT_SUCCESS});
	}		
	else
	{
	console.log('no');	
	}	
}	



function* userSaga()
{
yield takeLatest(ADD_USER,addUsers);
yield takeLatest(USER_LOGIN,loginUsers);
//yield takeLatest(GET_POST_AUTHOR_NAME,getPostAuthorName);

yield takeLatest(GET_COMMENT_AUTHOR_NAME,getCommentAuthorName);

yield takeLatest(SIGN_OUT,signoutUsers);





}

export default userSaga;	



