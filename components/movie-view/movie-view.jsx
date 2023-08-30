import Table from 'react-bootstrap/Table';
import { useParams } from "react-router";
import { Link } from "react-router-dom";




export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((b) => b.id === movieId);
  return (
    
    <div>
      <div>
        <img style={{width: "400px" }} alt={movie.title} src={movie.image} />
      </div>
      <Table striped="columns">
        <tbody>
          <tr>
            <td class="text-light">Title: </td>
            <td class="text-light">{movie.title}</td>
          </tr>
          <tr>
            <td class="text-light">Description: </td>
            <td class="text-light">{movie.description}</td>
          </tr>
          <tr>
            <td class="text-light">Director: </td>
            <td class="text-light">{movie.director.name}</td>
          </tr>
          <tr>
            <td class="text-light">Genre: </td>
            <td class="text-light">{movie.genre.name}</td>
          </tr>
        </tbody>
      </Table>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};