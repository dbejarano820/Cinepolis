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
  } from '@chakra-ui/react';
import axios from "axios";
import { removeSelectedFood } from "../../redux/actions/foodActions";
import { useHistory } from "react-router-dom";
import { removeSelectedMovie } from "../../redux/actions/movieActions";
  
const AddMovie = () => {
    const movie = useSelector((state : any) => state.movie);
    const {movie_id, title, actors, description, director, 
          duration, minimum_age, genre, languages, year, image} = movie;
    const dispatch = useDispatch();
    const history = useHistory();

    var data = {
        title : "default", 
        actors : "default", 
        description : "default",
        director : "default", 
        duration : 60, 
        minimum_age : 23, 
        genre : "default", 
        languages : "default", 
        year : 2023, 
        image : "https://images.pexels.com/photos/1619918/pexels-photo-1619918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    }

    Object.keys(movie).length !== 0 ? (
        data = {
          title : title, 
          actors : actors, 
          description : description,
          director : director, 
          duration : duration, 
          minimum_age : minimum_age, 
          genre : genre, 
          languages : languages, 
          year : year, 
          image : image,
        }) : (
        data = {
          title : "default", 
          actors : "default", 
          description : "default",
          director : "default", 
          duration : 60, 
          minimum_age : 23, 
          genre : "default", 
          languages : "default", 
          year : 2023, 
          image : "https://images.pexels.com/photos/1619918/pexels-photo-1619918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        })

    const sendData = () => {
        console.log(movie_id,data) 
        axios.put("http://172.30.232.105:5000/api/movies/add", data)
            .then((response) => {
                dispatch(removeSelectedMovie());
                history.push("/movies");
            })
            .catch((err) => {
                console.log("Err", err);
            }); 
    } 

    const updateData = () => {
        console.log('DATA DEL UPDATE', movie_id, data)

        axios.put(`http://172.30.232.105:5000/api/movies/update/${movie_id}`, data)
            .then((response) => {
                dispatch(removeSelectedMovie());
                history.push("/movies");
            })
            .catch((err) => {
                console.log("Err", err);
            }); 
    }

    const handleSubmit = (event : any) => {   
        // console.log('You clicked submit.');
        //sacar los valores de los input
        sendData();
    }

    const handleUpdate = (event : any) => {
        // console.log('You clicked UPDATE.');
        updateData();
    }

    const updateValue = (event : any) => { 
        switch(event.target.id) { 
            case "title": { 
               data.title = event.target.value;
               break; 
            }
            case "actors": { 
                data.actors = event.target.value
                break; 
            }
            case "description": { 
              data.description = event.target.value
              break; 
            } 
            case "director": { 
              data.director = event.target.value
              break; 
            } 
            case "genre": { 
              data.genre = event.target.value
              break; 
            } 
            case "languages": { 
              data.languages = event.target.value
              break; 
            }
            case "image": { 
                data.image = event.target.value
                break; 
            } 
            default: { 
               //statements; 
               break; 
            } 
        }
        // console.log(event.target.value);        
    }
    
    return(
        <>
        <SidebarWithHeader>
        <Heading>{Object.keys(movie).length !== 0 ? "Editar película" : "Nuevo película"}</Heading>
            <WrapItem >
            <Box bg="white" borderRadius="lg">
                <Box m={8} color="#0B0E3F">
                <VStack spacing={5}>
                    <FormControl id="title">
                    <FormLabel>Título</FormLabel>
                    <Input  type="text"
                            onChange={updateValue}
                            borderColor="#E0E1E7"
                            defaultValue={Object.keys(movie).length != 0 ? title : ""}
                            />
                    </FormControl>

                    <FormControl id="actors">
                    <FormLabel>Reparto</FormLabel>
                    <Textarea onChange={updateValue} 
                                borderColor="#E0E1E7" 
                                defaultValue={Object.keys(movie).length !== 0 ? actors : ""}
                                placeholder="Lista de actores"/>
                    </FormControl>

                    <FormControl id="description">
                    <FormLabel>Descripción</FormLabel>
                    <Textarea onChange={updateValue} 
                                borderColor="#E0E1E7" 
                                defaultValue={Object.keys(movie).length !== 0 ? description : ""}
                                placeholder="Plot de la película"/>
                    </FormControl>

                    <FormControl id="director">
                    <FormLabel>Dirigida por</FormLabel>
                    <Input  type="text"
                            onChange={updateValue}
                            borderColor="#E0E1E7"
                            defaultValue={Object.keys(movie).length != 0 ? director : ""}
                            />
                    </FormControl>

                    <FormControl id="duration">
                    <FormLabel>Duración en minutos</FormLabel>
                    <NumberInput onChange={(valueString) => {
                                    data.duration = parseInt(valueString)
                                }} 
                                borderColor="#E0E1E7" 
                                defaultValue={Object.keys(movie).length !== 0 ? duration : 60} 
                                min={1} 
                                step={10}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    </FormControl>

                    <FormControl id="minimum_age">
                    <FormLabel>Edad mínima</FormLabel>
                    <NumberInput onChange={(valueString) => {
                                    data.minimum_age = parseInt(valueString)
                                }} 
                                borderColor="#E0E1E7" 
                                defaultValue={Object.keys(movie).length !== 0 ? minimum_age : 0} 
                                min={0} 
                                step={10}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    </FormControl>

                    <FormControl id="genre">
                    <FormLabel>Género</FormLabel>
                    <Input  type="text"
                            onChange={updateValue}
                            borderColor="#E0E1E7"
                            defaultValue={Object.keys(movie).length != 0 ? genre : ""}
                            />
                    </FormControl>

                    <FormControl id="languages">
                    <FormLabel>Idiomas</FormLabel>
                    <Textarea onChange={updateValue} 
                                borderColor="#E0E1E7" 
                                defaultValue={Object.keys(movie).length !== 0 ? languages : ""}
                                placeholder="Idiomas disponibles"/>
                    </FormControl>

                    <FormControl id="year">
                    <FormLabel>Año</FormLabel>
                    <NumberInput onChange={(valueString) => {
                                    data.year = parseInt(valueString)
                                }} 
                                borderColor="#E0E1E7" 
                                defaultValue={Object.keys(movie).length !== 0 ? year : 2022} 
                                min={1900} 
                                step={100}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    </FormControl>

                    <FormControl id="image">
                    <FormLabel>Imagen</FormLabel>
                    <Input  type="text"
                            onChange={updateValue}
                            borderColor="#E0E1E7"
                            defaultValue={Object.keys(movie).length != 0 ? image : ""}
                            />
                    </FormControl>


                    <FormControl id="button" float="right">
                    <Button
                        variant="solid"
                        bg="#0D74FF"
                        color="white"
                        onClick={Object.keys(movie).length !== 0 ? handleUpdate : handleSubmit}>
                        {Object.keys(movie).length !== 0 ? 'Guardar cambios' : 'Guardar'}
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

export default AddMovie;


