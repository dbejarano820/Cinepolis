/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { 
    selectedMovie,
    removeSelectedMovie,
} from "../../redux/actions/movieActions";

const MovieDetails = () => {
    const movieTitle : any = useParams();
    const movie = useSelector((state : any) => state.movie);
    const {image, title, minimumAge} = movie;  // destructure object
    const dispatch = useDispatch();

    const fetchMovieDetail = async() => {
        const response : any = await axios
        .get(`backend api/${movieTitle}`)
        .catch((err) => {
            console.log("Err: ", err);
        });
        
        dispatch(selectedMovie(response.data));
    };

    useEffect(() => {
        if (movieTitle && movieTitle !== "") fetchMovieDetail(); 
        return() => {
            dispatch(removeSelectedMovie());
        }
    }, [movieTitle])




    return(  //display selected movie details ... detalles y tandas
    <div>
        <h1>MovieDetails</h1>
    </div>
    );
};

export default MovieDetails;