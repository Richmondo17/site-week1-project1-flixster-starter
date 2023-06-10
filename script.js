const apiKey = "796c6c0cdf68ec188eb6e5dd599e5f3c"
let apiURL = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&api_key=796c6c0cdf68ec188eb6e5dd599e5f3c&page=1"
let pageNumber = 1

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTZjNmMwY2RmNjhlYzE4OGViNmU1ZGQ1OTllNWYzYyIsInN1YiI6IjY0ODJiZDVjYmYzMWYyNTA1NzA1NThhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CayceIvN9R5x-so4OAMaks1ZBjwCLlNsN6uvc8fYEE0'
    }
};

fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${pageNumber}`, options)
.then(response => response.json())
.then(response => {
    for (movie in response.results){
        createMovieCards(response.results[movie])
    }})


function newUrl(pageNo){
    url = `https://api.themoviedb.org/3/movie/now_playing?&page=`+pageNo+'&api_key=' + apiKey
    return url
  }
  let apiURl = newUrl(1)

const searchButton = document.getElementById("search-button")
const searchInput = document.getElementById("search-input")
const showMoreBtn = document.getElementById("loadMore")

function createMovieCards(movieObject){

    //create movie title
    let title = document.createElement('h2')
    title.classList.add('movie')
    title.innerText = movieObject.original_title

    //create the movie image
    let image = document.createElement('img')
    image.src = "https://image.tmdb.org/t/p/w342" + movieObject.poster_path
    image.classList.add('movie')

    //create the votes
    let vote = document.createElement('h2')
    vote.innerText = movieObject.vote_average
    vote.classList.add('movie')

    //create movie
    let movieFeatures = document.createElement('section')
    movieFeatures.classList.add('movie')
    movieFeatures.appendChild(image)
    movieFeatures.appendChild(title)
    movieFeatures.appendChild(vote)

    
    //append movie to grid
    let movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-grid')
    movieContainer.appendChild(movieFeatures)
    document.body.appendChild(movieContainer)

    // get the movie div
    const movieDiv = document.getElementById("movies")
    movieDiv.appendChild(movieContainer);

    
}

    //increment page by 1
    document.getElementById('close-search-button').addEventListener('click',() => {
        page++
        newUrl(page)
    })
    
    window.onload = function(){

        showMoreBtn.addEventListener("click", loadMoreMovies)

        searchButton.addEventListener("click", function (event){
            event.preventDefault()
            getquery()
        })

    }