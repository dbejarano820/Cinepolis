import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MovieComponent = () => {
    const movies = useSelector((state) => state.allMovies.movies);
    const renderList = movies.map((movie) => {
        const {id, title, image} = movie
        return(
            //chakra ui
            <div>
            <text>
                {title}
            </text>
            <Link to={`/movie/${title}`}>  
            <img src={image} />
            </Link>
            </div>
        );

    })

    return <>{renderList}</>
};

export default MovieComponent;