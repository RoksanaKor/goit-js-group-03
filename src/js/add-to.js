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

// const throttleSave = _.throttle(saveData, 500);

try {
  const stringedData = JSON.stringify(movieData);
  localStorage.setItem('data-movies', stringedData);
} catch (error) {
  console.log('stringed-data error: ' + error);
}

addToWatched.addEventListener('click', onClickWatched);
addToQueue.addEventListener('click', onClickQueue);

function onClickWatched() {
  if (movieData.watchedMovies.indexOf('movie-id') === -1) {
    movieData.watchedMovies.push('movie-id');
  } else {
    Notiflix.Notify.failure('You already added this movie to watchlist');
  }
  saveData(movieData);
  console.log(movieData);
}

function onClickQueue() {
  if (movieData.queueMovies.indexOf('movie-id') === -1) {
    movieData.queueMovies.push('movie-id');
  } else {
    Notiflix.Notify.failure('You already added this movie to queue');
  }
  saveData(movieData);
  console.log(movieData);
}
