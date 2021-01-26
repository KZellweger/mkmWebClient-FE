import {ADD_ARTICLE} from "../constants/action-types";

const initialState = {
    articles: []
};

function stockReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ARTICLE:
            return state.articles.concat(action.payload)
        default:
            console.log("Unknown Action: " + action.type)
            return state
    }
}

export default stockReducer;