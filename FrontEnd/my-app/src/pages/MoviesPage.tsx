/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import MovieListing from "../components/movie/MovieListing";
import SidebarWithHeader from "../components/sections/header";

const MoviesPage = () => {


    return(  //display selected movie details ... detalles y tandas
    <div>
    <SidebarWithHeader> 
        <MovieListing/>
     </SidebarWithHeader>
    </div>
    );
};

export default MoviesPage;