import {React,useState,useEffect} from 'react';
import Map from './map.js'
import ListComponent from './list.js'
import './rest.scss';
import axios from 'axios';
import {PlacesAPI, MapAPI} from './maps.config.js';
import { useNavigate }  from "react-router-dom";

var  RestaurantPick = (props)=>  {

    var state = {
      rest:[],
      query:"",
      error:false,
      keywords:"",
      helperText:"pleaes enter a valid address.",
      join_code:"",
      showErrorBar:false,
      errorbar:"Invalid Join Code."
    }

    var [state,setState]= useState(state)
    const navigate = useNavigate();



  function getCookie(name){
    if ( document.cookie){
     return {[name]: document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''}
    } else {
      return {[name]:''}
    }
  }

   var joinCodeChange = (e)=>{
    var val = e.target.value;
     state['join_code'] = val;
    setState(state);
  }

  var joinSearch = (e)=>{

    var throwerror = false;
    console.log(state)
    // since there is a code entered we can throw an error because it is invalid
    if (state.join_code.length > 4){
      throwerror = true
    }

    var url = 'http://127.0.0.1:3001/joinOrder';
    axios.get(url,{headers:{'Authorization':'Bearer ' + getCookie('orderSession').orderSession}}).then((response)=>{
      // if redirect True and menu exists route to menu with usenavigate  throw error = false because route is true
      // if redirect false throw error if code length > 4;
      if (response.data.redirect){
        navigate('/protected/menu', { state: { menu:response.data.menu } });
      }
    }).catch(err=>{
      if (throwerror){
        state['showErrorBar']=true;
        setState(state)
        }
      setState(state)
    });
    // state['query']="fiwonfoweinfowinefioewfnioew"
    //   setState(state)

  }

  var querychange = (e,name)=>{
      if (name === "query"){
        state['query']=e.target.value;

        if (e.target.value.length > 10 ){
          state['error']=false;
          state['helperText']="congrats its valid";
          setState(state)
        } else {
          state['helperText']="pleaes enter a valid address";
          setState(state);
        }
      }
      if (name === "keywords"){
        state['keywords']=e.target.value;
          setState(state)
      }
  }

  var search = (e)=>{
    //join code;
    var url = `https://api.tomtom.com/search/2/search/${state.query}.{json}?key=${MapAPI}`;
    setTimeout(()=>{
      axios.get(url).then((data)=>{
        getRestaurants(data.data.results[0].position['lat'],data.data.results[0].position['lon'])
        state['query']="";
        state['error']=false;
        setState(state)
      });
    },500);
  }



 var createCookie = (token)=>{
    if (document.cookie === undefined){
      document.cookie = '';
    }
    document.cookie += ` orderSession=${token};`
  }

  var getRestaurants = (lat,long,miles)=>{
        axios.get('http://127.0.0.1:3001/restaurant',{params:{lat:lat,long:long}} ).then(response=>{
          setState(state => ({
            ...state.rest,
            ...response.data
          }));
          console.log(state);
        });
   }

  var delete_cookie = ( name, path, domain )=> {
    if( getCookie(name) ) {
      document.cookie = name + "=" +
        ((path) ? ";path="+path:"")+
        ((domain)?";domain="+domain:"") +
        ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
  }

  var clickRestaurant= (restData,cb)=>{
    restData.username = "grant_22";
    restData.address = state.query;
    axios.get('http://127.0.0.1:3001/orderSession',{params:restData} ).then(response=>{
      delete_cookie('orderSession','/','localhost');
      createCookie(response.data.token);
      cb();
    });
  }
  useEffect(() => {
    joinSearch()
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
