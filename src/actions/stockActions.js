import axios from "axios";
import {
    LOAD_ARTICLES_FAILURE,
    LOAD_ARTICLES_REQUEST,
    LOAD_ARTICLES_SUCCESS,
    POST_ARTICLES_FAILURE,
    POST_ARTICLES_REQUEST
} from "../constants/action-types";
import {ARTICLES_FROM_DB, CSV_TO_MKM, IMAGE_PREFIX} from "../constants/api-endpoints";
import {DATE_TIME_FORMAT_OPTIONS} from "../constants/utils";

// Action Creators
export function addArticles(type, payload) {
    //TODO: catch undefined
    console.log("before modif")
    console.log(payload)
    payload = payload.map(a => {
        console.log(a)
        if (a !== undefined){
                a.lastEdited = new Date(a.lastEdited[0], a.lastEdited[1], a.lastEdited[2], a.lastEdited[3], a.lastEdited[5], a.lastEdited[5]).toLocaleString("de-DE", DATE_TIME_FORMAT_OPTIONS);
            a.product.imageUrl = a.product.imageUrl.replace(".", IMAGE_PREFIX);
        }
        return a;
    })
    console.log("after modif")
    console.log(payload)
    return {type: type, payload: payload}
}

// Async Actions
export const getArticles = () => {
    return (dispatch) => {
        dispatch({type: LOAD_ARTICLES_REQUEST})
        return axios.get(ARTICLES_FROM_DB)
            .then(result => {
                dispatch(addArticles(LOAD_ARTICLES_SUCCESS,result.data))
            })
            .catch(error => {
                console.log(error)
                dispatch({type: LOAD_ARTICLES_FAILURE, payload: error.message})
            })
    }
}

export const postArticles = (data) => {
    //TODO: Generalize this Post API call (BE as well)
    return (dispatch) => {
        dispatch({type: POST_ARTICLES_REQUEST})
        axios.post(CSV_TO_MKM, data, {}).then(res => {
            dispatch(getArticles())
        }).catch(err => {
            return {type: POST_ARTICLES_FAILURE, payload: err.getMessage}
        })
    }
}