/**
 * Defines Constants for Action Types.
 *
 * TODO: Maybe create own files per Domain. Gets pretty noisy here soon.
 */

// ################# Stock Actions #################

/**
 * Add a {@link https://api.cardmarket.com/ws/documentation/API_2.0:Entities:Article} to the Redux Store.
 * @type {string}
 */
export const ADD_ARTICLE = "ADD_ARTICLE"

/**
 * Perform a manipulation of a property of an existing Article
 * @type {string}
 */
export const EDIT_ARTICLE = "EDIT_ARTICLE"

/**
 * Request the Articles from the Backend-API which are stored in the Local Database
 * @type {string}
 */
export const LOAD_ARTICLES_REQUEST = "LOAD_ARTICLES_REQUEST"

/**
 * Indicate Successful request
 * @type {string}
 */
export const LOAD_ARTICLES_SUCCESS = "LOAD_ARTICLES_SUCCESS"
/**
 * Indicate failed request
 * @type {string}
 */
export const LOAD_ARTICLES_FAILURE = "LOAD_ARTICLES_FAILURE"

/**
 * Post a <strong>new<strong/>List of Articles to MKM.
 * @type {string}
 */
export const POST_ARTICLES_REQUEST = "POST_ARTICLES_REQUEST"

/**
 * Indicate Successful request
 * @type {string}
 */
export const POST_ARTICLES_SUCCESS = "POST_ARTICLES_SUCCESS"
/**
 * Indicate failed request
 * @type {string}
 */
export const POST_ARTICLES_FAILURE = "POST_ARTICLES_FAILURE"

/**
 * Post an updated list of <strong>existing<strong/> Articles to MKM.
 * @type {string}
 */
export const UPDATE_ARTICLES_REQUEST = "UPDATE_ARTICLES_REQUEST"

/**
 * Indicate Successful request
 * @type {string}
 */
export const UPDATE_ARTICLES_SUCCESS = "UPDATE_ARTICLES_SUCCESS"
/**
 * Indicate failed request
 * @type {string}
 */
export const UPDATE_ARTICLES_FAILURE = "UPDATE_ARTICLES_FAILURE"

/**
 * Sync the local Stock with MKM.
 * The Data received from MKM is source of truth
 * @type {string}
 */
export const SYNC_STOCK_REQUEST = "SYNC_STOCK_REQUEST"

/**
 * Indicate Successful request
 * @type {string}
 */
export const SYNC_STOCK_SUCCESS = "SYNC_STOCK_SUCCESS"

/**
 * Indicate failed request
 * @type {string}
 */
export const SYNC_STOCK_FAILURE = "SYNC_STOCK_FAILURE"

// ################# CSV Upload Actions #################

/**
 * Select CSV File to Upload
 * @type {string}
 */
export const SELECT_CSV = "SELECT_CSV"

/**
 * Upload CSV File to Backend
 * @type {string}
 */
export const LOAD_CSV_REQUEST = "LOAD_CSV_REQUEST"

/**
 * Indicate Successful request
 * @type {string}
 */
export const LOAD_CSV_SUCCESS = "LOAD_CSV_SUCCESS"

/**
 * Indicate failed request
 * @type {string}
 */
export const LOAD_CSV_FAILURE = "LOAD_CSV_FAILURE"

// ################# Account Actions #################
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

export const LOAD_REQUEST_COUNTER_REQUEST = "LOAD_REQUEST_COUNTER_REQUEST";
export const LOAD_REQUEST_COUNTER_SUCCESS = "LOAD_REQUEST_COUNTER_SUCCESS";
export const LOAD_REQUEST_COUNTER_FAILURE = "LOAD_REQUEST_COUNTER_FAILURE";

// ################# Data Sync Actions (Handled by Account) ################# TODO: Refactor to own Domain
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

// ################# UI Utils #################
/**
 * Trigger Popover Open
 * @type {string}
 */
export const POPOVER_OPEN = "POPOVER_OPEN"

/**
 * Trigger Popover Close
 * @type {string}
 */
export const POPOVER_ClOSE = "POPOVER_ClOSE"