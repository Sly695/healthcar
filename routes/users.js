var express = require("express");
const { updateMany } = require("../models/users");
var router = express.Router();

var userModel = require("../models/users");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//----------------------------------------
//          EXEMPLE DE ROUTE             |
//----------------------------------------

router.post("/sign-up", async function (req, res, next) {
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
    req.body.usernameFromFront == "" ||
    req.body.emailFromFront == "" ||
    req.body.passwordFromFront == ""
  ) {
    error.push("champs vides");
  }

  if (error.length == 0) {
    var hash = bcrypt.hashSync(req.body.passwordFromFront, 10);
    var newUser = new userModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password: hash,
      token: uid2(32),
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
  var user = null;
  var error = [];
  var token = null;

  if (req.body.emailFromFront == "" || req.body.passwordFromFront == "") {
    error.push("champs vides");
  }

  if (error.length == 0) {
    const user = await userModel.findOne({
      email: req.body.emailFromFront,
    });

    if (user) {
      if (bcrypt.compareSync(req.body.passwordFromFront, user.password)) {
        result = true;
        token = user.token;
      } else {
        result = false;
        error.push("mot de passe incorrect");
      }
    } else {
      error.push("email incorrect");
    }
  }

  res.json({ result, user, error, token });
});

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


module.exports = router;
