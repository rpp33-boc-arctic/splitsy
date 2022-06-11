import {React,useState,useEffect} from 'react';
import Map from './map.js'
import ListComponent from './list.js'
import './rest.scss';
import axios from 'axios';
import {MapAPI} from './maps.config.js';
import { useNavigate }  from "react-router-dom";

var  RestaurantPick = (props)=>  {

    var stateobj = {
      rest:[],
      query:"",
      error:false,
      keywords:"",
      helperText:"pleaes enter a valid address.",
      join_code:"",
      showErrorBar:false,
      errorbar:"Invalid Join Code."
    }

    var [state,setState]= useState(stateobj)
    const navigate = useNavigate();



  function getCookie(name){
    if ( document.cookie){
     return {[name]: document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''}
    } else {
      return {[name]:''}
    }
  }

   var joinCodeChange = (e)=>{
    var newstate = Object.assign({}, state);

    var val = e.target.value;
    newstate['join_code'] = val;
    setState(newstate);
  }

  var delete_cookie = ( name, path, domain )=> {
    if( getCookie(name).orderSession ) {
      document.cookie = name + '=; Max-Age=-99999999;';
    }
  }

  var createCookie = (token)=>{
    delete_cookie('orderSession');
      document.cookie = "orderSession" + "=" + (token || "")  + "; path=/";
    }

  var joinSearch = (e)=>{
    var newstate = Object.assign({}, state);
    var throwerror = false;
    if (state.join_code.length > 4){
      throwerror = true
    }
    var url = 'http://127.0.0.1:3001/joinOrder';
    axios.get(url,{params:{user_id:props.cookieData.userId},headers:{'Authorization':'Bearer ' + getCookie('orderSession').orderSession}}).then((response)=>{
      console.log('respoonse',response);
      if (response.data.redirect){
        if (response.data.token){
          createCookie(response.data.token)
        }
        navigate('/protected/menu', { state: { item:response.data.menu, menu:response.data.menu } });
      }
    }).catch(err=>{
      if (throwerror){
        newstate['showErrorBar']=true;
        setState(newstate)
        }
    });


  }

  var querychange = (e,name)=>{
    var newstate = Object.assign({}, state);

      if (name === "query"){
        newstate['query']=e.target.value;

        if (e.target.value.length > 10 ){
          newstate['error']=false;
          newstate['helperText']="congrats its valid";
          setState(newstate)
        } else {
          newstate['helperText']="pleaes enter a valid address";
          setState(newstate);
        }
      }
      if (name === "keywords"){
        newstate['keywords']=e.target.value;
          setState(newstate)
      }
  }

  var search = (e)=>{
    //join code;
    var url = `https://api.tomtom.com/search/2/search/${state.query}.{json}?key=${MapAPI}`;
    setTimeout(()=>{
      axios.get(url).then((data)=>{
        getRestaurants(data.data.results[0].position['lat'],data.data.results[0].position['lon'])
        var newstate = Object.assign({}, state);
        newstate['query']="";
        newstate['error']=false;
        setState(newstate)
      });
    },500);
  }






  var getRestaurants = (lat,long,miles)=>{
        axios.get('http://127.0.0.1:3001/restaurant',{params:{lat:lat,long:long}} ).then(response=>{
          var newstate = Object.assign({}, state);  // creating copy of state variable jasper
          newstate.rest = response.data;
          setState(newstate)
        });
   }



  var clickRestaurant= (restData,cb)=>{
    restData.username = "grant_22";
    restData.address = state.query;
    restData.user_id = props.cookieData.userId;
    axios.get('http://127.0.0.1:3001/orderSession',{params:restData} ).then(response=>{
      createCookie(response.data.token);
      cb();
    });
  }

  useEffect(() => {
    if (getCookie('orderSession').orderSession){
       joinSearch()
    }
  });


    return (
      <div className="rest">
      {state.showErrorBar? <div className="errorBar"><span>{state.errorbar}</span></div> : null}
      <p> Restaurants near me </p>

      <div className="container">
       <ListComponent  address={state.address} clickRestaurant={clickRestaurant} rest={state.rest}></ListComponent>
       <Map joinCodeChange={joinCodeChange} joinSearch={joinSearch} search={search} error={state.error} helperText={state.helperText} querychange={querychange} getRestaurants={getRestaurants}></Map>
        </div>
      </div >
    )

}

export default RestaurantPick;
