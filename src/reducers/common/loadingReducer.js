import {
    DELETE_PRODUCTS_FAILURE,
    DELETE_PRODUCTS_REQUEST, DELETE_PRODUCTS_SUCCESS,
    LOAD_ACCOUNT_FAILURE,
    LOAD_ACCOUNT_REQUEST,
    LOAD_ACCOUNT_SUCCESS, LOAD_ARTICLES_FAILURE, LOAD_ARTICLES_REQUEST, LOAD_ARTICLES_SUCCESS, LOAD_PRODUCTS_FAILURE,
    LOAD_PRODUCTS_REQUEST, LOAD_PRODUCTS_SUCCESS, MERGE_PRODUCTS_FAILURE, MERGE_PRODUCTS_REQUEST, MERGE_PRODUCTS_SUCCESS
} from "../../constants/action-types";

const initialState = {
    account: false,
    products: false,
    stock: false
};

function loadingReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ACCOUNT_REQUEST:
            return {
                ...state,
                account: true}
        case LOAD_ACCOUNT_SUCCESS:
        case LOAD_ACCOUNT_FAILURE:
            return {
                ...state,
                account: false}
        case LOAD_PRODUCTS_REQUEST:
        case MERGE_PRODUCTS_REQUEST:
        case DELETE_PRODUCTS_REQUEST:
            return {
                ...state,
                products: true}
        case LOAD_PRODUCTS_SUCCESS:
        case MERGE_PRODUCTS_SUCCESS:
        case DELETE_PRODUCTS_SUCCESS:
        case LOAD_PRODUCTS_FAILURE:
        case MERGE_PRODUCTS_FAILURE:
        case DELETE_PRODUCTS_FAILURE:
            return {
                ...state,
                products: false}
        case LOAD_ARTICLES_REQUEST:
            return {
                ...state,
                stock: true}
        case LOAD_ARTICLES_SUCCESS:
        case LOAD_ARTICLES_FAILURE:
            return {
                ...state,
                stock: false}
        default:
            console.log("Unknown Action: " + action.type)
            return state
    }
}

export default loadingReducer;