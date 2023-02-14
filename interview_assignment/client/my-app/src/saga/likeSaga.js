
import axios from "axios";

import {takeLatest,put,call} from 'redux-saga/effects';


import {

ADD_LIKES,
ADD_LIKES_SUCCESS,
ADD_LIKES_FAILURE,

GET_ALL_LIKES,
GET_ALLLIKES_SUCCESS,
GET_ALLLIKES_FAILURE


} from '../constant';

function* addLikes(data)
{
	function addLikesData()
	{
		return axios.post('/like/post_like',data.payload)
	}	
	//const add_new_likes = yield call(addLikesData);
	//console.log('add_new_likes==',add_new_likes)
	
	 try {
	const add_new_likes = yield call(addLikesData);
		yield put({ type: ADD_LIKES_SUCCESS, payload: add_new_likes.data });
 } catch (error) {
  yield put({ type: ADD_LIKES_FAILURE, message: error.message });
 }
}

function* getAllLikes(data)
{
	
		function getLikesDataApi()
		{
			return axios.get('/like/read')
		}
const likes_api  = yield call(getLikesDataApi);
	console.log('likes_api==',likes_api)
	
		 try {
const likes_api  = yield call(getLikesDataApi);

  yield put({ type: GET_ALLLIKES_SUCCESS, payload: likes_api.data });
 } catch (error) {
  yield put({ type:GET_ALLLIKES_FAILURE, message: error.message });
 }
 
 
		
	
}	


function* likeSaga()
{
yield takeLatest(ADD_LIKES,addLikes);
yield takeLatest(GET_ALL_LIKES,getAllLikes);

}

export default likeSaga;