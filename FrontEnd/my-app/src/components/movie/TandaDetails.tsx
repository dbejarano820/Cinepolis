/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component, useEffect, useState} from "react";
import './TandaDetails.css'
import {useHistory, useParams} from "react-router-dom";
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
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react';
  import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
  import { MdLiveTv, MdLocalShipping } from 'react-icons/md';
import { removeSelectedTanda, selectedTanda, setTandas } from "../../redux/actions/tandaActions";
import { ActionTypes } from "../../redux/constants/action-types";
import { Link } from "react-router-dom";
import { selectedSeat, setAmountSelectedSeats, setSeatMap, setSeats } from "../../redux/actions/seatActions";
import { render } from "@testing-library/react";
import { setCart } from "../../redux/actions/cartActions";

const TandaDetails = () => {

    const tanda = useSelector((state: any) => state.tanda);
    const history = useHistory();
    console.log("TANDA")
    console.log(tanda)
    const {price_children, price_general, price_elderly} = tanda;  // destructure object
    let seats_taken = useSelector((state: any) => state.allSeats.seats)
    let seats = useSelector((state: any) => state.allSeats.seat_map)
    let items = useSelector((state: any) => state.cart.items)
    const {movie_title, sala_name, start_time, chart_id} : any = useParams();
    const [rerender, setRerender] = useState(false);
    const dispatch = useDispatch();

    let generalAmount = 0
    let childrenAmount = 0
    let elderlyAmount = 0



  
   let selectedSeats = useSelector((state: any) => state.allSeats.amount_selected_seats)



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
        seats = updatedSeats
        dispatch(setAmountSelectedSeats(updatedSelectedSeats))
        console.log(selectedSeats)
        console.log("RERENDER")
        setRerender(!rerender); 
    
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

        console.log("responde data seats")
        console.log(response.data)
        dispatch(setSeats(response.data));
        const seats_taken_tmp = response.data
        
        console.log("SEATS TAKEN")
        console.log(seats_taken_tmp)
        seats_taken_tmp.map((seat: { seat_row: any; seat_number: any;}) => {
            const {seat_row, seat_number} = seat;
            const s = String(seat_row+seat_number);
           seats[s] = 'reservado';
        }
        )
        console.log("SEATS")
        console.log(seats)
        dispatch(setSeatMap(seats));
        setRerender(!rerender); 
        

    };

    const typeCounter = (e: any, value: any, type: any) => {
        if (type === 'General'){
            generalAmount = value;
        }
        else if ( type === 'Children'){
            childrenAmount = value;
        }
        else{
            elderlyAmount = value;
        }
    }

    const addSeatsToCart = () => {

        if ( (generalAmount + childrenAmount + elderlyAmount) !== selectedSeats)
            return;
        
        for (var key in seats){
            if(seats[key] === 'selected'){
                let _row = key.substring(0,1);
                let _num 
                if(key.length === 3)
                    _num = key.substring(1,3)
                else    
                    _num = key.substring(1)

                let _price, _style 

                if(generalAmount !== 0){
                    generalAmount--
                    _price = price_general
                    _style = 'General'
                } else if (childrenAmount !== 0){
                    childrenAmount--
                    _price = price_children
                    _style = 'Children'
                } else if(elderlyAmount !== 0){
                    elderlyAmount--
                    _price = price_elderly
                    _style = 'Elderly'
                }

                const tmp = {
                    type : "Ticket",
                    row : _row,
                    num : _num,
                    price: _price,
                    style: _style,
                    sala : sala_name,
                    movie : movie_title,
                    time : start_time,
                }

                items.push(tmp);
                dispatch(setCart(items))
            }

        }
        history.push("/checkout")
    }



     useEffect(() => {
        if (movie_title && movie_title !== "") fetchTandaDetail(); 
        return() => {
            dispatch(removeSelectedTanda());
        }
    }, [movie_title]);



        return (
           <div>
               <Container> 
                   
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
               
                <Button onClick ={()=> addSeatsToCart()}>Add to Cart</Button>
                 <VStack
                   spacing={4}
                   align='stretch'>  
                   <Box> Cantitdad de Asientos elegidos : {selectedSeats}</Box>
                   <Box>Children price: ${price_children}   
                        <NumberInput size='sm' maxW={20} defaultValue={0} min={0} max={selectedSeats} onChange={(e : any, value: any) => typeCounter(e , value, 'Children')}>
                            <NumberInputField />
                            <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                            </NumberInputStepper>
                            </NumberInput>
                    </Box>   
                   <Box>General Price: ${price_general}  
                   
                   <NumberInput size='sm' maxW={20} defaultValue={0} min={0} max={selectedSeats} onChange={(e : any, value: any) => typeCounter(e , value, 'General')}>
                            <NumberInputField />
                            <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                            </NumberInputStepper>
                            </NumberInput>
                    </Box>    
                   <Box> Elderly Price: ${price_elderly} 
                   <NumberInput size='sm' maxW={20} defaultValue={0} min={0} max={selectedSeats} onChange={(e : any, value: any) => typeCounter(e , value, 'Elderly')}>
                            <NumberInputField />
                            <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                            </NumberInputStepper>
                            </NumberInput>
                   </Box>
                   </VStack>
               
                 </Container>
                 </div>
      
         )
};


export default TandaDetails;