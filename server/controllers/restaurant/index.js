var path = require('path');
var fs = require('fs');
var db  = require('../../../database/index.js')

module.exports = {
  restaurantList: (req, response) => {
    if (req.query){
      if (req.query.lat >=  33.692  && req.query.lat <= 33.695 ){
        var check1 = (parseFloat(req.query.long.toString().replace('-',''))  >=  112.320)
        var check2 = (parseFloat(req.query.long.toString().replace('-',''))  <=  112.325)
        if (check1 && check2 ){
          db.Restaurant.find({}).then(res=>{
            response.send(JSON.stringify(res))
          })
        } else {
          res.send('address isnt defined in the db long')
        }
      } else {
        res.send('address isnt defined in the db lat')
      }
    }
  }
}