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
import { removeSelectedAdminUser } from "../../redux/actions/userActions";
  
const AddUser = () => {
  const user = useSelector((state : any) => state.adminUser);
  const {user_id, name, lastname, password, birthday, vaccines, usertype_id, secondlastname} = user;
  const dispatch = useDispatch();
  const history = useHistory();

  var data = {
    name : "DEFAULT",
    lastname : "DEFAULT", 
    password : "default123",
    year : "2022",
    month : "03",
    day : "01",
    vaccines : 0,
    usertype_id : 1, 
    secondlastname : "DEFAULT",
  }

  Object.keys(user).length !== 0 ? (
    data = {
      name : name,
      lastname : lastname, 
      password : password,
      year : birthday.slice(0,4),
      month : birthday.slice(5,7),
      day : birthday.slice(8,10),
      vaccines : vaccines,
      usertype_id : usertype_id, 
      secondlastname : secondlastname,
    }) : (
    data = {
      name : "DEFAULT",
      lastname : "DEFAULT", 
      password : "default123",
      year : "2022",
      month : "03",
      day : "01",
      vaccines : 0,
      usertype_id : 1, 
      secondlastname : "DEFAULT",
    })

  const sendData = () => {
    const userAdd = {
      name : data.name,
      lastname : data.lastname, 
      password : data.password,
      birthday : ( data.year + "-" + 
                  (data.month.length < 2 ? "0"+data.month : data.month) + "-" +
                  (data.day.length < 2 ? "0"+data.day : data.day)
                 ),
      vaccines : data.vaccines,
      usertype_id : data.usertype_id, 
      secondlastname : data.secondlastname,
    }

    console.log(userAdd)

    // axios.put("http://localhost:5000/api/users/add", userUpdate)
    //     .then((response) => {
    //         dispatch(removeSelectedAdminUser());
    //         history.push("/adminUsers");
    //     })
    //     .catch((err) => {
    //         console.log("Err", err);
    //     }); 
  } 

  const updateData = () => {
      const userUpdate = {
        name : data.name,
        lastname : data.lastname, 
        password : data.password,
        birthday : ( data.year + "-" + 
                    (data.month.length < 2 ? "0"+data.month : data.month) + "-" +
                    (data.day.length < 2 ? "0"+data.day : data.day)
                   ),
        vaccines : data.vaccines,
        usertype_id : data.usertype_id, 
        secondlastname : data.secondlastname,
      }

      console.log(userUpdate)
      // axios.put(`http://localhost:5000/api/users/update/${food_id}`, userUpdate)
      //     .then((response) => {
      //         dispatch(removeSelectedFood());
      //         history.push("/food");
      //     })
      //     .catch((err) => {
      //         console.log("Err", err);
      //     }); 
  }

  const handleSubmit = () => {   
    Object.keys(user).length !== 0 ? updateData() : sendData()
  }

  const updateValue = (event : any) => { 
    switch(event.target.id) { 
      case "name": { 
        data.name = event.target.value;
        break; 
      }
      case "lastname": { 
        data.lastname = event.target.value
        break; 
      }
      case "password": { 
        data.password = event.target.value
        break; 
      } 
      case "secondlastname": { 
        data.secondlastname = event.target.value
        break; 
      }
      case "type": { 
        event.target.value === "Client" ? data.usertype_id = 1 : data.usertype_id = 2
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
    <Heading>{Object.keys(user).length !== 0 ? "Editar usuario" : "Nuevo usuario"}</Heading>
      <WrapItem >
      <Box bg="white" borderRadius="lg">
        <Box m={8} color="#0B0E3F">
        <VStack spacing={5}>
            <FormControl id="name">
            <FormLabel>Nombre</FormLabel>
            <Input  type="text"
                    onChange={updateValue}
                    borderColor="#E0E1E7"
                    defaultValue={Object.keys(user).length != 0 ? name : ""}
                    />
            </FormControl>

            <FormControl id="lastname">
            <FormLabel>Apellido</FormLabel>
            <Input  type="text"
                    onChange={updateValue}
                    borderColor="#E0E1E7"
                    defaultValue={Object.keys(user).length != 0 ? lastname : ""}
                    />
            </FormControl>

            <FormControl id="secondlastname">
            <FormLabel>Segundo Apellido</FormLabel>
            <Input  type="text"
                    onChange={updateValue}
                    borderColor="#E0E1E7"
                    defaultValue={Object.keys(user).length != 0 ? secondlastname : ""}
                    />
            </FormControl>

            <FormControl id="password">
            <FormLabel>Contraseña</FormLabel>
            <Input  type="text"
                    onChange={updateValue}
                    borderColor="#E0E1E7"
                    defaultValue={Object.keys(user).length != 0 ? password : ""}
                    />
            </FormControl>

            <FormControl id="birthday">
            <FormLabel>Fecha de nacimiento</FormLabel>
              <Flex direction="row" gap="10px">
                <NumberInput onChange={(valueString) => {data.year = valueString}} 
                            borderColor="#E0E1E7"
                            defaultValue={Object.keys(user).length !== 0 ? data.year : 2022}
                            min={1900} max={2022}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                <NumberInput onChange={(valueString) => {data.month = valueString}} 
                            borderColor="#E0E1E7" 
                            defaultValue={Object.keys(user).length !== 0 ? data.month : 3}
                            min={1} max={12}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                <NumberInput onChange={(valueString) => {data.day = valueString}} 
                            borderColor="#E0E1E7" 
                            defaultValue={Object.keys(user).length !== 0 ? data.day : 1}
                            min={1} max={31}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
            </FormControl>

            <FormControl id="vaccines">
            <FormLabel>Dosis de vacuna</FormLabel>
            <NumberInput onChange={(valueString) => {data.vaccines = parseInt(valueString)}} 
                        borderColor="#E0E1E7" 
                        defaultValue={Object.keys(user).length !== 0 ? vaccines : 0} 
                        min={0} max={5}>
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
                  defaultValue={Object.keys(user).length !== 0 ? (usertype_id === 1 ? 'Client' : 'Admin') : ('Admin')}>
                  <option value='Client'>Client</option>
                  <option value='Admin'>Admin</option>
              </Select>
            </FormControl>

            <FormControl id="button" float="right">
            <Button
                variant="solid"
                bg="#0D74FF"
                color="white"
                onClick={handleSubmit}>
                {Object.keys(user).length !== 0 ? 'Guardar cambios' : 'Guardar'}
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

export default AddUser;


