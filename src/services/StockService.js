import axios from 'axios'

const STOCK_REST_API_URL = 'http://localhost:8081/stock/articles/min-price'
//const STOCK_REST_API_URL = 'http://localhost:8081/stock/articles/expansion/name/Amonkhet'

const CHANGE_ARTICLE_REST_API_URL = 'http://localhost:8081/stock/articles'


class StockService {
    getStockInformation(){
        return axios.get(STOCK_REST_API_URL);
    }

    postArticles(articles){
        return axios.post(CHANGE_ARTICLE_REST_API_URL, articles);
    }
}

export default new StockService();