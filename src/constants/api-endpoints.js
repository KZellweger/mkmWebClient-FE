/**
 * Collection of corresponding API Routes.
 * Detailed function scope is defined by the capabilities of the Backend Project {@link https://github.com/KZellweger/mkmWebClient}
 * and the Provided API credentials.
 * TODO: Would be neat if we have a Factory for API calls
 */

/**
 * Base URL of the Backend Controller
 * Further Docs see {@link https://github.com/KZellweger/mkmWebClient}
 * @type {string}
 */
export const SERVER_URL = 'http://localhost:8081'
/**
 * Account Information, includes {@link SERVER_URL}
 * Used for interactions with {@link https://api.cardmarket.com/ws/documentation/API_2.0:Account_Management}
 * @type {string}
 */
export const ACCOUNT = SERVER_URL + '/account'

export const REQUEST_COUNTER = ACCOUNT + '/requestCounter'

/**
 * Product Information, includes {@link SERVER_URL}
 * Used for interactions with {@link https://api.cardmarket.com/ws/documentation/API_2.0:Product}
 * @type {string}
 */
export const PRODUCT = SERVER_URL + '/product'
/**
 * Stock Information, includes {@link SERVER_URL}
 * Used for interactions with {@link https://api.cardmarket.com/ws/documentation/API_2.0:Stock_Management}
 * @type {string}
 */
export const STOCK = SERVER_URL + '/stock'

/**
 * Synchronize the local Stock with MKM.
 * @type {string}
 */
export const SYNC_STOCK = STOCK + '/sync'

/**
 * Upload selected csv-File to Backend Service.
 * Includes {@link SERVER_URL}
 * @type {string}
 */
export const CSV_UPLOAD = SERVER_URL + '/upload/csv'

/**
 * Default URL for fetching Images from MKM.
 * @type {string}
 */
export const IMAGE_PREFIX = 'https://api.cardmarket.com'