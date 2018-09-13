const Review = require('../models/review');
const Comment = require('../models/comment');

module.exports = (app) => {
  // app.get('/', (req, res) => {
  //   Review.find()
  //     .then((reviews) => {
  //       res.render('reviews-index', { reviews });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // });

  // NEW
  app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
  });

  // CREATE
  app.post('/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
      console.log(review);
      res.redirect(`/reviews/${review._id}`);
    }).catch((err) => {
      console.log(err.message);
    });
  });

  // SHOW
  app.get('/reviews/:id', (req, res) => {
    // Find review
    Review.findById(req.params.id).then((review) => {
      // Fetch the comments of review
      Comment.find({ reviewId: req.params.id }).then((comments) => {
        res.render('reviews-show', { review, comments });
      });
    }).catch((err) => {
      console.log(err.message);
    });
  });

  // EDIT
  app.get('/reviews/:id/edit', (req, res) => {
    Review.findById(req.params.id, (err, review) => {
      res.render('reviews-edit', { review });
    });
  });

  // UPDATE
  app.put('/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
      .then((review) => {
        res.redirect(`/reviews/${review._id}`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  // DELETE
  app.delete('/reviews/:id', (req, res) => {
    Review.findByIdAndRemove(req.params.id).then(() => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message);
    });
  });
};
