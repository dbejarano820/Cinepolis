import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    Flex,
    Select,
  } from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { removeSelectedFood } from '../../redux/actions/foodActions';
import ComboBox from './ComboBox';

export default function FoodItems() {
    const foods = useSelector((state : any) => state.allFoods.foods);
    const [comboOption, setComboOption] = useState("all");

    const renderList = foods.map((food : any) => {

        const {food_id, name, price, type, amount_available, image, description, deleted} = food;
        
        if(comboOption === "all" || comboOption === type){
          return (
            <div key={food_id}>
                <Link to={`/food/${name}`}>
                {/* <GridItem> */}
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
                {/* </GridItem> */}
                </Link>
            </div>
            )
        }
    })

    return (
        <>
        {/* <Grid templateColumns='repeat(4, auto)' gap={6}> */}
            <Center>
            <Flex direction="row" gap="10px">
              <Center >
                <Heading as='h6' size='xs'>Filtrar alimentos</Heading>
              </Center>
              <Box >
                <Select bg="white" onChange={(event) => setComboOption(event.target.value)} 
                  borderColor="#E0E1E7"
                  defaultValue={'Todos'}>
                    <option value='all'>Todos</option>
                    <option value='snack'>Snack</option>
                    <option value='bebida'>Bebida</option>
                    <option value='combo'>Combo</option>
                </Select>
              </Box>
            </Flex>
            </Center>
            {renderList}
        {/* </Grid> */}
        </>
    );
}
  