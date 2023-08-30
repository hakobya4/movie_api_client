import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Card style={{height:"640px"}}  border="light" bg="dark">
      <Card.Img  variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title class="text-light">{movie.title}</Card.Title>
        <Card.Text class="text-light">{movie.author}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
	movie: PropTypes.shape({
		image: PropTypes.string,
		title: PropTypes.string,
		description: PropTypes.string,
		genre: PropTypes.shape({
			name: PropTypes.string.isRequired,
		}),
		director: PropTypes.shape({
			name: PropTypes.string.isRequired,
		}),
	}).isRequired,
	onMovieClick: PropTypes.func.isRequired,
};