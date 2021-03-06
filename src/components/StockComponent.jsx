import {Button, Popover, Typography} from "@material-ui/core";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {readProductsFromMkm, updateProductsDB} from "../actions/accountActions";
import {popOverClose, popOverOpen} from "../actions/commonActions";
import {editArticle, getArticles, synchroniseStockWithMkm, updateArticles} from "../actions/stockActions";
import {EDIT_ARTICLE} from "../constants/action-types";
import {CONDITIONS, getCurrencySymbol, LANGUAGE, popOverStyles, TABLE_ICONS} from "../constants/utils";
import DataTable, {createHeaderData} from "../utils/dataTable/DataTable";
import ErrorMessage from "../utils/ErrorMessage";
import LoadingSpinner from "../utils/LoadingSpinner";
import {cellTypes} from "../utils/dataTable/TableCells";

export default function StockComponent() {
    const articles = useSelector(state => state.stock.articles)
    const modified = useSelector(state => state.stock.modified)
    const loading = useSelector(state => state.common.loading.stock)
    const open = useSelector(state => state.common.popover.open)
    const anchorEl = useSelector(state => state.common.popover.anchorEl)
    const popOverImage = useSelector(state => state.common.popover.popOverImage)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getArticles())
    },[])

    const handleEdit = (inArticleId,inProperty,value) => {
        const articleId = parseInt(inArticleId)
        dispatch(editArticle(articleId,inProperty,value))
    }
    const handleDelete = (articles) => {
        //todo
    }
    const handleUpload = (data) => {
        const articles = data.map((article) => {
            return article.article
        })
        dispatch(updateArticles(articles))
    }


    const classes = popOverStyles();

    const newCardForm = () => {
        alert("Create ArticleListItem Component")
    }

    const handlePopoverOpen = (event, url) => {
        dispatch(popOverOpen(event.currentTarget, url))
    };

    const handlePopoverClose = () => {
        dispatch(popOverClose())
    };

    const getLocaleText = (locales,articleId) => {
        const article = articles.find(a => a.article.articleId === articleId)
        const languageCode = article.article.languageCode
        const locale = locales.find(l => l.language === languageCode)
        //fallback
        if(locale === undefined){
            locales.find(l => l.language === "en")
        }
        return locale['productName']
    }

    // #### Table Configuration ####
    const header = [
        createHeaderData('article.product.imageUrl', false, false, 'Image',cellTypes.IMAGE,false,false,{
            'style':{width: 50, borderRadius: '10%'},
            'onMouseEnter':handlePopoverOpen,
            'onMouseLeave':handlePopoverClose,
        }),
        createHeaderData('article.product.expansionName', false, false, 'Expansion_Name',cellTypes.TEXT,false, true,{}), //linked with localized name
        createHeaderData('article.product.localizations', false, false, 'Name',cellTypes.LOCALE_TEXT,false,true,{
            'getLocaleText':getLocaleText,
            'keyFrom':'article.languageCode',
            'keyProperty':'language',
            'valueProperty':'productName'
        }), //TODO: Selectable -> Localizations
        createHeaderData('article.languageCode', false, false, 'Language',cellTypes.SELECTOR,true,true,{
            'selectorOptions':LANGUAGE
        }),
        createHeaderData('article.price', true, false, 'Price',cellTypes.CURRENCY,true,true,{
            'style':{width: 80},
            'currency':getCurrencySymbol("de-DE","Eur")
        }),
        createHeaderData('article.quantity', true, false, 'Quantity',cellTypes.NUMBER,true,true,{
            'style':{width: 50}
        }),
        createHeaderData('article.product.rarity', false, false, 'Rarity',cellTypes.TEXT,false,true,{}),
        createHeaderData('article.condition', false, false, 'Condition',cellTypes.SELECTOR,true,false,{
            'selectorOptions':CONDITIONS
        }), //Selectable
        createHeaderData('article.foil', false, false, 'Foil',cellTypes.BOOL,true,true,{}),
        createHeaderData('article.signed', false, false, 'Signed',cellTypes.BOOL,true,true,{}),
        createHeaderData('article.altered', false, false, 'Altered',cellTypes.BOOL,true,true,{}),
        createHeaderData('article.playset', false, false, 'Playset',cellTypes.BOOL,true,true,{}),
        createHeaderData('article.comment', false, false, 'Comment',cellTypes.TEXT,true,false,{}),
        createHeaderData('article.lastEdited', false, false, 'Last Edited',cellTypes.DATE,false,false,{}),
    ]

    return (
        <div>
        {loading ? <LoadingSpinner/> :
            articles.length > 0 ?
                <DataTable
                    data={articles}
                    header={header}
                    onEdit={handleEdit}
                    onSubmit={handleUpload}
                    submitLabel='Upload to MKM'
                    rowIdProperty = 'article.articleId'
                    title="My Stock"
                />  : <h3>Stock is empty</h3>
        }
        <Button
            color='secondary'
            variant='contained'
            onClick={() => {
            if (window.confirm('Delete and Reload Stock from MKM?')) dispatch(synchroniseStockWithMkm())
        }}
        >Synchronize Stock with Mkm</Button>
            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <img src={popOverImage}/>
            </Popover>
            <ErrorMessage/>
        </div>
    )
}
