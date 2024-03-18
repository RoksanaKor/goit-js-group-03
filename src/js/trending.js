import axios from 'axios';

const nextButton = document.querySelector('.pagination-page-button.right');
const prevButton = document.querySelector('.pagination-page-button.left');

const apiKey = '50161d05178dfdcf85b00929de7fbb36';
const language = 'en-US';
let pageNum = 1;
let totalPages = 1;

const fetchData = async () => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
      params: { api_key: apiKey, language: language, page: pageNum },
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + apiKey,
      },
    });

    const database = response.data.results;
    const gallery = document.querySelector('.container#gallery');
    totalPages = 20; // Ustawienie całkowitej liczby stron
    displayMovies(database, gallery);
    renderPaginationButtons(); // Wywołanie funkcji renderującej przyciski paginacji
  } catch (error) {
    console.error(error);
  }
};

const displayMovies = (movies, container) => {
  container.innerHTML = '';
  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-item');
    const roundedVoteAverage = movie.vote_average.toFixed(1);
    const genre = movie.genre_ids.map(id => getGenreName(id)).join(', ');
    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'https://http.cat/status/404/500x750?text=No+Image+Available';
    movieElement.innerHTML = `
      <div class="movie-card-template" data-movie-id="${movie.id}">
        <img class='movie-poster' src="${posterUrl}" alt="${movie.title.toUpperCase()}" data-value='{"title": "${movie.title.toUpperCase()}", "popularity": "${movie.popularity.toFixed(
      1,
    )}", "poster": "${posterUrl}", "votes": "${roundedVoteAverage} / ${
      movie.vote_count
    }", "genre": "${genre}"}' data-overview="${movie.overview}"/>
        
        <div class='movie-details'>
          <h3 class='movie-title'>${movie.title}</h3>
          <p class='movie-details'>${genre} | ${movie.release_date.substring(
      0,
      4,
    )} <span class="vote-average">${roundedVoteAverage}</span></p>
        </div>
      </div>
    `;
    container.appendChild(movieElement);
  });
};

const getGenreName = genreId => {
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
};

// PAGINACJA

// Przycisk kolejna strona
nextButton.addEventListener('click', async function loadNextPage() {
  pageNum++;
  await fetchData();
  await scrollToTop();
});

// Przycisk poprzednia strona
prevButton.addEventListener('click', async function loadPrevPage() {
  pageNum--;
  await fetchData();
  await scrollToTop();
});

// Funkcja renderowania przycisków paginacji
function renderPaginationButtons() {
  const paginationContainer = document.querySelector('.pagination-slider-buttons-container');
  paginationContainer.innerHTML = '';

  if (pageNum === 1) {
    prevButton.classList.add('hidden'); // Wyłącza przycisk "poprzednia strona", gdy wyświetlana jest 1 strona
  } else {
    prevButton.classList.remove('hidden'); // Włącz przycisk "poprzednia strona", gdy wyświetlana jest strona inna niż 1
  }

  if (pageNum === totalPages) {
    nextButton.classList.add('hidden'); // Wyłącza przycisk "następna strona", gdy wyświetlana jest ostatnia strona
  } else {
    nextButton.classList.remove('hidden') // Włącza przycisk "następna strona", gdy wyświetlana jest strona inna niż ostatnia
  }

  // Przycisk pierwszej strony
  const firstPageButton = document.createElement('button');
  firstPageButton.textContent = '1';
  firstPageButton.classList.add('pagination-page-button');
  firstPageButton.addEventListener('click', async function () {
    pageNum = 1;
    await fetchData();
    await scrollToTop();
  });
  paginationContainer.appendChild(firstPageButton);

  // Dodanie '...' za przyciskiem pierwszej strony (jeśli potrzebne)
  if (pageNum > 3) {
    const emptyButton = document.createElement('button');
    emptyButton.classList.add('empty-button');
    emptyButton.textContent = '...';
    emptyButton.disabled = true;
    paginationContainer.appendChild(emptyButton);
  }

  // Dodanie max 5 przycisków z numerem strony w centralnej części kontenera
  for (let i = pageNum - 2; i <= pageNum + 2 && i <= totalPages; i++) {
    if (i > 1 && i < totalPages) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.classList.add('pagination-page-button');
      pageButton.addEventListener('click', async function () {
        pageNum = i;
        await fetchData();
        await scrollToTop();
      });

    if (pageNum === i) {
        pageButton.classList.add('current-page');
      }

      paginationContainer.appendChild(pageButton);
    }
  }

  // Dodanie '...' przed ostatnią stroną
  if (pageNum + 1 < totalPages) {
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
    pageNum = totalPages;
    await fetchData();
    await scrollToTop();
  });
  paginationContainer.appendChild(lastPageButton);
}

// Funkcja przewijania na górę strony
async function scrollToTop() {
  await window.scrollTo({
    top: 0,
    behavior: 'auto' 
  });
}

fetchData();