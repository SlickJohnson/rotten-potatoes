const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes');

const exphbs = require('express-handlebars');

const bodyParser = require('body-parser');

const Review = mongoose.model('Review', {
  title: String
});
//
// let reviews = [
//   { title: "Greate Review" },
//   { title: "Next Review" },
// ]

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reveiws: reviews });
    })
    .catch(err => {
      console.log(err);
    });
});

// NEW
app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
});

// CREATE
app.post('/reviews', (req, res) => {
  console.log(req.body);
})
