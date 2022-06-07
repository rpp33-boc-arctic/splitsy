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
  }




  render() {
    return (
      <div className="map-ct">
        <div className="map">
    <div className="mapct">
      <span>{this.props.query } <br/> </span>
      <span>{this.props.error}</span>
      <div className="search-ct">

        <TextField  error={this.props.error? this.props.error: false}  helperText={this.props.helperText} style={{margin:"10px"}} onChange={(e)=>{this.props.querychange(e,"query")}} id="outlined-basic" label="address" variant="outlined" value={this.props.query} className="mapsearch" />
        <TextField error={this.props.error? this.props.error: false}  helperText={this.props.helperText} style={{margin:"10px"}} onChange={(e)=>{this.props.querychange(e,"keywords")}} id="outlined-basic" label="keywords" variant="outlined" value={this.props.keyword} className="mapsearch" />
        OR
        <TextField  helperText={"enter join code"} style={{margin:"10px"}}   onChange={(e)=>{this.props.querychange(e,"join")}} id="outlined-basic" label="join code" variant="outlined" value={this.props.join} className="mapsearch" />

      <Button onClick={(e)=>{this.props.search(e)}} className="submit"> submit</Button>
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