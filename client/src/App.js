import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import NavBar from './components/Navbar.js';
import Auth from './components/Auth/Auth.js';
import Cart from './components/Cart/Cart.js';
import Menu from './components/Menu/Menu.js';
import Payment from './components/Payment/Payment.js';
import { RestaurantPick,RestaurantMenu } from './components/Restaurant/Restaurant.js';
import User from './components/User/User.js';
import Private from './Private.js';

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
  }

  componentDidMount() {
    this.authCheck();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cookies.get('splitsy').username !== this.props.cookies.get('splitsy').username || prevProps.cookies.get('splitsy').userId !== this.props.cookies.get('splitsy').userId) {
      this.render();
    }
  }

  authCheck(cb = () => {}) {
    var { cookies } = this.props;
    var { username, userId } = cookies.get('splitsy');

    this.setState({
      username: username,
      userId: userId
    }, () => {
      cb()
    });
  }

  navigateToPage () {
    this.setState({
      verified: (<Navigate to="/protected/RestaurantList" replace={true} />)
    })
  }

  render() {

    var userData = {
      username: this.state.username,
      userId: this.state.userId
    };

    return (
      <Routes className="App">
          <Route path="/" element={<NavBar />}>
            <Route index element={
              <>
                {this.state.verified}
                {
                  (userData.username !== "" || userData.userId !== 0)
                  ?
                  (<Auth verifyUser={() => {this.authCheck(this.navigateToPage)}}/>)
                  :
                  (<Auth verifyUser={() => {}}/>)
                }
              </>
            }/>
            <Route path="/protected" element={<Private user={userData} />} >
              <Route path="RestaurantList" element={<RestaurantPick />} />
              <Route path="User" element={<User />} />
              <Route path="RestauarantMenu" element={<RestaurantMenu />} />
              <Route path="Menu" element={<Menu />} />
              <Route path="Cart" element={<Cart />} />
              <Route path="Payment" element={<Payment />} />
            </Route>
          </Route>
      </Routes>
    );

  }

}

export default withCookies(App);
