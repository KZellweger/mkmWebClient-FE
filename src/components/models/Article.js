import Immutable from 'immutable'

const ArticleRecord = new Immutable.Record({
    articleId: 0,
    languageCode: "en",
    comment: "",
    price: 0.2,
    quantity: 0,
    inShoppingCart: false,
    seller: null,
    lastEdited: null,
    condition: "",
    foil: false,
    signed: false,
    altered: false,
    playset: false,
    firstEd: false,
    articlePriceEntity: null
})

class Article extends ArticleRecord {
    constructor(article) {
        super(article);
    }

    getArticleId() {
        return this.get('articleId')
    }

    getLanguageCode() {
        return this.get('languageCode')
    }

    getComment() {
        return this.get('comment')
    }

    getPrice() {
        return this.get('price')
    }

    getQuantity() {
        return this.get('quantity')
    }

    isInShoppingCart() {
        return this.get('inShoppingCart')
    }

    getSeller() {
        //TODO: Create own Type
        return this.get('seller')
    }

    getLastEdited() {
        return this.get('lastEdited')
    }

    getCondition() {
        return this.get('condition')
    }

    isFoil() {
        return this.get('foil')
    }

    isSigned() {
        return this.get('signed')
    }

    isAltered() {
        return this.get('altered')
    }

    isPlayset() {
        return this.get('playset')
    }

    isFirstEd() {
        return this.get('firstEd')
    }

    getArticlePriceEntity() {
        //TODO: Create own Type
        return this.get('articlePriceEntity')
    }

}
export default Article