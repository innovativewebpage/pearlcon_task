

import axios from "axios";

import {takeLatest,put,call} from 'redux-saga/effects';

import {
ADD_COMMENTS,
ADD_COMMENT_SUCCESS,
ADD_COMMENT_FAILURE,

GET_ALLCOMMENT_LIST,
GET_ALLCOMMENTS_SUCCESS,
GET_ALLCOMMENTS_FAILURE


} from '../constant';


 	
function* addComments(data) {	
	
	//console.log('data==',data);
	
	function addCommentsData()
	{
		return axios.post('/comment/comment_create',data.payload)
	}	
	
	
try {
const add_new_comments = yield call(addCommentsData);
 
	
  yield put({ type:ADD_COMMENT_SUCCESS, payload: add_new_comments.data });	
	
 } catch (error) {
  yield put({ type: ADD_COMMENT_FAILURE, message: error.message });
 }


	
}

 	
	
function* getAllComments()
{


	function getCommentsApi()
		{
			return axios.get('/comment/read')
		}	
		
		const comments_api = yield call(getCommentsApi);
		//console.log('comments_api==',comments_api);
		//console.log('comments_api==',comments_api.data);
	
 try {
const comments_api = yield call(getCommentsApi);
 // console.log(posts_api);
  yield put({ type: GET_ALLCOMMENTS_SUCCESS, payload: comments_api.data });
 } catch (error) {
  yield put({ type: GET_ALLCOMMENTS_FAILURE, message: error.message });
 }
 
}	



function* postSaga()
{
yield takeLatest(ADD_COMMENTS,addComments);
yield takeLatest(GET_ALLCOMMENT_LIST,getAllComments);




}

export default postSaga;	



