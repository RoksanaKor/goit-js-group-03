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

addToWatched.addEventListener('click', onClickWatched);
addToQueue.addEventListener('click', onClickQueue);

function onClickWatched() {
  // const movieIndex = movieData.watchedMovies.findIndex(m => m.id === movie.id);
  if (movieData.watchedMovies.indexOf('movie-id') === -1) {
    movieData.watchedMovies.push('movie-id');
  } else {
    Notiflix.Notify.failure('You already added this movie to watchlist');
  }
  // removeFromQueue(movie);
  removeFromQueue();
  saveData(movieData);
}

function onClickQueue() {
  // const movieIndex = movieData.queueMovies.findIndex(m => m.id === movie.id);
  if (movieData.queueMovies.indexOf('movie-id') === -1) {
    movieData.queueMovies.push('movie-id');
  } else {
    Notiflix.Notify.failure('You already added this movie to queue');
  }
  // removeFromWatched(movie);
  removeFromWatched();
  saveData(movieData);
}

// function removeFromWatched(movie) {
//   const movieIndex = movieData.watchedMovies.findIndex(m => m.id === movie.id);
//   movieData.watchedMovies.splice(movieIndex, 1);
// }

// function removeFromQueue(movie) {
//   const movieIndex = movieData.queueMovies.findIndex(m => m.id === movie.id);
//   movieData.queueMovies.splice(movieIndex, 1);
// }

function removeFromWatched() {
  const movieIndex = movieData.watchedMovies.findIndex(m => m === 'movie-id');
  movieData.watchedMovies.splice(movieIndex, 1);
}

function removeFromQueue() {
  const movieIndex = movieData.queueMovies.findIndex(m => m === 'movie-id');
  movieData.queueMovies.splice(movieIndex, 1);
}
