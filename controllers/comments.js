const Comment = require('../models/comment');

module.exports = (app) => {
  // CREATE comment
  app.post('/reviews/comments', (req, res) => {
    Comment.create(req.body).then((comment) => {
      console.log(comment);
      res.redirect(`/reviews/${comment.reviewId}`);
    }).catch((err) => {
      console.log(err.message);
    });
  });

  // DELETE
  app.delete('/reviews/comments/:id', (req, res) => {
    console.log('DELETE comment');
    Comment.findByIdAndRemove(req.params.id).then((comment) => {
      res.redirect(`/reviews/${comment.reviewId}`);
    }).catch((err) => {
      console.log(err.message);
    });
  });
};
