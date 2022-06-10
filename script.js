const apiKey = '3924b5d38a0a34d058ffe49928a2a842';
const submitBtn = document.getElementById("submit");
const textBox = document.getElementById("inputbox");
const form = document.getElementById("form");
const getMore = document.querySelector(".getMore")
const footer = document.querySelector(".footer");
const movieArea = document.querySelector(".movie-wrapper");
const innerMovieArea = document.querySelector(".innerMovieArea");
const infoSection = document.querySelector(".desc")
const showInfoBtn = document.querySelector(".show-more");
const closeButton = document.querySelector(".closeBtn");
const trendingBtn = document.querySelector(".trending");
const nowPlaying = document.querySelector(".nowPlaying");
let page = 1;


async function getMovies(e){
    e.preventDefault();
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`;
    const data = await fetch(url);
    const getData = await data.json();

    page+=1;

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
        <button class="show-more">Show Info</button>
    </div>`
    footer.classList.remove('closed')
}


getMore.addEventListener('click', getMoreResults);
function getMoreResults(e){
    e.preventDefault();

    if(textBox.value){
        searchMovie(e);
    }
    else{
        getMovies(e);
    }
}

submitBtn.addEventListener('click', searchMovie);
async function searchMovie(e){
    e.preventDefault();
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=` + textBox.value + `&page=1&include_adult=false`;
    const data = await fetch(url);
    const searchData = await data.json();
    

    searchData.results.forEach(e =>{
        displayMovies(e);
    });

}

textBox.addEventListener('change', displayNewResults);
async function displayNewResults(e){
    movieArea.innerHTML = "";
    if(textBox.value){
        searchMovie(e);
    }
    else{
        getMovies(e);
    }
}

nowPlaying.addEventListener('click', e =>{
    movieArea.innerHTML = "";
    getMovies(e);
})

trendingBtn.addEventListener('click', showTrending);
async function showTrending(){
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`
    const data = await fetch(url);
    const getData = await data.json();

    page+=1;
    movieArea.innerHTML = "";
    getData.results.forEach(e =>{
        displayMovies(e);
    });
}


window.onload = (e) => {
    e.preventDefault();
    getMovies(e);
}

