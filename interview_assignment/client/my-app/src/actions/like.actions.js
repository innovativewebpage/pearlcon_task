import {
	
	ADD_LIKES,
	GET_ALL_LIKES

} from '../constant';



export const postLikeSubmit = (data) => {
	
	console.log('data==',data)
		return {
				type:ADD_LIKES,
				payload:data
			
		}	
	
}

export const getAllLikes =(data) => {
	
	return {
				type:GET_ALL_LIKES,
				payload:data
			
		}
	
}