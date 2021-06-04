var mongoose = require("mongoose");

var AddressSchema = mongoose.Schema({
  address: String,
  postalCode: String,
  city: String,
  latitude : String, 
  longitude : String,
});

var userSchema = mongoose.Schema({
  lastname: String,
  firstname: String,
  avatar: String,
  email: String,
  role: String, // soignant, transporteur
  adresse: [AddressSchema],
  password: String,
  token: String,
  phone: String,
  date_inscrit: Date,

  nomEntreprise: String,
  siret: String,
  note: Array,

});

var UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
