import {LOAD_ACCOUNT_SUCCESS, LOAD_REQUEST_COUNTER_SUCCESS} from "../constants/action-types";

/**
 *
 * @type {{firstName: string, lastName: string, requestLimit: number, requestUsed: number, totalBalance: number, registrationDate: string, userType: string, userName: string, userId: number}}
 */
const initialState = {
    userId: 0,
    userName: '',
    userType: '',
    firstName: '',
    lastName: '',
    registrationDate: '',
    totalBalance: 0,
    requestLimit:0,
    requestUsed:0
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
        case LOAD_REQUEST_COUNTER_SUCCESS:
            return {
                ...state,
                requestLimit: action.payload.limit,
                requestUsed: action.payload.used
            }
        default:
            return state
    }
}

export default accountReducer;