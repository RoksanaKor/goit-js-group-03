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
    const gallery = document.querySelector('.container#gallery');
    displayMovies(database, gallery);
  } catch (error) {
    console.error(error);
  }
};

const displayMovies = (movies, container) => {
  container.innerHTML = '';
  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-item');
    const roundedVoteAverage = movie.vote_average.toFixed(1);
    const genre = movie.genre_ids.map(id => getGenreName(id)).join(', ');
    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'https://http.cat/status/404/500x750?text=No+Image+Available';
    movieElement.innerHTML = `
      <div class="movie-card-template" data-movie-id="${movie.id}">
        <img class='movie-poster' src="${posterUrl}" alt="${movie.title.toUpperCase()}" data-id="${
      movie.id
    }"  data-value='{"voteaverage": "${roundedVoteAverage}", "releasedate": "${movie.release_date.substring(
      0,
      4,
    )}", "title": "${movie.title.toUpperCase()}", "popularity": "${movie.popularity.toFixed(
      1,
    )}", "poster": "${posterUrl}", "votes": "${roundedVoteAverage} / ${
      movie.vote_count
    }", "genre": "${genre}"}' data-overview="${movie.overview}"/>
        
        <div class='movie-details'>
          <h3 class='movie-title'>${movie.title}</h3>
          <p class='movie-details'>${genre} | ${movie.release_date.substring(
      0,
      4,
    )} <span class="vote-average">${roundedVoteAverage}</span></p>
        </div>
      </div>
    `;
    container.appendChild(movieElement);
  });
};

const getGenreName = genreId => {
  const genres = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };
  return genres[genreId] || 'Unknown';
};

fetchData();
