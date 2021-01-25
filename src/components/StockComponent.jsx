import React, {useEffect, useState} from "react";
import axios from "axios";
import ArticleListItem from "./ArticleListItem";
import Article from "./models/Article";
import Product from "./models/Product";
import Expansion from "./models/Expansion";
const STOCK_CONTROLLER_URL = 'http://localhost:8081/stock'
const ARTICLES_ENDPOINT = '/articles'
const POST_CARDS_ENDPOINT = '/tomkm'

export default function StockComponent() {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(STOCK_CONTROLLER_URL + ARTICLES_ENDPOINT)
            .then(result => {
                //console.log(result.data)
                result.data.map(card => {
                    const article = new Article(card)
                    const product = new Product(card.product)
                    const expansion = new Expansion(card.product.expansion)
                    setData(data => [...data, {article: article,product: product,expansion: expansion}])
                })
            })
            .then(() =>               console.log(data)
            )
            .catch(error => console.log(error))
    }, [])

    return(
        <div>
            {data.map(c => (
                <p>
                <h3>{c.article.getArticleId()}</h3>
                    <p>{c.product.getImageURL()}</p>
                    <p>{c.expansion.getCode()}</p>
                </p>
            ))}
        </div>
    )

}