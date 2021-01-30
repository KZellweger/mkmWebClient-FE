import {POPOVER_ClOSE, POPOVER_OPEN} from "../../constants/action-types";

const initialState = {
    anchorEl: {},
    popOverImage: '',
    open: false
}

function popOverReducer(state = initialState, action) {
    switch (action.type) {
        case POPOVER_OPEN:
            return {
                ...state,
                anchorEl: action.payload.anchorEl,
                popOverImage: action.payload.popOverImage,
                open: true
            }
        case POPOVER_ClOSE:
            return {
                ...state,
                anchorEl: {},
                popOverImage: '',
                open: false
            }
        default:
            return state
    }
}

export default popOverReducer