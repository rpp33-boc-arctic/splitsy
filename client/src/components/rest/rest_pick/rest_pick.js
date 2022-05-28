import React from 'react';
import Map from './map.js'
import List from './list.js'
import './rest.scss';
class RestaurantPick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }

  render() {
    return (
      <div className="rest">
      <p> Restaurants near me </p>
      <div class="container">
       <List></List>
      <Map></Map>
        </div>


      </div >
    )
  }
}

export default RestaurantPick;