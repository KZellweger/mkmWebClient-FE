import {combineReducers} from "redux";
import accountReducer from "./accountReducer";
import stockReducer from "./stockReducer";
import commonReducer from "./common/index";

export default combineReducers({
    account : accountReducer,
    common : commonReducer,
    stock : stockReducer
})