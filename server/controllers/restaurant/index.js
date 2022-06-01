var path = require('path');
var fs = require('fs');


module.exports = {
  restaurantList: (req, res) => {

    console.log(req.query);
    if (req.query){
// 33.69292', long: '-112.3228

      if (req.query.lat >  33.692  && req.query.lat < 33.695 ){
        if (req.query.long  <  -112.320  && req.query.long  > -112.325 ){
          console.log('in range of address');
          fs.readFile(path.join(__dirname,'../../../DATA.json'),'utf8',(err,data)=>{
            console.log(err,data);
            res.send(JSON.stringify(data));
          })

        } else {
          res.send('no data')
        }
      }else {
        res.send('no data')
      }


    }



  }
}