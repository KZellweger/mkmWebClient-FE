import React, {useEffect, useState} from "react";
import axios from "axios";
import Card from "./models/Card";

const STOCK_CONTROLLER_URL = 'http://localhost:8081/stock'
const ARTICLES_ENDPOINT = '/articles'
const POST_CARDS_ENDPOINT = '/tomkm'

export default function StockComponent() {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(STOCK_CONTROLLER_URL + ARTICLES_ENDPOINT)
            .then(result => {
                console.log(result.data)
                setData(result.data)
            })
            .catch(error => console.log(error))
    }, [data.length])

    return(
        <div>
            <ul>
                {data.map(card => (
                    <li>{Card(card)}</li>
                ))}
            </ul>
        </div>
    )

}