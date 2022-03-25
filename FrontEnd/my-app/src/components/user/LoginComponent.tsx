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
    useColorModeValue,
  } from '@chakra-ui/react';
import React, { useState } from 'react';
  
  export default function LoginComponent() {
    const [email, setEmail] = useState("");
    const handleEmailInput = (e : any) => {
      setEmail(e.target.value);
    }
    const [pass, setPass] = useState("");
    const handlePassInput = (e : any) => {
      setPass(e.target.value);
    }

    const handleSubmit = () => {
      //check if user exists on database, then user type and re route to corresponding user type home page
      console.log(email);
      console.log(pass);
      
    }

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Bienvenido a Cinepolis</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Compra y reserva tus peliculas y comidas favoritas
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
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