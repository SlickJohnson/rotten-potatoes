const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb('fe65cf132786c888aae3b54309b7369d');

module.exports = (app) => {
  app.get('/', (req, res) => {
    moviedb.miscNowPlayingMovies().then((response) => {
      res.render('movies-index', { movies: response.results });
    }).catch((err) => {
      console.log(err.message);
    });
  });

  app.get('/movies/:id', (req, res) => {
    moviedb.movieInfo({ id: req.params.id }).then((movie) => {
      if (movie.video) {
        moviedb.movieVides({ id: req.params.id }).then((videos) => {
          movie.trailer_youtube_id = videos.results[0].key;
          renderTemplate(movie);
        });
      } else {
        renderTemplate(movie);
      }

      function renderTemplate(movie) {
        res.render('movies-show', { movie });
      }
    }).catch((err) => {
      console.log(err.message);
    });
  });
};
