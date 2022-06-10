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
const clearBtn = document.querySelector(".clear");
const popUpArea = document.querySelector(".pop-up");
 
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
    let moviePath = `https://image.tmdb.org/t/p/w300` + data.poster_path;
    let movieTitle = data.title;
    let movieRating = data.vote_average;
    console.log(data);
    movieArea.innerHTML += ` 
    <div class="innerMovieArea">     
        <img class="oneMovie" src='${moviePath}'>    
        <h3 class="rating">Rating: ${movieRating} </h3>
        <h3 class="movie-title">${movieTitle}</h3>
        <button class="show-more" onclick="showPopUp(${data.id})">Show Info</button>
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
 
//display's searched movies.
submitBtn.addEventListener('click', searchMovie);
async function searchMovie(e){
    e.preventDefault();
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=` + textBox.value + `&page=1&include_adult=false`;
    const data = await fetch(url);
    const searchData = await data.json();
    
    searchData.results.forEach(e => {
        displayMovies(e);
    });
 
}
 
//display new results when textbox value is prompted
textBox.addEventListener('change', displayNewResults);
async function displayNewResults(e){
    movieArea.innerHTML = "";
    textBox.innerHTML = "";
    if(textBox.value){
        searchMovie(e);
    }
    else{
        getMovies(e);
    }
}
 
//Shows now playing movies when button is clicked
nowPlaying.addEventListener('click', e =>{
    movieArea.innerHTML = "";
    textBox.value = "";
    getMovies(e);
})
 
//Shows trending movies when trending button is click 
trendingBtn.addEventListener('click', showTrending);
async function showTrending(){
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`
    const data = await fetch(url);
    const getData = await data.json();
    textBox.value = "";
    
 
    movieArea.innerHTML = "";
    getData.results.forEach(e =>{
        displayMovies(e);
    });
}
 
//Clear's search bar when prompted
clearBtn.addEventListener('click', clearSearch);
async function clearSearch(e){
    console.log(textBox.value);
    if(textBox.value){
        textBox.value = "";
        movieArea.innerHTML = "";
        getMovies(e);
    }

}
 
async function showPopUp(id){
    popUpArea.innerHTML = "";
    
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    const data = await fetch(url);
    const getData = await data.json();
 
    let imgUrl = getData.poster_path;
    let moviePath = `https://image.tmdb.org/t/p/w300/` + getData.poster_path;
    let currentMovieTitle = getData.title;
    let movieDesc = getData.overview;
    let release = getData.release_date;
    console.log(release);
    console.log(getData);
    console.log(moviePath);
    
    popUpArea.innerHTML += `
    <div id="content-wrapper" class="box">
        <div class="content">
            <button class="closeBtn" onclick="closePopUp()">X</button>
            <img class="poster" src="${moviePath}">
            <h1 class="title-1">${currentMovieTitle}</h1>
            <h3 class="release">| ${release} |</h3>
            <p class="desc">${movieDesc}</p>
        </div>
    </div>
    
    `
 
    console.log(id);
}
 
function closePopUp(){
    popUpArea.innerHTML = "";
}
 
window.onload = (e) => {
    e.preventDefault();
    getMovies(e);
}
 