var mongoose = require("mongoose");

var patientSchema = mongoose.Schema({
  lastname: String,
  firstname: String,
  sexe: String,
  birthdate: Date,
  secu: Number,
});

var patientModel = mongoose.model("patients", patientSchema);

module.exports = patientModel;
