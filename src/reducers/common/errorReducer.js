import {
    DELETE_PRODUCTS_FAILURE,
    DELETE_PRODUCTS_REQUEST,
    DELETE_PRODUCTS_SUCCESS,
    LOAD_ACCOUNT_FAILURE,
    LOAD_ACCOUNT_REQUEST,
    LOAD_ACCOUNT_SUCCESS,
    LOAD_ARTICLES_FAILURE,
    LOAD_ARTICLES_REQUEST,
    LOAD_ARTICLES_SUCCESS,
    LOAD_CSV_FAILURE,
    LOAD_CSV_REQUEST,
    LOAD_CSV_SUCCESS,
    LOAD_PRODUCTS_FAILURE,
    LOAD_PRODUCTS_REQUEST,
    LOAD_PRODUCTS_SUCCESS,
    MERGE_PRODUCTS_FAILURE,
    MERGE_PRODUCTS_REQUEST,
    MERGE_PRODUCTS_SUCCESS,
    POST_ARTICLES_FAILURE,
    POST_ARTICLES_REQUEST,
    POST_ARTICLES_SUCCESS
} from "../../constants/action-types";

const initialState = {
    account: {},
    products: {},
    stock: {},
    upload: {}
};

function errorReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ACCOUNT_REQUEST:
        case LOAD_ACCOUNT_SUCCESS:
            return {
                ...state,
                account: {}
            }
        case LOAD_ACCOUNT_FAILURE:
            return {
                ...state,
                account: action.payload
            }
        case LOAD_PRODUCTS_REQUEST:
        case LOAD_PRODUCTS_SUCCESS:
        case MERGE_PRODUCTS_REQUEST:
        case MERGE_PRODUCTS_SUCCESS:
        case DELETE_PRODUCTS_REQUEST:
        case DELETE_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: {}
            }
        case LOAD_PRODUCTS_FAILURE:
        case MERGE_PRODUCTS_FAILURE:
        case DELETE_PRODUCTS_FAILURE:
            return {
                ...state,
                products: action.payload
            }
        case LOAD_ARTICLES_REQUEST:
        case LOAD_ARTICLES_SUCCESS:
            return {
                ...state,
                stock: {}
            }
        case LOAD_ARTICLES_FAILURE:
            return {
                ...state,
                stock: action.payload
            }
        case POST_ARTICLES_REQUEST:
        case POST_ARTICLES_SUCCESS:
            return {
                ...state,
                stock: {},
                upload: {}
            }
        case POST_ARTICLES_FAILURE:
            return {
                ...state,
                stock: action.payload,
                upload: action.payload
            }
        case LOAD_CSV_REQUEST:
        case LOAD_CSV_SUCCESS:
            return {
                ...state,
                upload: {}
            }
        case LOAD_CSV_FAILURE:
            return {
                ...state,
                upload: action.payload
            }
        default:
            return state
    }
}

export default errorReducer;