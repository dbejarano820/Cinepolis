/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, RootStateOrAny } from "react-redux";

const MovieComponent = () => {
    const movies = useSelector((state : RootStateOrAny) => state.allMovies.movies);
    const renderList = movies.map((movie: { id: any; title: any; image: any; }) => {
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