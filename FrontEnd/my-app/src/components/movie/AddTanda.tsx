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
    const {movie_id, title} = movie;
    const dispatch = useDispatch();
    const history = useHistory();

    var data = {
        title : title,
        year : "2022",
        month : 1,
        day : 1,
        hour : 23,
        minutes : 59,
        sala_id : 1
    }

    const handleSubmit = (event : any) => {  
        let month = data.month < 10 ? "0"+data.month : ""+data.month;
        let day = data.day < 10 ? "0"+data.day : ""+data.day;
        let hour = data.hour < 10 ? "0"+data.hour : ""+data.hour;
        let minutes = data.minutes < 10 ? "0"+data.minutes : ""+data.minutes;
        var info = {
          sala_id: data.sala_id, 
          movie_id : movie_id,
          date : data.year+"-"+month+"-"+day+" "+hour+":"+minutes
        }

        /* - traer todas las tandas de la sala de ese dia
            - revisar la duracion de la más cercana antes de esa hora
            - revisar si la mas cercana despues de esa hora+duracion choca
            - se agrega*/

            //añade la tanda
        axios.put("http://localhost:5000/api/movies/addChart", info)
            .then((response) => {
                dispatch(removeSelectedMovie());
                history.push("/movies");
            })
            .catch((err) => {
                console.log("Err", err);
            }); 
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
                      <NumberInput onChange={(valueString) => {data.year = valueString}} 
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


