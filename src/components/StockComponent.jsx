import {Popover, Typography} from "@material-ui/core";
import {Delete, Edit} from "@material-ui/icons";
import MaterialTable from "material-table";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {popOverClose, popOverOpen} from "../actions/commonActions";
import {getArticles} from "../actions/stockActions";
import {popOverStyles, TABLE_ICONS} from "../constants/utils";
import DataTable from "../utils/DataTable";
import LoadingSpinner from "../utils/LoadingSpinner";


// #### Table Configuration ####

function createHeaderCell(id, numeric, disablePadding, label) {
    return {id: id, numeric: numeric, disablePadding: disablePadding, label: label};
}

const header = [
    createHeaderCell('article.product.imageUrl', false, false, 'Image'),
    createHeaderCell('article.product.expansionName', false, false, 'Expansion_Name'), //linked with localized name
    createHeaderCell('article.product.name', false, false, 'Name'), //Selectable -> Localizations
    createHeaderCell('article.price', true, false, 'Price'), //todo: enhance cell type i guess
    createHeaderCell('article.quantity', true, false, 'Quantity'),
    createHeaderCell('article.product.rarity', false, false, 'Rarity'),
    createHeaderCell('article.condition', false, false, 'Condition'), //Selectable
    createHeaderCell('article.foil', false, false, 'Foil'),
    createHeaderCell('article.signed', false, false, 'Signed'),
    createHeaderCell('article.altered', false, false, 'Altered'),
    createHeaderCell('article.playset', false, false, 'Playset'),
    createHeaderCell('article.comment', false, false, 'Comment'),
    createHeaderCell('article.lastEdited', false, false, 'Last Edited'),
]


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

    const handlePopoverOpen = (event, url) => {
        dispatch(popOverOpen(event.currentTarget, url))
    };

    const handlePopoverClose = () => {
        dispatch(popOverClose())
    };

    const newCardForm = () => {
        alert("Create ArticleListItem Component")
    }

    // Table options
    const options = {
        actionsColumnIndex: -1,
        sorting: true,
        filtering: true,
        search: true
    };

    const actions = [{
        icon: Edit,
        tooltip: 'Edit Item',
        onClick: (event, rowData) => handleEdit(rowData),
    },
        {
            icon: Delete,
            tooltip: 'Delete Item',
            onClick: (event, rowData) => handleDelete(rowData)
        }
    ];

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
                <MaterialTable
                    options={options}
                    columns={columns}
                    data={articles}
                    icons={TABLE_ICONS}
                    actions={actions}
                    title="Sorter Results"
                />
            }
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
            <div>
                {loading ? <LoadingSpinner/> :
                    <DataTable data={articles} header={header}/>}

            </div>
        </div>
    )
}
