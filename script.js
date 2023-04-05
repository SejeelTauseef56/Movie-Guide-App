// Get references to HTML elements
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

// Function to fetch movie data from OMDB API
let getMovie = () => {
  let movieName = movieNameRef.value; // Get movie name from input field
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`; // Construct the OMDB API URL

  // Check if input field is empty
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please enter a movie name </h3>`;
  }

  // If input field is not empty
  else {
    // Fetch movie data from OMDB API
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        // If movie exists in the database
        if (data.Response == "True") {
          // Construct the HTML content to display movie information
          result.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star-icon.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join(
                                  "</div><div>"
                                )}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                `;
        }

        // If movie does not exist in the database
        else {
          // Display error message
          result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
        }
      })
      // If error occurs while fetching movie data
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
      });
  }
};

// Add event listener to search button to call getMovie function on click
searchBtn.addEventListener("click", getMovie);

// Add event listener to window to call getMovie function on page load
window.addEventListener("load", getMovie);
