import React from 'react'
import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
  } from '@chakra-ui/react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Grid, GridItem } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function FoodItems() {
    const foods = useSelector((state : any) => state.allFoods.foods);

    const renderList = foods.map((food : any) => {

        const {food_id, name, price, type, amount_available, image, description} = food;
        
        return (
        <div key={food_id}>
            <Link to={`/food/${food_id}`}>
            <GridItem>
            <Center py={12}>
            <Box
                role={'group'}
                p={6}
                maxW={'330px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}>
                <Box
                rounded={'lg'}
                mt={-12}
                pos={'relative'}
                height={'230px'}
                _after={{
                    transition: 'all .3s ease',
                    content: '""',
                    w: 'full',
                    h: 'full',
                    pos: 'absolute',
                    top: 5,
                    left: 0,
                    backgroundImage: `url(${image})`,
                    filter: 'blur(15px)',
                    zIndex: -1,
                }}
                _groupHover={{
                    _after: {
                    filter: 'blur(20px)',
                    },
                }}>
                <Image
                    rounded={'lg'}
                    height={230}
                    width={282}
                    objectFit={'cover'}
                    src={image}
                />
                </Box>
                <Stack pt={10} align={'center'}>
                <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                    {name}
                </Heading>
                <Stack direction={'row'} align={'center'}>
                    <Text fontWeight={800} fontSize={'xl'}>
                    {price}
                    </Text>
                </Stack>
                </Stack>
            </Box>
            </Center>
            </GridItem>
            </Link>
        </div>
        )
    })
    return (
        <>
        <Grid templateColumns='repeat(4, auto)' gap={6}>
            {renderList}
        </Grid>
        </>
    );
}
  