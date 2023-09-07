const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

// Assertion style (means how you want to write your test)
// expect, should, assert
// expect - recommended
// should - not recommended
// assert - not recommended
const expect = chai.expect;

// Middleware for chai to make http requests to the backend server
chai.use(chaiHttp);

describe("Books API", function () {
  it("should return all books", function (done) {
    chai
      .request(app)
      .get("/books")
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("should add a new book", function (done) {
    chai
      .request(app)
      .post("/books")
      .send({
        title: "Test Book",
        author: "Test Author",
        year: 2021,
      })
      .end(function (err, res) {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body.title).to.equal("Test Book");
        expect(res.body.author).to.equal("Test Author");
        expect(res.body.publishYear).to.equal(2021);
        done();
      });
  });

  it("should update a book", function (done) {
    chai
      .request(app)
      .put("/books/60a8b2a5c9e2b93c5c6c9e2a")
      .send({
        title: "Updated Test Book",
      })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.title).to.equal("Updated Test Book");
        done();
      });
  });

  it("should delete a book", function (done) {
    chai
      .request(app)
      .delete("/books/60a8b2a5c9e2b93c5c6c9e2a")
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should return a 404 for a non-existent route", function (done) {
    chai
      .request(app)
      .get("/books/60a8b2a5c9e2b93c5c6c9e2a")
      .end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
  });

  it("should return a 404 for a non-existent book", function (done) {
    chai
      .request(app)
      .get("/books/60a8b2a5c9e2b93c5c6c9e2a")
      .end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
  });

  it("should return a 400 for a book with missing fields", function (done) {
    chai
      .request(app)
      .post("/books")
      .send({
        title: "Test Book",
      })
      .end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });

    chai
      .request(app)
      .put("/books/60a8b2a5c9e2b93c5c6c9e2a")
      .send({
        title: "Test Book",
      })
      .end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });
});
