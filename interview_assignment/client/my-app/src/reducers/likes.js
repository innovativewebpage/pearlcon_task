import {

ADD_LIKES,
ADD_LIKES_SUCCESS,
ADD_LIKES_FAILURE,

GET_ALL_LIKES


} from '../constant';

const initialState = {
  likes: [],
  loading: false,
  error: null
}


export default function likes(state = initialState, action) {
console.log('state==',state)
console.log('action==',action)
	
  switch (action.type) {
	  
	  
	  
	  case 'ADD_LIKES_SUCCESS':
		return {
			...state,
			likes:[...state.likes,action.payload]
			
		}
		
		case 'GET_ALLLIKES_SUCCESS':
		return {
			...state,
			likes:action.payload
			
		}
		
		
	  
    
   
    default:
      return state;
  }
}

