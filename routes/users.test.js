var app = require("../app")
var request = require("supertest")

test("Test - Body correct", async (done) => {
  await request(app).post('/test')
    .send({ name : "Jean"})
    .expect(200)
    .expect({ result : "Jean"});
  done();
 });
