import {ADD_ACCOUNT} from "../constants/action-types";

const initialState = {
    account: {}
};

function accountReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ACCOUNT:
            return state.account.assign(action.payload)
        default:
            console.log("Unknown Action: " + action.type)
            return state
    }
}

export default accountReducer;