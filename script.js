const apiKey = '3924b5d38a0a34d058ffe49928a2a842';
let movieArea = document.querySelector(".movie-wrapper");
const submitBtn = document.querySelector("#submit");
const textBox = document.querySelector("#input-box");
const form = document.querySelector("#form");
let page = 10;



async function getMovies(e){
    e.preventDefault();
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`;

    const data = await fetch(url);
    const getData = await data.json();
    console.log(getData)
    console.log(getData.results[2]);
    page+=10;

    getData.results.forEach(e =>{
        displayMovies(e);
    });
}

function displayMovies(data){
    movieArea += `<img src="data.poster_path">`;
}


form.addEventListener('submit', handleFormSubmits);
function handleFormSubmits(e){
    getMovies(e);

}