var mongoose = require("mongoose");

var patientSchema = mongoose.Schema({
  lastname: String,
  firstname: String,
  sexe: String,
  birthdate: Date,
  secu: Number,
});

var AddressDepartureSchema = mongoose.Schema({
  address: String,
  postalCode: String,
  city: String,
});

var AddressArrivalSchema = mongoose.Schema({
  address: String,
  postalCode: String,
  city: String,
});

var transportSchema = mongoose.Schema({
  ref: String,
  departureLocation: String,
  addressDeparture: [AddressDepartureSchema],
  arrivalLocation: String,
  addressArrival: [AddressArrivalSchema],
  dateInitial: Date,
  dateArrival: Date, // DATE en string pour test
  timeDeparture: String,
  timeArrival: String, // DATE en string pour test
  type: Boolean,
  alreadyNote: Boolean, // Si le transport a déjà été noté
  message: String,
  status: String, // disponible, en cours, cloturé
  idUser: String, // clé étrangère _id
  idPro: String, // clé étrangère _id
  patient: [patientSchema], // Sous document
});

var transportModel = mongoose.model("transports", transportSchema);
// var patientModel = mongoose.model("patients", patientSchema);

module.exports = transportModel;
