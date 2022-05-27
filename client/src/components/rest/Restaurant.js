import React from 'react';
import './rest.scss'
class RestaurantMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="rest">
      Restaurant menu
      </div >
    )
  }
}
class RestaurantPick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="rest">
      Restaurant pick
      </div >
    )
  }
}

export {RestaurantMenu,RestaurantPick};