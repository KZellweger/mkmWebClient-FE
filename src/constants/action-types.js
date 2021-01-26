/**
 * Defines Constants for Action Types.
 *
 * TODO: Maybe create own files per Domain. Gets pretty noisy here soon.
 */

// Stock Actions
/**
 * Add a {@link https://api.cardmarket.com/ws/documentation/API_2.0:Entities:Article} to the Redux Store.
 * @type {string}
 */
export const ADD_ARTICLE = "ADD_ARTICLE"

//Account Actions
/**
 * Request Current MKM Account from API
 * @type {string}
 */
export const LOAD_ACCOUNT_REQUEST = "LOAD_ACCOUNT_REQUEST"
/**
 * Indicate Successful request
 * @type {string}
 */
export const LOAD_ACCOUNT_SUCCESS = "LOAD_ACCOUNT_SUCCESS"
/**
 * Indicate error from API
 * @type {string}
 */
export const LOAD_ACCOUNT_FAILURE = "LOAD_ACCOUNT_FAILURE"

//Data Sync Actions (Handled by Account) TODO: Refactor to own Domain
/**
 * Load Products from MKM
 * @type {string}
 */
export const LOAD_PRODUCTS_REQUEST = "LOAD_PRODUCTS_REQUEST"
/**
 * Indicate Successful request
 * @type {string}
 */
export const LOAD_PRODUCTS_SUCCESS = "LOAD_PRODUCTS_SUCCESS"
/**
 * Indicate error from API
 * @type {string}
 */
export const LOAD_PRODUCTS_FAILURE = "LOAD_PRODUCTS_FAILURE"



/**
 * Merge Current Products Database with MKM
 * @type {string}
 */
export const MERGE_PRODUCTS_REQUEST = "MERGE_PRODUCTS_REQUEST"
/**
 * Indicate Successful request
 * @type {string}
 */
export const MERGE_PRODUCTS_SUCCESS = "MERGE_PRODUCTS_SUCCESS"
/**
 * Indicate error from API
 * @type {string}
 */
export const MERGE_PRODUCTS_FAILURE = "MERGE_PRODUCTS_FAILURE"

/**
 * Reset the persisted Product DB
 * @type {string}
 */
export const DELETE_PRODUCTS_REQUEST = "MERGE_PRODUCTS_REQUEST"
/**
 * Indicate Successful request
 * @type {string}
 */
export const DELETE_PRODUCTS_SUCCESS = "MERGE_PRODUCTS_SUCCESS"
/**
 * Indicate error from API
 * @type {string}
 */
export const DELETE_PRODUCTS_FAILURE = "MERGE_PRODUCTS_FAILURE"