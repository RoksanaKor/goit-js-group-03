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

try {
  const stringedData = JSON.stringify(movieData);
  localStorage.setItem('data-movies', stringedData);
} catch (error) {
  console.log('stringed-data error: ' + error);
}

addToWatched.addEventListener('click', event => onClickWatched(event));
addToQueue.addEventListener('click', event => onClickQueue(event));

function onClickWatched(event) {
  const movieInfo = {
    id: `${event.target.dataset.id}`,
    overview: `${event.target.dataset.overview}`,
    info: `${event.target.dataset.toparse}`,
  };
  const stringedMovieInfo = JSON.stringify(movieInfo);
  if (movieData.watchedMovies.indexOf(stringedMovieInfo) === -1) {
    movieData.watchedMovies.push(stringedMovieInfo);
  } else {
    Notiflix.Notify.failure('You already added this movie to watchlist');
  }
  // removeFromQueue(movie);
  removeFromQueue(stringedMovieInfo);
  saveData(movieData);
}

function onClickQueue(event) {
  const movieInfo = {
    id: `${event.target.dataset.id}`,
    overview: `${event.target.dataset.overview}`,
    info: `${event.target.dataset.toparse}`,
  };
  const stringedMovieInfo = JSON.stringify(movieInfo);
  if (movieData.queueMovies.indexOf(stringedMovieInfo) === -1) {
    movieData.queueMovies.push(stringedMovieInfo);
  } else {
    Notiflix.Notify.failure('You already added this movie to queue');
  }
  // removeFromWatched(movie);
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
