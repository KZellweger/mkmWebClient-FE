import {LOAD_ARTICLES_SUCCESS} from "../constants/action-types";

/**
 * State of the Stock. Holds a list of articles with a flag for each article if it was modified in the current session.
 * @type {{articles: [{modified: boolean, article: {seller: null, product: {game: string, productId: number, selfUrl: string, priceGuide: null, localizations: [], metaproductId: number, expansionId: null, categoryName: string, expansionCollectionNumber: string, dateAdded: null, expansion: {game: string, code: string, localizations: [], releaseDate: [], name: string, expansionId: number, iconCode: number, id: number, version: number}, imageUrl: string, name: string, totalReprints: number, expansionName: string, categoryId: null, rarity: string}, quantity: number, articleId: number, signed: boolean, lastEdited: [], languageCode: string, inShoppingCart: boolean, firstEdition: boolean, altered: boolean, condition: string, price: number, articlePriceEntity: null, comment: string, playset: boolean, foil: boolean}}]}}
 */
const initialState = {
    articles: []
};
// Todo introduce changed article with modified props. Makes revert mucho more easier

function stockReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ARTICLES_SUCCESS:
            let newArticles = []
            action.payload.map(a => newArticles.push({modified: false, article: a}))
            state = state.articles.concat(newArticles)
            return state

        default:
            return state
    }
}

export default stockReducer;