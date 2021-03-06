import {LOAD_CSV_SUCCESS, SELECT_CSV} from "../constants/action-types";
/**
 *
 * @type {{result: [{modified: boolean, article: {seller: null, product: {game: string, productId: number, selfUrl: string, priceGuide: null, localizations: [], metaproductId: number, expansionId: null, categoryName: string, expansionCollectionNumber: string, dateAdded: null, expansion: {game: string, code: string, localizations: [], releaseDate: [], name: string, expansionId: number, iconCode: number, id: number, version: number}, imageUrl: string, name: string, totalReprints: number, expansionName: string, categoryId: null, rarity: string}, quantity: number, articleId: number, signed: boolean, lastEdited: [], languageCode: string, inShoppingCart: boolean, firstEdition: boolean, altered: boolean, condition: string, price: number, articlePriceEntity: null, comment: string, playset: boolean, foil: boolean}}]}}
 */
const initialState = {
    result: []
};

function uploadReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_CSV_SUCCESS:
            let newArticles = []
            action.payload.map(a => newArticles.push({modified: false, article: a}))
            state = state.result.concat(newArticles)
            return state
        default:
            return state
    }
}

export default uploadReducer