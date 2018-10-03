import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import reviewReducer from "./reviewReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  review: reviewReducer,
  profile: profileReducer
});
