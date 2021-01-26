import {LOAD_ACCOUNT_FAILURE, LOAD_ACCOUNT_REQUEST, LOAD_ACCOUNT_SUCCESS} from "../../constants/action-types";

const initialState = {
    account: {},
    something: {}
};

function errorReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ACCOUNT_REQUEST:
        case LOAD_ACCOUNT_SUCCESS:
            return {
                ...state,
                account: {}}

        case LOAD_ACCOUNT_FAILURE:
            return {
                ...state,
                account: action.payload}
        default:
            console.log("Unknown Action: " + action.type)
            return state
    }
}

export default errorReducer;