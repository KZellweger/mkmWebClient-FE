import {combineReducers} from "redux";
import accountReducer from "./accountReducer";
import stockReducer from "./stockReducer";


export default combineReducers({
    accountReducer,
    stockReducer
})