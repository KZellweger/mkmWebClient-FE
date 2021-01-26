import Immutable from 'immutable'

const ExpansionRecord = new Immutable.Record({
    id: 0,
    version: 0,
    localizations: [],
    expansionId: 0,
    name: "",
    code: "",
    iconCode: 0,
    releaseDate: null,
    game: "MTG"
})

class Expansion extends ExpansionRecord {
    constructor(expansion) {
        super(expansion)
    }

    getName() {
        return this.get('name')
    }

    getCode() {
        return this.get('code')
    }

    getLocales() {
        return this.get('localizations')
    }

    getLocale(language) {
        this.get('localizations').map(locale => {
            if (language === locale['language']) {
                return locale['name']
            }
        })
    }

    getIconURL() {
        return 'https://api.cardmarket.com/img/expansionicons/' + this.get('code') + '.png'
    }

    getReleaseDate() {
        return this.get('releaseDate')
    }

    getGame() {
        return this.get('game')
    }
}

export default Expansion