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
      document.querySelector('.data-modal-backdrop').innerHTML = `<div class="modal-box">
        <div id="modal">
          <button
            title="close-movie-modal"
            id="close-modal"
            class="close-modal-icon"
            type="button"
            data-modal-close
          >
            <svg width="14" height="14">
  <use
    href="./images/header-images/icons/closebtn.svg#icon-x-close"
  ></use>
</svg>
          </button>
          <div id="movie-card">
            <div id="content">
              <div id="left-content" class="film-image-window">
                <div id="film-img" alt="Film Image">
                  <img
                    src="${dataParsed.poster}"
                    alt="Film poster"
                    class="trailer-button"
                    id="film-id"
                  />
                </div>
              </div>
              <div id="right-content">
                <h2 id="film-title">${dataParsed.title}</h2>
                <div id="description" class="modal-description">
                  <div class="left-descr-content">
                    Vote / Votes <span>${dataParsed.votes}</span>
                    <div id="votes"></div>
                  </div>
                  <div class="left-descr-content">
                    Popularity<span>${dataParsed.popularity}</span>
                    <div id="popul"></div>
                  </div>
                  <div class="left-descr-content">
                    Original title <span>${dataParsed.title}</span>
                    <div id="origTitle"></div>
                  </div>
                  <div class="left-descr-content">
                    Genre <span>${dataParsed.genre}</span>
                    <div id="genre"></div>
                  </div>
                </div>
                <div class="text-about">
                  <span>About</span>
                  <p class="movie-overview">${dataOverview}</p>
                  <div id="about"></div>
                </div>

                <div class="button-wrapper" id="buttonWrapper">
                  <button
                    title="watched-btn"
                    type="button"
                    class="watched-button"
                    id="watched-btn"
                    data-value="add"
                  >
                    ADD TO WATCHED
                  </button>

                  <button type="button" class="queue-button" id="queue-btn" data-value="add">
                    ADD TO QUEUE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
      toggleModal();
    }
  });
  refs.closeModalBtn.addEventListener('click', () => {
    toggleModal();
  });

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
