import React, {forwardRef, useState} from "react";
import axios from "axios";
import {
    AddBox,
    ArrowDownward,
    Check,
    ChevronLeft,
    ChevronRight,
    Clear, Delete,
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
import MaterialTable from "material-table";
import { makeStyles } from '@material-ui/core/styles';
import {Popover} from "@material-ui/core";

const ACCOUNT_REST_API_URL = 'http://localhost:8081/upload/'
const IMAGE_PREFIX = 'https://api.cardmarket.com'

export default function UploadComponent() {
    const [card, setCard] = useState({
        //ArticleProps
        articleId: 0,
        languageCode: '',
        comment: '',
        price: 0,
        quantity: 0,
        inShoppingCart: false,
        seller: '',
        lastEdited: '',
        condition: '',
        foil: false,
        signed: false,
        altered: false,
        playset: false,
        //ProductProps
        productId: 0,
        metaproductId: 0,
        totalReprints: 0,
        name: '',
        language: '',
        productName: '',
        categoryId: 0,
        categoryName: '',
        slefUrl: '',
        imageUrl: '',
        game: '',
        expansionCollectionNumber: '',
        rarity: '',
        expansionName: '',
        dateAdded: '',
    })
    const [cardList, setCardList] = useState([])
    const [file, setFile] = useState('')
    const [progress, setProgress] = useState(0)
    const [anchorEl, setAnchorEl] = useState(null);
    const [popImg, setPopImg] = useState('')
    const handleFileChange = (event) => {
        setProgress(0)
        const file = event.target.files[0]
        setFile(file)
    }

    const uploadFile = () => {
        const formData = new FormData()
        formData.append('file', file)
        axios.post(ACCOUNT_REST_API_URL, formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                    ProgressEvent.loaded / ProgressEvent.total * 100);
                setProgress(progress);
            }
        }).then(res => {
            setCardList(res.data);
            console.log(res.data)
            console.log(cardList)
        }).catch(err => console.log(err))
    }

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

    const useStyles = makeStyles((theme) => ({
        popover: {
            pointerEvents: 'none',
        },
        paper: {
            padding: theme.spacing(1),
        },
    }));

    const classes = useStyles();

    const handlePopoverOpen = (event, url) => {
        setAnchorEl(event.currentTarget);
        setPopImg(url.replace(".",IMAGE_PREFIX))
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const columns = [
        {title: "Bild", field: "imageurl", render: rowData => {return <img src={rowData.imageUrl.replace(".",IMAGE_PREFIX)} onMouseEnter={ event => { handlePopoverOpen(event,rowData.imageUrl)}} onMouseLeave={handlePopoverClose} style={{width: 50, borderRadius: '10%'}} />}},
        {title: "EN-Name", field: "name", render: rowData => {return <p>{rowData.name}</p>}},
        {title: "Set Title", field: "expansionName", render: rowData => {return <p>{rowData.expansionName}</p>}},
        {title: "Sprache", field: "language", render: rowData => {return <p>{rowData.language}</p>}},
        {title: "Name", field: "productName", render: rowData => {return <p>{rowData.productName}</p>}},
        {title: "Kategorie", field: "categoryName", render: rowData => {return <p>{rowData.categoryName}</p>}},
        {title: "Rarity", field: "rarity", render: rowData => {return <p>{rowData.rarity}</p>}},
        {title: "Hinzugefügt", field: "dateAdded", render: rowData => {return <p>{rowData.dateAdded}</p>}}
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
            <div className="file-upload">
                <input type="file" onChange={handleFileChange}/>
                <div className="bg-info" style={{width: progress}}>
                    {progress}
                </div>
                <button onClick={uploadFile} className="bg-primary">
                    Upload
                </button>
                <hr/>
            </div>
            <MaterialTable
                options={options}
                columns={columns}
                data={cardList}
                icons={icons}
                actions={actions}
                title="Exhibition Items"
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

    );

}