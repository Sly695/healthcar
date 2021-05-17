var express = require("express");
var router = express.Router();

var request = require("sync-request");

var patientData = require("../models/patients");
var transportData = require("../models/patients");
var UserModel = require("../models/users");


var count = 0;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get('/map', function(req, res, next){
  var address = req.query.address
  var data = request("GET", `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=e40b9c1452fe4b29997b6f91eb035202`) 
  var dataAPI = JSON.parse(data.body)
  console.log(dataAPI)
  console.log("oui");
  //Si on trouve une adresse qui correspond
  if(dataAPI.total_results == 1){
    res.json({result : true, latitude : dataAPI.results[0].geometry.lat, longitude : dataAPI.results[0].geometry.lng})
  } else {
    res.json({result : false})
  }

});


module.exports = router;
