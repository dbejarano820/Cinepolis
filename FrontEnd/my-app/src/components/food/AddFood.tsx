import React, { useEffect } from "react";
import SidebarWithHeader from "../sections/header";
import {
    Flex,
    Box,
    Heading,
    Button,
    VStack,
    WrapItem,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Textarea,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react';
import axios from "axios";
  
const AddFood = () => {

    var data = {
        name: "Default combo",
        price: 1000, 
        type: "combo", 
        amount_available: 10,
        image: "https://images.pexels.com/photos/1619918/pexels-photo-1619918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        description: "Default description"
    }

    const sendData = () => {
        console.log(data) //JSON.stringify(data)
        axios.put("http://localhost:5000/api/food/addFood", data)
            .then((response) => {
                console.log("RESPUESTA DEL PUT: ")
                console.log(response)
                window.location.href='/food';
            })
            .catch((err) => {
                console.log("Err", err);
            }); 
    } 

    const handleSubmit = (event : any) => {   
        console.log('You clicked submit.');
        sendData();
    }

    const updateValue = (event : any) => { 
        switch(event.target.id) { 
            case "name": { 
               data.name = event.target.value;
               break; 
            }
            case "type": { 
                data.type = event.target.value
                break; 
            }
            case "image": { 
                data.image = event.target.value
                break; 
            } 
            case "description": { 
                data.description = event.target.value
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
        <Heading>Nuevo alimento</Heading>
            <WrapItem >
            <Box bg="white" borderRadius="lg">
                <Box m={8} color="#0B0E3F">
                <VStack spacing={5}>
                    <FormControl id="name">
                    <FormLabel>Nombre</FormLabel>
                    <Input type="text" onChange={updateValue} borderColor="#E0E1E7"/>
                    </FormControl>

                    <FormControl id="price">
                    <FormLabel>Precio</FormLabel>
                    <NumberInput onChange={(valueString) => {
                                    data.price = parseInt(valueString)
                                    // console.log(data.price)
                                }} 
                                borderColor="#E0E1E7" 
                                defaultValue={3000} 
                                min={1} 
                                step={100}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    </FormControl>

                    <FormControl id="type">
                    <FormLabel>Tipo</FormLabel>
                    <Select onChange={updateValue} borderColor="#E0E1E7" placeholder='Seleccione el tipo'>
                        <option value='snack'>snack</option>
                        <option value='bebida'>bebida</option>
                        <option value='combo'>combo</option>
                    </Select>
                    </FormControl>

                    <FormControl id="amount_available">
                    <FormLabel>Cantidad disponible</FormLabel>
                    <NumberInput onChange={(valueString) => {
                                    data.amount_available = parseInt(valueString)
                                    // console.log(data.amount_available)
                                }} 
                                borderColor="#E0E1E7" 
                                defaultValue={3} 
                                min={1}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    </FormControl>

                    <FormControl id="image">
                    <FormLabel>Link de la imagen</FormLabel>
                    <Input type="text" onChange={updateValue}/>
                    </FormControl>
                    
                    <FormControl id="description">
                    <FormLabel>Descripción</FormLabel>
                    <Textarea onChange={updateValue} borderColor="#E0E1E7" placeholder="Escriba aquí"/>
                    </FormControl>
                    <FormControl id="name" float="right">


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

export default AddFood;


