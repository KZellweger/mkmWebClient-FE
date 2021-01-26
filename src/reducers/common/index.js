import {combineReducers} from "redux";
import errorReducer from "./errorReducer";
import loadingReducer from "./loadingReducer";

export default combineReducers({
    loading : loadingReducer,
    error : errorReducer})