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
  
  export default function SignUpComponent() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const handleEmailInput = (e : any) => {
        setEmail(e.target.value)
    }
    const [pass, setPass] = useState("");
    const handlePassInput = (e : any) => {
        setPass(e.target.value)
    }
    const [vaccines, setVaccines] = useState("");
    const handleVaccinesInput = (e : any) => {
        setVaccines(e.target.value)
    }
    const handleSubmit = () => {
        //api call to register user
        alert("Registering user")
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
              <FormControl id="email" isRequired>
                <FormLabel>Correo Electrónico</FormLabel>
                <Input value={email} onChange={handleEmailInput} type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Contraseña</FormLabel>
                <InputGroup>
                  <Input value={pass} onChange={handlePassInput} type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="covidVaccines" isRequired>
                <FormLabel>Vacunas Covid Aplicadas</FormLabel>
                <Input value={vaccines} onChange={handleVaccinesInput} type="number" />
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