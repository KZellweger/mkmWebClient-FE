import {Popover, Typography} from "@material-ui/core";
import {Delete, Edit} from "@material-ui/icons";
import MaterialTable from "material-table";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {popOverClose, popOverOpen} from "../actions/commonActions";
import {getArticles} from "../actions/stockActions";
import {popOverStyles, TABLE_ICONS} from "../constants/utils";
import LoadingSpinner from "../utils/LoadingSpinner";


export default function StockComponent() {
    const articles = useSelector(state => state.stock)
    const loading = useSelector(state => state.common.loading.stock)
    const open = useSelector(state => state.common.popover.open)
    const anchorEl = useSelector(state => state.common.popover.anchorEl)
    const popOverImage = useSelector(state => state.common.popover.popOverImage)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getArticles())
    }, [])
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
                return <img src={rowData.article.product.imageUrl} onMouseEnter={event => {
                    handlePopoverOpen(event, rowData.article.product.imageUrl)
                }} onMouseLeave={handlePopoverClose}
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
        </div>

    )

}