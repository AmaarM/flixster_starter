const apiKey = '3924b5d38a0a34d058ffe49928a2a842';
const submitBtn = document.getElementById("submit");
const textBox = document.getElementById("inputbox");
const form = document.getElementById("form");
const getMore = document.querySelector(".getMore")
const footer = document.querySelector(".footer");
let page = 1;
let movieArea = document.querySelector(".movie-wrapper");


console.log(textBox.value);
async function getMovies(e){
    e.preventDefault();
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`;
    const data = await fetch(url);
    const getData = await data.json();

    page+=1;
    console.log(getData);
    getData.results.forEach(e =>{
        displayMovies(e);
    });
}

async function displayMovies(data){
    let moviePath = `https://image.tmdb.org/t/p/w185` + data.poster_path;
    let movieTitle = data.title;
    let movieRating = data.vote_average;

    movieArea.innerHTML += ` 
    <div class="innerMovieArea">     
        <img class="oneMovie" src='${moviePath}'>    
        <h3 class="rating">Rating: ${movieRating} </h3>
        <h3 class="movie-title">${movieTitle}</h3>
    </div>`
    footer.classList.remove('closed')
}


getMore.addEventListener('click', getMoreResults);
function getMoreResults(e){
    e.preventDefault();
    getMovies(e);
}

submitBtn.addEventListener('click', searchMovie);
async function searchMovie(e){
    e.preventDefault();
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=` + textBox.value + `&page=1&include_adult=false`;
    const data = await fetch(url);
    const searchData = await data.json();
    console.log(searchData);
    searchData.results.forEach(e =>{
        displayMovies(e);
    });

}

textBox.addEventListener(e, async e =>{
    
})

window.onload = (e) => {
    e.preventDefault();
    getMovies(e);
}