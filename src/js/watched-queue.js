const dataMovies = localStorage.getItem('data-movies');
const dataMoviesParsed = JSON.parse(dataMovies);
const watchedArray = dataMoviesParsed.watchedMovies;
const queuedArray = dataMoviesParsed.queueMovies;

const watchedBtnEl = document.querySelector('.library-btn-watched');
const queueBtnEl = document.querySelector('.library-btn-queue');
const watchedDivEl = document.querySelector('#library-watched');
const queuedDivEl = document.querySelector('#library-queued');

queuedDivEl.style.display = 'none';

watchedGalleryMaker();

function watchedGalleryMaker() {
  watchedDivEl.innerHTML = '';
  if (watchedArray && Array.isArray(watchedArray)) {
    const showWatchedMovies = movies => {
      movies.forEach(movie => {
        const movieParsed = JSON.parse(movie);
        const movieInfoParsed = JSON.parse(movieParsed.info);
        const card = document.createElement('div');
        card.classList.add('movie-item');
        card.innerHTML = `
             <div class="movie-card-template" data-movie-id="${movieParsed.id}">
               <img class='movie-poster' src="${movieInfoParsed.poster}" alt="${movieInfoParsed.title}" data-id="${movieParsed.id}"  data-value='{"voteaverage": "${movieInfoParsed.voteaverage}", "releasedate": "${movieInfoParsed.releasedate}", "title": "${movieInfoParsed.title}", "popularity": "${movieInfoParsed.popularity}", "poster": "${movieInfoParsed.poster}", "votes": "${movieInfoParsed.votes}", "genre": "${movieInfoParsed.genre}"}' data-overview="${movieParsed.overview}"/>

               <div class='movie-details'>
                 <h3 class='movie-title'>${movieInfoParsed.title}</h3>
                 <p class='movie-details'>${movieInfoParsed.genre} | ${movieInfoParsed.releasedate} <span class="vote-average">${movieInfoParsed.voteaverage}</span></p>
               </div>
             </div>
           `;

        watchedDivEl.appendChild(card);
      });
    };
    showWatchedMovies(watchedArray);
  } else {
    const noWatchedMovies = document.createElement('div');
    noWatchedMovies.innerHTML = `
     <p class="library__title">
         <strong>You have no watched movies.</strong><br /><a href="index.html">Select first movie</a> and click "Add to watched" button.
     </p>`;
    watchedDivEl.appendChild(noWatchedMovies);
  }
}

function queueGalleryMaker() {
  queuedDivEl.innerHTML = '';
  if (queuedArray && Array.isArray(queuedArray)) {
    const showQueuedMovies = movies => {
      movies.forEach(movie => {
        const movieParsed = JSON.parse(movie);
        const movieInfoParsed = JSON.parse(movieParsed.info);
        const card = document.createElement('div');
        card.classList.add('movie-item');
        card.innerHTML = `
             <div class="movie-card-template" data-movie-id="${movieParsed.id}">
               <img class='movie-poster' src="${movieInfoParsed.poster}" alt="${movieInfoParsed.title}" data-id="${movieParsed.id}"  data-value='{"voteaverage": "${movieInfoParsed.voteaverage}", "releasedate": "${movieInfoParsed.releasedate}", "title": "${movieInfoParsed.title}", "popularity": "${movieInfoParsed.popularity}", "poster": "${movieInfoParsed.poster}", "votes": "${movieInfoParsed.votes}", "genre": "${movieInfoParsed.genre}"}' data-overview="${movieParsed.overview}"/>

               <div class='movie-details'>
                 <h3 class='movie-title'>${movieInfoParsed.title}</h3>
                 <p class='movie-details'>${movieInfoParsed.genre} | ${movieInfoParsed.releasedate} <span class="vote-average">${movieInfoParsed.voteaverage}</span></p>
               </div>
             </div>
           `;
        queuedDivEl.appendChild(card);
      });
    };
    showQueuedMovies(queuedArray);
  } else {
    const noQueuedMovies = document.createElement('div');
    noQueuedMovies.innerHTML = `
     <p class="library__title">
         <strong>You have no queued movies.</strong><br /><a href="index.html">Select first movie</a> and click "Add to queue" button.
     </p>`;
    queuedDivEl.appendChild(noQueuedMovies);
  }
}

watchedBtnEl.addEventListener('click', () => {
  if (watchedDivEl.style.display === 'none') {
    watchedDivEl.style.display = 'flex';
    watchedDivEl.style.flexWrap = 'wrap';
    queuedDivEl.style.display = 'none';
  }
  watchedGalleryMaker();
});

queueBtnEl.addEventListener('click', () => {
  if (queuedDivEl.style.display === 'none') {
    queuedDivEl.style.display = 'flex';
    queuedDivEl.style.flexWrap = 'wrap';
    watchedDivEl.style.display = 'none';
  }
  queueGalleryMaker();
});
