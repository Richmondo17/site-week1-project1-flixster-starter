const apiKey = "796c6c0cdf68ec188eb6e5dd599e5f3c"
let pageNumber = 1

const getMovies= async()=>{
    try{
        const res=await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${pageNumber}`);
        const movieData= await res.json(); // get result and convert to json
        createMovieCard(movieData.results)
        
    }catch(err){
     console.error(err);
    }
}

const searchBar = document.getElementById("searchBar")
const searchButton = document.getElementById("search-button")
const searchquery=document.getElementById("search-input")
const loadMore=document.getElementById("load-more-movies-btn")
const movieGrid=document.querySelector(".movieGrid")

const createMovieCard = (movieObject) => {

    movieObject.forEach(movie =>{
        movieGrid.innerHTML+= `
        <div class="movie-card">
        <img class="movie-poster" src="https://image.tmdb.org/t/p/w342${movie.poster_path}" alt="this movie is a poster for ${movie.title} "/>
        <p class="movie-votes">⭐${movie.vote_average}</p>
        <p class="movie-title"> ${movie.title}</p>
        </div>  
        `
    })

}

//this is a function to search in the search bar
async function getQuery(){

    //This stores the user input in a varible named queryResult
    queryResult=searchquery.value   
    //use the search API to fetch the movies
    const response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&language=en-US&query="+ queryResult); 
    const searchData=await response.json() //converting the response into json
    movieGrid.innerHTML=''   //set to blank string so the screen turns empty
    createMovieCard(searchData.results) // call the display movie to generate the cards

}

getMovies()


window.onload = function () {
    // sets the load more function when clicked and adds the page number and calls the main function that generates cards after api fetch
    loadMore.addEventListener("click",loadMorePage =>{
        pageNumber++
        getMovies()
    })
    //
    searchButton.addEventListener("click", function (event){
    event.preventDefault() //prevent the page from refreshing
    getQuery()

   })
  }