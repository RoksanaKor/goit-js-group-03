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

function onClickQueue(event) {
  const movieInfo = {
    id: `${event.target.dataset.id}`,
    overview: `${event.target.dataset.overview}`,
    info: `${event.target.dataset.toparse}`,
  };
  const movieInfoInfoObject = JSON.parse(movieInfo.info);
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

// function fetchMovieWatched(generalinfo, details) {
//   const movieElement = document.createElement('div');
//   movieElement.classList.add('movie-item');
//   movieElement.innerHTML = `
//     <div class="movie-card-template" data-movie-id="${generalinfo.id}">
//       <img class='movie-poster' src="${details.poster}" alt="${details.title}" data-id="${generalinfo.id}"   data-value='{"title": "${details.title}", "popularity": "${details.popularity}", "poster": "${details.poster}", "votes": "${details.votes}", "genre": "${details.genre}"}' data-overview="${generalinfo.overview}"/>

//       <div class='movie-details'>
//         <h3 class='movie-title'>${details.title}</h3>
//         <p class='movie-details'>${details.genre} | ${details.releasedate} <span class="vote-average">${details.voteaverage}</span></p>
//       </div>
//     </div>
//   `;
//   console.log(movieElement);
//   // libraryGallery.insertAdjacentElement('beforeend', movieElement);
// }
