import React, { useEffect } from "react";
import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { selectedFood, removeSelectedFood } from "../../redux/actions/foodActions";

import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    VisuallyHidden,
    List,
    ListItem,
  } from '@chakra-ui/react';
import SidebarWithHeader from "../sections/header";
import RedirectButton from "./ButtonRedirect";
import { useHistory } from 'react-router-dom';

const FoodDetail = () => {
    const food = useSelector((state : any) => state.food);
    const user = useSelector((state : any) => state.user);
    const {food_id, price, type, amount_available, image, description} = food;
    const {name} : any = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const fetchProductDetail = async () => {
        const response : any = await axios
        .get(`http://localhost:5000/api/food/${name}`)
        .catch((err) => {
            console.log("Err", err);
        });
        dispatch(selectedFood(response.data))
    }

    useEffect(() => {
        if (name && name !== "") fetchProductDetail();
        // return () => {
        //     dispatch(removeSelectedFood())
        // }
    }, [name]);

    return(
        <>      
        <SidebarWithHeader>
        {Object.keys(food).length === 0 ? (
            <div>...Loading</div>
        ) : (
        <Container maxW={'7xl'}>
        <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}>
            <Flex>
            <Image
                rounded={'md'}
                alt={'product image'}
                src={image}
                fit={'cover'}
                align={'center'}
                w={'100%'}
                h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
                <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                {name}
                </Heading>
                <Text
                fontWeight={300}
                fontSize={'2xl'}>
                {price}
                </Text>
            </Box>

            <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={'column'}
                divider={
                <StackDivider
                />
                }>
                <VStack spacing={{ base: 4, sm: 6 }}>
                <Text fontSize={'lg'}>
                {description}
                </Text>
                </VStack>
                <Box>
                <List spacing={2}>
                    <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                        Precio:
                    </Text>{' '}
                    {price}
                    </ListItem>
                    <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                        Tipo:
                    </Text>{' '}
                    {type}
                    </ListItem>
                    <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                        Disponible:
                    </Text>{' '}
                    {amount_available}
                    </ListItem>
                </List>
                </Box>
            </Stack>

                {/* ----------------------------------------
                    SOLO DEBE SALIR CUANDO ES USER COMPRADOR
                    ------------------------------------- */}
            {user.type === "Client" ? (
            
            <Button
                rounded={'none'}
                w={'full'}
                mt={8}
                size={'lg'}
                py={'7'}
                textTransform={'uppercase'}
                _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
                }}>
                Añadir al carrito
            </Button> 
            ) : (
              <>
              <RedirectButton color="yellow.400" title="Editar" onClick={(e : any) => {
                e.preventDefault();
                history.push("/editFood");
              }}/>
              <RedirectButton color="red.400" title="Eliminar" onClick={() => {
                const data = {food_id : food_id};
                axios.put("http://localhost:5000/api/food/delete", data)
                    .then((response) => {
                        history.push("/food");
                    })
                    .catch((err) => {
                        console.log("Err", err);
                    });
              }}/>
              </>
            )}    
            </Stack>
        </SimpleGrid>
        </Container>
        )}
        </SidebarWithHeader>
        </>
    );
};

export default FoodDetail;