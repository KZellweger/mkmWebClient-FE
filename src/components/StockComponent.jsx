import {Popover, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {
    AddBox,
    ArrowDownward,
    Check,
    ChevronLeft,
    ChevronRight,
    Clear,
    Delete,
    DeleteOutline,
    Edit,
    FilterList,
    FirstPage,
    LastPage,
    Remove,
    SaveAlt,
    Search,
    ViewColumn
} from "@material-ui/icons";
import axios from "axios";
import MaterialTable from "material-table";
import React, {forwardRef, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAccount} from "../actions/accountActions";
import {getArticles} from "../actions/stockActions";
import {ARTICLES_FROM_DB} from "../constants/api-endpoints";
import Article from "../models/Article";
import Expansion from "../models/Expansion";
import Product from "../models/Product";


export default function StockComponent() {
    const articles = useSelector(state => state.stock)
    const loading = useSelector(state => state.common.loading.stock)
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

    // Table options
    const options = {
        actionsColumnIndex: -1,
        sorting: true
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
            title: "Bild", field: "imageurl", render: rowData => {
                return <img src={rowData.article.product.imageUrl}
                 style={{width: 50, borderRadius: '10%'}}/>
            }
        },
        {
            title: "EN-Name", field: "name", render: rowData => {
                return <Typography>{rowData.article.product.name}</Typography>
            }
        },
        {
            title: "Set Title", field: "expansionName", render: rowData => {
                return <Typography>{rowData.article.product.expansionName}</Typography>
            }
        },
        //{title: "Sprache", field: "language", render: rowData => {return <Select value='en'>{rowData.article.article.product.localizations !== null ?  rowData.article.article.product.localizations.map(locale => <MenuItem value={locale['language']}>{locale['productName']}</MenuItem>) : <MenuItem value="en">"Unknown"</MenuItem>}</Select>}},
        {
            title: "Rarity", field: "rarity", render: rowData => {
                return <Typography>{rowData.article.product.rarity}</Typography>
            }
        },
        {
            title: "Condition", field: "condition", render: rowData => {
                return <Typography>{rowData.article.condition}</Typography>
            }
        },
        {
            title: "Anzahl", field: "quantity", render: rowData => {
                return <p>{rowData.article.quantity}</p>
            }
        },
        {
            title: "Preis", field: "price", render: rowData => {
                return <p>{rowData.article.price}</p>
            }
        },
        {
            title: "Letzte Änderung", field: "lastEdited", render: rowData => {
                return <p>{rowData.article.lastEdited}</p>
            }
        }
    ]

    const icons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
    };

    return (
        <div>
            <MaterialTable
                options={options}
                columns={columns}
                data={articles}
                icons={icons}
                actions={actions}
                title="My Stock"
            />
        </div>

    )

}