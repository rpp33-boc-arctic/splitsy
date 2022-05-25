import React from 'react';
import Cart from './components/Cart.js';
import Login from './components/Login.js';
import Menu from './components/Menu.js';
import Payment from './components/Payment.js';
import Restaurant from './components/Restaurant.js';
import User from './components/User.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="App">
        <h1>Splitsy</h1>
        <Login />
        <User />
        <Restaurant />
        <Menu />
        <Cart />
        <Payment /> <br></br>
        ©2022 Splitsy Inc. All rights reserved.
      </div>
    );
  }

}

export default App;
