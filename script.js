const apiKey = '3924b5d38a0a34d058ffe49928a2a842';
const submitBtn = document.getElementById("close-search-btn");
const textBox = document.getElementById("input-box");
const form = document.getElementById("form");
const getMore = document.querySelector(".load-more-movies-btn")
const footer = document.querySelector(".footer");
const movieArea = document.querySelector(".movies-grid");
const innerMovieArea = document.querySelector(".movie-card");
const infoSection = document.querySelector(".desc")
const showInfoBtn = document.querySelector(".show-more");
const closeButton = document.querySelector(".closeBtn");
const trendingBtn = document.querySelector(".trending");
const nowPlaying = document.querySelector(".nowPlaying");
const clearBtn = document.querySelector(".clear");
const popUpArea = document.querySelector(".pop-up");
 
let page = 1;
 


//Grab's now playing movies and displays them
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
 

//Displays a singular movie
async function displayMovies(data){
    let moviePath = `https://image.tmdb.org/t/p/w300` + data.poster_path;
    let movieTitle = data.title;
    let movieRating = data.vote_average;


    movieArea.innerHTML += ` 
        <div class="movie-card">     
            <img class="movie-poster" src='${moviePath}'>    
            <h3 class="movie-votes">Rating: ${movieRating} </h3>
            <h3 class="movie-title">${movieTitle}</h3>
            <button class="show-more" onclick="showPopUp(${data.id})">Show Info</button>
        </div>
        
    `
    footer.classList.remove('closed')
}
 

//Shows more movies when prompted
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

    if(textBox.value){
        textBox.value = "";
        movieArea.innerHTML = "";
        getMovies(e);
    }

}


//Shows pop up when prompted
async function showPopUp(id){
    popUpArea.innerHTML = "";
    
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    let videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`
    const data = await fetch(url);
    const getData = await data.json();

    const videoData = await fetch(videoUrl);
    const getVideoData= await videoData.json();
    let videoKey = getVideoData.results[0].key;
    let video = `https://www.youtube.com/embed/${videoKey}`
    
    let imgUrl = getData.poster_path;
    let moviePath = `https://image.tmdb.org/t/p/w300/` + getData.poster_path;
    let currentMovieTitle = getData.title;
    let movieDesc = getData.overview;
    let release = getData.release_date;
    
    console.log(getData);
    console.log(video);

    popUpArea.innerHTML += `
    <div id="content-wrapper" class="box">
        <div class="content">
            <button class="closeBtn" onclick="closePopUp()">Close</button>
            <div class="show-video">
                <iframe width="750px" class="trailer" src="${video}"></iframe>
                <img class="poster" src="${moviePath}">
            </div>
            <h1 class="title-1">${currentMovieTitle}</h1>
            <h3 class="release">| ${release} |</h3>
            <p class="desc">${movieDesc}</p>
        </div>

    </div>
    
    `
}
 

//Closes Popup when prompted
function closePopUp(){
    popUpArea.innerHTML = "";
}
 
//Loads Movies
window.onload = (e) => {
    e.preventDefault();
    getMovies(e);
}
 