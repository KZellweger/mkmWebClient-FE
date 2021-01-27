import {LOAD_ACCOUNT_SUCCESS} from "../constants/action-types";

const initialState = {
        userId: 0,
        userName: '',
        userType: '',
        firstName: '',
        lastName: '',
        registrationDate: '',
        totalBalance: 0
};

function accountReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ACCOUNT_SUCCESS:
            return {
                ...state,
                userId: action.payload.userId,
                userName: action.payload.userName,
                userType: action.payload.userType,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                registrationDate: action.payload.registrationDate,
                totalBalance: action.payload.totalBalance,
            }
        default:
            //console.log("Unknown Action: " + action.type)
            return state
    }
}

export default accountReducer;