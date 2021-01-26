import axios from "axios";
import {
    LOAD_ACCOUNT_REQUEST,
    LOAD_ACCOUNT_SUCCESS,
    LOAD_ACCOUNT_FAILURE,
    LOAD_PRODUCTS_REQUEST,
    MERGE_PRODUCTS_REQUEST,
    MERGE_PRODUCTS_SUCCESS,
    MERGE_PRODUCTS_FAILURE,
    DELETE_PRODUCTS_REQUEST, DELETE_PRODUCTS_SUCCESS, DELETE_PRODUCTS_FAILURE
} from "../constants/action-types";
import {ACCOUNT, PRODUCT} from "../constants/api-endpoints";

// Action Creators
export function requestAccount() {
    return {type: LOAD_ACCOUNT_REQUEST}
}

export function addAccount(payload) {
    return {type: LOAD_ACCOUNT_SUCCESS, payload: payload}
}

export function accountFailure(payload) {
    return {type: LOAD_ACCOUNT_FAILURE, payload: payload}
}

export function requestProductLoad() {
    return {type: LOAD_PRODUCTS_REQUEST}
}

export function successProductLoad() {
    return {type: LOAD_ACCOUNT_SUCCESS}
}

export function failureProductLoad(payload) {
    return {type: LOAD_ACCOUNT_FAILURE, payload: payload}
}

export function requestProductMerge() {
    return {type: MERGE_PRODUCTS_REQUEST}
}

export function successProductMerge(payload) {
    return {type: MERGE_PRODUCTS_SUCCESS}
}

export function failureProductMerge(payload) {
    return {type: MERGE_PRODUCTS_FAILURE, payload: payload}
}
export function requestProductDelete() {
    return {type: DELETE_PRODUCTS_REQUEST}
}

export function successProductDelete() {
    return {type: DELETE_PRODUCTS_SUCCESS}
}

export function failureProductDelete(payload) {
    return {type: DELETE_PRODUCTS_FAILURE, payload: payload}
}
// Async Actions
export const getAccount = () => {
    return (dispatch) => {
        dispatch(requestAccount())
        return axios.get(ACCOUNT)
            .then(result => {
                console.log(result.data)
                dispatch(addAccount(result.data))
            })
            .catch(error => {
                dispatch(accountFailure(error))
            })
    }
}

/**
 *  Linuses neat way:
 *  export const getAccount () => async dispatch =>{
 *      {
 *
 *      }
 *      const res = await axios.get(ACCOUNT)
 *      const acc = new Account(res.data)
 *      dispatch(addAccount(acc))
 *      dispatch(apiSuccess())
 *  }
 */

export const deleteProductDB = () => {
    return (dispatch) => {
        dispatch(requestProductDelete())
        return axios.get(PRODUCT + "/reset")
            .then(() => {
                dispatch(successProductDelete())
            })
            .catch(error => {
                dispatch(failureProductDelete(error))
            })
    }
}

export const readProductsFromMkm = () => {
    return (dispatch) => {
        dispatch(requestProductLoad())
        return axios.get(PRODUCT + "/import")
            .then(() => {
                dispatch(successProductLoad())
            })
            .catch(error => {
                dispatch(failureProductLoad(error))
            })
    }
}

export const updateProductsDB = () => {
    return (dispatch) => {
        dispatch(requestProductMerge())
        return axios.get(PRODUCT + "/update")
            .then(() => {
                dispatch(successProductMerge())
            })
            .catch(error => {
                dispatch(failureProductMerge(error))
            })
    }
}
