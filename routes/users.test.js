var app = require("../app")
var request = require("supertest")

test("Signup - Body correct", async (done) => {
  await request(app).post('/users/sign-up-nurse')
    .send({ lastname: "Jean", firstname: 'Jean', email: 'jean@jean.fr', phone: '0678756453', role: "soignant", password: 'test',})
    .expect(200)
    .expect({
      result: false,
      saveUser: null,
      error: [ 'utilisateur déjà présent' ],
      token: null
    })
  done();
 });


 test("Validation transport - Status dispo", async (done) => {
  await request(app).get('/transport-validation')
    .query({status : 'dispo'})
    .expect(200)
    .expect({
      result: 'dispo'
    })
  done();
 });

test("Booking - Body correct", async (done) => {
  await request(app).post('/booking')
    .send({
      departureLocation: "Hôpital de grenoble",
      
        address: "33 rue de Grenoble",
        postalCode: "38000",
        city: "Grenoble",
        latitude: "47.345678",
        longitude: "2.3456789",
      
      arrivalLocation: "Hôpital Edouard Herriot",
      
        address: "5 place d'Arsonval",
        postalCode: "69003",
        city: "Lyon",
        latitude: "43.6785",
        longitude: "1.457",
      
      type: true, // true = ambulance / false = VSL
      message: "oui",
      status: "dispo", // dispo, encours, cloturé
      patient: {
        lastname: "Jean",
        firstname: "Michel",
        sexe: "Masculin",
        secu: "123456789",
      },
    })
    .expect(200)
    .expect({
      result: true,
      error: []
    });
  done();
});