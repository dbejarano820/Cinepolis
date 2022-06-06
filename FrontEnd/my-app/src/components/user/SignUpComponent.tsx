import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    Link,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import React from 'react';
import { calcRelativeAxisPosition } from 'framer-motion/types/projection/geometry/delta-calc';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
  
  export default function SignUpComponent() {
    const history = useHistory()
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [secondlastname, setSecondlastname] = useState("");
    const [email, setEmail] = useState("");
    const [vaccines, setVaccines] = useState("");
    const [birthday, setBirthday] = useState("");
    const [idcard_number, setIdCardNumber] = useState("");
    
    const handleNameInput = (e : any) => {
      setName(e.target.value)
    }

    const handleLastnameInput = (e : any) => {
      setLastname(e.target.value)
    }

    const handleSecondlastnameInput = (e : any) => {
      setSecondlastname(e.target.value)
    }

    const handleEmailInput = (e : any) => {
        setEmail(e.target.value)
    }

    const handleVaccinesInput = (e : any) => {
      setVaccines(e.target.value)
    }
    
    const handleBirthdayInput = (e : any) => {
      setBirthday(e.target.value)
    }
    
    const handleIdCardNumberInput = (e : any) => {
      setIdCardNumber(e.target.value)
    }

    const handleSubmit = () => {
        //api call to register user
        const body = {
          name,
          lastname, 
          secondlastname,
          email,
          vaccines,
          birthday,
          idcard_number
        };
        axios.post("http://172.30.232.105:5000/api/users/signUp", body)
        .then(() => {
          alert("Usuario registrado, por favor inicie sesion");
          history.push("/"); })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }
  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Registrar
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Ingrese sus datos
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input value={name} onChange={handleNameInput} type="text" />
              </FormControl>
              <FormControl id="lastname" isRequired>
                <FormLabel>Primer Apellido</FormLabel>
                <Input value={lastname} onChange={handleLastnameInput} type="text" />
              </FormControl>
              <FormControl id="secondlastname" isRequired>
                <FormLabel>Segundo Apellido</FormLabel>
                <Input value={secondlastname} onChange={handleSecondlastnameInput} type="text" />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input value={email} onChange={handleEmailInput} type="email" />
              </FormControl>
              <FormControl id="birthday" isRequired>
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <Input value={birthday} onChange={handleBirthdayInput} type="date" />
              </FormControl>
              <FormControl id="vaccines" isRequired>
                <FormLabel>Cantidad de Vacunas aplicadas</FormLabel>
                <Input value={vaccines} onChange={handleVaccinesInput} type="number" />
              </FormControl>
              <FormControl id="idcard_number" isRequired>
                <FormLabel>Numero de Cedula</FormLabel>
                <Input value={idcard_number} onChange={handleIdCardNumberInput} type="number" />
              </FormControl>
              
              <Stack spacing={10} pt={2}>
                <Button
                  onClick={handleSubmit}
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Crear Cuenta
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  ¿Ya eres usuario? <Link color={'blue.400'}>Iniciar Sesión</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }