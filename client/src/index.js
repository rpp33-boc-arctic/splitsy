import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Auth from './components/Auth.js';
import Cart from './components/Cart.js';
import Dashboard from './components/Dashboard.js';
import Menu from './components/Menu.js';
import Payment from './components/Payment.js';
import Restaurant from './components/Restaurant.js';
import User from './components/User.js';

import {
  BrowserRouter as Router,
  Routes,
  Route,
Link} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

      <Router >
         <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/Auth" element={<Auth/>} />
        <Route exact path="/Dashboard" element={<Dashboard />} />
        <Route exact path="/User" element={<User />} />
        <Route exact  path="/Restaurant" element={<Restaurant />} />
        <Route exact path="/Menu" element={<Menu />} />
        <Route exact path="/Cart" element={<Cart />} />
        <Route exact path="/Payment" element={<Payment />} />
        </Routes>
    </Router>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
