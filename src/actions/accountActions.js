import axios from "axios";
import {ADD_ACCOUNT} from "../constants/action-types";
import {ACCOUNT, PRODUCT} from "../constants/api-endpoints";
import Account from "../models/Account";
import {apiFailure, startAPIRequest, apiSuccess} from "./commonActions";

// Action Creators
export function addAccount(payload) {
    return {type: ADD_ACCOUNT, payload: payload}
}

// Async Actions
export const getAccount = () => {
    return (dispatch) => {
        dispatch(startAPIRequest())
        return axios.get(ACCOUNT)
            .then(result => {
                return new Account(result.data)
            })
            .then(data => {
                dispatch(addAccount(data))
            })
            .then(() => dispatch(apiSuccess()))
            .catch(error => {
                dispatch(apiFailure(error))
            })
    }
}

export const deleteProductDB = () => {
    return (dispatch) => {
        dispatch(startAPIRequest())
        return axios.get(PRODUCT + "/reset")
            .then(() => {
                dispatch(apiSuccess())
            })
            .catch(error => {
                dispatch(apiFailure(error))
            })
    }
}

export const readProductsFromMkm = () => {
    return (dispatch) => {
        dispatch(startAPIRequest())
        return axios.get(PRODUCT + "/import")
            .then(() => {
                dispatch(apiSuccess())
            })
            .catch(error => {
                dispatch(apiFailure(error))
            })
    }
}

export const updateProductsDB = () => {
    return (dispatch) => {
        dispatch(startAPIRequest())
        return axios.get(PRODUCT + "/update")
            .then(() => {
                dispatch(apiSuccess())
            })
            .catch(error => {
                dispatch(apiFailure(error))
            })
    }
}
