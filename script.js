const apiKey = '3924b5d38a0a34d058ffe49928a2a842';
const movieArea = document.querySelector(".movie-wrapper");
const submitBtn = document.querySelector("#submit");
const textBox = document.querySelector("#input-box");
const form = document.querySelector("#form");
let page = 0;



async function getMovies(e){
    e.preventDefault();
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`

    const data = await fetch(url);
    const getData = await data.json();
    console.log(getData);
}


form.addEventListener('submit', handleFormSubmits);
function handleFormSubmits(e){
    getMovies(e);

}