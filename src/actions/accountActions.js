import axios from "axios";
import {
    LOAD_ACCOUNT_REQUEST,
    LOAD_ACCOUNT_SUCCESS,
    LOAD_ACCOUNT_FAILURE,
    LOAD_PRODUCTS_REQUEST,
    MERGE_PRODUCTS_REQUEST,
    MERGE_PRODUCTS_SUCCESS,
    MERGE_PRODUCTS_FAILURE,
    DELETE_PRODUCTS_REQUEST, DELETE_PRODUCTS_SUCCESS, DELETE_PRODUCTS_FAILURE, LOAD_PRODUCTS_SUCCESS
} from "../constants/action-types";
import {ACCOUNT, PRODUCT} from "../constants/api-endpoints";
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
            registrationDate: new Date(data.registrationDate[0],data.registrationDate[1],data.registrationDate[3]).toLocaleString("de-CH",DATEFORMAT_OPTIONS) ,
            totalBalance: data.totalBalance,
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
                dispatch({type: LOAD_ACCOUNT_FAILURE,payload:error})
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
        dispatch({type:DELETE_PRODUCTS_REQUEST})
        return axios.get(PRODUCT + "/reset")
            .then(() => {
                dispatch({type:DELETE_PRODUCTS_SUCCESS})
            })
            .catch(error => {
                dispatch({type:DELETE_PRODUCTS_FAILURE,payload:error})
            })
    }
}

export const readProductsFromMkm = () => {
    return (dispatch) => {
        dispatch({type:LOAD_PRODUCTS_REQUEST})
        return axios.get(PRODUCT + "/import")
            .then(() => {
                dispatch({type:LOAD_PRODUCTS_SUCCESS})
            })
            .catch(error => {
                dispatch({type:LOAD_ACCOUNT_FAILURE,payload:error})
            })
    }
}

export const updateProductsDB = () => {
    return (dispatch) => {
        dispatch({type:MERGE_PRODUCTS_REQUEST})
        return axios.get(PRODUCT + "/update")
            .then(() => {
                dispatch({type:MERGE_PRODUCTS_SUCCESS})
            })
            .catch(error => {
                dispatch({type:MERGE_PRODUCTS_FAILURE,payload:error})
            })
    }
}
