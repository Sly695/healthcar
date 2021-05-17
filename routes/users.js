var express = require("express");
const { updateMany } = require("../models/users");
var router = express.Router();

var userModel = require("../models/users");
var uid2 = require("uid2");
var bcrypt = require("bcrypt");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/sign-up-nurse", async function (req, res, next) {
  var error = [];
  var result = false;
  var saveUser = null;
  var token = null;

  const data = await userModel.findOne({
    email: req.body.emailFromFront,
  });

  if (data != null) {
    error.push("utilisateur déjà présent");
  }

  if (
    req.body.lastnameFromFront == "" ||
    req.body.firstnameFromFront == "" ||
    req.body.emailFromFront == "" ||
    req.body.phoneFromFront == "" ||
    req.body.passwordFromFront == ""
  ) {
    error.push("champs vides");
  }

  if (error.length == 0) {
    var hash = bcrypt.hashSync(req.body.passwordFromFront, 10);
    var newUser = new userModel({
      lastname: req.body.lastnameFromFront,
      firstname: req.body.firstnameFromFront,
      email: req.body.emailFromFront,
      phone: req.body.phoneFromFront,
      role: "soignant",
      password: hash,
      token: uid2(32),
      date_inscrit: new Date(),
    });

    saveUser = await newUser.save();

    if (saveUser) {
      result = true;
      token = saveUser.token;
    }
  }

  res.json({ result, saveUser, error, token });
});

router.post("/sign-up-ambulance", async function (req, res, next) {
  var error = [];
  var result = false;
  var saveUser = null;
  var token = null;

  const data = await userModel.findOne({
    email: req.body.emailFromFront,
  });

  if (data != null) {
    error.push("utilisateur déjà présent");
  }

  if (
    req.body.nomEntrepriseFromFront == "" ||
    req.body.siretFromFront == "" ||
    req.body.emailFromFront == "" ||
    req.body.phoneFromFront == "" ||
    req.body.passwordFromFront == ""
  ) {
    error.push("champs vides");
  }

  if (error.length == 0) {
    var hash = bcrypt.hashSync(req.body.passwordFromFront, 10);
    var newUser = new userModel({
      nomEntreprise: req.body.nomEntrepriseFromFront,
      siret: req.body.siretFromFront,
      email: req.body.emailFromFront,
      phone: req.body.phoneFromFront,
      role: "ambulance",
      password: hash,
      token: uid2(32),
      date_inscrit: new Date(),
    });

    saveUser = await newUser.save();

    if (saveUser) {
      result = true;
      token = saveUser.token;
    }
  }

  res.json({ result, saveUser, error, token });
});

<<<<<<< HEAD
//----------------------------------------
//          UPDATE         |
//----------------------------------------

router.post('/update', async (req, res, next) =>{
  let userFind = await userModel.findOne({
    email: req.body.email,
  })

  for (let i = 0; i < userFind.length; i++) {
    

    await userModel.updateOne({
      token: userModel[i].token,},
      {
      lastname: userModel[i].lastname,
      firstname: userModel[i].firstname,
      email: userModel[i].email,
      avatar: userModel[i].avatar,
      adresse: [AddressSchema],
      password: userModel[i].password,
      phone: userModel[i].phone,
      nomEntreprise: userModel[i].nomEntreprise,
      siret: userModel[i].siret,
    }
    );

  }

  res.json({result});

});


=======
>>>>>>> armand
module.exports = router;
