import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

export default function ErrorMessage(){
    const [open, setOpen] = useState(false)
    const error = useSelector(state => state.common.error.upload)
    useEffect(() => {
        console.log(error)
        handleOpen(error)
    },[error])
    const handleOpen = (error) =>{
        console.log(error.status !== undefined)
        console.log(error.status)
        console.log(error.data)
        if(error.status !== undefined){
            setOpen(true)
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    return(
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Error: HTTP " + error.status}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {error.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
    )
}