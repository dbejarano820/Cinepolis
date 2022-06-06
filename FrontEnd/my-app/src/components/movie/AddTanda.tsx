import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SidebarWithHeader from "../sections/header";
import {
    Box,
    Heading,
    Button,
    VStack,
    WrapItem,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Flex,
  } from '@chakra-ui/react';
import axios from "axios";
import { removeSelectedFood } from "../../redux/actions/foodActions";
import { useHistory } from "react-router-dom";
import { removeSelectedMovie } from "../../redux/actions/movieActions";
  
const AddTanda = () => {
    const movie = useSelector((state : any) => state.movie);
    const tandas = useSelector((state: any) => state.allTandas.tandas)
    const {movie_id, title, duration} = movie;
    const dispatch = useDispatch();
    const history = useHistory();

    var data = {
        duration : duration,
        year : 2022,
        month : 1,
        day : 1,
        hour : 23,
        minutes : 59,
        sala_id : 1,
        children : 1,
        general : 1, 
        elderly : 1
    }

    const handleSubmit = async (event : any) => { 
        let _starttime = new Date(data.year, data.month-1, data.day, data.hour, data.minutes, 0, 0);
        let _endtime = new Date(_starttime.getTime() + duration*60000);

        let year1 = ""+_starttime.getFullYear();
        let month1 = ""+((_starttime.getMonth()+1) < 10 ? "0"+(_starttime.getMonth()+1) : ""+(_starttime.getMonth()+1));
        let day1 = ""+(_starttime.getDate() < 10 ? "0"+_starttime.getDate() : ""+_starttime.getDate());
        let hour1 = ""+(_starttime.getHours() < 10 ? "0"+_starttime.getHours() : ""+_starttime.getHours());
        let minutes1 = ""+(_starttime.getMinutes() < 10 ? "0"+_starttime.getMinutes() : ""+_starttime.getMinutes()); 

        let year2 = ""+_endtime.getFullYear();
        let month2 = ""+((_endtime.getMonth()+1) < 10 ? "0"+(_endtime.getMonth()+1) : ""+(_endtime.getMonth()+1));
        let day2 = ""+(_endtime.getDate() < 10 ? "0"+_endtime.getDate() : ""+_endtime.getDate());
        let hour2 = ""+(_endtime.getHours() < 10 ? "0"+_endtime.getHours() : ""+_endtime.getHours());
        let minutes2 = ""+(_endtime.getMinutes() < 10 ? "0"+_endtime.getMinutes() : ""+_endtime.getMinutes()); 

        var info = {
          sala_id: data.sala_id, 
          movie_id : movie_id,
          children : data.children,
          general : data.general,
          elderly : data.elderly,
          starttime : year1+"-"+month1+"-"+day1+" "+hour1+":"+minutes1,
          endtime : year2+"-"+month2+"-"+day2+" "+hour2+":"+minutes2,
        }

        /* - traer todas las tandas de la sala de ese dia cuya starttime sea igual o menor
              al starttime de la tanda y endtime sea mayor o igual
        
              -si no hay nada, quiere decir que la tanda está disponible*/
        const response : any = await axios
          .get(`http://172.30.232.105:5000/api/movies/chart/${info.sala_id}/${info.starttime}`)
          .catch((err) => {
              console.log("Err", err);
          });
          console.log("salaid= " + info.sala_id);
          console.log("starttime= " + info.starttime);
          console.log("response= " + response.data.length);
          if(response.data.length === 0) {
            //añade la tanda
            axios.put("http://172.30.232.105:5000/api/movies/addChart", info)
            .then((response) => {
                alert("La tanda fue añadida");
                dispatch(removeSelectedMovie());
                history.push("/movies");
            })
            .catch((err) => {
                console.log("Err", err);
            }); 
          }
          else {
            alert("La sala está ocupada a esa hora");
          }

            
    }
    
    return(
        <>
        <SidebarWithHeader>
        <Heading>{"Agregar tanda para " + title}</Heading>
            <WrapItem >
            <Box bg="white" borderRadius="lg">
                <Box m={8} color="#0B0E3F">
                <VStack spacing={5}>


                <FormControl id="sala">
                  <FormLabel>Sala</FormLabel>
                  <NumberInput onChange={(valueString) => {
                                  data.sala_id = parseInt(valueString)
                              }} 
                              borderColor="#E0E1E7" 
                              defaultValue={1} 
                              min={1} max={3}>
                      <NumberInputField />
                      <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                      </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl id="date">
                  <FormLabel>Fecha</FormLabel>
                    <Flex direction="row" gap="10px">
                      <NumberInput onChange={(valueString) => {data.year = parseInt(valueString)}} 
                                  borderColor="#E0E1E7"
                                  defaultValue={2022}
                                  min={1900} max={2100}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>

                      <NumberInput onChange={(valueString) => {data.month = parseInt(valueString)}} 
                                  borderColor="#E0E1E7"
                                  defaultValue={12}
                                  min={1} max={12}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>

                      <NumberInput onChange={(valueString) => {data.day = parseInt(valueString)}} 
                                  borderColor="#E0E1E7"
                                  defaultValue={27}
                                  min={1} max={31}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Flex>
                  </FormControl>
                  <FormControl id="hour">
                  <FormLabel>Hora</FormLabel>
                    <Flex direction="row" gap="10px">
                      <NumberInput onChange={(valueString) => {data.hour = parseInt(valueString)}} 
                                  borderColor="#E0E1E7"
                                  defaultValue={23}
                                  min={0} max={23}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>

                      <NumberInput onChange={(valueString) => {data.minutes = parseInt(valueString)}} 
                                  borderColor="#E0E1E7"
                                  defaultValue={59}
                                  min={0} max={59}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Flex>
                  </FormControl>

                  <FormControl id="children">
                  <FormLabel>Precio Entrada Niños</FormLabel>
                  <NumberInput onChange={(valueString) => {
                                  data.children = parseInt(valueString)
                              }} 
                              borderColor="#E0E1E7" 
                              defaultValue={1000} 
                              min={1} max={20000}>
                      <NumberInputField />
                      <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                      </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl id="general">
                  <FormLabel>Precio Entrada General</FormLabel>
                  <NumberInput onChange={(valueString) => {
                                  data.general = parseInt(valueString)
                              }} 
                              borderColor="#E0E1E7" 
                              defaultValue={1500} 
                              min={1} max={20000}>
                      <NumberInputField />
                      <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                      </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl id="elderly">
                  <FormLabel>Precio Entrada Edad Avanzada</FormLabel>
                  <NumberInput onChange={(valueString) => {
                                  data.elderly = parseInt(valueString)
                              }} 
                              borderColor="#E0E1E7" 
                              defaultValue={1000} 
                              min={1} max={20000}>
                      <NumberInputField />
                      <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                      </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                    <FormControl id="button" float="right">
                    <Button
                        variant="solid"
                        bg="#0D74FF"
                        color="white"
                        onClick={handleSubmit}>
                        Guardar
                    </Button>
                    </FormControl>
                </VStack>
                </Box>
            </Box>
            </WrapItem>
        </SidebarWithHeader>
        </>
    );
};

export default AddTanda;


