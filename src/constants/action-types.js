/**
 * Defines Constants for Action Types.
 */

/**
 * Add a {@link https://api.cardmarket.com/ws/documentation/API_2.0:Entities:Article} to the Redux Store.
 * @type {string}
 */
export const ADD_ARTICLE = "ADD_ARTICLE"

/**
 * Add the current MKM-Account to the Redux Store.
 * @type {string}
 */
export const ADD_ACCOUNT = "ADD_ACCOUNT"

/**
 * Indicate that a request to the API has ben applied.
 * Use to display a loading icon.
 * @type {string}
 */
export const LOAD_FROM_API_REQUEST = "LOAD_FROM_API_REQUEST"

/**
 * Indicate that a request to the API has successful.
 * @type {string}
 */
export const LOAD_FROM_API_SUCCESS = "LOAD_FROM_API_SUCCESS"

/**
 * Indicate that a request to the API has failed.
 * Use for adequate error handling.
 * @type {string}
 */
export const LOAD_FROM_API_FAIL = "LOAD_FROM_API_FAIL"

