const express = require('express');
const app = express();

const exphbs = require('express-handlebars');

const bodyParser = require('body-parser');

const methodOverride = require('method-override');

const reviews = require('./controllers/reviews.js');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

reviews(app);
app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
