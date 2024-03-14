// dodać warunek sprawdzający, czy użytkownik nie wpisał tylko spacji
// paginacja

import axios from 'axios';

const searchForm = document.querySelector('#search-form');
const searchInput = searchForm.querySelector('.search-input');
const errorDisplay = document.querySelector('.errorDisplay');
const gallery = document.querySelector('#gallery');

const API_KEY = '220ce7017a970ee5aafe37264f861af2';

// zapytanie do API

searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  const searchQuery = searchInput.value.trim();
  // console.log(searchQuery);
  if (searchQuery) {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`);
        // console.log(response.data.results);
        if (response.data.results.length === 0) {
            errorDisplay.classList.remove('hidden');
            gallery.innerHTML = '';
        } else {
            displayMovies(response.data.results);
            errorDisplay.classList.add('hidden');
        }
    } catch (error) {
      console.error('Something went wrong:', error);
      errorDisplay.classList.remove('hidden');
    }
  } else {
    errorDisplay.classList.remove('hidden');
  }
});

// funkcja generowania galerii

function displayMovies(movies) {
  gallery.innerHTML = '';
  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-item');
      const roundedVoteAverage = movie.vote_average.toFixed(1);
      const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://http.cat/status/404/500x750?text=No+Image+Available';
      movieElement.innerHTML = `
        <div class="movie-card-template">
        <button type="button" class="movie-image">
          <img class='movie-poster'src="${posterUrl}" alt="${movie.title}" />
        </button>
        <div class='movie-details'>
          <h3 class='movie-title'>${movie.title}</h3>
          <p class='movie-details'>${movie.genre_ids.map(id => getGenreName(id)).join(', ')} | ${movie.release_date.substring(0, 4)} <span class="vote-average">${roundedVoteAverage}</span></p>
        </div>
      </div>
        `;
        gallery.appendChild(movieElement);
      });
}

// funkcja generowania nazwy gatunku na podstawie jego id

function getGenreName(genreId) {
      const genres = {
    "28": "Action",
    "12": "Adventure",
    "16": "Animation",
    "35": "Comedy",
    "80": "Crime",
    "99": "Documentary",
    "18": "Drama",
    "10751": "Family",
    "14": "Fantasy",
    "36": "History",
    "27": "Horror",
    "10402": "Music",
    "9648": "Mystery",
    "10749": "Romance",
    "878": "Science Fiction",
    "10770": "TV Movie",
    "53": "Thriller",
    "10752": "War",
    "37": "Western"
  };
      return genres[genreId] || 'Unknown';
    }
