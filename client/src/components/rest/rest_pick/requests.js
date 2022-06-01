import axios from 'axios';

function getRestaurants(lat,long,miles){
  axios.get('http://127.0.0.1:3001/restaurant',{params:{lat:lat,long:long}});
  //grab data thats x miles away         "miles": 3.0431106214340744,

}

var Requests = {
  "getRestaurants":getRestaurants
}
export default Requests;