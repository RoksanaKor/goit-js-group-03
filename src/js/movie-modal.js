(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeIfOpen();
    }
  });

  refs.modal.addEventListener('click', event => {
    if (event.target === refs.modal) {
      closeIfOpen();
    }
  });

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
    if (!refs.modal.classList.contains('is-hidden')) {
      document.addEventListener('keydown', closeOnEscape);
      document.addEventListener('click', closeOnClickOutside);
    } else {
      removeEventListeners();
    }
  }

  function closeIfOpen() {
    if (!refs.modal.classList.contains('is-hidden')) {
      toggleModal();
    }
  }
  function closeOnEscape(event) {
    if (event.key === 'Escape') {
      closeIfOpen();
    }
  }

  function closeOnClickOutside(event) {
    if (event.target === refs.modal) {
      closeIfOpen();
    }
  }

  function removeEventListeners() {
    document.removeEventListener('keydown', closeOnEscape);
    document.removeEventListener('click', closeOnClickOutside);
  }
})();
//kod pisany przez: Kamila Walkowska
// Obsługa zdarzenia kliknięcia na miniaturze filmu
document.querySelectorAll('[data-modal-open]').forEach(item => {
  item.addEventListener('click', event => {
      const movieId = item.dataset.movieId; // Pobierz identyfikator filmu

      // Wykonaj zapytanie do API TMDb, aby pobrać szczegóły filmu
      axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=50161d05178dfdcf85b00929de7fbb36&language=en-US`)
          .then(response => {
              const movieData = response.data;

              // Wypełnij okno modalne danymi o filmie
              document.getElementById('film-title').textContent = movieData.title;
              document.getElementById('votes').textContent = movieData.vote_count;
              document.getElementById('popul').textContent = movieData.popularity;
              document.getElementById('origTitle').textContent = movieData.original_title;
              document.getElementById('about').textContent = movieData.overview;

              // Wyciągnij gatunki filmu
              const genres = movieData.genres.map(genre => genre.name);
              document.getElementById('genre').textContent = genres.join(', ');
          })
          .catch(error => {
              console.error('Error fetching movie details:', error);
          });
  });
});