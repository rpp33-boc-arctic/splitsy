var path = require('path');
var fs = require('fs');


module.exports = {
  restaurantList: (req, res) => {

    console.log(req.query);
    if (req.query.add){

      if (req.query.lat >  33.695  && req.query.lat < 33.69733 ){
        if (req.query.lon >  -112.317814  && req.query.lon < -112.3180 ){
          console.log('in range of address');
          fs.readFile(path.join(__dirname,'../../../DATA.json'),'utf8',(err,data)=>{
            console.log(err,data);
            res.send(data);
          })

        }
      }


    }



  }
}