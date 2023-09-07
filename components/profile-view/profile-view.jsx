import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MovieCard } from "../movie-card/movie-card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const ProfileView = ({user, token, onLoggedOut, setUser, movies}) => {
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    const favoriteMovies = movies.filter((movie) => {
        return user.FavoriteMovies.includes(movie.id)
    })
    
    const handleUpdate = (event) => {
    
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch(`https://movie-api-myflix-39dfea723223.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json", Authorization: `Bearer ${token}`
            }
          }).then((response) => {
            if (response.ok) {
              alert("Success")
                return response.json()
            } else {
                alert("Changes failed")
            }
        }).then((data) => {
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
        })
    };

    const handleDeregister = ()=>

    fetch(`https://movie-api-myflix-39dfea723223.herokuapp.com/users/${user.Username}`, {
        method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
            }).then((response) => {
            if (response.ok) {
                alert("Account deleted");
                onLoggedOut()
            } else {
                alert("Account deletion failed");
            }
        });

  return (
    <>
      <Form className = "profile" onSubmit={handleUpdate}>
        <Form.Group controlId="formUsername">
          <h3 className="text-light">Change User Information:</h3>
          <Form.Label className="text-light">New Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength="5" 
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label className="text-light"> New Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label className="text-light"> New Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label className="text-light">New Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>
        <Button className="my-3" variant="primary" type="submit">
          Update
        </Button>
      </Form>
      <Form onClick={handleDeregister}>
        <Button  className="my-3" variant="primary">
          Deregister
        </Button>
      </Form>
      <Row >
            <h1 className="text-light">Favorite movies:</h1>
            {favoriteMovies.map((movie) => (
                <Col className="mb-5" key={movie.id} md={12} >
                    <MovieCard movie={movie}></MovieCard>
                </Col>
            ))}
      </Row>
    </>
  );
};