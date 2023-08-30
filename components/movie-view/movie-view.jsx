import Table from 'react-bootstrap/Table';

export const MovieView = ({ movie, onBackClick }) => {
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
      <div>
        <button variant="primary" onClick={onBackClick}>Back</button>
      </div>
    </div>
  );
};