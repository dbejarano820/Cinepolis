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
import { removeSelectedTanda, selectedTanda, setTandas } from "../../redux/actions/tandaActions";
import { ActionTypes } from "../../redux/constants/action-types";
import { Link } from "react-router-dom";
import { selectedSeat, setSeats } from "../../redux/actions/seatActions";

const TandaDetails = () => {


    const tanda = useSelector((state: any) => state.tanda);
    const {price_children, price_general, price_elderly} = tanda;  // destructure object
    const seats_taken = useSelector((state: any) => state.allSeats.seats)
    const {movie_title, sala_name, start_time, chart_id} : any = useParams();
    const dispatch = useDispatch();

    let seats = {
        "A1":'Occupied', "A2":'', "A3":'', "A4":'', "A5":'', "A6":'', "A7":'', "A8":'', "A9":'', "A10":'',
        "B1":'', "B2":'', "B3":'', "B4":'', "B5":'', "B6":'', "B7":'', "B8":'', "B9":'', "B10":'',
        "C1":'', "C2":'', "C3":'', "C4":'', "C5":'', "C6":'', "C7":'', "C8":'', "C9":'', "C10":'',
        "D1":'', "D2":'', "D3":'', "D4":'', "D5":'', "D6":'', "D7":'', "D8":'', "D9":'', "D10":'',
        "E1":'', "E2":'', "E3":'', "E4":'', "E5":'', "E6":'', "E7":'', "E8":'', "E9":'', "E10":'',
        "F1":'', "F2":'', "F3":'', "F4":'', "F5":'', "F6":'', "F7":'', "F8":'', "F9":'', "F10":'',
        "G1":'', "G2":'', "G3":'', "G4":'', "G5":'', "G6":'', "G7":'', "G8":'', "G9":'', "G10":'',
        "H1":'', "H2":'', "H3":'', "H4":'', "H5":'', "H6":'', "H7":'', "H8":'', "H9":'', "H10":'',
        "I1":'', "I2":'', "I3":'', "I4":'', "I5":'', "I6":'', "I7":'', "I8":'', "I9":'', "I10":'',
        "J1":'', "J2":'', "J3":'', "J4":'', "J5":'', "J6":'', "J7":'', "J8":'', "J9":'', "J10":'',

    };


    // const updateSeats = () => {
    //     seats_taken.map((seat: { row: any; number: any;}) => {
    //         const {row, number} = seat;
    //         console.log(seats[String(123)]);
    //      }
    // };

    const fetchTandaDetail = async() => {
        
        const response1 : any = await axios
        .get(`http://localhost:5000/api/movies/tanda/${chart_id}`)
        .catch((err) => {
            console.log("Err: ", err);
        });
        dispatch(selectedTanda(response1.data));

        const response : any = await axios
        .get(`http://localhost:5000/api/movies/asientos/${sala_name}/${movie_title}/${start_time}`)
        .catch((err) => {
            console.log("Err: ", err);
        });
        dispatch(setSeats(response.data));

    };

     useEffect(() => {
        if (movie_title && movie_title !== "") fetchTandaDetail(); 
        return() => {
            dispatch(removeSelectedTanda());
        }
    }, [movie_title]);



        return (

            <div> Children price: {price_children}   General Price: {price_general}    Elderly Price: {price_elderly}</div>

    //         onst movies = useSelector((state : RootStateOrAny) => state.allMovies.movies);
    // const renderList = movies.map((movie: { movie_id: any; title: any; image: any; }) => {
    //     const {movie_id, title, image} = movie
    //     return(
    //         //chakra ui
    //         <div key={title}>
    //         <Link to={`/movies/${title}`}> 
           
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