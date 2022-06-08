import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';

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
  }

  render() {

    const userData = {
      username: this.state.username,
      userId: this.state.userId
    };

    return (
      <div className="App">
        <Routes>
          {/* <Route index element={<Auth verifyUser={this.authCheck} />} /> */}
          <Route path="Auth" element={<Auth verifyUser={this.authCheck} />} />
          <Route /* path="RestaurantList" */
            index element={
              <Private user={userData}>
                <RestaurantPick />
              </Private>
            }
          />
          <Route path="User"
            element={
              <Private user={userData}>
                <User />
              </Private>
            }
          />
          <Route path="RestauarantMenu"
            element={
              <Private user={userData}>
                <RestaurantMenu />
              </Private>
            }
          />
          <Route path="Menu"
            element={
              <Private user={userData}>
                <Menu />
              </Private>
            }
          />
          <Route path="Cart"
            element={
              <Private user={userData}>
                <Cart />
              </Private>
            }
          />
          <Route path="Payment"
            element={
              <Private user={userData}>
                <Payment />
              </Private>
            }
          />
          {/* <NavBar /> */}
        </Routes>

        ©2022 Splitsy Inc. All rights reserved.
      </div>
    );
  }

}

const Private = ({ user, privateRoute }) => {
  if (user.username && user.userId) {
    return privateRoute ? privateRoute : <Outlet />;
  } else {
    return <Navigate to="/Auth" replace />;
  }
};

export default withCookies(App);
