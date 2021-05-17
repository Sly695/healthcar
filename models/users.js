var mongoose = require("mongoose");

var AddressSchema = mongoose.Schema({
  address: String,
  postalCode: String,
  city: String,
});

var userSchema = mongoose.Schema({
  lastname: String,
  firstname: String,
  email: String,
  avatar: String,

  role: String, // infirmiere, pro
  adresse: [AddressSchema],
  password: String,
  token: String,
  phone: String,
  date_inscrit: Date,

  nomEntreprise: String,
  siret: String,
  note: Number,
});

var UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
