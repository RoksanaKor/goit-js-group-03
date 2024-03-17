// API endpoint
const API_URL = 'https://api.themoviedb.org/3';
API_KEY = '220ce7017a970ee5aafe37264f861af2';

// Get DOM elements
const movieCardsSection = document.getElementById('movieCards');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const movieModal = document.getElementById('movieModal');
const movieDetailsDiv = document.getElementById('movieDetails');
const addToWatchBtn = document.getElementById('addToWatchBtn');
const addToQueueBtn = document.getElementById('addToQueueBtn');

// Fetch popular movies
async function fetchPopularMovies() {
  const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  displayMovies(data.results);
}

// Fetch movies based on search query
async function fetchMoviesBySearch(query) {
  const response = await fetch(`${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  const data = await response.json();
  displayMovies(data.results);
}

// Display movies on the page
function displayMovies(movies) {
  movieCardsSection.innerHTML = '';

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieCard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
    `;
    movieCard.addEventListener('click', () => openMovieModal(movie));
    movieCardsSection.appendChild(movieCard);
  });
}

function openMovieModal(movie) {
  movieDetailsDiv.innerHTML = `
    <h2>${movie.title}</h2>
    <p>${movie.overview}</p>
    <p>Release Date: ${movie.release_date}</p>
    <p>Rating: ${movie.vote_average}</p>
  `;

  addToWatchBtn.onclick = () => addToWatched(movie);
  addToQueueBtn.onclick = () => addToQueue(movie);

  movieModal.style.display = 'block';
}

// Add movie to watched list
function addToWatched(movie) {
  let watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];

  // Check if the movie is already in the watched list
  const movieIndex = watchedMovies.findIndex(m => m.id === movie.id);
  if (movieIndex === -1) {
    watchedMovies.push(movie);
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
  }

  // Remove the movie from the queue list if it exists
  removeFromQueue(movie);
}

// Add movie to queue list
function addToQueue(movie) {
  let queueMovies = JSON.parse(localStorage.getItem('queueMovies')) || [];

  // Check if the movie is already in the queue list
  const movieIndex = queueMovies.findIndex(m => m.id === movie.id);
  if (movieIndex === -1) {
    queueMovies.push(movie);
    localStorage.setItem('queueMovies', JSON.stringify(queueMovies));
  }

  // Remove the movie from the watched list if it exists
  removeFromWatched(movie);
}

// Remove movie from watched list
function removeFromWatched(movie) {
  let watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
  const updatedWatchedMovies = watchedMovies.filter(m => m.id !== movie.id);
  localStorage.setItem('watchedMovies', JSON.stringify(updatedWatchedMovies));
}

// Remove movie from queue list
function removeFromQueue(movie) {
  let queueMovies = JSON.parse(localStorage.getItem('queueMovies')) || [];
  const updatedQueueMovies = queueMovies.filter(m => m.id !== movie.id);
  localStorage.setItem('queueMovies', JSON.stringify(updatedQueueMovies));
}
