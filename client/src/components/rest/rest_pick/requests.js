import axios from 'axios';

function getRestaurants(lat,long){
  axios.get('/restaurant',{params:{lat:lat,long:long}});
}

var Requests = {
  "getRestaurants":getRestaurants
}
export default Requests;