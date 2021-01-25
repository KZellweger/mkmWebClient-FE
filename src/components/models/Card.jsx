import React, {useState} from "react";
import {Grid} from "@material-ui/core";

export default function Card({card,}) {
    const {
        articleId,
        languageCode,
        comment,
        price,
        quantity,
        inShoppingCart,
        product,
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

    const handleEdit = () => {
        //todo
    }
    const handleDelete = () => {
        //todo
    }

    return (
        <div>
            <Grid container>

            </Grid>
        </div>

    );

}