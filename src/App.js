import React from "react";
import {Redirect, Route, Switch} from 'react-router-dom';
import AccountComponent from "./components/AccountComponent";
import StockComponent from "./components/StockComponent";

function App() {
    return (
        <div id={"App"}>
            <Switch>
                <Route path='/' exact>
                    <Redirect to='/stock'/>
                </Route>
                <Route path='/stock' component={StockComponent}/>
                <Route path='/account' component={AccountComponent}/>
            </Switch>
        </div>
    );
}

/*
                <Route path='/' exact>
                    <Redirect to='/stock'/>
                </Route>
                <Route path='/stock' component={StockComponent}/>
                                <Route path='/upload' component={UploadComponent}/>

 */

export default App;
