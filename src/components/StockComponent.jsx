import {Popover, Typography} from "@material-ui/core";
import {Delete, Edit} from "@material-ui/icons";
import MaterialTable from "material-table";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {popOverClose, popOverOpen} from "../actions/commonActions";
import {getArticles} from "../actions/stockActions";
import {CONDITIONS, getCurrencySymbol, popOverStyles, TABLE_ICONS} from "../constants/utils";
import DataTable, {createHeaderData} from "../utils/DataTable";
import LoadingSpinner from "../utils/LoadingSpinner";
import {cellTypes} from "../utils/TableCells";


export default function StockComponent() {
    const articles = useSelector(state => state.stock)
    const loading = useSelector(state => state.common.loading.stock)
    const open = useSelector(state => state.common.popover.open)
    const anchorEl = useSelector(state => state.common.popover.anchorEl)
    const popOverImage = useSelector(state => state.common.popover.popOverImage)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getArticles())
    },[])

    const handleEdit = () => {
        //todo
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
        createHeaderData('article.product.imageUrl', false, false, 'Image',cellTypes.IMAGE,false,{
            'style':{width: 50, borderRadius: '10%'},
            'onMouseEnter':handlePopoverOpen,
            'onMouseLeave':handlePopoverClose
        }),
        createHeaderData('article.product.expansionName', false, false, 'Expansion_Name',cellTypes.TEXT,false), //linked with localized name
        createHeaderData('article.product.name', false, false, 'Name',cellTypes.TEXT,true), //TODO: Selectable -> Localizations
        createHeaderData('article.price', true, false, 'Price',cellTypes.CURRENCY,true,{
            'currency':getCurrencySymbol("de-DE","Eur")
        }),
        createHeaderData('article.quantity', true, false, 'Quantity',cellTypes.NUMBER,true),
        createHeaderData('article.product.rarity', false, false, 'Rarity',cellTypes.TEXT,false),
        createHeaderData('article.condition', false, false, 'Condition',cellTypes.SELECTOR,true,{
            'selectorOptions':CONDITIONS
        }), //Selectable
        createHeaderData('article.foil', false, false, 'Foil',cellTypes.BOOL,true),
        createHeaderData('article.signed', false, false, 'Signed',cellTypes.BOOL,true),
        createHeaderData('article.altered', false, false, 'Altered',cellTypes.BOOL,true),
        createHeaderData('article.playset', false, false, 'Playset',cellTypes.BOOL,true),
        createHeaderData('article.comment', false, false, 'Comment',cellTypes.TEXT,true),
        createHeaderData('article.lastEdited', false, false, 'Last Edited',cellTypes.TEXT,false),
    ]

    const columns = [
        {
            title: "Image", field: "article.product.imageUrl", filtering: false, sorting: false, render: rowData => {
                return <img src={rowData.article.product.imageUrl} onMouseEnter={event => {
                    handlePopoverOpen(event, rowData.article.product.imageUrl)
                }} onMouseLeave={handlePopoverClose} style={{width: 50, borderRadius: '10%'}}/>
            }
        },
        {title: "Expansion", field: "article.product.expansionName"},
        {
            title: "Name", field: "article.product.name", render: rowData => {
                return <Typography>{rowData.article.product.name}</Typography>
            }
        },
        {
            title: "Price", field: "article.price", editable: 'always',
            type: 'currency',
            currencySetting: {
                locale: 'ch',
                currencyCode: 'Eur',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            },
        },
        {title: "Quantity", field: "article.quantity", type: "numeric", editable: 'always'},
        {title: "Rarity", field: "article.product.rarity"},
        {title: "Condition", field: "article.condition"},
        {title: "foil", field: "article.foil", editable: 'always', type: 'boolean'},
        {title: "signed", field: "article.signed", editable: 'always', type: 'boolean'},
        {title: "altered", field: "article.altered", editable: 'always', type: 'boolean'},
        {title: "playset", field: "article.playset", editable: 'always', type: 'boolean'},
        {title: "comment", field: "article.comment", editable: 'always'},
        {title: "Last Edited", field: "article.lastEdited"}
    ]

    return (
        <div>
        {loading ? <LoadingSpinner/> :
                <DataTable
                    data={articles}
                    header={header}
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose} />}
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
