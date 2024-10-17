const API_KEY = 'd54e99153eee4bbf9375621405204c76';
const BASE_URL = 'https://api.themoviedb.org/3';

async function getPopularMovies() {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`);
    const data = await response.json();
    displayMovies(data.results);
}

async function searchMovies() {
    const searchTerm = document.getElementById('searchInput').value;
    if (searchTerm) {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}&language=pt-BR`);
        const data = await response.json();
        displayMovies(data.results);
    } else {
        getPopularMovies();
    }
}

function displayMovies(movies) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = ''; 

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
        `;
        movieCard.addEventListener('click', () => showMovieDetails(movie.id));
        movieList.appendChild(movieCard);
    });
}

async function showMovieDetails(movieId) {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=pt-BR&append_to_response=credits`);
    const movie = await response.json();

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div class="modal-content-container">
            <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}" alt="${movie.title}">
            <div class="movie-info">
                <h2>${movie.title} (${movie.release_date.split('-')[0]})</h2>
                <p><strong>Sinopse:</strong> ${movie.overview}</p>
                <p><strong>Gênero:</strong> ${movie.genres.map(genre => genre.name).join(', ')}</p>
                <p><strong>Elenco:</strong> ${movie.credits.cast.slice(0, 5).map(actor => actor.name).join(', ')}</p>
                <p><strong>Avaliação:</strong> ${movie.vote_average}/10</p>
            </div>
        </div>
    `;

    const modal = document.getElementById('movieModal');
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('movieModal');
    modal.style.display = 'none';
}

document.querySelector('.close').addEventListener('click', closeModal);
window.addEventListener('click', function (event) {
    const modal = document.getElementById('movieModal');
    if (event.target === modal) {
        closeModal();
    }
});

getPopularMovies();
