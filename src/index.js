import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NavigationBar from "./components/NavigationBar";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <NavigationBar />
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
