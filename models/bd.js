var mongoose = require("mongoose");

var options = {
  connectTimeoutMS: 5000,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose.connect(process.env.BDD_LINK, options, function (err) {
  err ? console.log(err) : console.log("BDD OK");
});

module.exports = mongoose;
