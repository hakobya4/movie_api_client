import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [selectedMovies, searchMovies] = useState("");

  const [movies, setMovies] = useState([]);



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
    <BrowserRouter>
      <NavigationBar
          user={user}
          onLoggedOut={() => { setUser(null); setToken(null); localStorage.clear(); }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} user={user}  setUser={setUser} token={token}/>
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={5}>
                    <ProfileView user={user} setUser={setUser} token={token} movies={movies} onLoggedOut={() => { setUser(null); setToken(null); localStorage.clear(); }}/>
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/genre/:genre"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <GenreView token={token} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/director/:director"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <DirectorView token={token}/>
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                  <Row className="d-flex m-2 justify-content-end">
                    <Col xs="auto">
                      <Form.Control
                        onChange={(e) => searchMovies(e.target.value)}
                        type="text"
                        placeholder="Title Genre or Director"
                        className=" mr-sm-2"
                      />
                    </Col>
                    <Col xs="auto">
                      <Button type="submit" variant="outline-success">Submit</Button>
                    </Col>
                  </Row>
                  {movies.filter((movie) => {
                        return selectedMovies === "" ? movie :
                          movie.title.toLowerCase().includes(selectedMovies.toLowerCase()) ||
                          movie.genre.name.toLowerCase().includes(selectedMovies.toLowerCase())||
                          movie.director.name.toLowerCase().includes(selectedMovies.toLowerCase())
                      }
                    ).map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
