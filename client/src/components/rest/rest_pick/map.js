import React from 'react';
import './map.scss'
import tt from '@tomtom-international/web-sdk-maps'
import MapAPI from '../../../maps.config';
import axios from 'axios';
import Requests from '../../../requests';
console.log(Requests)
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.map = 'no map';
      this.state = {
        query:"",
        error:""
      }
  }

  componentDidMount(){
    if (this.map.remove){
      this.map.remove();

    }
   this.map = tt.map({
      key: MapAPI,
      container: 'Map',
      center: [-112.237068,33.580944],
      dragPan: true,
      zoom: 10
  });
  this.map.addControl(new tt.FullscreenControl());
  this.map.addControl(new tt.NavigationControl());
  // console.log(this.map)
  this.search = this.search.bind(this)
  }

  querychange(e){
    // this.query = e.target.value;
    this.setState({query:e.target.value})
  }
  search(e){
    if (this.state.query.toLowerCase() === '12145 west jessie ct' || this.state.query === "1802 Notre Dame Ave, Belmont"){



    var url = `https://api.tomtom.com/search/2/search/${this.state.query}.{json}?key=${MapAPI}`;
    setTimeout(()=>{
      axios.get(url).then((data)=>{
        console.log(data.data.results[0].position);

        Requests.getRestaurants(data.data.results[0].position['lat'],data.data.results[0].position['lon'])
        // send info here to server;
        //if "NON_NEAR" then address not valid;
      });
      this.setState({query:"",error:""})
    },2000);
  } else {
    this.setState({error:"Restaurants do not exist out in the middle of nowhere!  "})
  }
  }


  render() {
    return (
      <div className="map-ct">

        <div className="input">




        </div>
        <div className="map">
      map goes here
    <div className="mapct">
      <span>{this.state.query } <br/> </span>
      <span>{this.state.error}</span>
      mapsearch:<input  onChange={(e)=>{this.querychange(e)}}  value={this.state.query} className="mapsearch"/>
      <button onClick={(e)=>{this.search(e)}} className="submit"> submit</button>
      <div id="Map" className="Map" >
    </div>
    </div>


        </div>



      </div >
    )
  }
}

export default Map;