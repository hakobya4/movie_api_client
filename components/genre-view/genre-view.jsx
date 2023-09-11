import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { useParams } from "react-router";

export const GenreView = ({token}) => {
     const [genres, setGenres] = useState([]);
     const { genre } = useParams();

    useEffect(() => {
    if (!token) {
      return;
    }
    fetch(`https://movie-api-myflix-39dfea723223.herokuapp.com/genre/${genre}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.Genre);
      });
  }, [token]);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch(`https://movie-api-myflix-39dfea723223.herokuapp.com/movies/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.Genre);
      });
  }, [token]);
  return (
    
    <div>
      <Table striped="columns" className='table table-dark'>
        <tbody>
          <tr>
            <td className="text-light">Genre: </td>
            <td className="text-light">{genres.Name}</td>
          </tr>
          <tr>
            <td className="text-light">Description: </td>
            <td className="text-light">{genres.Description}</td>
          </tr>
        </tbody>
      </Table>
      <Link to={`/`}>
        <button className="btn btn-outline-success">Back</button>
      </Link>
    </div>
  );
};