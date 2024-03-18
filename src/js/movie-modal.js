const gallery = document.querySelector('.container#gallery');
(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };

  gallery.addEventListener('click', event => {
    if (event.target.nodeName === 'IMG') {
      let data = `${event.target.dataset.value}`;
      let dataOverview = event.target.dataset.overview;
      let dataParsed = JSON.parse(data);
      document.querySelector(
        '#film-img',
      ).innerHTML = `<img src="${dataParsed.poster}" alt="Film poster" class="trailer-button" id="film-id" />`;
      document.querySelector('#film-title').innerHTML = dataParsed.title;
      document.querySelector('#votes').innerHTML = dataParsed.votes;
      document.querySelector('#popul').innerHTML = dataParsed.popularity;
      document.querySelector('#origTitle').innerHTML = dataParsed.title;
      document.querySelector('#genre').innerHTML = dataParsed.genre;
      document.querySelector('#about').innerHTML = dataOverview;

      toggleModal();
    }
  });

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
