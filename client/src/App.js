import React from 'react';

import { Link }  from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="App">
        <h1>Splitsy-hello thursday</h1>
        <Link to="/auth"> auth</Link> <br/>
        <Link to="/Dashboard"> Dashboard</Link><br/>
        <Link to="/User"> User</Link><br/>
        <Link to="/Restaurant"> Restaurant</Link><br/>
        <Link to="/Menu"> Menu</Link><br/>
        <Link to="/Cart"> Cart</Link><br/>
        <Link to="/Payment"> Payment</Link><br/>

        ©2022 Splitsy Inc. All rights reserved.
      </div>
    );
  }

}

export default App;
