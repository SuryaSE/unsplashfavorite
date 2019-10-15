import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import * as serviceWorker from './serviceWorker';

const users = [{
    email : 'user@user.com',
    password : "123456789"
}];
const imagesFav = [];
localStorage.setItem("users", JSON.stringify(users));
localStorage.setItem("isUserLoggedIn", false);
localStorage.setItem("favorite", JSON.stringify(imagesFav));
// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Header />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
