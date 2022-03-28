/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import { connect, useDispatch, useSelector } from "react-redux";
import { 
    selectedMovie,
    removeSelectedMovie,
    removeSetMovies,
} from "../../redux/actions/movieActions";
import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    VisuallyHidden,
    List,
    ListItem,
  } from '@chakra-ui/react';
  import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
  import { MdLiveTv, MdLocalShipping } from 'react-icons/md';
import { removeSelectedTanda, removeSetTandas, setTandas } from "../../redux/actions/tandaActions";
import { ActionTypes } from "../../redux/constants/action-types";
import { Link } from "react-router-dom";

const TandaDetails = () => {
    // const movie = useSelector((state: any) => state.movie);
    // // const tandas = useSelector((state: any) => state.allTandas.tandas)
    // const {title, actors, description, director, duration, minimum_age, genre, languages, year, image} = movie;  // destructure object
    const {movie_title, sala_name, start_time} : any = useParams();
    const dispatch = useDispatch();

    const tanda = useSelector((state: any) => state.tanda);
    //const {title, actors, description, director, duration, minimum_age, genre, languages, year, image} = tanda;  // destructure object

    const fetchTandaDetail = async() => {
        const response : any = await axios
        .get(`http://localhost:5001/api/movies/asientos/${sala_name}/${movie_title}/${start_time}`)
        .catch((err) => {
            console.log("Err: ", err);
        });
        console.log("LOL")
        console.log(response.data)
        dispatch(selectedMovie(response.data));
    
    };

     useEffect(() => {
        if (movie_title && movie_title !== "") fetchTandaDetail(); 
        return() => {
            dispatch(removeSelectedTanda());
        }
    }, [movie_title]);

        return (
            <div>
                {movie_title}  {sala_name}   {start_time}
            </div>

        )
};


export default TandaDetails;