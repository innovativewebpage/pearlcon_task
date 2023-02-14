import {ADD_COMMENTS,
GET_ALLCOMMENT_LIST



} from '../constant';



export const postCommentsSubmit =  (data) => {
	//console.log('userLoginDetails',data)

		return {
		type:ADD_COMMENTS,
		payload:data
		}

}

export const getAllComments=() => {
	
	return {
		type:GET_ALLCOMMENT_LIST
		}
	
}

