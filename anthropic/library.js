const libraryMoviesSection = document.getElementById('libraryMovies');
const watchedBtn = document.getElementById('watchedBtn');
const queueBtn = document.getElementById('queueBtn');

// Display watched movies
function displayWatchedMovies() {
  const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
  displayMovies(watchedMovies);
}

// Display queue movies
function displayQueueMovies() {
  const queueMovies = JSON.parse(localStorage.getItem('queueMovies')) || [];
  displayMovies(queueMovies);
}

// Display movies in the library
function displayMovies(movies) {
  libraryMoviesSection.innerHTML = '';

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieCard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
    `;
    libraryMoviesSection.appendChild(movieCard);
  });
}

// Watched button click event
watchedBtn.addEventListener('click', displayWatchedMovies);

// Queue button click event
queueBtn.addEventListener('click', displayQueueMovies);

// Display watched movies on page load
displayWatchedMovies();
