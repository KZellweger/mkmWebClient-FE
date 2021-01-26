import stockReducer from "./stockReducer";
import accountReducer from "./accountReducer";
import {combineReducers} from "redux";


export default combineReducers({
    accountReducer,
    stockReducer
})