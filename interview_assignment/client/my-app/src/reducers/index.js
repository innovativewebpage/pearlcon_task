import { combineReducers } from "redux";
import User from "./user";
import Posts from "./posts";
import Comments from "./comments";
import Likes from "./likes";
const rootReducer = combineReducers({
 //All reducers 
	user: User,
	posts :Posts,
	comments:Comments,
	likes:Likes
  
});
export default rootReducer