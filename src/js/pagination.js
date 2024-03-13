// Funkcja do ładowania danych na stronę na podstawie numeru strony
function loadData(pageNumber) {
  // Tworzymy nowy obiekt URLSearchParams z domyślnymi parametrami oraz ustawiamy wartość 'page' na numer strony
  const searchParams = new URLSearchParams({
    key: '42570748-ed659c792c9eb8886cec3511f',
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: pageNumber,
    per_page: 40,
  });
}

// Funkcja do ładowania danych na stronę na podstawie numeru strony
function loadData(pageNumber) {
  const apiUrl = `https://example.com/api/photos?page=${pageNumber}&per_page=10`; // Przykładowy adres URL API z parametrami paginacji
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      updateUIWithNewImages(data); // Aktualizacja interfejsu użytkownika z nowymi danymi obrazów
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

// Funkcja do generowania przycisków paginacji
function generatePaginationButtons(totalPages) {
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = ''; // Wyczyszczenie istniejących przycisków paginacji

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.innerText = i;
    button.dataset.page = i; // Ustawienie atrybutu data-page na numer strony
    button.classList.add('pagination-button'); // Dodanie klasy dla przycisku
    button.addEventListener('click', handlePaginationClick);
    paginationContainer.appendChild(button);
  }
}

// Funkcja do obsługi kliknięcia przycisków paginacji
function handlePaginationClick(event) {
  const pageNumber = parseInt(event.target.dataset.page);
  loadData(pageNumber); // Ładowanie danych dla wybranej strony
}

// Inicjalizacja strony
function init() {
  // Tutaj można umieścić kod inicjalizujący, np. pobranie i wyświetlenie danych dla pierwszej strony
  const totalPages = 10; // Zakładamy, że mamy 10 stron w sumie
  generatePaginationButtons(totalPages); // Generowanie przycisków paginacji
  loadData(1); // Pobranie i wyświetlenie danych dla pierwszej strony po załadowaniu strony
}

// Wywołanie funkcji inicjalizującej po załadowaniu strony
window.addEventListener('load', init);
