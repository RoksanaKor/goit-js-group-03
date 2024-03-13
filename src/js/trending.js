import axios from 'axios';

const apiKey = '50161d05178dfdcf85b00929de7fbb36';
const language = 'en-US';
const pageNum = '1';

const fetchData = async () => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
      params: { api_key: apiKey, language: language, page: pageNum },
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + apiKey,
      },
    });

    const database = response.data.results;
    const photoCard = document.querySelector('.container#gallery');

    const markup = database
      .map(
        ({ poster_path, title, vote_average, vote_count, release_date, genre_ids, id }) => `
      <div class="movie-card-template" data-modal-open-window data-movie-id="${id}">
        <a class="movie-image">
          <img src="https://image.tmdb.org/t/p/w500${poster_path}?api_key=${apiKey}"
               alt="film-poster" />
        </a>
        <div class="movie-info">
          <p class="movie-name">${title}</p>
          <div class="tags-grade-wrap">
            <p class="movie-tags-year">${genre_ids} | ${release_date}</p>
            <p class="movie-grade">Grade: ${vote_average}</p>
            <p class="movie-grade">Votes: ${vote_count}</p>
          </div>
        </div>
      </div>
    `,
      )
      .join('');

    photoCard.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    console.error(error);
  }
};

fetchData();
