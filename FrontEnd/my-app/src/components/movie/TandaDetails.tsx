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
    const {movie_title, sala_name, start_time, chart_id} : any = useParams();
    const dispatch = useDispatch();

    const tanda = useSelector((state: any) => state.tanda);
    //const {title, actors, description, director, duration, minimum_age, genre, languages, year, image} = tanda;  // destructure object

    const fetchTandaDetail = async() => {
        let s = `'` + start_time + `'` 
        const response : any = await axios
        .get(`http://localhost:5001/api/movies/asientos/${sala_name}/${movie_title}/${start_time}`)
        .catch((err) => {
            console.log("Err: ", err);
        });
        console.log("Asientos reservados")
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

            <div> {start_time}</div>
           
                //    <div className="body">

                // <ul className="showcase">
                //     <li>
                //         <div className="seat"></div>
                //         <small>N/A</small>
                //     </li>
                //     <li>
                //         <div className="seat selected"></div>
                //         <small>Selected</small>
                //     </li>
                //     <li>
                //         <div className="seat occupied"></div>
                //         <small>Occupied</small>
                //     </li>
                // </ul>

                // <div className="container">
                //     <div className="screen"></div>
                //     <div className="row">
                //         <div className={"seat " + (this.state.seats.a1)} onClick={(e) => this.onClickHandler(e , 'a1')}></div>
                //         <div className={"seat " + (this.state.seats.a2)} onClick={(e) => this.onClickHandler(e , 'a2')}></div>
                //         <div className={"seat " + (this.state.seats.a3)} onClick={(e) => this.onClickHandler(e , 'a3')}></div>
                //         <div className={"seat " + (this.state.seats.a4)} onClick={(e) => this.onClickHandler(e , 'a4')}></div>
                //         <div className={"seat " + (this.state.seats.a5)} onClick={(e) => this.onClickHandler(e , 'a5')}></div>
                //         <div className={"seat " + (this.state.seats.a6)} onClick={(e) => this.onClickHandler(e , 'a6')}></div>
                //         <div className={"seat " + (this.state.seats.a7)} onClick={(e) => this.onClickHandler(e , 'a7')}></div>
                //         <div className={"seat " + (this.state.seats.a8)} onClick={(e) => this.onClickHandler(e , 'a8')}></div>
                //     </div>

                //     <div className="row">
                //         <div className={"seat " + (this.state.seats.b1)} onClick={(e) => this.onClickHandler(e , 'b1')}></div>
                //         <div className={"seat " + (this.state.seats.b2)} onClick={(e) => this.onClickHandler(e , 'b2')}></div>
                //         <div className={"seat " + (this.state.seats.b3)} onClick={(e) => this.onClickHandler(e , 'b3')}></div>
                //         <div className={"seat " + (this.state.seats.b4)} onClick={(e) => this.onClickHandler(e , 'b4')}></div>
                //         <div className={"seat " + (this.state.seats.b5)} onClick={(e) => this.onClickHandler(e , 'b5')}></div>
                //         <div className={"seat " + (this.state.seats.b6)} onClick={(e) => this.onClickHandler(e , 'b6')}></div>
                //         <div className={"seat " + (this.state.seats.b7)} onClick={(e) => this.onClickHandler(e , 'b7')}></div>
                //         <div className={"seat " + (this.state.seats.b8)} onClick={(e) => this.onClickHandler(e , 'b8')}></div>
                //     </div>

                //     <div className="row">
                //         <div className={"seat " + (this.state.seats.c1)} onClick={(e) => this.onClickHandler(e , 'c1')}></div>
                //         <div className={"seat " + (this.state.seats.c2)} onClick={(e) => this.onClickHandler(e , 'c2')}></div>
                //         <div className={"seat " + (this.state.seats.c3)} onClick={(e) => this.onClickHandler(e , 'c3')}></div>
                //         <div className={"seat " + (this.state.seats.c4)} onClick={(e) => this.onClickHandler(e , 'c4')}></div>
                //         <div className={"seat " + (this.state.seats.c5)} onClick={(e) => this.onClickHandler(e , 'c5')}></div>
                //         <div className={"seat " + (this.state.seats.c6)} onClick={(e) => this.onClickHandler(e , 'c6')}></div>
                //         <div className={"seat " + (this.state.seats.c7)} onClick={(e) => this.onClickHandler(e , 'c7')}></div>
                //         <div className={"seat " + (this.state.seats.c8)} onClick={(e) => this.onClickHandler(e , 'c8')}></div>
                //     </div>

                //     <div className="row">
                //         <div className={"seat " + (this.state.seats.d1)} onClick={(e) => this.onClickHandler(e , 'd1')}></div>
                //         <div className={"seat " + (this.state.seats.d2)} onClick={(e) => this.onClickHandler(e , 'd2')}></div>
                //         <div className={"seat " + (this.state.seats.d3)} onClick={(e) => this.onClickHandler(e , 'd3')}></div>
                //         <div className={"seat " + (this.state.seats.d4)} onClick={(e) => this.onClickHandler(e , 'd4')}></div>
                //         <div className={"seat " + (this.state.seats.d5)} onClick={(e) => this.onClickHandler(e , 'd5')}></div>
                //         <div className={"seat " + (this.state.seats.d6)} onClick={(e) => this.onClickHandler(e , 'd6')}></div>
                //         <div className={"seat " + (this.state.seats.d7)} onClick={(e) => this.onClickHandler(e , 'd7')}></div>
                //         <div className={"seat " + (this.state.seats.d8)} onClick={(e) => this.onClickHandler(e , 'd8')}></div>
                //     </div>

                //     <div className="row">
                //         <div className={"seat " + (this.state.seats.e1)} onClick={(e) => this.onClickHandler(e , 'e1')}></div>
                //         <div className={"seat " + (this.state.seats.e2)} onClick={(e) => this.onClickHandler(e , 'e2')}></div>
                //         <div className={"seat " + (this.state.seats.e3)} onClick={(e) => this.onClickHandler(e , 'e3')}></div>
                //         <div className={"seat " + (this.state.seats.e4)} onClick={(e) => this.onClickHandler(e , 'e4')}></div>
                //         <div className={"seat " + (this.state.seats.e5)} onClick={(e) => this.onClickHandler(e , 'e5')}></div>
                //         <div className={"seat " + (this.state.seats.e6)} onClick={(e) => this.onClickHandler(e , 'e6')}></div>
                //         <div className={"seat " + (this.state.seats.e7)} onClick={(e) => this.onClickHandler(e , 'e7')}></div>
                //         <div className={"seat " + (this.state.seats.e8)} onClick={(e) => this.onClickHandler(e , 'e8')}></div>
                //     </div>

                //     <div className="row">
                //         <div className={"seat " + (this.state.seats.f1)} onClick={(e) => this.onClickHandler(e , 'f1')}></div>
                //         <div className={"seat " + (this.state.seats.f2)} onClick={(e) => this.onClickHandler(e , 'f2')}></div>
                //         <div className={"seat " + (this.state.seats.f3)} onClick={(e) => this.onClickHandler(e , 'f3')}></div>
                //         <div className={"seat " + (this.state.seats.f4)} onClick={(e) => this.onClickHandler(e , 'f4')}></div>
                //         <div className={"seat " + (this.state.seats.f5)} onClick={(e) => this.onClickHandler(e , 'f5')}></div>
                //         <div className={"seat " + (this.state.seats.f6)} onClick={(e) => this.onClickHandler(e , 'f6')}></div>
                //         <div className={"seat " + (this.state.seats.f7)} onClick={(e) => this.onClickHandler(e , 'f7')}></div>
                //         <div className={"seat " + (this.state.seats.f8)} onClick={(e) => this.onClickHandler(e , 'f8')}></div>
                //     </div>
                // </div>

                // <p className="text">You have selected 
                //     <span>{this.state.selectedSeats}</span>
                //     Seats for the price of
                //     <span>{this.state.totalPrice}</span>
                //     {'\u20B9'}
                //  </p>
                //  </div>
         )
};


export default TandaDetails;