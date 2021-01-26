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
export const ACCOUNT = SERVER_URL + '/account/'
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
 * Fetch Articles persisted in the local Database.
 * Includes {@link STOCK}
 * Used for interactions with {@link https://api.cardmarket.com/ws/documentation/API_2.0:Stock_Management}
 * Because of API restrictions, fetching the Stock from MKM must be triggered explicitly by the user.
 * @type {string}
 */
export const ARTICLES_FROM_DB = STOCK + '/articles'
/**
 * Post Articles to MKM-Stock.
 * Used for interactions with {@link https://api.cardmarket.com/ws/documentation/API_2.0:Stock_Management}
 * Includes {@link STOCK}
 * @type {string}
 */
export const ARTICLES_TO_MKM = STOCK + '/tomkm'
/**
 * Upload selected csv-File to Backend Service.
 * Includes {@link SERVER_URL}
 * @type {string}
 */
export const CSV_UPLOAD = SERVER_URL + '/upload/csv'
/**
 * Post parsed CSV-File to MKM-Stock
 * Includes {@link SERVER_URL}
 * @type {string}
 */
export const CSV_TO_MKM = SERVER_URL + '/upload/tomkm'

/**
 * Default URL for fetching Images from MKM.
 * @type {string}
 */
export const IMAGE_PREFIX = 'https://api.cardmarket.com'