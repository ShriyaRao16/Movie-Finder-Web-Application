const API_KEY = "YOUR_API_KEY";
const BASE_URL = "https://www.omdbapi.com/?apikey=" + API_KEY;

const searchInput = document.getElementById("search");
const searchBtn = document.querySelector(".search");
const movieCards = document.querySelector(".movie-cards");

searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
        getMovies(query);
    }
});

async function getMovies(query) {
    showLoader();
    const res = await fetch(`${BASE_URL}&s=${query}`);
    const data = await res.json();
    movieCards.innerHTML = "";

    if (data.Search) {
        showMovies(data.Search);
    } else {
        movieCards.innerHTML = "<p>No movies found</p>";
    }
}


async function showMovies(movies) {
    movieCards.innerHTML = "";

    for (let movie of movies) {
        const res = await fetch(`${BASE_URL}&i=${movie.imdbID}`);
        const movieData = await res.json();
        movie_display(movieData);
    }
}

function movie_display(movie) {
    const movieElm = document.createElement("div");
    movieElm.innerHTML = `
        <div class="card">
            <img src="${movie.Poster}" width="200" />
            <div class="movie-description">
                <span class="movie-title"><b>Title:</b><span class="value">${movie.Title}</span></span>
                <span class="movie-title"><b>Rating:</b><span class="value">${movie.imdbRating}</span></span>
                <span class="movie-title"><b>Director:</b><span class="value">${movie.Director}</span></span>
                <span class="movie-title"><b>Released</b><span class="value">${movie.Released}</span></span>
                <span class="movie-title"><b>Genre</b><span class="value">${movie.Genre}</span></span>
            </div>
        </div>
    `;
    movieCards.appendChild(movieElm);

}
// Trigger search when Enter key is pressed
searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchBtn.click(); // simulate button click
    }
});
function showLoader() {
    movieCards.innerHTML = `<div class="loader"></div>`;
}

function hideLoader() {
    const loader = document.querySelector(".loader");
    if (loader) loader.remove();
}


