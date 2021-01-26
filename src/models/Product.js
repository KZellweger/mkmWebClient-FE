import Immutable from 'immutable'

const IMAGE_PREFIX = 'https://api.cardmarket.com'
const ProductRecord = new Immutable.Record({
    productId: 0,
    name: "",
    categoryId: null,
    categoryName: "",
    expansionId: null,
    dateAdded: null,
    metaproductId: 0,
    totalReprints: 0,
    localizations: [],
    selfUrl: "",
    imageUrl: "",
    game: "",
    expansionCollectionNumber: "",
    rarity: "",
    expansionName: "",
}, "Product Record")

class Product extends ProductRecord {
    constructor(product) {
        super(product)
    }

    getName() {
        return this.get('name')
    }

    getDateAdded() {
        return this.get('dateAdded')
    }

    getTotalReprints() {
        return this.get('totalReprints')
    }

    getLocales() {
        return this.get('localizations')
    }

    getLocale(language) {
        this.get('localizations').map(locale => {
            if (language === locale['language']) {
                return locale['productName']
            }
        })
    }

    getImageURL() {
        return this.get('imageUrl').replace(".", IMAGE_PREFIX)
    }

    getRarity() {
        return this.get('rarity')
    }

    getExpansionName() {
        return this.get('expansionName')
    }
}

export default Product