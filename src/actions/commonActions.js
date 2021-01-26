import {ADD_ACCOUNT, LOAD_FROM_API_FAIL, LOAD_FROM_API_REQUEST, LOAD_FROM_API_SUCCESS} from "../constants/action-types";

/**
 * Shared Actions like indicate loading or failure of API-Calls
 */

// Action Creators
export function startAPIRequest() {
    return {type: LOAD_FROM_API_REQUEST}
}

export function apiSuccess() {
    return {type: LOAD_FROM_API_SUCCESS}
}

export function apiFailure(error) {
    return {type: LOAD_FROM_API_FAIL, payload: {error: error}}
}