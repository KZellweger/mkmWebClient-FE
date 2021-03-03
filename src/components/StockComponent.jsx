import {Popover, Typography} from "@material-ui/core";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {popOverClose, popOverOpen} from "../actions/commonActions";
import {editArticle, getArticles} from "../actions/stockActions";
import {EDIT_ARTICLE} from "../constants/action-types";
import {CONDITIONS, getCurrencySymbol, popOverStyles, TABLE_ICONS} from "../constants/utils";
import DataTable, {createHeaderData} from "../utils/dataTable/DataTable";
import LoadingSpinner from "../utils/LoadingSpinner";
import {cellTypes} from "../utils/dataTable/TableCells";


export default function StockComponent() {
    const articles = useSelector(state => state.stock.articles)
    const loading = useSelector(state => state.common.loading.stock)
    const open = useSelector(state => state.common.popover.open)
    const anchorEl = useSelector(state => state.common.popover.anchorEl)
    const popOverImage = useSelector(state => state.common.popover.popOverImage)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getArticles())
    },[])

    const handleEdit = (field,value) => {
        console.log(typeof value)
        const target= field.split(":")
        dispatch(editArticle(EDIT_ARTICLE,parseInt(target[0]),target[1],value))//FIXME: make nice
    }
    const handleDelete = () => {
        //todo
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

    // #### Table Configuration ####
    const header = [
        createHeaderData('article.product.imageUrl', false, false, 'Image',cellTypes.IMAGE,false,false,{
            'style':{width: 50, borderRadius: '10%'},
            'onMouseEnter':handlePopoverOpen,
            'onMouseLeave':handlePopoverClose,
        }),
        createHeaderData('article.product.expansionName', false, false, 'Expansion_Name',cellTypes.TEXT,false, true,{}), //linked with localized name
        createHeaderData('article.product.name', false, false, 'Name',cellTypes.TEXT,false,true,{}), //TODO: Selectable -> Localizations
        createHeaderData('article.price', true, false, 'Price',cellTypes.CURRENCY,true,true,{
            'style':{width: 50},
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
        createHeaderData('article.lastEdited', false, false, 'Last Edited',cellTypes.TEXT,false,false,{}),
    ]

    return (
        <div>
        {loading ? <LoadingSpinner/> :
                <DataTable
                    data={articles}
                    header={header}
                    onEdit={handleEdit}
                />}
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
        </div>
    )
}
