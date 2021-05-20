var express = require("express");
var router = express.Router();

var request = require("sync-request");
var uid2 = require("uid2");
const usersModel = require("../models/users");
var transportModel = require("../models/transport");

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
  var user = await usersModel.findById(req.query.idEntreprise);
  var noteCopy = [...user.note];
  noteCopy.push(req.query.note);
  await usersModel.updateOne(
    { _id: req.query.idEntreprise },
    {
      note: noteCopy,
    }
  );
  saveNote = await user.save();

  res.json({ noteCopy, saveNote });
});

//----------------------------------------------------------
//          RÉSERVATION VÉHICULE
//----------------------------------------------------------

router.post("/booking", async function (req, res, next) {
  var error = [];
  var result = false;
  var saveTransport = null;

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

  if (error.length == 0) {
    var newTransport = new transportModel({
      ref: uid2(5),
      departureLocation: req.body.departureName,
      addressDeparture: {
        address: req.body.addressDeparture,
        postalCode: req.body.postalCodeDeparture,
        city: req.body.cityDeparture,
      },
      arrivalLocation: req.body.arrivalLocationName,
      addressArrival: {
        address: req.body.addressArrival,
        postalCode: req.body.postalCodeArrival,
        city: req.body.cityArrival,
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

//----------------------------------------------------------
//          MAP
//----------------------------------------------------------

router.get("/map", function (req, res, next) {
  var address = req.query.address;
  var data = request(
    "GET",
    `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=e40b9c1452fe4b29997b6f91eb035202`
  );
  var dataAPI = JSON.parse(data.body);
  console.log(dataAPI);
  console.log("oui");
  //Si on trouve une adresse qui correspond
  if (dataAPI.total_results == 1) {
    res.json({
      result: true,
      latitude: dataAPI.results[0].geometry.lat,
      longitude: dataAPI.results[0].geometry.lng,
    });
  } else {
    res.json({ result: false });
  }
});

//----------------------------------------------------------
//         LISTE TRANSPORTS
//----------------------------------------------------------

router.get("/course-list", async (req, res, next) => {
  let courseList = await transportModel.find();
  res.json({ courseList });
});

module.exports = router;
