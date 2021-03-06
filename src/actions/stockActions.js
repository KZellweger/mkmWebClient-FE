import axios from "axios";
import {
    EDIT_ARTICLE,
    LOAD_ARTICLES_FAILURE,
    LOAD_ARTICLES_REQUEST,
    LOAD_ARTICLES_SUCCESS,
    POST_ARTICLES_FAILURE,
    POST_ARTICLES_REQUEST, SYNC_STOCK_FAILURE, SYNC_STOCK_REQUEST, SYNC_STOCK_SUCCESS,
    UPDATE_ARTICLES_FAILURE,
    UPDATE_ARTICLES_REQUEST,
    UPDATE_ARTICLES_SUCCESS
} from "../constants/action-types";
import {IMAGE_PREFIX, STOCK, SYNC_STOCK} from "../constants/api-endpoints";

// Action Creators
export function addArticles(type, payload) {
    payload = payload.map(a => {
        if (a !== undefined) {
            a.lastEdited = new Date(a.lastEdited[0], a.lastEdited[1], a.lastEdited[2], a.lastEdited[3], a.lastEdited[5], a.lastEdited[5]);
            if(process.env.NODE_ENV !== "production"){
                a.product.imageUrl = a.product.imageUrl.replace(".", IMAGE_PREFIX);
            }
        }
        return a;
    })
    return {type: type, payload: payload}
}

export function editArticle(id, property, value) {
    const payload = {
        articleId: id,
        modified: property.split(".")[1], //FIXME: make it nice
        value: value
    }
    return {
        type: EDIT_ARTICLE,
        payload
    }
}

// Async Actions
export const getArticles = () => {
    return (dispatch) => {
        dispatch({type: LOAD_ARTICLES_REQUEST})
        return axios.get(STOCK)
            .then(result => {
                dispatch(addArticles(LOAD_ARTICLES_SUCCESS, result.data))
            })
            .catch(error => {
                console.log(error)
                dispatch({type: LOAD_ARTICLES_FAILURE, payload: error.message})
            })
    }
}

export const synchroniseStockWithMkm = () => {
    return(dispatch) => {
        dispatch({type: SYNC_STOCK_REQUEST})
        axios.get(SYNC_STOCK)
            .then(result => {
                dispatch(addArticles(SYNC_STOCK_SUCCESS, result.data))
            })
            .catch(err => {
                dispatch({
                    type: SYNC_STOCK_FAILURE, payload: {
                        status: err.response.status,
                        header: err.response.headers,
                        message: err.response.data.message
                    }
                })
            })
    }
}

export const postArticles = (data) => {
    return (dispatch) => {
        dispatch({type: POST_ARTICLES_REQUEST})
        axios.post(STOCK, data, {}).then(res => {
            dispatch(getArticles())
        }).catch(err => {
            dispatch({
                type: POST_ARTICLES_FAILURE, payload: {
                    status: err.response.status,
                    header: err.response.headers,
                    message: err.response.data.message
                }
            })
        })
    }
}

export const updateArticles = (data) => {
    console.log(data)
    return (dispatch) => {
        dispatch({type: UPDATE_ARTICLES_REQUEST})
        axios.put(STOCK, data, {}).then(res => {
            dispatch(getArticles())
        }).catch(err => {
            console.log(err)
            dispatch({
                type: UPDATE_ARTICLES_FAILURE, payload: {
                    status: "err.response.status",
                    header: "err.response.headers",
                    message: "err.response.data.message"
                }
            })
        })
    }
}