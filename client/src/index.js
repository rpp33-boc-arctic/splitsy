import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import Auth from './components/Auth/Auth.js';
import Cart from './components/Cart/Cart.js';
import Dashboard from './components/Dashboard.js';
import Menu from './components/Menu/Menu.js';
import Payment from './components/Payment/Payment.js';
import RestaurantPick from './components/Restaurant/rest_pick.js';
import NavBar from './components/Navbar.js';
import User from './components/User/User.js';
import {
  BrowserRouter as Router,
  Routes,
  Route} from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.Fragment>
      <Router >
      <NavBar />

         <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/Auth" element={<Auth/>} />
          <Route exact path="/Dashboard" element={<Dashboard />} />
          <Route exact path="/User" element={<User />} />
          <Route path="/Restaurant/pick" element={<RestaurantPick />} />
          <Route  path="/menu" element={<Menu />} />
          <Route exact path="/Cart" element={<Cart />} />
          <Route exact path="/Payment" element={<Payment />} />
        </Routes>
    </Router>
    </React.Fragment>
);


reportWebVitals();
