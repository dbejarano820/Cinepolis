/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component, useEffect, useState} from "react";
import './TandaDetails.css'
import {useParams} from "react-router-dom";
import axios from "axios";
import { connect, useDispatch, useSelector } from "react-redux";
import { 
    selectedMovie,
    removeSelectedMovie,
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
    HStack,
  } from '@chakra-ui/react';
  import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
  import { MdLiveTv, MdLocalShipping } from 'react-icons/md';
import { removeSelectedTanda, selectedTanda, setTandas } from "../../redux/actions/tandaActions";
import { ActionTypes } from "../../redux/constants/action-types";
import { Link } from "react-router-dom";
import { selectedSeat, setSeats } from "../../redux/actions/seatActions";
import { render } from "@testing-library/react";

const TandaDetails = () => {

    const tanda = useSelector((state: any) => state.tanda);
    const {price_children, price_general, price_elderly} = tanda;  // destructure object
    const seats_taken = useSelector((state: any) => state.allSeats.seats)
    const {movie_title, sala_name, start_time, chart_id} : any = useParams();
    const dispatch = useDispatch();

    let seats : {[name: string] : string } = {
        "A1":'reservado', "A2":'selected', "A3":'', "A4":'', "A5":'', "A6":'', "A7":'', "A8":'', "A9":'', "A10":'',
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
    let selectedSeats : number = 0

    const updateSeats = () => {
        console.log(seats_taken)
        seats_taken.map((seat: { seat_row: any; seat_number: any;}) => {
            console.log(seat)
            const {seat_row, seat_number} = seat;
            const s = String(seat_row+seat_number);
           // seats.
           console.log(s)
           seats[s] = 'reservado';
           console.log(s + seats[s]);
        
         })
    };

    // const useForceUpdate = () => {
    //     const [value, setValue] = useState(0); // integer state
    //     console.log("FORCE UPDATE")
    //     return () => setValue(value => value + 1); // update the state to force render
    // };

    const onClickHandler = (e : any , seatName : any) => {
        let updatedSelectedSeats = selectedSeats;
        if (seats[seatName] !== 'reservado') {
            seats[seatName] === '' ? updatedSelectedSeats++ : updatedSelectedSeats--;
        }

        const updatedSeats : {[name: string] : string }  = seats

        if(updatedSeats[seatName]==='reservado') {
            return ;
        }
        updatedSeats[seatName] = seats[seatName] === 'selected' ? '':'selected';
        console.log(updatedSelectedSeats)
        seats = updatedSeats
        selectedSeats = updatedSelectedSeats
        console.log(seats)
    
    }

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

        console.log(seats_taken)
        seats_taken.map((seat: { seat_row: any; seat_number: any;}) => {
            console.log(seat)
            const {seat_row, seat_number} = seat;
            const s = String(seat_row+seat_number);
           // seats.
           console.log(s)
           seats[s] = 'reservado';
           console.log(s + seats[s]);
        }
        )
        

    };



     useEffect(() => {
        if (movie_title && movie_title !== "") fetchTandaDetail(); 
        return() => {
            dispatch(removeSelectedTanda());
        }
    }, [movie_title]);



        return (
           <div>
               <Container> 
                   <HStack> <Text> Children price: ${price_children}      General Price: ${price_general}       Elderly Price: ${price_elderly} </Text></HStack>
                   <div className="bodyy">

                <ul className="showcase">
                    <li>
                        <div className="seat"></div>
                        <small>N/A</small>
                    </li>
                    <li>
                        <div className="seat selected"></div>
                        <small>Selected</small>
                    </li>
                    <li>
                        <div className="seat reservado"></div>
                        <small>Occupied</small>
                    </li>
                </ul>

                <div className="containerr">
                    <div className="screen"></div>
                    <div className="row">
                        <div className={"seat " + (seats.A1)} onClick={(e : any) => onClickHandler(e , 'A1')}></div>
                        <div className={"seat " + (seats.A2)} onClick={(e : any) => onClickHandler(e , 'A2')}></div>
                        <div className={"seat " + (seats.A3)} onClick={(e : any) => onClickHandler(e , 'A3')}></div>
                        <div className={"seat " + (seats.A4)} onClick={(e : any) => onClickHandler(e , 'A4')}></div>
                        <div className={"seat " + (seats.A5)} onClick={(e : any) => onClickHandler(e , 'A5')}></div>
                        <div className={"seat " + (seats.A6)} onClick={(e : any) => onClickHandler(e , 'A6')}></div>
                        <div className={"seat " + (seats.A7)} onClick={(e : any) => onClickHandler(e , 'A7')}></div>
                        <div className={"seat " + (seats.A8)} onClick={(e : any) => onClickHandler(e , 'A8')}></div>
                        <div className={"seat " + (seats.A9)} onClick={(e : any) => onClickHandler(e , 'A9')}></div>
                        <div className={"seat " + (seats.A10)} onClick={(e : any) => onClickHandler(e , 'A10')}></div>
                    </div>

                    <div className="row">
                        <div className={"seat " + (seats.B1)} onClick={(e : any) => onClickHandler(e , 'B1')}></div>
                        <div className={"seat " + (seats.B2)} onClick={(e : any) => onClickHandler(e , 'B2')}></div>
                        <div className={"seat " + (seats.B3)} onClick={(e : any) => onClickHandler(e , 'B3')}></div>
                        <div className={"seat " + (seats.B4)} onClick={(e : any) => onClickHandler(e , 'B4')}></div>
                        <div className={"seat " + (seats.B5)} onClick={(e : any) => onClickHandler(e , 'B5')}></div>
                        <div className={"seat " + (seats.B6)} onClick={(e : any) => onClickHandler(e , 'B6')}></div>
                        <div className={"seat " + (seats.B7)} onClick={(e : any) => onClickHandler(e , 'B7')}></div>
                        <div className={"seat " + (seats.B8)} onClick={(e : any) => onClickHandler(e , 'B8')}></div>
                        <div className={"seat " + (seats.B9)} onClick={(e : any) => onClickHandler(e , 'B9')}></div>
                        <div className={"seat " + (seats.B10)} onClick={(e : any) => onClickHandler(e , 'B10')}></div>
                    </div>

                    <div className="row">
                        <div className={"seat " + (seats.C1)} onClick={(e : any) => onClickHandler(e , 'C1')}></div>
                        <div className={"seat " + (seats.C2)} onClick={(e : any) => onClickHandler(e , 'C2')}></div>
                        <div className={"seat " + (seats.C3)} onClick={(e : any) => onClickHandler(e , 'C3')}></div>
                        <div className={"seat " + (seats.C4)} onClick={(e : any) => onClickHandler(e , 'C4')}></div>
                        <div className={"seat " + (seats.C5)} onClick={(e : any) => onClickHandler(e , 'C5')}></div>
                        <div className={"seat " + (seats.C6)} onClick={(e : any) => onClickHandler(e , 'C6')}></div>
                        <div className={"seat " + (seats.C7)} onClick={(e : any) => onClickHandler(e , 'C7')}></div>
                        <div className={"seat " + (seats.C8)} onClick={(e : any) => onClickHandler(e , 'C8')}></div>
                        <div className={"seat " + (seats.C9)} onClick={(e : any) => onClickHandler(e , 'C9')}></div>
                        <div className={"seat " + (seats.C10)} onClick={(e : any) => onClickHandler(e , 'C10')}></div>
                    </div>

                    <div className="row">
                        <div className={"seat " + (seats.D1)} onClick={(e : any) => onClickHandler(e , 'D1')}></div>
                        <div className={"seat " + (seats.D2)} onClick={(e : any) => onClickHandler(e , 'D2')}></div>
                        <div className={"seat " + (seats.D3)} onClick={(e : any) => onClickHandler(e , 'D3')}></div>
                        <div className={"seat " + (seats.D4)} onClick={(e : any) => onClickHandler(e , 'D4')}></div>
                        <div className={"seat " + (seats.D5)} onClick={(e : any) => onClickHandler(e , 'D5')}></div>
                        <div className={"seat " + (seats.D6)} onClick={(e : any) => onClickHandler(e , 'D6')}></div>
                        <div className={"seat " + (seats.D7)} onClick={(e : any) => onClickHandler(e , 'D7')}></div>
                        <div className={"seat " + (seats.D8)} onClick={(e : any) => onClickHandler(e , 'D8')}></div>
                        <div className={"seat " + (seats.D9)} onClick={(e : any) => onClickHandler(e , 'D9')}></div>
                        <div className={"seat " + (seats.D10)} onClick={(e : any) => onClickHandler(e , 'D10')}></div>
                    </div>

                    <div className="row">
                        <div className={"seat " + (seats.E1)} onClick={(e : any) => onClickHandler(e , 'E1')}></div>
                        <div className={"seat " + (seats.E2)} onClick={(e : any) => onClickHandler(e , 'E2')}></div>
                        <div className={"seat " + (seats.E3)} onClick={(e : any) => onClickHandler(e , 'E3')}></div>
                        <div className={"seat " + (seats.E4)} onClick={(e : any) => onClickHandler(e , 'E4')}></div>
                        <div className={"seat " + (seats.E5)} onClick={(e : any) => onClickHandler(e , 'E5')}></div>
                        <div className={"seat " + (seats.E6)} onClick={(e : any) => onClickHandler(e , 'E6')}></div>
                        <div className={"seat " + (seats.E7)} onClick={(e : any) => onClickHandler(e , 'E7')}></div>
                        <div className={"seat " + (seats.E8)} onClick={(e : any) => onClickHandler(e , 'E8')}></div>
                        <div className={"seat " + (seats.E9)} onClick={(e : any) => onClickHandler(e , 'E9')}></div>
                        <div className={"seat " + (seats.E10)} onClick={(e : any) => onClickHandler(e , 'E10')}></div>
                    </div>

                    <div className="row">
                        <div className={"seat " + (seats.F1)} onClick={(e : any) => onClickHandler(e , 'F1')}></div>
                        <div className={"seat " + (seats.F2)} onClick={(e : any) => onClickHandler(e , 'F2')}></div>
                        <div className={"seat " + (seats.F3)} onClick={(e : any) => onClickHandler(e , 'F3')}></div>
                        <div className={"seat " + (seats.F4)} onClick={(e : any) => onClickHandler(e , 'F4')}></div>
                        <div className={"seat " + (seats.F5)} onClick={(e : any) => onClickHandler(e , 'F5')}></div>
                        <div className={"seat " + (seats.F6)} onClick={(e : any) => onClickHandler(e , 'F6')}></div>
                        <div className={"seat " + (seats.F7)} onClick={(e : any) => onClickHandler(e , 'F7')}></div>
                        <div className={"seat " + (seats.F8)} onClick={(e : any) => onClickHandler(e , 'F8')}></div>
                        <div className={"seat " + (seats.F9)} onClick={(e : any) => onClickHandler(e , 'F9')}></div>
                        <div className={"seat " + (seats.F10)} onClick={(e : any) => onClickHandler(e , 'F10')}></div>
                    </div>

                    <div className="row">
                        <div className={"seat " + (seats.G1)} onClick={(e : any) => onClickHandler(e , 'G1')}></div>
                        <div className={"seat " + (seats.G2)} onClick={(e : any) => onClickHandler(e , 'G2')}></div>
                        <div className={"seat " + (seats.G3)} onClick={(e : any) => onClickHandler(e , 'G3')}></div>
                        <div className={"seat " + (seats.G4)} onClick={(e : any) => onClickHandler(e , 'G4')}></div>
                        <div className={"seat " + (seats.G5)} onClick={(e : any) => onClickHandler(e , 'G5')}></div>
                        <div className={"seat " + (seats.G6)} onClick={(e : any) => onClickHandler(e , 'G6')}></div>
                        <div className={"seat " + (seats.G7)} onClick={(e : any) => onClickHandler(e , 'G7')}></div>
                        <div className={"seat " + (seats.G8)} onClick={(e : any) => onClickHandler(e , 'G8')}></div>
                        <div className={"seat " + (seats.G9)} onClick={(e : any) => onClickHandler(e , 'G9')}></div>
                        <div className={"seat " + (seats.G10)} onClick={(e : any) => onClickHandler(e , 'G10')}></div>
                    </div>

                    <div className="row">
                        <div className={"seat " + (seats.H1)} onClick={(e : any) => onClickHandler(e , 'H1')}></div>
                        <div className={"seat " + (seats.H2)} onClick={(e : any) => onClickHandler(e , 'H2')}></div>
                        <div className={"seat " + (seats.H3)} onClick={(e : any) => onClickHandler(e , 'H3')}></div>
                        <div className={"seat " + (seats.H4)} onClick={(e : any) => onClickHandler(e , 'H4')}></div>
                        <div className={"seat " + (seats.H5)} onClick={(e : any) => onClickHandler(e , 'H5')}></div>
                        <div className={"seat " + (seats.H6)} onClick={(e : any) => onClickHandler(e , 'H6')}></div>
                        <div className={"seat " + (seats.H7)} onClick={(e : any) => onClickHandler(e , 'H7')}></div>
                        <div className={"seat " + (seats.H8)} onClick={(e : any) => onClickHandler(e , 'H8')}></div>
                        <div className={"seat " + (seats.H9)} onClick={(e : any) => onClickHandler(e , 'H9')}></div>
                        <div className={"seat " + (seats.H10)} onClick={(e : any) => onClickHandler(e , 'H10')}></div>
                    </div>

                    <div className="row">
                        <div className={"seat " + (seats.I1)} onClick={(e : any) => onClickHandler(e , 'I1')}></div>
                        <div className={"seat " + (seats.I2)} onClick={(e : any) => onClickHandler(e , 'I2')}></div>
                        <div className={"seat " + (seats.I3)} onClick={(e : any) => onClickHandler(e , 'I3')}></div>
                        <div className={"seat " + (seats.I4)} onClick={(e : any) => onClickHandler(e , 'I4')}></div>
                        <div className={"seat " + (seats.I5)} onClick={(e : any) => onClickHandler(e , 'I5')}></div>
                        <div className={"seat " + (seats.I6)} onClick={(e : any) => onClickHandler(e , 'I6')}></div>
                        <div className={"seat " + (seats.I7)} onClick={(e : any) => onClickHandler(e , 'I7')}></div>
                        <div className={"seat " + (seats.I8)} onClick={(e : any) => onClickHandler(e , 'I8')}></div>
                        <div className={"seat " + (seats.I9)} onClick={(e : any) => onClickHandler(e , 'I9')}></div>
                        <div className={"seat " + (seats.I10)} onClick={(e : any) => onClickHandler(e , 'I10')}></div>
                    </div>

                    <div className="row">
                        <div className={"seat " + (seats.J1)} onClick={(e : any) => onClickHandler(e , 'J1')}></div>
                        <div className={"seat " + (seats.J2)} onClick={(e : any) => onClickHandler(e , 'J2')}></div>
                        <div className={"seat " + (seats.J3)} onClick={(e : any) => onClickHandler(e , 'J3')}></div>
                        <div className={"seat " + (seats.J4)} onClick={(e : any) => onClickHandler(e , 'J4')}></div>
                        <div className={"seat " + (seats.J5)} onClick={(e : any) => onClickHandler(e , 'J5')}></div>
                        <div className={"seat " + (seats.J6)} onClick={(e : any) => onClickHandler(e , 'J6')}></div>
                        <div className={"seat " + (seats.J7)} onClick={(e : any) => onClickHandler(e , 'J7')}></div>
                        <div className={"seat " + (seats.J8)} onClick={(e : any) => onClickHandler(e , 'J8')}></div>
                        <div className={"seat " + (seats.J9)} onClick={(e : any) => onClickHandler(e , 'J9')}></div>
                        <div className={"seat " + (seats.J10)} onClick={(e : any) => onClickHandler(e , 'J10')}></div>
                    </div>
                </div>

                
                </div>

                <p className="text">You have selected 
                    <span>{selectedSeats}</span>
                    Seats for the price of
                 </p>
                 </Container>
                 </div>
      
         )
};


export default TandaDetails;