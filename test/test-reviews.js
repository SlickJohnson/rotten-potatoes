const chai = require('chai');

const chaiHttp = require('chai-http');

const app = require('../app');

const should = chai.should();

const Review = require('../models/review');

chai.use(chaiHttp);

const sampleReview = {
  title: 'Super Sweet Review',
  'movie-title': 'La La Land',
  description: 'A great review of a lovely movie.',
};

describe('Reviews', () => {
  after(() => {
    Review.deleteMany({ title: 'Super Sweet Review'} ).exec((err, reviews) => {
      console.log(reviews);
      reviews.remove();
    });
  });
  // TEST INDEX
  it('should index ALL reviews on / GET', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });

  // TEST NEW
  it('should display new form on /reviews/new GET', (done) => {
    chai.request(app)
      .get('/reviews/new')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
  // TEST CREATE
  it('should create a SINGLE review on /reviews POST', (done) => {
    chai.request(app)
      .post('/reviews')
      .send(sampleReview)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });

  // TEST SHOW
  it('should show a SINGLE review on /reviews/<id> GET', (done) => {
    const review = new Review(sampleReview);
    review.save((err, data) => {
      chai.request(app)
        .get(`/reviews/${data._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
    });
  });

  // TEST EDIT
  it('should edit a SINGLE review on /reviews/<id>/edit GET', (done) => {
    const review = new Review(sampleReview);
    review.save((err, data) => {
      chai.request(app)
        .get(`/reviews/${data._id}/edit`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
    });
  });

  // TEST UPDATE
  it('should update a SINGLE review on /reviews/<id> PUT', (done) => {
    const review = new Review(sampleReview);
    review.save((err, data) => {
      chai.request(app)
        .put(`/reviews/${data._id}?_method=PUT`)
        .send({ 'title': 'Updating the title' })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
    });
  });

  // TEST DELETE
  it('should delete a SINGLE review on /reviews/<id> DELETE', (done) => {
    const review = new Review(sampleReview);
    review.save((err, data) => {
      chai.request(app)
        .delete(`/reviews/${data._id}?_method=DELETE`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
    });
  });
});
