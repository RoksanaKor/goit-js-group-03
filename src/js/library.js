import {} from './goit-modal.js';
import {} from './goit-modal-gallery.js';

const libraryGallery = document.querySelector('.container#library-gallery');
const myLibraryButton = document.querySelector('#myLibrarySwitch');
const watchedButton = document.querySelector('.library-btn-watched');
const queueButton = document.querySelector('.library-btn-queue');

const movieLibraryData = localStorage.getItem('data-movies');
const movieDataObject = JSON.parse(movieLibraryData);
const movieWatchedArray = movieDataObject.watchedMovies;
const movieQueueArray = movieDataObject.queueMovies;

myLibraryButton.addEventListener('click', event => {
  event.preventDefault();
  displayMovies(movieWatchedArray);
});

function displayMovies(movies) {
  libraryGallery.innerHTML = '';
  for (const movie of movies) {
    const infoObject = JSON.parse(movie.info);
    movie.info = infoObject;
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
    libraryGallery.appendChild(movieElement);
  }
}
