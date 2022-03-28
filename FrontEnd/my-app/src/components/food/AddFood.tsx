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
  
const AddFood = () => {
    const food = useSelector((state : any) => state.food);
    const {food_id, name, price, type, amount_available, image, description} = food;
    const dispatch = useDispatch();
    const history = useHistory();

    var data = {
        name: "Default combo",
        price: 1000, 
        type: "combo", 
        amount_available: 10,
        image: "https://images.pexels.com/photos/1619918/pexels-photo-1619918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        description: "Default description"
    }

    Object.keys(food).length !== 0 ? (
        data = {
            name: name,
            price: price, 
            type: type, 
            amount_available: amount_available,
            image: image,
            description: description
        }) : (
        data = {
            name: "Default combo",
            price: 1000, 
            type: "combo", 
            amount_available: 10,
            image: "https://images.pexels.com/photos/1619918/pexels-photo-1619918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            description: "Default description"
        })

    const sendData = () => {
        // console.log(data) 
        axios.put("http://localhost:5000/api/food/add", data)
            .then((response) => {
                dispatch(removeSelectedFood());
                history.push("/food");
            })
            .catch((err) => {
                console.log("Err", err);
            }); 
    } 

    const updateData = () => {
        // console.log('DATA DEL UPDATE', food_id, data)

        axios.put(`http://localhost:5000/api/food/update/${food_id}`, data)
            .then((response) => {
                dispatch(removeSelectedFood());
                history.push("/food");
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
        <Heading>{Object.keys(food).length !== 0 ? "Editar alimento" : "Nuevo alimento"}</Heading>
            <WrapItem >
            <Box bg="white" borderRadius="lg">
                <Box m={8} color="#0B0E3F">
                <VStack spacing={5}>
                    <FormControl id="name">
                    <FormLabel>Nombre</FormLabel>
                    <Input  type="text"
                            onChange={updateValue}
                            borderColor="#E0E1E7"
                            defaultValue={Object.keys(food).length != 0 ? name : ""}
                            />
                    </FormControl>

                    <FormControl id="price">
                    <FormLabel>Precio</FormLabel>
                    <NumberInput onChange={(valueString) => {
                                    data.price = parseInt(valueString)
                                    // console.log(data.price)
                                }} 
                                borderColor="#E0E1E7" 
                                defaultValue={Object.keys(food).length !== 0 ? price : 3000} 
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
                    <Select onChange={updateValue} 
                        borderColor="#E0E1E7"
                        defaultValue={Object.keys(food).length !== 0 ? type : 'snack'}>
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
                                defaultValue={Object.keys(food).length !== 0 ? amount_available : 3}
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
                    <Input type="text" 
                            onChange={updateValue}
                            defaultValue={Object.keys(food).length !== 0 ? image : ""}/>
                    </FormControl>
                    
                    <FormControl id="description">
                    <FormLabel>Descripción</FormLabel>
                    <Textarea onChange={updateValue} 
                                borderColor="#E0E1E7" 
                                defaultValue={Object.keys(food).length !== 0 ? description : ""}
                                placeholder="Escriba detalles importantes del producto"/>
                    </FormControl>

                    <FormControl id="button" float="right">
                    <Button
                        variant="solid"
                        bg="#0D74FF"
                        color="white"
                        onClick={Object.keys(food).length !== 0 ? handleUpdate : handleSubmit}>
                        {Object.keys(food).length !== 0 ? 'Guardar cambios' : 'Guardar'}
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


