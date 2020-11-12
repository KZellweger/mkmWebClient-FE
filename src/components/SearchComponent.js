import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import StockService from "../services/ApiService";
import StockComponent from "./StockComponent";
import Cookies from 'universal-cookie';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import RefreshComponent from "./RefreshComponent";
import Button from "@material-ui/core/Button";


export default function SearchComponent(props) {
    const cookies = new Cookies();
    const classes = useStyles();
    const [expansions, setExpansions] = useState(["offline1", "offline2"]);
    const [selectedExpansion, setSelectedExpansion] = useState(expansions[0].value);

    useEffect(() => {
        StockService.getStockExpansionNames().then((res) =>
            setExpansions(res.data));
        setSelectedExpansion(cookies.get('expansion'));
    }, [])

    const handleChange = (event) => {
        cookies.set('expansion', event.target.value);
        setSelectedExpansion(event.target.value);
        window.location.reload(true);
    };

    const refreshSearch = () => {
        window.location.reload(true);
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <FormControl variant="filled" className={classes.formControl}>
                            <InputLabel htmlFor="filled-age-native-simple">Expansions</InputLabel>
                            <Select
                                native
                                onChange={handleChange}
                                inputProps={{id: 'filled-age-native-simple'}}
                            >
                                <option aria-label="none" value=""/>
                                <option aria-label="all" value="all">all</option>
                                {expansions.map((item) =>
                                    <option key={item} value={item}>{item}</option>)}
                            </Select>
                        </FormControl></Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <Button className={classes.button} onClick={() => {refreshSearch()}}>
                        {cookies.get('expansion')}
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                    </Paper>
                </Grid>
            </Grid>
            <StockComponent selectedExpansion={selectedExpansion}/>
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
        height: '100%',
        textAlign: 'center',
        fontSize: 22,
        verticalAlign: 'middle',
        padding: 5,
    },
    button: {
        height: '100%',
        width: '100%',
    },
    formControl: {
        width: '100%'
    },
    inputLabel: {
        width: '100%',
        padding: 5,
    },
}));