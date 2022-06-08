import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import NavBar from './components/Navbar.js';
import Auth from './components/Auth/Auth.js';
import Cart from './components/Cart/Cart.js';
import Menu from './components/Menu/Menu.js';
import Payment from './components/Payment/Payment.js';
import { RestaurantPick,RestaurantMenu } from './components/Restaurant/Restaurant.js';
import User from './components/User/User.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      userId: 0
    };
    this.authCheck = this.authCheck.bind(this);
  }

  componentDidUpdate() {
    this.authCheck();
  }

  authCheck() {
    const { cookies } = this.props;
    const { username, userId } = cookies.get('splitsy');

    this.setState({
      username: username,
      userId: userId
    });

    return <Navigate to="/" replace />;
  }

  render() {

    const userData = {
      username: this.state.username,
      userId: this.state.userId
    };

    // console.log('data1: ', userData.username, '; data2: ', userData.userId);

    return (
      <div className="App">
        <Routes>
          {/* <Route index element={<Auth verifyUser={this.authCheck} />} /> */}
          <Route path="Auth" element={<Auth verifyUser={this.authCheck} />} />
          <Route element={<Private user={userData} />}>
            <Route /* path="RestaurantList" */index element={<RestaurantPick />} />
            <Route path="User" element={<User />} />
            <Route path="RestauarantMenu" element={<RestaurantMenu />} />
            <Route path="Menu" element={<Menu />} />
            <Route path="Cart" element={<Cart />} />
            <Route path="Payment" element={<Payment />} />
          </Route>
          {/* <NavBar /> */}
        </Routes>

        ©2022 Splitsy Inc. All rights reserved.
      </div>
    );
  }

}

const Private = ({ user, children }) => {
  if (!user.username && !user.userId) {
    return <Navigate to="/Auth" replace />;
  }
  return children;
};

export default withCookies(App);
