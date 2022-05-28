import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.js';
import reportWebVitals from './reportWebVitals';
import Auth from './components/Auth.js';
import Cart from './components/Cart/Cart.js';
import Dashboard from './components/Dashboard.js';
import Menu from './components/Menu/Menu.js';
import Payment from './components/Payment/Payment.js';
import {RestaurantPick,RestaurantMenu} from './components/rest/Restaurant.js';
import User from './components/User.js';
import NavBar from './components/header.js';

import {
  BrowserRouter as Router,
  Routes,
  Route} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.Fragment>
  <NavBar />
      <Router >
         <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/Auth" element={<Auth/>} />
        <Route exact path="/Dashboard" element={<Dashboard />} />
        <Route exact path="/User" element={<User />} />
        <Route exact  path="/Restaurant/pick" element={<RestaurantPick />} />
        <Route exact  path="/Restaurant/menu" element={<RestaurantMenu />} />

        <Route exact path="/Menu" element={<Menu />} />
        <Route exact path="/Cart" element={<Cart />} />
        <Route exact path="/Payment" element={<Payment />} />
        </Routes>
    </Router>
    </React.Fragment>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
