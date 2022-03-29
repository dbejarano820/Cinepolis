/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import SidebarWithHeader from "../components/sections/header";
import MovieDetails from "../components/movie/MovieDetails";

const MoviesPage = () => {

    return(  //display selected movie details ... detalles y tandas
    <div>
    <SidebarWithHeader> 
        <MovieDetails/>
     </SidebarWithHeader>
    </div>
    );
};

export default MoviesPage;
