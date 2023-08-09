
const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// load movies from API
async function loadMovies(searchTerm){
    // const URL ='http://www.omdbapi.com/?i=tt3896198&apikey=2f308180';
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=2f308180`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if(data.Response == "True") displayMovieList(data.Search);
}



function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let idx = 0; idx < 1; idx++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        if(movies[idx].Poster != "N/A")
            moviePoster = movies[idx].Poster;
        else 
            moviePoster = "image_not_found.png";

        movieListItem.innerHTML = `

        <div class = "search-item-thumbnail">
            <img src ="${moviePoster}" style="margin-top: 20px; margin-right:1%">
        </div>
        <div class = "search-item-info">
        <br/>
        <h3 style="text-align:center;">${movies[idx].Title}</h3>
        <br/>

    </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`);
            const movieDetails = await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details){
    resultGrid.innerHTML = `
    <div class = "movie-info" style="text-align:center; font-size: 12px; color:rgba(255,255,255,.71);">
 
        <ul class = "movie-misc-info" style=" margin-left: 47%; text-align:left;">
            <li class = "year">Year: ${details.Year}</li>
            <br/>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <br/>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <br/>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <br/>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <br/>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <br/>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <br/>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <br/>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;
}


window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});