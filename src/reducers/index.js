import {combineReducers} from "redux";
import accountReducer from "./accountReducer";
import commonReducer from "./common/index";
import stockReducer from "./stockReducer";
import uploadReducer from "./uploadReducer";

export default combineReducers({
    account: accountReducer,
    common: commonReducer,
    stock: stockReducer,
    upload: uploadReducer
})