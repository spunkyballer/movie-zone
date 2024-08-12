const movieRow = document.querySelector("#row");
const moreBtn = document.querySelector("#more");
const streamingDiv = document.querySelector("#streaming");
const carouselDiv = document.querySelector("#carousel-inner");

let page = 1;

// fetch tv shows from tmbd api
const fetchTvShows = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjQwNWI2MWU5NmFhMmFmMjhiNGFjYTYwNWExNzg3NSIsIm5iZiI6MTcyMzIyNDgzMi45NDc2ODEsInN1YiI6IjY2YjY1MjZkNGQzNzJlNGJhNDI2MDAwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8O8R2IdCxYsZYxvOHIAJepXZ5zUl2zdQYedgXyb4sNM",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return console.log("something went wrong");
    }

    if (data?.results && data?.results.length > 0) {
      const firstThreeTvShows = data.results.slice(0, 3);

      for (show of firstThreeTvShows) {
        const carouselItemDiv = document.createElement("div");
        carouselItemDiv.classList.add("carousel-item");
        carouselItemDiv.classList.add("active");
        carouselDiv.style.height = "100vh";

        carouselItemDiv.innerHTML = `<img src=${`https://image.tmdb.org/t/p/w300${show.poster_path}`} class="d-block w-100" alt="..." />
                <div class="carousel-caption d-md-block">
                  <h5 class="text-white-50 release ps-2 fs-6">NEW RELEASES</h5>
                  <h1 class="font_80 mt-4">
                    ${show.name}
                  </h1>
                  <h6 class="text-white">
                    <span
                      class="rating d-inline-block rounded-circle me-2 col_green"
                      >${show?.vote_average.toString().slice(0, 3)}</span
                    >
                    <span class="col_green">TMDB SCORE</span>
                    <span class="mx-3">  ${show?.first_air_date}</span>
                    <span class="col_red">Romance, Action</span>
                  </h6>
                  <p class="mt-4">
                   ${show?.overview.slice(0, 100)}...
                  </p>
                  <h5 class="mb-0 mt-4 text-uppercase">
                    <a class="button" href="#"
                      ><i class="fa fa-youtube-play me-1"></i> Watch Trailer</a
                    >
                  </h5>
                </div>`;

        carouselDiv.appendChild(carouselItemDiv);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

// call fetchTvShows function on page load
window.addEventListener("load", () => fetchTvShows());

// fetch popuar movies from api
const fetchPopularMovies = async (page) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjQwNWI2MWU5NmFhMmFmMjhiNGFjYTYwNWExNzg3NSIsIm5iZiI6MTcyMzIyNDgzMi45NDc2ODEsInN1YiI6IjY2YjY1MjZkNGQzNzJlNGJhNDI2MDAwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8O8R2IdCxYsZYxvOHIAJepXZ5zUl2zdQYedgXyb4sNM",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return console.log("something went wrong");
    }

    if (data.results && data.results.length > 0) {
      // loop over entire list of movies
      for (movie of data.results) {
        const movieCol = document.createElement("div");

        movieCol.classList.add("col-lg-2");
        movieCol.classList.add("col-md-4");
        movieCol.classList.add("mb-3");
        movieCol.classList.add("pe-0");

        movieCol.innerHTML = `
            <div class="spec_1im clearfix position-relative">
              <div class="spec_1imi clearfix">
                <img src=${`https://image.tmdb.org/t/p/w300${movie.poster_path}`} class="w-100" alt="abc" />
              </div>
              <div
                class="spec_1imi1 row m-0 w-100 h-100 clearfix position-absolute bg_col top-0"
              >
               <div class="container-fluid"> 
                    <div class="row"> 
                             <div class="col-md-9 col-9 p-0">
                  <div class="spec_1imi1l pt-2">
                   
                  </div>
                </div>
                <div class="col-md-3 col-3 pt-3">
                  <div class="spec_1imi1r">
                    <h6 class="text-white">
                      <span
                        class="rating d-inline-block rounded-circle me-2 col_green"
                        >${movie.vote_average.toString().slice(0, 3)}</span
                      >
                    </h6>
                  </div>
                </div>
                    </div>
               </div>
              </div>
            </div>
            <div class="spec_1im1 clearfix">
              <h6 class="text-light fw-normal font_14 mt-3" style="display:flex; align-items:center; justify-content:space-around">
               
                 <span class="span_1 pull-right d-inline-block"> ${
                   movie.original_language
                 }</span>
                <span class="col_red">${movie?.release_date}</span>
               
              </h6>
              <h5 class="mb-0 fs-6">
                <a class="text-white movie-button" href="#" value=${
                  movie.id
                }  data-bs-toggle="modal" data-bs-target="#staticBackdrop" >${
          movie.original_title
        }</a>
              </h5>
            </div>
`;

        movieRow.appendChild(movieCol);
      }

      document.querySelectorAll(".movie-button").forEach((btn) => {
        btn.addEventListener("click", (event) => {
          event.preventDefault();
          return fetchMovieDetails(event.target.getAttribute("value"));
        });
      });
    }
  } catch (error) {
    console.error(error);
  }
};

window.addEventListener("load", () => fetchPopularMovies(page));

// fetch for more movies
moreBtn.addEventListener("click", (event) => {
  event.preventDefault();
  return fetchPopularMovies(page + 1);
});

// fetch single movie details
const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjQwNWI2MWU5NmFhMmFmMjhiNGFjYTYwNWExNzg3NSIsIm5iZiI6MTcyMzIyNDgzMi45NDc2ODEsInN1YiI6IjY2YjY1MjZkNGQzNzJlNGJhNDI2MDAwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8O8R2IdCxYsZYxvOHIAJepXZ5zUl2zdQYedgXyb4sNM",
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      return console.log("something went wrong");
    }

    const modalDialog = document.getElementsByClassName("modal-dialog")[0];

    return (modalDialog.innerHTML = `<div class="modal-content">
          <div class="modal-header">
          <div>
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              ${data?.original_title}
            </h1>
            <p class="movie-year">${data?.genres[0].name}</p> 
                <p class="movie-year">${data?.release_date}</p> 
            </div>
          </div>
          <div class="modal-body">
            <div class="modal-image">
            <img src=${`https://image.tmdb.org/t/p/w300${data?.poster_path}`} alt="..." />
            </div>
            <div class="modal-desc">
            <p style="color:#fff"> ${data?.production_companies[0].name} </p>
            <p>${data?.overview}</p></div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>`);
  } catch (error) {
    console.error(error);
  }
};
