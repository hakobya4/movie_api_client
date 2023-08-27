import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Shawshank Redemption",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkmMH-bEDUS2TmK8amBqgIMgrfzN1_mImChPuMrunA1XjNTSKm",
      description:"Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
      genre:"Drama",
      director: "Frank Darabont"
    },
    {
      id: 2,
      title: "The Godfather",
      image:
        "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg",
      description:"Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.",
      genre:"Drama",
      director: "Francis Ford Coppola"
    },
    {
      id: 3,
      title: "The Dark Knight",
      image:
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ8pugr7ojVTtgyY_dOd078yGXXVJW8eOfXlcE2mqleMeKuEHmg",
      description:"Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.",
      genre:"Action",
      director: "Christopher Nolan"
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movieData={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            movieData={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        );
      })}
    </div>
  );
};

export default MainView;