import {ADD_POST,

GET_ALLPOST_LIST,
DELETE_POST,
SEARCH_POST,





} from '../constant';



export const postDataSubmit =  (data) => {
	//console.log('userLoginDetails',data)

		return {
		type:ADD_POST,
		payload:data,
		}

}

export const getAllPosts=() => {
	
	return {
		type:GET_ALLPOST_LIST
		}
	
}

export const Delete_Post=(post_id)=> {
	return {
		type:DELETE_POST,
		payload:post_id
	}
	
}

export const Search_Title=(data)=> {
	return {
		type:SEARCH_POST,
		payload:data
	}
	
}



