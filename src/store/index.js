import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk"
import reducer from "../reducers/index"

const composeEnhancers =
    (process.env.NODE_ENV !== 'production' &&
        typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store