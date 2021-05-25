var express = require("express");
var router = express.Router();

var request = require("sync-request");
var uid2 = require("uid2");
const usersModel = require("../models/users");
var transportModel = require("../models/transport");

var Gp = require("/Users/sly/Documents/lacapsule/healthcar/front/node_modules/geoportal-access-lib/dist/GpServices.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//----------------------------------------------------------
//          VALIDATION TRANSPORT ET CHANGEMENT DE STATUS
//----------------------------------------------------------
router.get("/transport-validation", async (req, res, next) => {
  var result;
  if (req.query.status === "annulé") {
    await transportModel.updateOne(
      { _id: req.query._id },
      {
        status: "annulé",
      }
    );
    result = "annulé";
  }
  if (req.query.status === "dispo") {
    await transportModel.updateOne(
      { _id: req.query._id },
      {
        status: "dispo",
      }
    );
    result = "dispo";
  }
  if (req.query.status === "encours") {
    await transportModel.updateOne(
      { _id: req.query._id },
      {
        status: "encours",
        idPro: req.query.iduser,
      }
    );
    result = "encours";
  }
  if (req.query.status === "cloturé") {
    await transportModel.updateOne(
      { _id: req.query._id },
      {
        status: "cloturé",
      }
    );
    result = "cloturé";
  }
  res.json({ result, transportModel });
});

//----------------------------------------------------------
//          NOTATION
//----------------------------------------------------------

router.get("/feedback", async (req, res, next) => {
  var user = await usersModel.findById(req.query.idpro);
  var noteCopy = [...user.note];
  noteCopy.push(req.query.note);
  await usersModel.updateOne(
    { _id: req.query.idpro },
    {
      note: noteCopy,
    }
  );
  await transportModel.updateOne(
    { _id: req.query.alreadynote },
    {
      alreadyNote: true,
    }
  );

  res.json({ noteCopy });
});

//----------------------------------------------------------
//          RÉSERVATION VÉHICULE
//----------------------------------------------------------

router.post("/booking", async function (req, res, next) {
  var error = [];
  var result = false;
  var saveTransport = null;

  var addressDeparture = req.body.addressDeparture;
  var postalCodeDeparture = req.body.postalCodeDeparture;
  var cityDeparture = req.body.cityDeparture;

  var addressArrival = req.body.addressArrival;
  var postalCodeArrival = req.body.postalCodeArrival;
  var cityArrival = req.body.cityArrival;

  var dataDeparture = request(
    "GET",
    `https://api.opencagedata.com/geocode/v1/json?q=${addressDeparture},${postalCodeDeparture} ${cityDeparture}, France &key=e40b9c1452fe4b29997b6f91eb035202`
  );

  var dataArrival = request(
    "GET",
    `https://api.opencagedata.com/geocode/v1/json?q=${addressArrival},${postalCodeArrival} ${cityArrival}, France &key=e40b9c1452fe4b29997b6f91eb035202`
  );

  var dataDepartureAPI = JSON.parse(dataDeparture.body);
  var dataArrivalAPI = JSON.parse(dataArrival.body);

  if (
    req.body.departureName == "" ||
    req.body.arrivalLocationName == "" ||
    req.body.dateArrival == "" ||
    req.body.timeArrival == "" ||
    req.body.type == "" ||
    req.body.lastnamePatient == "" ||
    req.body.firstnamePatient == "" ||
    req.body.sexePatient == "" ||
    req.body.birthdate == "" ||
    req.body.secu == ""
  ) {
    error.push("champs vides");
  }

  if (error.length == 0 && dataDepartureAPI.total_results > 0 && dataArrivalAPI.total_results > 0) {
    var newTransport = new transportModel({
      ref: uid2(5),
      
      alreadyNote: false,
      departureLocation: req.body.departureName,
      addressDeparture: {
        address: req.body.addressDeparture,
        postalCode: req.body.postalCodeDeparture,
        city: req.body.cityDeparture,
        latitude: dataDepartureAPI.results[0].geometry.lat,
        longitude: dataDepartureAPI.results[0].geometry.lng,
      },
      arrivalLocation: req.body.arrivalLocationName,
      addressArrival: {
        address: req.body.addressArrival,
        postalCode: req.body.postalCodeArrival,
        city: req.body.cityArrival,
        latitude: dataArrivalAPI.results[0].geometry.lat,
        longitude: dataArrivalAPI.results[0].geometry.lng,
      },
      dateInitial: new Date(),
      dateArrival: req.body.dateArrival,
      timeArrival: req.body.timeArrival,
      type: Boolean(req.body.type), // true = ambulance / false = VSL
      message: req.body.message,
      status: "dispo", // dispo, encours, cloturé
      idUser: req.body._id, // clé étrangère _id
      patient: {
        lastname: req.body.lastnamePatient,
        firstname: req.body.firstnamePatient,
        sexe: req.body.sexePatient,
        birthdate: req.body.birthdate,
        secu: req.body.secu,
      },
    });

    saveTransport = await newTransport.save();

    if (saveTransport) {
      result = true;
    }
  }

  res.json({ result, saveTransport, error });
});

router.get("/course-list", async (req, res, next) => {
  let courseList = await transportModel.find();
  res.json({ courseList });
});

//----------------------------------------------------------
// REQUÊTE API POUR ACCEDER A DES INFOS PAR RAPPORT A UN TRAJET
//----------------------------------------------------------
router.get("/getRoute", async (req, res, next) => {
  Gp.Services.route({
    apiKey : "jhyvi0fgmnuxvfv0zjzorvdn", // clef d'accès à la plateforme
    startPoint : { x: req.query.longitudeStartPoint, y: req.query.latitudeStartPoint},       // point de départ
    endPoint : { x: req.query.longitudeEndPoint, y: req.query.latitudeEndPoint},          // point d'arrivée
    graph : "Voiture",                 // grapĥe utilisé
    onSuccess : function (result) {
      let finalCoords = [];
      for (let step of result.routeGeometry.coordinates){
        let point = step.reverse();
        finalCoords.push(point)
      } 
      res.json({totalTime : result.totalTime, totalDistance : result.totalDistance, result: finalCoords, });
        // exploitation des resultats : "result" est de type Gp.Services.RouteResponse
    }
});
})



module.exports = router;
