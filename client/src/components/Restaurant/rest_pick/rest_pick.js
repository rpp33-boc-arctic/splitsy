import React from 'react';
import Map from './map.js'
import ListComponent from './list.js'
import './rest.scss';
import axios from 'axios';
import {PlacesAPI, MapAPI} from './maps.config.js';

class RestaurantPick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rest:[]
    }
    console.log(this);
    this.getRestaurants = this.getRestaurants.bind(this);
    // this.getPlaces = this.getPlaces.bind(this)
  }

  componentDidMount(){
    // this.getPlaces();
  }

  getRestaurants(lat,long,miles){
        axios.get('http://127.0.0.1:3001/restaurant',{params:{lat:lat,long:long}} ).then(data=>{
          console.log(data)
          this.setState({rest:data.data})
        });
     }

  clickRest(){
    //create session make code on server send to db and send to menu page with link tag

  }



  render() {
    return (
      <div className="rest">
      <p> Restaurants near me </p>
      <div className="container">
       <ListComponent navigate={this.props.navigate} rest={this.state.rest}></ListComponent>
      <Map getRestaurants={this.getRestaurants}></Map>
        </div>


      </div >
    )
  }
}

export default RestaurantPick;