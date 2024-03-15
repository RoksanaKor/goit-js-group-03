// Funkcja do ładowania danych na stronę na podstawie numeru strony
//function loadData(pageNumber) {
//  const apiUrl = `https://api.themoviedb.org/3/movie?page=${pageNumber}&per_page=20`; // Nasz URL API z parametrami paginacji
//  fetch(apiUrl)
//   .then(response => {
//     if (!response.ok) {
//        throw new Error('Network response was not ok');
//      }
//      return response.json();
//    })
//    .then(data => {
//      updateUIWithNewImages(data); // Aktualizacja interfejsu użytkownika z nowymi danymi obrazów
//    })
//    .catch(error => {
//      console.error('There was a problem with the fetch operation:', error);
//    });
//}

// Funkcja do aktualizacji interfejsu użytkownika, aby wyświetlić nowe obrazy
//function updateUIWithNewImages(data) {
//  const imagesContainer = document.getElementById('container');

// Usunięcie wszystkich istniejących obrazów z kontenera
//  imagesContainer.innerHTML = '';

//  // Dodanie nowych obrazów do kontenera
//  data.forEach(imageData => {
//    const imgElement = document.createElement('img');
//    imgElement.src = imageData.url;
//    imgElement.alt = imageData.alt;
//    imagesContainer.appendChild(imgElement);
//  });
// }

// Funkcja do generowania przycisków paginacji
//function generatePaginationButtons(totalPages) {
//  const paginationContainer = document.getElementById('pagination');
//  paginationContainer.innerHTML = ''; // Wyczyszczenie istniejących przycisków paginacji
//  for (let i = 1; i <= totalPages; i++) {
//    const button = document.createElement('button');
//    button.innerText = i;
//    button.dataset.page = i; // Ustawienie atrybutu data-page na numer strony
//    button.classList.add('pagination-page-button'); // Dodanie klasy dla przycisku
//    button.addEventListener('click', handlePaginationClick);
//    paginationContainer.appendChild(button);
//  }
// }
// Funkcja do obsługi kliknięcia przycisków paginacji
//function handlePaginationClick(event) {
//  const pageNumber = parseInt(event.target.dataset.page);
//  loadData(pageNumber); // Ładowanie danych dla wybranej strony
//}
//  Inicjalizacja strony
//function init() {
// Kod inicjalizujący, np. pobranie i wyświetlenie danych dla pierwszej strony
//  const totalPages = 20; // Zakładamy, że mamy 10 stron w sumie
//  generatePaginationButtons(totalPages); // Generowanie przycisków paginacji
//  loadData(1); // Pobranie i wyświetlenie danych dla pierwszej strony po załadowaniu strony
//}
// Wywołanie funkcji inicjalizującej po załadowaniu strony
//window.addEventListener('load', init);
