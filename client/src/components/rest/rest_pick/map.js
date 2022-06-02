import React from 'react';
import './map.scss'
import tt from '@tomtom-international/web-sdk-maps'
import {MapAPI} from './maps.config';
import axios from 'axios';
import {Button,TextField} from '@mui/material';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.map = 'no map';
      this.state = {
        query:"",
        error:false,
        helperText:"pleaes enter a valid address."
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
    if (e.target.value === ("12145 west jessie ct") || e.target.value === "1802 Notre Dame Ave, Belmont" ){
      this.setState({query:e.target.value,error:false,helperText:"congrats it valid"})
    } else {
      this.setState({query:e.target.value, helperText:"pleaes enter a valid address."})
    }
  }
  search(e){
    if (this.state.query.toLowerCase() === '12145 west jessie ct' || this.state.query === "1802 Notre Dame Ave, Belmont"){
    var url = `https://api.tomtom.com/search/2/search/${this.state.query}.{json}?key=${MapAPI}`;
    setTimeout(()=>{
      axios.get(url).then((data)=>{
        console.log(data.data.results[0].position);
        this.props.getRestaurants(data.data.results[0].position['lat'],data.data.results[0].position['lon'])
      });
      this.setState({query:"",error:false})
    },2000);
  } else {
    this.setState({helperText:"Restaurants do not exist out in the middle of nowhere!  ",error:true})
  }
  }


  render() {
    return (
      <div className="map-ct">

        <div className="map">
    <div className="mapct">
      <span>{this.state.query } <br/> </span>
      <span>{this.state.error}</span>
      <div className="search-ct"><TextField error={this.state.error? this.state.error: false}  helperText={this.state.helperText} style={{margin:"10px"}} onChange={(e)=>{this.querychange(e)}} id="outlined-basic" label="" variant="outlined" value={this.state.query} className="mapsearch" />
      <Button onClick={(e)=>{this.search(e)}} className="submit"> submit</Button>
      </div>
      <div id="Map" className="Map" >
    </div>
    </div>


        </div>



      </div >
    )
  }
}

export default Map;