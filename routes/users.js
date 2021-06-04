var express = require("express");
var router = express.Router();
var userModel = require("../models/users");
var uid2 = require("uid2");
var bcrypt = require("bcrypt");
var UserModel = require("../models/users");
var request = require("sync-request");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//----------------------------------------
//          SIGNUP/SIGNIN
//----------------------------------------

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

router.post("/sign-in", async function (req, res, next) {
  var result = false;

  var error = [];
  var token = null;
  var role;
  var id;
  var userData;

  if (req.body.email == "" || req.body.password == "") {
    error.push("champs vides");
  }

  if (error.length == 0) {
    const user = await UserModel.findOne({
      email: req.body.email,
    });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        result = true;
        token = user.token;
        role = user.role;
        iduser = user._id;
        userData = user;
      } else {
        result = false;
        error.push("mot de passe incorrect");
      }
    } else {
      error.push("email incorrect");
    }
  }

  res.json({ result, error, token, role, iduser, userData });
});

router.post("/sign-up-ambulance", async function (req, res, next) {
  var result = false;
  var error = [];
  var saveUser = null;
  var token = null;
  var address = req.body.addressFromFront;
  var postalCode = req.body.postalCodefromFront;
  var city = req.body.cityFromFront;

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
    req.body.passwordFromFront == "" ||
    req.body.addressFromFront == "" ||
    req.body.postalCodeFromFront == "" ||
    req.body.cityFromFront == ""
  ) {
    error.push("champs vides");
  }

  if (error.length == 0) {
    var dataAPI = request(
      "GET",
      `https://api.opencagedata.com/geocode/v1/json?q=${address},${postalCode} ${city}, France &key=e40b9c1452fe4b29997b6f91eb035202`
    );
    var dataAPIparsed = JSON.parse(dataAPI.body);

    var hash = bcrypt.hashSync(req.body.passwordFromFront, 10);
    var newUser = new userModel({
      nomEntreprise: req.body.nomEntrepriseFromFront,
      siret: req.body.siretFromFront,
      email: req.body.emailFromFront,
      phone: req.body.phoneFromFront,
      role: "ambulance",
      note: [],
      password: hash,
      token: uid2(32),
      date_inscrit: new Date(),
      adresse: {
        address: req.body.addressFromFront,
        postalCode: req.body.postalCodefromFront,
        city: req.body.cityFromFront,
        latitude: dataAPIparsed.results[0].geometry.lat,
        longitude: dataAPIparsed.results[0].geometry.lng,
      },
    });

    saveUser = await newUser.save();

    if (saveUser) {
      result = true;
      token = saveUser.token;
    }
  }

  res.json({ result, saveUser, error, token });
});

//----------------------------------------
//          UPDATE PROFIL  |
//----------------------------------------

// router.put("/update-profil-carestaff", async (req, res, next) => {
//   let token = "gx38g6PBoxyMMVn2sstOUQvlIj7iOGUr";

//   const userProfil = await userModel.updateOne(
//     {
//       token: token,
//     },
//     {
//       lastname: req.body.lastname,
//       firstname: req.body.firstname,
//       email: req.body.email,
//       avatar: req.body.avatar,
//       password: req.body.password,
//       phone: req.body.phone,
//       adresse: {
//         adresse: req.body.adresse,
//         postalCode: req.body.postalCode,
//         city: req.body.city,
//       },
//     }
//   );
//   res.json({ userProfil });
// });

router.put("/update-profil", async (req, res, next) => {
  const userProfil = await userModel.updateOne(
    {
      token: req.body.token,
    },
    {
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      monEntreprise: req.body.nomEntreprise,
      siret: req.body.siret,
      firstname: req.body.firstname,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      adresse: {
        adresse: req.body.adresse,
        postalCode: req.body.postalCode,
        city: req.body.city,
      },
    }
  );
  res.json({ userProfil });
});

//----------------------------------------------------------
//         Sélectionner dans la DB l'ambulancier qui est connecté
//----------------------------------------------------------
router.get("/user-list", async (req, res, next) => {
  let user = await userModel.findOne({ nomEntreprise: req.query.userData });
  res.json({ user });
});

module.exports = router;
