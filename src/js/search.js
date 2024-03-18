// dodać warunek sprawdzający, czy użytkownik nie wpisał tylko spacji
// paginacja

import axios from 'axios';

const searchForm = document.querySelector('#search-form');
const searchInput = searchForm.querySelector('.search-input');
const errorDisplay = document.querySelector('.errorDisplay');
const gallery = document.querySelector('#gallery');
const nextButton = document.querySelector('.pagination-page-button.right');
const prevButton = document.querySelector('.pagination-page-button.left');

const API_KEY = '220ce7017a970ee5aafe37264f861af2';

// zapytanie do API

let currentPage = 1;
let totalPages = 1;

searchForm.addEventListener('submit', async function searchMovie(event) {
  event.preventDefault();
  currentPage = 1;
  await fetchMovies();
});

async function fetchMovies() {
  const searchQuery = searchInput.value.trim();
  if (searchQuery) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${currentPage}`,
      );
      totalPages = response.data.total_pages;
      if (response.data.results.length === 0) {
        errorDisplay.classList.remove('hidden');
        gallery.innerHTML = '';
      } else {
        displayMovies(response.data.results);
        errorDisplay.classList.add('hidden');
        renderPaginationButtons();
      }
    } catch (error) {
      console.error('Something went wrong:', error);
      errorDisplay.classList.remove('hidden');
    }
  } else {
    errorDisplay.classList.remove('hidden');
  }
}

// funkcja generowania galerii

function displayMovies(movies) {
  gallery.innerHTML = '';
  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-item');
    const roundedVoteAverage = movie.vote_average.toFixed(1);
    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'https://ih1.redbubble.net/image.272276159.9910/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg';
    movieElement.innerHTML = `
      <div class="movie-card-template">
        <button type="button" class="movie-image">
          <img class='movie-poster'src="${posterUrl}" alt="${movie.title}" />
        </button>
        <div class='movie-details'>
          <h3 class='movie-title'>${movie.title}</h3>
          <p class='movie-details'>${movie.genre_ids
            .map(id => getGenreName(id))
            .join(', ')} | ${movie.release_date.substring(
      0,
      4,
    )} <span class="vote-average">${roundedVoteAverage}</span></p>
        </div>
      </div>
    `;
    gallery.appendChild(movieElement);
  });
}

// funkcja generowania nazwy gatunku na podstawie jego id

function getGenreName(genreId) {
  const genres = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };
  return genres[genreId] || 'Unknown';
}

// PAGINACJA

// Przycisk kolejna strona
nextButton.addEventListener('click', async function loadNextPage() {
  currentPage++;
  await fetchMovies();
  await scrollToTop();
});

// Przycisk poprzednia strona
prevButton.addEventListener('click', async function loadPrevPage() {
  currentPage--;
  await fetchMovies();
  await scrollToTop();
});

// funkcja renderowania przycisków paginacji

function renderPaginationButtons() {
  const paginationContainer = document.querySelector('.pagination-slider-buttons-container');
  paginationContainer.innerHTML = '';

  if (currentPage === 1) {
    prevButton.classList.add('hidden'); // Wyłącza przycisk "poprzednia strona", gdy wyświetlana jest 1 strona
  } else {
    prevButton.classList.remove('hidden'); // Włącz przycisk "poprzednia strona", gdy wyświetlana jest strona inna niż 1
  }

  if (currentPage === totalPages) {
    nextButton.classList.add('hidden'); // Wyłącza przycisk "następna strona", gdy wyświetlana jest ostatnia strona
  } else {
    nextButton.classList.remove('hidden'); // Włącza przycisk "następna strona", gdy wyświetlana jest strona inna niż ostatnia
  }

  // Przycisk pierwszej strony
  const firstPageButton = document.createElement('button');
  firstPageButton.textContent = '1';
  firstPageButton.classList.add('pagination-page-button');
  firstPageButton.addEventListener('click', async function () {
    currentPage = 1;
    await fetchMovies();
    await scrollToTop();
  });
  paginationContainer.appendChild(firstPageButton);

  // Dodanie '...' za przyciskiem pierwszej strony (jeśli potrzebne)
  if (currentPage > 3) {
    const emptyButton = document.createElement('button');
    emptyButton.classList.add('empty-button');
    emptyButton.textContent = '...';
    emptyButton.disabled = true;
    paginationContainer.appendChild(emptyButton);
  }

  // Dodanie max 5 przycisków z numerem strony w centralnej części kontenera
  for (let i = currentPage - 2; i <= currentPage + 2 && i <= totalPages; i++) {
    if (i > 1 && i < totalPages) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.classList.add('pagination-page-button');
      pageButton.addEventListener('click', async function () {
        currentPage = i;
        await fetchMovies();
        await scrollToTop();
      });
      paginationContainer.appendChild(pageButton);
    }
  }

  // Dodanie '...' przed ostatnią stroną
  if (currentPage + 1 < totalPages) {
    const emptyButton = document.createElement('button');
    emptyButton.classList.add('empty-button');
    emptyButton.textContent = '...';
    emptyButton.disabled = true;
    paginationContainer.appendChild(emptyButton);
  }

  // Przycisk ostatnia strona
  const lastPageButton = document.createElement('button');
  lastPageButton.textContent = totalPages;
  lastPageButton.classList.add('pagination-page-button');
  lastPageButton.addEventListener('click', async function () {
    currentPage = totalPages;
    await fetchMovies();
    await crollToTop();
  });
  paginationContainer.appendChild(lastPageButton);
}

// Funkcja przewijania na górę strony
async function scrollToTop() {
  await window.scrollTo({
    top: 0,
    behavior: 'auto',
  });
}
