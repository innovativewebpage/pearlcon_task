import {
ADD_USER,
ADD_USER_SUCCESS,
ADD_USER_FAILURE,

USER_LOGIN,
USER_LOGIN_SUCCESS,
USER_LOGIN_FAILURE,

USER_ALREADY_EXISTS,
USER_LOGOUT_SUCCESS

} from '../constant';


const initialState = {
  users: [],
  loading: false,
  error: null,
  sign_up_success:'',
  sign_in_success:''
  
}
export default function users(state=initialState,action) {
	//console.log('action=',action);
	//console.log('state=',state);
  switch (action.type) {
	   
	
	
	  
    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
		users: action.payload,
		sign_up_success:1,
      }
	  
	   
	  case USER_ALREADY_EXISTS:
	  return {
		...state, 
		 loading: false,  
		 sign_up_success:2 
	  }
	  
	  
	  
	  case USER_LOGIN_SUCCESS:
	  return {
		 ...state, 
		 loading: false,
		 users: action.payload,
		 sign_in_success:1
		  
	  }
	  
	  
	  case USER_LOGIN_FAILURE:
	  return {
		 ...state, 
		 loading: false,
		 sign_in_success:2
		  
	  }
	  
	  
	  case USER_LOGOUT_SUCCESS:
	  return {
		  
		  ...initialState
	  }
	 
	  
	   
    default:
      return state;
}
}
