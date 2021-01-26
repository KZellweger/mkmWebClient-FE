import {LOAD_ACCOUNT_FAILURE, LOAD_ACCOUNT_REQUEST, LOAD_ACCOUNT_SUCCESS} from "../../constants/action-types";

const initialState = {
    account: false,
    something: false
};

function loadingReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ACCOUNT_REQUEST:
            return {
                ...state,
                account: true}
        case LOAD_ACCOUNT_SUCCESS:
        case LOAD_ACCOUNT_FAILURE:
            return {
                ...state,
                account: false}
        default:
            console.log("Unknown Action: " + action.type)
            return state
    }
}

export default loadingReducer;