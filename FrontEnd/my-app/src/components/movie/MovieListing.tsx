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
        .get("ruta del backend api para get movies de la DB")
        .catch((err) => {
            console.log("Err", err);
        });
        dispatch(setMovies(response.data))   //lo mandamos al store de redux, ahora cualquier componente puede acceder a allMovies
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return(
    <div className="ui grid container">
        <MovieComponent />
        <h1>MovieListing</h1>
    </div>
    );
};

export default MovieListing;