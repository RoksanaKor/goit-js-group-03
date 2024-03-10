import { galleryItems } from './goit-modal-gallery.js';
import SimpleLightbox from "simplelightbox";


(() => {
    const refs = {
      openModalBtn: document.querySelector('[data-modal-open-g]'),
      closeModalBtn: document.querySelector('[data-modal-close-g]'),
      modal: document.querySelector('[data-modal-g]'),
    };
  
    refs.openModalBtn.addEventListener('click', toggleModalR);
    refs.closeModalBtn.addEventListener('click', toggleModalR);
  
    function toggleModalR() {
      refs.modal.classList.toggle('is-hidden');
    }
  })();

  console.log(galleryItems);

  const myGallery = document.querySelector(".goit-gallery");
  
  const galleryList = galleryItems.map(
      (galleryItem) => 
    `<li class="gallery__item">
      <a class="gallery__link" href="${galleryItem.original}">
      <img
        class="gallery__image"
        src="${galleryItem.preview}"
        alt="${galleryItem.description}"
      >
      </img>
       </a>
     </li>`
    )
    .join("");
  
  myGallery.insertAdjacentHTML("afterbegin", galleryList);
  // myGallery.scroll(0, 1000);
  myGallery.scrollBy({
     top: 100,
     left: 100,
     behavior: "smooth",
   });
  
  
  
      const lightbox = new SimpleLightbox(".goit-gallery a", {
          captionsData: "alt",
          captionDelay: 300,
          captionPosition: "bottom",
          close: true,
          enableKeyboard: true,
      });