import {
    Button,
    Dialog, DialogContentText, DialogTitle,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Input,
    Popover,
    Typography
} from "@material-ui/core";
import {Delete, Edit} from "@material-ui/icons";
import {Alert, AlertTitle} from "@material-ui/lab";
import MaterialTable from "material-table";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {popOverClose, popOverOpen} from "../actions/commonActions";
import {postArticles} from "../actions/stockActions";
import {uploadCSV} from "../actions/uploadActions";
import {DATE_TIME_FORMAT_OPTIONS, popOverStyles, TABLE_ICONS} from "../constants/utils";
import ErrorMessage from "../utils/ErrorMessage";
import LoadingSpinner from "../utils/LoadingSpinner";

export default function UploadComponent() {
    const cardList = useSelector(state => state.upload)
    const loading = useSelector(state => state.common.loading.upload)
    const open = useSelector(state => state.common.popover.open)
    const anchorEl = useSelector(state => state.common.popover.anchorEl)
    const popOverImage = useSelector(state => state.common.popover.popOverImage)
    const dispatch = useDispatch()

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        dispatch(uploadCSV(file))
    }

    const handlePost = () => {
        const articles = cardList.map((article) => {
            return article.article
        })
        dispatch(postArticles(articles))
    }

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


    const newCardForm = () => {
        alert("Create ArticleListItem Component")
    }


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
                return <p>{rowData.article.lastEdited.toLocaleString("de-DE", DATE_TIME_FORMAT_OPTIONS)}</p>
            }
        }
    ]

    return (
        <div>
            <Grid container>
                <Grid item container xs={6} spacing={1}>
                    <Grid item xs={6}>
                        <FormControl>
                            <FormLabel>Magic Sorter File Upload</FormLabel>
                            <Input id="file-upload" type='file' onChange={handleFileChange}/>
                            <FormHelperText>Upload the CSV file from the Magic Sorter</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <Button id='manualEntry' onClick={newCardForm} color='primary' variant='contained'>Manual
                            Entry</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button id='postCards' color='primary' variant='contained' onClick={handlePost}>Upload Table to
                            MKM</Button>
                    </Grid>
                </Grid>
            </Grid>
            <hr/>
            {loading ? <LoadingSpinner/> :
                cardList.length > 0 ?
                    <MaterialTable
                        options={options}
                        columns={columns}
                        data={cardList}
                        icons={TABLE_ICONS}
                        actions={actions}
                        title="Sorter Results"
                    />
                    : <h3>No Cards Uploaded yet</h3>
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
            <ErrorMessage/>
        </div>

    );

}