import React, { useEffect } from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux"
import MovieComponent from "./MovieComponent";
import { setMovies } from "../../redux/actions/movieActions";

const MovieListing = () => {
    const movies = useSelector((state) => state);
    const dispatch = useDispatch();

    const fetchMovies = async () => {
        const response : any = await axios
        .get("http://localhost:5001/api/movies/list")
        .catch((err) => {
            console.log("Err", err);
        });
        console.log(response.data)
        dispatch(setMovies(response.data))   //lo mandamos al store de redux, ahora cualquier componente puede acceder a allMovies
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return(
        <MovieComponent />
    );
};

export default MovieListing;