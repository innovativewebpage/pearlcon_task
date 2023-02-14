import {ADD_USER,
ADD_USER_SUCCESS,
ADD_USER_FAILURE,

USER_LOGIN,
USER_LOGIN_SUCCESS,
USER_LOGIN_FAILURE,

GET_POST_AUTHOR_NAME,
GET_COMMENT_AUTHOR_NAME,

SIGN_OUT



} from '../constant';

export const userDetails =  (data) => {

		return {
		type:ADD_USER,
		payload:data,
		}

}


/*

export const getPostAuthorName=(data)=> {
	
	console.log('data',data)
	return {
		type:GET_POST_AUTHOR_NAME,
		payload:data,
		}
	
}
*/

export const getCommentAuthorName=(data)=> {
	
	console.log('data',data)
	return {
		type:GET_COMMENT_AUTHOR_NAME,
		payload:data,
		}
	
}

export const userLoginDetails =  (data) => {
	console.log('userLoginDetails',data)

		return {
		type:USER_LOGIN,
		payload:data,
		}

}



export const signOut=() => {
	
return {
		type:SIGN_OUT
		}

}

