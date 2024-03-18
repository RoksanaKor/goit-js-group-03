import _ from 'lodash';
import Notiflix from 'notiflix';

const addToWatched = document.querySelector('#watched-btn');
const addToQueue = document.querySelector('#queue-btn');
const libraryGallery = document.querySelector('.container#library-gallery');

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
  removeFromQueue(stringedMovieInfo);
  saveData(movieData);
  displayMovies(libraryGallery);
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

  removeFromWatched(stringedMovieInfo);
  saveData(movieData);
  displayMovies(movies);
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

function displayMovies(gallery) {
  gallery.innerHTML = '';
  
  const movieElement = document.createElement('div');
  movieElement.classList.add('movie-item');
  movieElement.innerHTML = `
    <div class="movie-card-template" data-movie-id="${movie.id}">
      <img class='movie-poster' src="${movie.info.poster}" alt="${movie.title}" data-id="${movie.id}"   data-value='{"title": "${movie.title}", "popularity": "${movie.info.popularity}", "poster": "${movie.info.poster}", "votes": "${movie.info.votes}", "genre": "${movie.info.genre}"}' data-overview="${movie.overview}"/>
      
      <div class='movie-details'>
        <h3 class='movie-title'>${movie.title}</h3>
        <p class='movie-details'>${movie.info.genre} | ${movie.info.releasedate} <span class="vote-average">${movie.info.voteaverage}</span></p>
      </div>
    </div>
  `;
  gallery.innerHTML += movieElement;
  }
}
