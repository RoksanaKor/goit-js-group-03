import _ from 'lodash';
import Notiflix from 'notiflix';

const addToWatched = document.querySelector('#watched-btn');
const addToQueue = document.querySelector('#queue-btn');

const movieData = {
  watchedMovies: [],
  queueMovies: [],
};

const saveData = movieData => {
  try {
    const stringedData = JSON.stringify(movieData);
    localStorage.setItem('data-movies', stringedData);
  } catch (error) {
    console.log('stringed-data error: ' + error);
  }
};

addToWatched.addEventListener('click', event => onClickWatched(event));
addToQueue.addEventListener('click', event => onClickQueue(event));

function onClickWatched(event) {
  console.log(event.target);
  const movieInfo = {
    id: `${event.target.dataset.id}`,
    overview: `${event.target.dataset.overview}`,
    info: `${event.target.dataset.toparse}`,
  };
  console.log(movieInfo);
  const movieInfoInfoObject = JSON.parse(movieInfo.info);
  console.log(movieInfoInfoObject);
  const stringedMovieInfo = JSON.stringify(movieInfo);
  if (movieData.watchedMovies.indexOf(stringedMovieInfo) === -1) {
    movieData.watchedMovies.push(stringedMovieInfo);
  } else {
    Notiflix.Notify.failure('You already added this movie to watchlist');
  }
  removeFromQueue(stringedMovieInfo);
  saveData(movieData);
}
let movieInfoExport;
const movieInfoInfoObjectExport = JSON.parse(movieInfoExport.info);

function onClickQueue(event) {
  const movieInfo = {
    id: `${event.target.dataset.id}`,
    overview: `${event.target.dataset.overview}`,
    info: `${event.target.dataset.toparse}`,
  };
  movieInfoExport = movieInfo;
  const stringedMovieInfo = JSON.stringify(movieInfo);
  if (movieData.queueMovies.indexOf(stringedMovieInfo) === -1) {
    movieData.queueMovies.push(stringedMovieInfo);
  } else {
    Notiflix.Notify.failure('You already added this movie to queue');
  }

  removeFromWatched(stringedMovieInfo);
  saveData(movieData);
}

function removeFromWatched(thisMovie) {
  const movieIndex = movieData.watchedMovies.findIndex(m => m === thisMovie);
  if (movieIndex !== -1) {
    movieData.watchedMovies.splice(movieIndex, 1);
  }
}

function removeFromQueue(thisMovie) {
  const movieIndex = movieData.queueMovies.findIndex(m => m === thisMovie);
  if (movieIndex !== -1) {
    movieData.queueMovies.splice(movieIndex, 1);
  }
}

try {
  const parsedData = JSON.parse(localStorage.getItem('data-movies'));
  if (parsedData.watchedMovies != [] || parsedData.queueMovies != []) {
    movieData.watchedMovies = parsedData.watchedMovies;
    movieData.queueMovies = parsedData.queueMovies;
  }
} catch (error) {
  console.log('parsedData error: ' + error);
}

export { movieInfoExport, movieInfoInfoObjectExport };
