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
import {ARTICLES_FROM_DB} from "../constants/api-endpoints";
import Article from "./models/Article";
import Expansion from "./models/Expansion";
import Product from "./models/Product";

const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    }
}));


export default function StockComponent() {
    const [data, setData] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const [popImg, setPopImg] = useState('')
    const classes = useStyles();

    useEffect(() => {
        axios.get(ARTICLES_FROM_DB)
            .then(result => {
                //console.log(result.data)
                result.data.map(card => {
                    const article = new Article(card)
                    const product = new Product(card.product)
                    const expansion = new Expansion(card.product.expansion)
                    setData(data => [...data, {article: article, product: product, expansion: expansion}])
                })
            })
            .then(() => console.log(data)
            )
            .catch(error => console.log(error))
    }, [])

    const handleEdit = () => {
        //todo
    }
    const handleDelete = () => {
        //todo
    }

    const handlePopoverOpen = (event, url) => {
        setAnchorEl(event.currentTarget);
        setPopImg(url)
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

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
                return <img src={rowData.product.getImageURL()} onMouseEnter={event => {
                    handlePopoverOpen(event, rowData.product.getImageURL())
                }} onMouseLeave={handlePopoverClose} style={{width: 50, borderRadius: '10%'}}/>
            }
        },
        {
            title: "EN-Name", field: "name", render: rowData => {
                return <Typography>{rowData.product.getName()}</Typography>
            }
        },
        {
            title: "Set Title", field: "expansionName", render: rowData => {
                return <Typography>{rowData.product.getExpansionName()}</Typography>
            }
        },
        //{title: "Sprache", field: "language", render: rowData => {return <Select value='en'>{rowData.product.localizations !== null ?  rowData.product.localizations.map(locale => <MenuItem value={locale['language']}>{locale['productName']}</MenuItem>) : <MenuItem value="en">"Unknown"</MenuItem>}</Select>}},
        {
            title: "Rarity", field: "rarity", render: rowData => {
                return <Typography>{rowData.product.getRarity()}</Typography>
            }
        },
        {
            title: "Condition", field: "condition", render: rowData => {
                return <Typography>{rowData.article.getCondition()}</Typography>
            }
        },
        {
            title: "Anzahl", field: "quantity", render: rowData => {
                return <p>{rowData.article.getQuantity()}</p>
            }
        },
        {
            title: "Preis", field: "price", render: rowData => {
                return <p>{rowData.article.getPrice()}</p>
            }
        },
        {
            title: "Letzte Änderung", field: "lastEdited", render: rowData => {
                return <p>{rowData.article.getLastEdited()}</p>
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
                data={data}
                icons={icons}
                actions={actions}
                title="My Stock"
            />
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
                <img src={popImg}/>
            </Popover>
        </div>

    )

}