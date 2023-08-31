import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    fetch("https://movie-api-myflix-39dfea723223.herokuapp.com/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
      },
        body: JSON.stringify(data)
      }).then((response) => response.json()) //changes response to a json object so it can extract the jwt
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token); //pass user and token back to MainView so any API requests can see it
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
    };

  return (
    <Form className = "login" onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label className="text-light">Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="5" 
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label className="text-light">Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button className="my-3" variant="primary" type="submit">
        Log-In
      </Button>
    </Form>
  );
};