import Table from 'react-bootstrap/Table';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const MovieView = ({ movies,user,token, setUser }) => {
  const { movieId } = useParams();
   const [ favorite, setFavorite ] = useState(false);

    useEffect(() => {
       const inFavorite = user.FavoriteMovies.includes(movieId)
       setFavorite(inFavorite)
    }, []);


    const addFavorite = () => {
        fetch(`https://movie-api-myflix-39dfea723223.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
        }).then((data) => {
            if (data) {
              setFavorite(true);
              localStorage.setItem("user", JSON.stringify(data));
              setUser(data);
            }
        })
    }

    const delFavorite = () => {
        fetch(`https://movie-api-myflix-39dfea723223.herokuapp.com/${user.Username}/favorites/${movieId} `, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
        }).then((data) => {
              if (data) {
              setFavorite(false);
              localStorage.setItem("user", JSON.stringify(data));
              setUser(data);
              }
            })
    };
  const movie = movies.find((b) => b.id === movieId);
  return (
    <div>
      <div>
        <img style={{width: "400px" }} alt={movie.title} src={movie.image} />
      </div>
      <Table striped="columns" className='table table-dark'>
        <tbody>
          <tr>
            <td className="text-light">Title: </td>
            <td className="text-light">{movie.title}</td>
          </tr>
          <tr>
            <td className="text-light">Description: </td>
            <td className="text-light">{movie.description}</td>
          </tr>
          <tr>
            <td className="text-light">Director: </td>
            <td className="text-light"><Link to={`/director/${movie.director.name}`}>{movie.director.name}</Link></td>
          </tr>
          <tr>
            <td className="text-light">Genre: </td>
            <td className="text-light"><Link to={`/genre/${movie.genre.name}`} >{movie.genre.name} </Link></td>
          </tr>
        </tbody>
      </Table>
      <Link to={`/`}>
        <button className="btn btn-outline-success">Back</button>
      </Link>
      {favorite ? (
        <button className="btn btn-outline-success" onClick={delFavorite}>Remove favorite</button>
        ) : (
        <button className="btn btn-outline-success"onClick={addFavorite}>Add favorite</button>
            )}
    </div>
  );
};
