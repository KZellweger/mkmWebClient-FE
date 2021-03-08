import axios from "axios";
import {
    DELETE_PRODUCTS_FAILURE,
    DELETE_PRODUCTS_REQUEST,
    DELETE_PRODUCTS_SUCCESS,
    LOAD_ACCOUNT_FAILURE,
    LOAD_ACCOUNT_REQUEST,
    LOAD_ACCOUNT_SUCCESS,
    LOAD_PRODUCTS_REQUEST,
    LOAD_PRODUCTS_SUCCESS, LOAD_REQUEST_COUNTER_FAILURE, LOAD_REQUEST_COUNTER_REQUEST, LOAD_REQUEST_COUNTER_SUCCESS,
    MERGE_PRODUCTS_FAILURE,
    MERGE_PRODUCTS_REQUEST,
    MERGE_PRODUCTS_SUCCESS, POST_ARTICLES_FAILURE
} from "../constants/action-types";
import {ACCOUNT, PRODUCT, REQUEST_COUNTER} from "../constants/api-endpoints";
import {DATEFORMAT_OPTIONS} from "../constants/utils";

/*
 Action Creators,
 We only create a Function for Actions if they have actually some work to do.
 Otherwise we dispatch the Action type directly in the Middleware.
 */

export function addAccount(data) {
    const account = {
        userId: data.userId,
        userName: data.userName,
        userType: data.userType,
        firstName: data.firstName,
        lastName: data.lastName,
        registrationDate: new Date(data.registrationDate[0], data.registrationDate[1], data.registrationDate[3]).toLocaleString("de-CH", DATEFORMAT_OPTIONS),
        totalBalance: data.totalBalance + " €",
    }
    return {type: LOAD_ACCOUNT_SUCCESS, payload: account}
}

// Async Actions

export const getAccount = () => {
    return (dispatch) => {
        dispatch({type: LOAD_ACCOUNT_REQUEST})
        return axios.get(ACCOUNT)
            .then(result => {
                console.log(result.data)
                dispatch(addAccount(result.data))
            })
            .catch(error => {
                dispatch({type: LOAD_ACCOUNT_FAILURE, payload: error})
            })
    }
}

export const getRequestCounter = () => {
    return (dispatch) => {
        dispatch({type: LOAD_REQUEST_COUNTER_REQUEST})
        return axios.get(REQUEST_COUNTER)
            .then(result => {
                dispatch({
                    type: LOAD_REQUEST_COUNTER_SUCCESS,
                    payload: {
                        used: result.data['USED'],
                        limit: result.data['LIMIT']
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: LOAD_REQUEST_COUNTER_FAILURE, payload: {
                        status: error.response.status,
                        header: error.response.headers,
                        message: error.response.data.message
                    }
                })
            })
    }
}

export const deleteProductDB = () => {
    return (dispatch) => {
        dispatch({type: DELETE_PRODUCTS_REQUEST})
        return axios.get(PRODUCT + "/reset")
            .then(() => {
                dispatch({type: DELETE_PRODUCTS_SUCCESS})
            })
            .catch(error => {
                dispatch({type: DELETE_PRODUCTS_FAILURE, payload: error})
            })
    }
}

export const readProductsFromMkm = () => {
    return (dispatch) => {
        dispatch({type: LOAD_PRODUCTS_REQUEST})
        return axios.get(PRODUCT + "/import")
            .then(() => {
                dispatch({type: LOAD_PRODUCTS_SUCCESS})
            })
            .catch(error => {
                dispatch({type: LOAD_ACCOUNT_FAILURE, payload: error})
            })
    }
}

export const updateProductsDB = () => {
    return (dispatch) => {
        dispatch({type: MERGE_PRODUCTS_REQUEST})
        return axios.get(PRODUCT + "/update")
            .then(() => {
                dispatch({type: MERGE_PRODUCTS_SUCCESS})
            })
            .catch(error => {
                dispatch({type: MERGE_PRODUCTS_FAILURE, payload: error})
            })
    }
}
