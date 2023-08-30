import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);


  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://movie-api-myflix-39dfea723223.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            image: movie.ImagePath,
            director: {
              name: movie.Director.Name,
              bio:movie.Director.Bio, 
              birth:movie.Director.Birth,
              death:movie.Director.Death
            },
            genre:{
              name: movie.Genre.Name,
              description: movie.Genre.Description
            }
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);


  return (
      <Row className="justify-content-md-center"> 
        {!user ? (

          <Col md={4} >
            <LoginView onLoggedIn={(user) => setUser(user)} />
              <Col className="my-3 text-light">OR</Col>
            <SignupView />
          </Col>
        ) : selectedMovie ? (
        <Col md={12}>
          <MovieView 
            movie={selectedMovie} 
            onBackClick={() => setSelectedMovie(null)} 
          />
        </Col>
        ) : movies.length === 0 ? (
          <div class="text-light">The list is empty!</div>
        ) : (
          <>
            {movies.map((movie) => (
              <Col className="mb-5 movie_card" key={movie.id} md={3}>
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
            <Button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
          </>
        )}
      </Row>
  )
};

export default MainView;