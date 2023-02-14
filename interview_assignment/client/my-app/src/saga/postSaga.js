

import axios from "axios";

import {takeEvery,takeLatest,put,call} from 'redux-saga/effects';
import {
ADD_POST,
ADD_POST_SUCCESS,
ADD_POST_FAILURE,

GET_ALLPOST_LIST,
GET_ALLPOST_SUCCESS,
GET_ALLPOST_FAILURE,

DELETE_POST,
DELETE_USERPOST_SUCCESS,
DELETE_USERPOST_fAILURE,

SEARCH_POST,
SEARCH_POST_SUCCESS,
SEARCH_POST_fAILURE,







} from '../constant';


 	
function* addPosts(data) {	
	function addPostsData()
	{
		return axios.post('/post/post_create',data.payload)
	}	
	try {
	const add_new_posts = yield call(addPostsData);
	yield put({ type:ADD_POST_SUCCESS, payload: add_new_posts.data });	
 } catch (error) {
  yield put({ type: ADD_POST_FAILURE, message: error.message });
 }
}




 	


function* getAllPosts() {	

	function getPostsDataApi()
		{
			return axios.get('/post/read')
		}



 try {
const posts_api = yield call(getPostsDataApi);
  //console.log(posts_api);
  yield put({ type: GET_ALLPOST_SUCCESS, payload: posts_api.data });
 } catch (error) {
  yield put({ type: GET_ALLPOST_FAILURE, message: error.message });
 }
 
 
 
}

function* deletePosts(data)
{
	
	
	function getDeletePosts()
	{	
		return axios.delete(`/post/deletepost/${data.payload}`)
	}
	
	
	
	try {
  const deletedposts = yield call(getDeletePosts);
 
  yield put({ type: DELETE_USERPOST_SUCCESS, payload: deletedposts.data._id });
 } catch (error) {
  yield put({ type: DELETE_USERPOST_fAILURE, message: error.message });
 }
	
	
}


function* getSearchedPosts(data)
{
//console.log('data',data);

function getPostsSearchApi()
		{
			return axios.post('/post/searchpost',data.payload)
		}
//const getSearchPosts = yield call(getPostsSearchApi);
//console.log('searchPosts',searchPosts);


try {
  const searchposts = yield call(getPostsSearchApi);
 console.log('searchposts.data',searchposts.data); 
 
  yield put({ type: SEARCH_POST_SUCCESS, payload: searchposts.data });
 } catch (error) {
  yield put({ type: SEARCH_POST_fAILURE, message: error.message });
 }

}	

	

/*
function* addPosts(data) {	
	function addPostsData()
	{
		return axios.post('/post/post_create',data.payload)
	}	
	try {
	const add_new_posts = yield call(addPostsData);
	yield put({ type:ADD_POST_SUCCESS, payload: add_new_posts.data });	
 } catch (error) {
  yield put({ type: ADD_POST_FAILURE, message: error.message });
 }
}
*/


function* postSaga()
{
yield takeLatest(ADD_POST,addPosts);
yield takeLatest(GET_ALLPOST_LIST,getAllPosts);
yield takeLatest(DELETE_POST,deletePosts);
yield takeLatest(SEARCH_POST,getSearchedPosts);




}

export default postSaga;	



