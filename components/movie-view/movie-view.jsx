export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img alt={movie.title} src={movie.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.name}</span>
      <div>
        <span>Bio: </span>
        <span>{movie.director.bio}</span>
      </div>
      <div>
        <span>Birth: </span>
        <span>{movie.director.birth}</span>
      </div>
        <span>Death: </span>
        <span>{movie.director.death}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre.name}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.genre.description}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};