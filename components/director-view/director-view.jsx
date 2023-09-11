import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { useParams } from "react-router";

export const DirectorView = ({token}) => {
    const [directors, setDirectors] = useState([]);
    const { director } = useParams();
    useEffect(() => {
    if (!token) {
      return;
    }
    fetch(`https://movie-api-myflix-39dfea723223.herokuapp.com/director/${director}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        setDirectors(data.Director);
      });
  }, [token]);
  return (
    
    <div>
      <Table striped="columns" className='table table-dark'>
        <tbody>
          <tr>
            <td className="text-light">Director: </td>
            <td className="text-light">{directors.Name}</td>
          </tr>
          <tr>
            <td className="text-light">Bio: </td>
            <td className="text-light">{directors.Bio}</td>
          </tr>
          <tr>
            <td className="text-light">Birth: </td>
            <td className="text-light">{directors.Birth}</td>
          </tr>
          <tr>
            <td className="text-light">Death: </td>
            <td className="text-light">{directors.Death}</td>
          </tr>
        </tbody>
      </Table>
      <Link to={`/`}>
        <button className="btn btn-outline-success">Back</button>
      </Link>
    </div>
  );
};