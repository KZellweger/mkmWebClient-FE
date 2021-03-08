import {POPOVER_ClOSE, POPOVER_OPEN} from "../constants/action-types";

/**
 * Shared Actions like indicate loading or failure of API-Calls
 */

export function popOverOpen(target, url) {
    console.log(target)
    const payload = {
        anchorEl: target,
        popOverImage: url
    }
    return {type: POPOVER_OPEN, payload}
}

export function popOverClose() {
    return {type: POPOVER_ClOSE}
}