import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setUser } from '../../redux/actions/userActions';

export default function LoginComponent() {
  const dispatch = useDispatch();



  const history = useHistory();
  const [email, setEmail] = useState("");
  const handleEmailInput = (e : any) => {
    setEmail(e.target.value);
  }
  const [pass, setPass] = useState("");
  const handlePassInput = (e : any) => {
    setPass(e.target.value);
  }

  const handleSubmit = () => {
    handleLogin();
  }

  const handleLogin = async () => {
    //check if user exists on database, then user type and re route to corresponding user type home page
    //this should be in a controller that calls a provider, but whtvs
    if(email && pass){
      const body = {
        email,
        pass
      } 
      axios
          .post("http://localhost:5000/api/users/login", body)
          .then((response : any)=>{
             switch (response.data.type) {
                case "Admin":
                  history.push("/movies");
                  break;
                case "Client":
                  history.push("/movies");
                  break;
                default:
                  alert("Usuario invalido");
                  break;
             }
             dispatch(setUser(response.data)); //Con esto podran acceder al usuario que inicio la sesion
          })
          .catch((err)=>{
            console.log("Err ", err);
            alert(err);
          })
      
    }
  }
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Bienvenido a Cinepolis</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Compra y reserva tus peliculas y comidas favoritas
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Correo Electrónico</FormLabel>
              <Input value={email} onChange={handleEmailInput} type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Contraseña</FormLabel>
              <Input value={pass} onChange={handlePassInput} type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Recuérdame</Checkbox>
              </Stack>
              <Button
              onClick={handleSubmit}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Iniciar Sesión
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}