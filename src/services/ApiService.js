import axios from 'axios'

const HOST = 'http://localhost:8081'

const STOCK_REST_API_URL = '/stock/articles/min-price'
//const STOCK_REST_API_URL = '/stock/articles/expansion/name/Amonkhet'
const EXPANSION_NAMES = '/product/expansion/name'
const STOCK_BY_EXPANSION_NAME = '/stock/articles/expansion/name/'
const CHANGE_ARTICLE_REST_API_URL = '/stock/articles'
const ACCOUNT = '/account/'

const RELOAD = '/reload'
const EXPANSIONS = RELOAD+'/expansions'
const PRICE = RELOAD+'/prices/'
const PRODUCTS = RELOAD+'/products/file'
const STOCK = RELOAD+'/stock'


class ApiService {

    reloadExpansions(){
        axios.get(HOST+EXPANSIONS).then(r  => true)
    }

    reloadProducts(){
        axios.get(HOST+PRODUCTS).then(r  => true)
    }

    reloadStock(){
        axios.get(HOST+STOCK).then(r  => true)
    }

    reloadPrice(name){
        axios.get(HOST+PRICE + name).then(r  => true)
    }



    getStockExpansionNames(){
        return axios.get(HOST+EXPANSION_NAMES);
    }

    getStockByExpansionName(expansionName){
        return axios.get(HOST+STOCK_BY_EXPANSION_NAME + expansionName);
    }

    getStockInformation(){
        return axios.get(HOST+STOCK_REST_API_URL);
    }

    postArticles(articles){
        return axios.post(HOST+CHANGE_ARTICLE_REST_API_URL, articles);
    }

    getAccountInformation(){
        return axios.get(HOST+ACCOUNT);
    }


}

export default new ApiService();