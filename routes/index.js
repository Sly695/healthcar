var express = require("express");
var router = express.Router();

var request = require("sync-request");

var patientData = require("../models/patients");
var transportData = require("../models/patients");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});


module.exports = router;
