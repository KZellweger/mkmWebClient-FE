import React from "react";
import {Redirect, Route, Switch} from 'react-router-dom';
import AccountComponent from "./components/AccountComponent";
import StockComponent from "./components/StockComponent";
import UploadComponent from "./components/UploadComponent";

function App() {
    return (
        <div id={"App"}>
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
