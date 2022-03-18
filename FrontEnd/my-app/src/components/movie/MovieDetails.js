import React, { useEffect } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectedMovie } from "../../redux/actions/movieActions";

const MovieDetails = () => {
    const { movieTitle } = useParams();
    const movie = useSelector((state) => state.movie);
    const {image, title, minimumAge} = movie;  // destructure object
    const dispatch = useDispatch();

    const fetchMovieDetail = async() => {
        const response = await axios
        .get(`backend api/${movieTitle}`)
        .catch((err) => {
            console.log("Err: ", err);
        });
        
        dispatch(selectedMovie(response.data));
    };

    useEffect(() => {
        if (movieTitle && movieTitle !== "") fetchMovieDetail(); 
    }, [movieTitle])




    return(  //display selected movie details ... detalles y tandas
    <div>
        <h1>MovieDetails</h1>
    </div>
    );
};

export default MovieDetails;