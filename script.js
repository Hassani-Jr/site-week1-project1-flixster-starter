

function getMoviePage(){
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzkyYjBjZTVlZmEzNTQ4Y2VjMGFiYmEyZGYwZmYzYSIsInN1YiI6IjY0ODIwOTdhYmYzMWYyMDExZDQyMTMxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xz3baW_lmFpkznTnizxmuq8eagTIdEalLxNexk-xBS8'
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page='  + page, options)
    .then(response => response.json())
    .then(response => {
        for (let i = 0; i < response.results.length; i++){
            generateCards(response.results[i])       
        }
    })
}

function getSearchPage(searchValue) {


  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzkyYjBjZTVlZmEzNTQ4Y2VjMGFiYmEyZGYwZmYzYSIsInN1YiI6IjY0ODIwOTdhYmYzMWYyMDExZDQyMTMxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xz3baW_lmFpkznTnizxmuq8eagTIdEalLxNexk-xBS8'
    }
  };
  
  fetch('https://api.themoviedb.org/3/search/movie?query='+ searchValue +'&include_adult=false&language=en-US&page=' + page, options)
    .then(response => response.json())
    .then(response => {
      for (let i = 0; i < response.results.length; i++){
        generateCards(response.results[i])       
      }    
    }
  )
}


function generateCards(movieObject){
    //create star
    let movieContainer = document.getElementById("movies-grid")
    let star = document.createElement('span')
    star.classList.add('star')
    let starContent = document.createTextNode('⭐️')
    star.appendChild(starContent)

    //create rating 
    
    let rating = document.createElement('span')
    let ratingContent = document.createTextNode(movieObject.vote_average)
    star.classList.add('rating')
    rating.appendChild(ratingContent)

    //create avg container
    let avgContainer = document.createElement('div')
    avgContainer.classList.add('average')
    avgContainer.appendChild(star)
    avgContainer.appendChild(rating)
    document.body.appendChild(avgContainer)

    let image = document.createElement('img')
    image.classList.add('movie-poster')
    image.src = "https://image.tmdb.org/t/p//w300/" + movieObject.poster_path
    document.body.insertBefore(image, avgContainer)

    let name = document.createElement('div')
    name.classList.add('name')
    name.classList.add('movie-title')
    name.innerText = movieObject.original_title
    document.body.insertBefore(name, avgContainer.nextSibling)


    let movie = document.createElement('section')
    movie.classList.add('movie')
    movie.setAttribute('id','movie-card')
    movie.appendChild(image)
    movie.appendChild(avgContainer)
    movie.appendChild(name)
    document.body.appendChild(movie)
    movieContainer.appendChild(movie)

}

window.onload = function () {
    // run your function here to make it execute as soon as the page loads
    getMoviePage()
  }

  let page = 1

  document.getElementById("load-more-movies-btn").addEventListener("click",() => {
    page++
    let searchValue = searchBar.value
    if (searchValue !== ""){
      getSearchPage(searchValue)
    }
    else{
    getMoviePage()
  }
  })


  let searchBar = document.getElementById('search-input')
  let searchBtn = document.getElementById('searchBtn')

  let movieContainer = document.getElementById("movies-grid")
  searchBtn.addEventListener('click',function(event) {
    event.preventDefault()
    let searchValue = searchBar.value
    movieContainer.innerHTML = ""
    getSearchPage(searchValue)

    if (searchValue == '' || null)
      {
        page = 1
        getMoviePage()
      }
})


