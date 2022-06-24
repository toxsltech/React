import PostReducer from "./postReducer";
import { combineReducers } from "redux";
import postReducer from "./postReducer";
import authReducer from "./authReducer";


export default combineReducers({
    post: postReducer,
    auth: authReducer
});
