// WATCHED & QUEUE -----------------------------
//Sprawdzenie obejrzanych i zakolejkowanych filmów
let watchedMovies = JSON.parse(localStorage.getItem("watched-movies"));
let queuedMovies = JSON.parse(localStorage.getItem("queued-movies"));

const watchedMoviesContainerEl = document.querySelector("#library-watched");
const queuedMoviesContainerEl = document.querySelector("#library-queued");

if (watchedMovies && Array.isArray(watchedMovies)) {
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
      card.addEventListener("click", async () => {
        modalBoxShow(movie);
        await getTrailerLink(movie.id);
      });
      watchedMoviesContainerEl.appendChild(card);
      watchedMoviesContainerEl.classList.remove("hiddenColor");
    });
  };
  showWatchedMovies(watchedMovies);
} else {
  const noWatchedMovies = document.createElement("div");
  noWatchedMovies.innerHTML = `
    <p class="library__title">
        <strong>You have no watched movies.</strong><br /><a href="index.html">Select first movie</a> and click "Add to watched" button.
    </p>`;
  watchedMoviesContainerEl.appendChild(noWatchedMovies);
}

if (queuedMovies && Array.isArray(queuedMovies)) {
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
      card.addEventListener("click", async () => {
        modalBoxShow(movie);
        await getTrailerLink(movie.id);
      });
      queuedMoviesContainerEl.appendChild(card);
      queuedMoviesContainerEl.classList.remove("hiddenColor");
    });
  };
  showQueuedMovies(queuedMovies);
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
const watchedDivEl = document.querySelector("#library-watched");
const queuedDivEl = document.querySelector("#library-queued");
const libraryInfoEl = document.querySelector("#library-info");

watchedBtnEl.addEventListener("click", () => {
  watchedDivEl.classList.remove("hidden-in-library");
  queuedDivEl.classList.add("hidden-in-library");
  libraryInfoEl.classList.add("hidden-in-library");
});

queueBtnEl.addEventListener("click", () => { 
  watchedDivEl.classList.add("hidden-in-library");
  queuedDivEl.classList.remove("hidden-in-library");
  libraryInfoEl.classList.add("hidden-in-library");
});
