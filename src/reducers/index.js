import {combineReducers} from "redux";
import accountReducer from "./accountReducer";
import commonReducer from "./common/index";
import stockReducer from "./stockReducer";

export default combineReducers({
    account: accountReducer,
    common: commonReducer,
    stock: stockReducer
})