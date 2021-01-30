import {combineReducers} from "redux";
import errorReducer from "./errorReducer";
import loadingReducer from "./loadingReducer";
import popoverReducer from "./popoverReducer";

export default combineReducers({
    loading: loadingReducer,
    error: errorReducer,
    popover: popoverReducer
})