// WATCHED & QUEUE -----------------------------

let dataMovies = JSON.parse(localStorage.getItem("data-movies"));
console.log(dataMovies.watchedMovies);

const watchedMoviesContainerEl = document.querySelector("#watched-library");
const queuedMoviesContainerEl = document.querySelector("#queued-library");

if (dataMovies.watchedMovies && Array.isArray(dataMovies.watchedMovies)) {
  const showWatchedMovies = movies => {
    movies.forEach(movie => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
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
      watchedMoviesContainerEl.appendChild(card);
      watchedMoviesContainerEl.classList.remove("hiddenColor");
    });
  };
  showWatchedMovies(dataMovies.watchedMovies);
} else {
  const noWatchedMovies = document.createElement("div");
  noWatchedMovies.innerHTML = `
    <p class="library__title">
        <strong>You have no watched movies.</strong><br /><a href="index.html">Select first movie</a> and click "Add to watched" button.
    </p>`;
  watchedMoviesContainerEl.appendChild(noWatchedMovies);
}

if (dataMovies.queuedMovies && Array.isArray(dataMovies.queuedMovies)) {
  const showQueuedMovies = movies => {
    movies.forEach(movie => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
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
      queuedMoviesContainerEl.appendChild(card);
      queuedMoviesContainerEl.classList.remove("hiddenColor");
    });
  };
  showQueuedMovies(dataMovies.queuedMovies);
} else {
  const noQueuedMovies = document.createElement("div");
  noQueuedMovies.innerHTML = `
    <p class="library__title">
        <strong>You have no queued movies.</strong><br /><a href="index.html">Select first movie</a> and click "Add to queue" button.
    </p>`;
  queuedMoviesContainerEl.appendChild(noQueuedMovies);
}

const watchedBtnEl = document.querySelector("#button-watched");
const queueBtnEl = document.querySelector("#button-queue");


 queueBtnEl.addEventListener("click", () => { 
   watchedMoviesContainerEl.style.display = 'none';
   queuedMoviesContainerEl.style.display = 'block';
});
watchedBtnEl.addEventListener("click", () => {
  watchedMoviesContainerEl.style.display ='block';
  queuedMoviesContainerEl.style.display = 'none';
});