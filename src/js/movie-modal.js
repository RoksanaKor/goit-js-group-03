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
