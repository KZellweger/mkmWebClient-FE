import Expansion from "./Expansion";

const IMAGE_PREFIX = 'https://api.cardmarket.com'
const ProductRecord = Immutable.Record({
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
    expansion: new Expansion()
})

class Product extends ProductRecord {
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

    getRarity(){
        return this.get('rarity')
    }

    getExpansionName(){
        return this.get('expansionName')
    }

    getExpansion(){
        return this.get('expansion')
    }
}