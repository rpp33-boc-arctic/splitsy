import React from 'react';
import Map from './map.js'
import ListComponent from './list.js'
import './rest.scss';
import axios from 'axios';
import {PlacesAPI, MapAPI} from './maps.config.js';

class RestaurantPick extends React.Component {
  constructor(props) {
    super(props);
    this.googleAPI = PlacesAPI;
    this.state = {
      rest:[],
      query:"",
      error:false,
      keywords:"",
      helperText:"pleaes enter a valid address.",
      session_code:""
    }

    this.getRestaurants = this.getRestaurants.bind(this);
    this.createCookie = this.createCookie.bind(this);
    // this.getCookie = this.getCookie.bind(this);
    this.clickRestaurant = this.clickRestaurant.bind(this)
    this.querychange = this.querychange.bind(this);
    this.search = this.search.bind(this);
    this.username = 'grant_22';
    this.getCookie = this.getCookie.bind(this);
    this.delete_cookie = this.delete_cookie.bind(this);

  }

  getCookie(name){
    if ( document.cookie){
     return {[name]: document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''}
    } else {
      return {[name]:''}
    }
  }


   delete_cookie( name, path, domain ) {
    if( this.getCookie(name) ) {
      document.cookie = name + "=" +
        ((path) ? ";path="+path:"")+
        ((domain)?";domain="+domain:"") +
        ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
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
      if (name === "session_code"){
        this.setState({session_code:e.target.value})
       }
  }

  search(e){
    //join code;
    var url = `https://api.tomtom.com/search/2/search/${this.state.query}.{json}?key=${MapAPI}`;
    setTimeout(()=>{
      axios.get(url).then((data)=>{
        this.getRestaurants(data.data.results[0].position['lat'],data.data.results[0].position['lon'])
      });
      this.setState({query:"",error:false})
    },2000);
  }



  createCookie(token){
    if (document.cookie === undefined){
      document.cookie = '';
    }
    document.cookie += ` Session=${token};`
  }

  getRestaurants(lat,long,miles){
        axios.get('http://127.0.0.1:3001/restaurant',{params:{lat:lat,long:long}} ).then(data=>{
          this.setState({rest:data.data})
        });
   }

   routeIfCookie(){
    // headers:{'Authorization':'Bearer ' + window.getCookie('Session').Session}
    //make axios request check cookie data
    // if exists make requests to get menu
    //this.setState({query: tokendata.address}, function(){ after});
    //search() // set state for query and cal getRestraunts()
    // imidatly use item = this.state.rest[tokendata.restraunt_id]  ;
  //  navigate('/menu', { state: { item:item } });

   }


  clickRestaurant(restData,cb){
    restData.username = "grant_22";
    //this is a static username above when muizz finished cookie grab from that.
    restData.address = this.state.query;
    restData.orderCode = this.state.session_code

    axios.get('http://127.0.0.1:3001/Session',{params:restData} ).then(response=>{

        this.delete_cookie('Session','/','localhost');
        this.createCookie(response.data.token);
        cb();
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