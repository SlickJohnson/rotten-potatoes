const Review = require('../models/review');
const Comment = require('../models/comment');

module.exports = (app) => {
  // NEW
  app.get('/movies/:movieId/reviews/new', (req, res) => {
    res.render('reviews-new', { movieId: req.params.movieId });
  });

  // CREATE
  app.post('/movies/:movieId/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
      console.log(review);
      res.redirect(`/movies/${req.params.movieId}`);
    }).catch((err) => {
      console.log(err.message);
    });
  });

  // SHOW
  app.get('/movies/:movieId/reviews/:id', (req, res) => {
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
  app.get('/movies/:movieId/reviews/:id/edit', (req, res) => {
    Review.findById(req.params.id, (err, review) => {
      res.render('reviews-edit', { review });
    });
  });

  // UPDATE
  app.put('/movies/:movieId/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
      .then((review) => {
        res.redirect(`/reviews/${review._id}`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  // DELETE
  app.delete('/movies/:movieId/reviews/:id', (req, res) => {
    Review.findByIdAndRemove(req.params.id).then(() => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message);
    });
  });
};
