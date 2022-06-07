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

      query:"",
      error:false,
      keywords:"",
      helperText:"pleaes enter a valid address.",
      join:""
    }
    console.log(this);
    this.getRestaurants = this.getRestaurants.bind(this);
    this.createCookie = this.createCookie.bind(this);
    this.getCookie = this.getCookie.bind(this);
    this.clickRestaurant = this.clickRestaurant.bind(this)
    this.querychange = this.querychange.bind(this);
    this.search = this.search.bind(this);
    this.username = 'grant_22'
    // this.getPlaces = this.getPlaces.bind(this)
  }
  querychange(e,name){
      if (name === "query"){
        if (e.target.value.length > 10 ){
          this.setState({query:e.target.value,error:false,helperText:"congrats it valid"})
        } else {
          this.setState({query:e.target.value, helperText:"pleaes enter a valid address."})
        }
      }
      if (name === "keywords"){
          this.setState({keywords:e.target.value})
      }
      if (name === "join"){
        this.setState({join:e.target.value})
       }
  }

  search(e){

    var url = `https://api.tomtom.com/search/2/search/${this.state.query}.{json}?key=${MapAPI}`;
    setTimeout(()=>{
      axios.get(url).then((data)=>{
        // console.log(data.data.results[0].position);
        //mark map position on serach
        this.getRestaurants(data.data.results[0].position['lat'],data.data.results[0].position['lon'])
      });
      this.setState({query:"",error:false})
    },2000);

  }

  componentDidMount(){
    // this.getPlaces();
    this.getCookie('orderSession')
  }


  getCookie(name){
    console.log('cookie',document.cookie)
    if ( document.cookie){
     return {[name]: document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''}
    } else {
      return {[name]:''}
    }
  }

  createCookie(token){
    if (document.cookie === undefined){
      document.cookie = '';
    }
    document.cookie += ` orderSession=${token};`
  }
  removeCookie(){


  }

  getRestaurants(lat,long,miles,code){
      if (code === undefined || code === null){
        axios.get('http://127.0.0.1:3001/restaurant',{params:{lat:lat,long:long}} ).then(data=>{
          console.log(data)
          this.setState({rest:data.data})
        });
      } else {
        this.clickRestaurant()
      }
     }


  clickRestaurant(restData,cb){
    restData.username = this.username;
    restData.address = this.state.query;
    restData.sessionCode = this.state.join
    //create session make code on server send to db and send to menu page with link tag
    // grab cookie.
    axios.get('http://127.0.0.1:3001/orderSession',{params:restData, headers:{'Authorization':'Bearer ' + this.getCookie('orderSession').orderSession}} ).then(response=>{
      this.createCookie(response.data);
     this.getCookie('orderSession')
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
      <Map search={this.search} error={this.state.error} helperText={this.state.helperText} querychange={this.querychange} getRestaurants={this.getRestaurants}></Map>
        </div>


      </div >
    )
  }
}

export default RestaurantPick;