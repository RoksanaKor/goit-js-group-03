import {} from './goit-modal.js';
import {} from './goit-modal-gallery.js';
import { onClickQueue, onClickWatched } from './add-to.js';

const libraryGallery = document.querySelector('.container#library-gallery');
const myLibraryButton = document.querySelector('#myLibrarySwitch');
const watchedButton = document.querySelector('.library-btn-watched');
const queueButton = document.querySelector('.library-btn-queue');

const dataMovies = localStorage.getItem('data-movies');
const dataMoviesParsed = JSON.parse(dataMovies);
const watchedArray = dataMoviesParsed.watchedMovies;
const queueArray = dataMoviesParsed.queueMovies;

// myLibraryButton.addEventListener('click', event => {
//   event.preventDefault();
//   saveData;
// });

// function displayMovies(movies) {
//   libraryGallery.innerHTML = '';
//   for (const movie of movies) {
//     const infoObject = JSON.parse(movie.info);
//     movie.info = infoObject;
//     const movieElement = document.createElement('div');
//     movieElement.classList.add('movie-item');
//     movieElement.innerHTML = `
//       <div class="movie-card-template" data-movie-id="${movie.id}">
//         <img class='movie-poster' src="${movie.info.poster}" alt="${movie.title}" data-id="${movie.id}"   data-value='{"title": "${movie.title}", "popularity": "${movie.info.popularity}", "poster": "${movie.info.poster}", "votes": "${movie.info.votes}", "genre": "${movie.info.genre}"}' data-overview="${movie.overview}"/>

//         <div class='movie-details'>
//           <h3 class='movie-title'>${movie.title}</h3>
//           <p class='movie-details'>${movie.info.genre} | ${movie.info.releasedate} <span class="vote-average">${movie.info.voteaverage}</span></p>
//         </div>
//       </div>
//     `;
//     libraryGallery.appendChild(movieElement);
//   }
// }

fetchMovieWatched(movieInfoExport, movieInfoInfoObjectExport, libraryGallery);

function fetchMovieWatched(generalinfo, details, gallery) {
  const movieElement = document.createElement('div');
  movieElement.classList.add('movie-item');
  movieElement.innerHTML = `
    <div class="movie-card-template" data-movie-id="${generalinfo.id}">
      <img class='movie-poster' src="${details.poster}" alt="${details.title}" data-id="${generalinfo.id}"   data-value='{"title": "${details.title}", "popularity": "${details.popularity}", "poster": "${details.poster}", "votes": "${details.votes}", "genre": "${details.genre}"}' data-overview="${generalinfo.overview}"/>

      <div class='movie-details'>
        <h3 class='movie-title'>${details.title}</h3>
        <p class='movie-details'>${details.genre} | ${details.releasedate} <span class="vote-average">${details.voteaverage}</span></p>
      </div>
    </div>
  `;
  console.log(movieElement);
  gallery.insertAdjacentElement('beforeend', movieElement);
}
