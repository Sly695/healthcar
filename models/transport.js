var mongoose = require("mongoose");

var transportSchema = mongoose.Schema({
  departureLocation: String,
  arrivalLocation: String,
  dateInitial: Date,
  dateArrival: Date,
  timeDeparture: String,
  timeArrival: Date,
  type: Boolean,
  message: String,
  status: String, // disponible, en cours, cloturé
  idUser: String, // clé étrangère _id
  idPro: String, // clé étrangère _id
  patient: [patientSchema], // Sous document
});

var transportModel = mongoose.model("transports", transportSchema);

module.exports = transportModel;
