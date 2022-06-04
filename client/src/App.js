import React from 'react';

import { Link}  from "react-router-dom";

var App = ()=> {

    return (
      <div className="App">
        <br></br>
        <Link to="/Dashboard"> Dashboard</Link><br />
        <Link to="/User"> User</Link><br />
        <Link to="/Restaurant/pick"> Restaurants</Link><br />
        <Link to="/Menu"> Menu</Link><br />
        <Link to="/Cart"> Cart</Link><br />
        <Link to="/Payment"> Payment</Link><br /><br />

        ©2022 Splitsy Inc. All rights reserved.
      </div>
    );


}

export default App;
