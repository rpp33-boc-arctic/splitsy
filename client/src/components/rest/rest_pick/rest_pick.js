import React from 'react';
import Map from './map.js'
import List from './list.js'
import './rest.scss';
import axios from 'axios';
import {PlacesAPI, MapAPI} from './maps.config.js';

class RestaurantPick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rest:[]
    }
    this.getRestaurants = this.getRestaurants.bind(this);
    this.getPlaces = this.getPlaces.bind(this)
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


     getPlaces(address, query, distance){
      axios.get('http://127.0.0.1:3001/getAddress',{params:{address:"12145 west jessie"}} ).then(data=>{
      ;
        //[0].formatted_address
        var newdata = data.data;
        console.log(newdata)
        var returnAddress = newdata[0].formatted_address;
        var latlon = newdata[0].geometry.location;
        axios.get('http://127.0.0.1:3001/placesNearby',{params:{location:latlon,address:returnAddress,distance:distance}} ).then(response=>{
          console.log(response)
          this.setState({rest:response.data.results});
          //[0].formatted_address

        });
      });





      // axios.get('https://maps.googleapis.com/maps/api/place/photo',{params:{maxwidth:500,photo_reference:long}}).then(data=>{
      //   console.log(data)
      //   this.setState({rest:data.data})
      // });
      // https://maps.googleapis.com/maps/api/place/photo
      // ?maxwidth=400
      // &photo_reference=Aap_uEA7vb0DDYVJWEaX3O-AtYp77AaswQKSGtDaimt3gt7QCNpdjp1BkdM6acJ96xTec3tsV_ZJNL_JP-lqsVxydG3nh739RE_hepOOL05tfJh2_ranjMadb3VoBYFvF0ma6S24qZ6QJUuV6sSRrhCskSBP5C1myCzsebztMfGvm7ij3gZT
      // &key=YOUR_API_KEY
     }

  render() {
    return (
      <div className="rest">
      <p> Restaurants near me </p>
      code:<input className="code"></input>
      <div className="container">
       <List rest={this.state.rest}></List>
      <Map getRestaurants={this.getPlaces}></Map>
        </div>


      </div >
    )
  }
}

export default RestaurantPick;