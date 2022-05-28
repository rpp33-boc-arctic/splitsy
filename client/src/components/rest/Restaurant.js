import React from 'react';
import RestaurantPick from './rest_pick/rest_pick.js'

class RestaurantMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="rest-menu-wrapper">
      Restaurant menu
      </div >
    )
  }
}

export {RestaurantMenu,RestaurantPick};