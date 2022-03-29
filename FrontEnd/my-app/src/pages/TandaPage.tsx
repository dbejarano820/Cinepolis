/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import MovieListing from "../components/movie/MovieListing";
import TandaDetails from "../components/movie/TandaDetails";
import SidebarWithHeader from "../components/sections/header";

const TandaPage = () => {


    return(  //display selected movie details ... detalles y tandas
    <div>
    <SidebarWithHeader> 
        <TandaDetails></TandaDetails>
     </SidebarWithHeader>
    </div>
    );
};

export default TandaPage;