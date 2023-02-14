import {
ADD_COMMENT_SUCCESS,
GET_ALLCOMMENTS_SUCCESS,
GET_ALLCOMMENTS_FAILURE



} from '../constant';

const initialState = {
  comments: [],
  loading: false,
  error: null
}

export default function comments(state = initialState, action) {


	
  switch (action.type) {
	  
	  
	  
	  case 'ADD_COMMENT_SUCCESS':
		return {
			...state,
			comments:action.payload
			
		}
		
		case 'GET_ALLCOMMENTS_SUCCESS':
		return {
			  ...state,
			  comments:action.payload,
			 loading: false,
			 error: null
			 
			
			
		}
		
	  
    
   
    default:
      return state;
  }
}
