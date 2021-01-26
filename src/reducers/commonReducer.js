import {ADD_ACCOUNT, LOAD_FROM_API_FAIL, LOAD_FROM_API_REQUEST, LOAD_FROM_API_SUCCESS} from "../constants/action-types";

const initialState = {
    isLoading: false,
    error: {}
};

function commonReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_FROM_API_REQUEST:
            return {isLoading: true, error: {}}
        case LOAD_FROM_API_SUCCESS:
            return {isLoading: false, error: {}}
        case LOAD_FROM_API_FAIL:
            return {isLoading: false, error: action.payload}
        default:
            console.log("Unknown Action: " + action.type)
            return state
    }
}

export default commonReducer();