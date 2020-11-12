import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ApiService from "../services/ApiService";

export default function RefreshComponent(props) {
    const classes = useStyles();

    return (<div>
            <Grid container spacing={0}>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <InputLabel classes={classes.inputLabel}>
                            <h3>Daten Aktualisieren</h3></InputLabel>
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <Paper className={classes.paper}>
                        <ButtonGroup className={classes.button} size="large" color="primary"
                                     aria-label="large outlined primary button group">
                            <Button onClick={() => {
                                ApiService.reloadExpansions();
                            }}>EXPANSIONS</Button>
                            <Button onClick={() => {
                                ApiService.reloadProducts();
                            }}>PRODUCTS</Button>
                            <Button onClick={() => {
                                ApiService.reloadStock();
                            }}>STOCK</Button>
                            <Button onClick={() => {
                                console.log(props.account)
                                ApiService.reloadPrice(props.account.userName);
                            }}>Prices for {props.account.userName}</Button>
                        </ButtonGroup>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
const useStyles = makeStyles((theme) => ({
    selectEmpty: {
        marginTop: theme.spacing(3),
    },
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    paper: {
        margin: theme.spacing(0),
        minWidth: 110,
        height: 55,
    },
    button: {
        height: 55,
    },
    formControl: {
        width: '100%'
    },
}));


