import axios from "axios";
import {LOAD_CSV_FAILURE, LOAD_CSV_REQUEST, LOAD_CSV_SUCCESS, SELECT_CSV} from "../constants/action-types";
import {CSV_UPLOAD, IMAGE_PREFIX} from "../constants/api-endpoints";
import {DATE_TIME_FORMAT_OPTIONS} from "../constants/utils";
import {addArticles} from "./stockActions";

export function selectCSV(data) {
    console.log(data)
    const reader = new FileReader()
    const file = {
        lastModified:data.lastModified,
        name:data.name,
        size:data.size,
        content: reader.readAsText(data)
    }
    return {type: SELECT_CSV, file}
}

export const uploadCSV = (file) => {
    return (dispatch) => {
        dispatch({type: LOAD_CSV_REQUEST})
        const formData = new FormData()
        formData.append('file', file)
        return axios.post(CSV_UPLOAD, formData, {}).then(res => {
            dispatch(addArticles(LOAD_CSV_SUCCESS,res.data))
        }).catch(err => {
            return {type: LOAD_CSV_FAILURE, payload: err.message}
        })
    }
}