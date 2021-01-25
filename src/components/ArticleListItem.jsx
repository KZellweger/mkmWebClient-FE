import React, {useEffect, useState} from "react";
import {Grid} from "@material-ui/core";
import PropTypes from "prop-types";
import Product from "./models/Product"
import Expansion from "./models/Expansion";

export default function ArticleListItem(card) {

    const {
        articleId,
        languageCode,
        comment,
        price,
        quantity,
        inShoppingCart,
        seller,
        lastEdited,
        condition,
        foil,
        signed,
        altered,
        playset,
        firstEd,
        articlePriceEntity
    } = card ?? {}

    const product = new Product(card.product)
    const expansion = new Expansion(card.product.expansion)

/*
    const [data, setData] = useState({
        articleId: card.articleId || null,
        languageCode: card.languageCode || null,
        comment: card.comment || null,
        price: card.price || null,
        quantity: card.quantity || null,
        inShoppingCart: card.inShoppingCart || null,
        seller: card.seller || null,
        product: Immutable.fromJS(card.product) || null,
        lastEdited: Date.parse(card.lastEdited)  || null,
        condition: card.condition || null,
        foil: card.foil || null,
        signed: card.signed || null,
        altered: card.altered || null,
        playset: card.playset || null,
        firstEd: card.firstEd || null,
        articlePriceEntity: card.articlePriceEntity || null
    })
*/
    const handleEdit = () => {
        //todo
    }
    const handleDelete = () => {
        //todo
    }

    return (
        <div>
            <Grid container>
                <p>{articleId}</p>
                <p>{product.getExpansionName()}</p>
                <p>{expansion.getCode()}</p>
            </Grid>
        </div>

    );
}

ArticleListItem.propTypes = {
    card: PropTypes.shape({
        articleId : PropTypes.number,
        languageCode : PropTypes.number,
        comment : PropTypes.string,
        price : PropTypes.number,
        quantity: PropTypes.number,
        inShoppingCart: PropTypes.bool,
        product : PropTypes.instanceOf(Product),
        seller : PropTypes.string,
        lastEdited : PropTypes.shape({}),
        condition : PropTypes.string,
        foil: PropTypes.bool,
        signed: PropTypes.bool,
        altered: PropTypes.bool,
        playset: PropTypes.bool,
        firstEd: PropTypes.bool,
        articlePriceEntity: PropTypes.shape({})
    })
}