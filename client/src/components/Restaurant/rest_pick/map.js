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
        keywords:"",
        helperText:"pleaes enter a valid address.",
        join:""
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

  querychange(e,name){
    // this.query = e.target.value;
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


    if (this.state.join.length >= 4){
      //joining session;
    } else {
    var url = `https://api.tomtom.com/search/2/search/${this.state.query}.{json}?key=${MapAPI}`;
    setTimeout(()=>{
      axios.get(url).then((data)=>{
        // console.log(data.data.results[0].position);
        //mark map position on serach
        this.props.getRestaurants(data.data.results[0].position['lat'],data.data.results[0].position['lon'])
      });
      this.setState({query:"",error:false})
    },2000);
  }
  }


  render() {
    return (
      <div className="map-ct">
        <div className="map">
    <div className="mapct">
      <span>{this.state.query } <br/> </span>
      <span>{this.state.error}</span>
      <div className="search-ct">

        <TextField  error={this.state.error? this.state.error: false}  helperText={this.state.helperText} style={{margin:"10px"}} onChange={(e)=>{this.querychange(e,"query")}} id="outlined-basic" label="address" variant="outlined" value={this.state.query} className="mapsearch" />
        <TextField error={this.state.error? this.state.error: false}  helperText={this.state.helperText} style={{margin:"10px"}} onChange={(e)=>{this.querychange(e,"keywords")}} id="outlined-basic" label="keywords" variant="outlined" value={this.state.keyword} className="mapsearch" />
        OR
        <TextField  helperText={"enter join code"} style={{margin:"10px"}}   onChange={(e)=>{this.querychange(e,"join")}} id="outlined-basic" label="join code" variant="outlined" value={this.state.join} className="mapsearch" />

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