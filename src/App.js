import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import {Redirect, Route, Switch} from 'react-router-dom';
import AccountComponent from "./components/AccountComponent";
import StockComponent from "./components/StockComponent";
import UploadComponent from "./components/UploadComponent";
const useStyles = makeStyles((theme) => ({
    root: {
        background: "#8b8d8e",
        height:'100%'
    },
    component:{
        padding: '40px',
    }

}));

function App() {
    const classes = useStyles();
    return (
        <div id={"App"} className={classes.component}>
            <Switch>
                <Route path='/' exact>
                    <Redirect to='/stock'/>
                </Route>
                <Route path='/stock' component={StockComponent}/>
                <Route path='/account' component={AccountComponent}/>
                <Route path='/upload' component={UploadComponent}/>
            </Switch>
        </div>
    );
}

export default App;
