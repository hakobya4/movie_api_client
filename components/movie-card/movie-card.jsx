import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card style={{height:"640px"}} border="light" bg="dark">
      <Card.Img variant="top" w-100 src={movie.image} />
      <Card.Body>
        <Card.Title class="text-light">{movie.title}</Card.Title>
        <Card.Text class="text-light">{movie.director.name}</Card.Text>
        <Button onClick={() => onMovieClick(movie)}>
          Open
        </Button>
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