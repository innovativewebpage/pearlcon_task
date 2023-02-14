import {GET_ALLPOST_SUCCESS,
ADD_POST_SUCCESS,

DELETE_USERPOST_SUCCESS,
DELETE_USERPOST_fAILURE,
SEARCH_POST_SUCCESS,

SEARCH_POST_fAILURE



} from '../constant';
const initialState = {
  posts: [],
  loading: false,
  error: null,
  search:false
}
export default function posts(state = initialState, action) {
	//console.log('state==',state);
	//console.log('action==',action);
	
  switch (action.type) {
	   case 'GET_ALLPOST_SUCCESS':
      return {
        ...state,
        loading: false,
		posts: action.payload
		
      }
	  
	  case 'ADD_POST_SUCCESS':
		return {
			...state,
			posts:action.payload
			
		}
		
		
		
		case 'DELETE_USERPOST_SUCCESS':
		return{
			...state,
			posts: [...state.posts.filter((value) => value._id != action.payload)]
			
		}
		
		case 'SEARCH_POST_SUCCESS':
			return {
				...state,
				posts:action.payload,
				search:true
			}
    
   
    default:
      return state;
  }
}
