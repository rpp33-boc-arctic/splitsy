import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import NavBar from './components/Navbar.js';
import Auth from './components/Auth/Auth.js';
import Cart from './components/Cart/Cart.js';
import Menu from './components/Menu/Menu.js';
import Payment from './components/Payment/Payment.js';
import RestaurantPick from './components/Restaurant/rest_pick.js';
import User from './components/User/User.js';
import Private from './Private.js';

import { CircularProgress } from '@mui/material';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      userId: 0,
      verified: null
    };
    this.authCheck = this.authCheck.bind(this);
    this.navigateToPage = this.navigateToPage.bind(this);
    this.navigateToLogIn = this.navigateToLogIn.bind(this);
  }

  componentDidMount() {
    this.authCheck();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cookies.get('splitsy').username !== this.props.cookies.get('splitsy').username || prevProps.cookies.get('splitsy').userId !== this.props.cookies.get('splitsy').userId) {
      this.render();
    }
  }

  authCheck(cb = () => { }) {
    var { cookies } = this.props;
    if (cookies.get('splitsy')) {
      var { username, userId } = cookies.get('splitsy');
      this.setState({
        username: username,
        userId: userId
      }, () => {
        cb()
      });
    }
  }

  navigateToPage() {
    this.setState({
      verified: (<Navigate to="/protected/RestaurantList" replace={true} />)
    })
  }

  navigateToLogIn() {
    this.setState({
      verified: null,
      username: '',
      userId: 0
    })
  }

  render() {

    var userData = {
      username: this.state.username,
      userId: this.state.userId
    };


    if (userData.username !== '' || userData.userId !== 0) {
      return (
        <Routes className="App">
          <Route path="/" element={<NavBar cookieData={userData} logOutClick={this.navigateToLogIn} />}>
            <Route index element={
              <>
                {this.state.verified}
                <Auth verifyUser={() => { this.authCheck(this.navigateToPage) }} />
              </>}
            />
            <Route path="/protected" element={<Private user={userData} />} >
              <Route path="RestaurantList" element={<RestaurantPick cookieData={userData}/>} />
              <Route path="User" element={<User cookieData={userData} />} />
              <Route path="Menu" element={<Menu cookieData={userData}/>} />
              <Route path="Cart" element={<Cart cookieData={userData}/>} />
              <Route path="Payment" element={<Payment cookieData={userData} />} />
            </Route>
          </Route>
        </Routes>
      );
    } else {
      if (this.state.verified !== null){return (<CircularProgress />)}
      return (
        <Routes className="App">
          <Route path="*" element={<NavBar cookieData={userData} logOutClick={this.navigateToLogIn}/>}>
            <Route path="*" element={
              <>
                <Auth verifyUser={() => { this.authCheck(this.navigateToPage) }} />
              </>}
            />
          </Route>
        </Routes>
      );
    }
  }

}

export default withCookies(App);
