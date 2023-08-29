import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.title}
    </div>
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