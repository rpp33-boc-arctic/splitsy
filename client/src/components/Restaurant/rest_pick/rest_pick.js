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
      rest:[],
      address:""
    }
    console.log(this);
    this.getRestaurants = this.getRestaurants.bind(this);
    this.createCookie = this.createCookie.bind(this);
    this.getCookie = this.getCookie.bind(this);
    this.clickRestaurant = this.clickRestaurant.bind(this)
    this.setAddress = this.setAddress.bind(this);
    this.username = 'grant_22'
    // this.getPlaces = this.getPlaces.bind(this)
  }

  componentDidMount(){
    // this.getPlaces();
    if (document.cookie){
      //check if user has session still active take them to menu
      // make db call with address and index to get menu and navigate to menu with the data given
    }
  }

  setAddress(address){
    this.setState({address:address})
  }

  getCookie(){
    if ( document.cookie){
      console.log(document.cookie)
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith('orderSession='))
    .split('=')[1];
    return {'orderSession':cookieValue};
    } else {
      return {'orderSession':''};
    }
  }

  createCookie(token){
    document.cookie += ` orderSession=${token};`
  }
  getRestaurants(lat,long,miles){

        axios.get('http://127.0.0.1:3001/restaurant',{params:{lat:lat,long:long}} ).then(data=>{
          console.log(data)
          this.setState({rest:data.data})
        });
     }


  clickRestaurant(restData,cb){
    // make session
    //address,restraunt inedx
    restData.username = this.username
    restData.address = this.state.address
    //create session make code on server send to db and send to menu page with link tag
    // grab cookie.
    axios.get('http://127.0.0.1:3001/orderSession',{params:restData, headers:{'Authorization':'Bearer ' + this.getCookie().orderSession}} ).then(response=>{
      this.createCookie(response.data)
      cb();
        // setCookie
      // this.setState({rest:data.data})
    });
  }



  render() {
    return (
      <div className="rest">
      <p> Restaurants near me </p>
      <div className="container">
       <ListComponent  address={this.state.address} clickRestaurant={this.clickRestaurant} rest={this.state.rest}></ListComponent>
      <Map setAddress={this.setAddress} getRestaurants={this.getRestaurants}></Map>
        </div>


      </div >
    )
  }
}

export default RestaurantPick;