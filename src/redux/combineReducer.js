import { combineReducers } from "redux";
import reducerOfRequest from "./slices/getIRequestsSlice";

const rootReducer = combineReducers({
      requests: reducerOfRequest,
})
export default rootReducer;

