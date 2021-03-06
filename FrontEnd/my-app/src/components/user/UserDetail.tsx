import React, { useEffect } from "react";
import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

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
import { useHistory } from 'react-router-dom';
import RedirectButton from "../food/ButtonRedirect";
import { removeSelectedAdminUser, selectedAdminUser } from "../../redux/actions/userActions";

const UserDetail = () => {
    const user = useSelector((state : any) => state.adminUser);
    const {user_id, name, lastname, password, birthday, vaccines, usertype_id, secondlastname} = user;
    const {email} : any = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const fetchUserDetail = async () => {
        const response : any = await axios
        .get(`http://localhost:5000/api/users/${email}`)
        .catch((err) => {
            console.log("Err", err);
        });
        dispatch(selectedAdminUser(response.data))
    }

    useEffect(() => {
        if (email && email !== "") fetchUserDetail();
        // return () => {
        //     dispatch(removeSelectedAdminUser())
        // }
    }, [email]);

    return(
        <>      
        <SidebarWithHeader>
        {Object.keys(user).length === 0 ? (
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
                src={'https://www.kindpng.com/picc/m/269-2697881_computer-icons-user-clip-art-transparent-png-icon.png'}
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
                {name + " " + lastname}
                </Heading>
                <Text
                fontWeight={300}
                fontSize={'2xl'}>
                {usertype_id === 1 ? 'Cliente' : 'Administrador'}
                </Text>
            </Box>

            <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={'column'}
                divider={
                <StackDivider/>
                }>
                <Box>
                <List spacing={2}>
                    <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                        Nombre completo:
                    </Text>{' '}
                    {name + " " + lastname + " " + secondlastname}
                    </ListItem>
                    <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                        Cumplea??os:
                    </Text>{' '}
                    {birthday.slice(0,4)+"-"+birthday.slice(5,7)+"-"+birthday.slice(8,10)}
                    </ListItem> 
                    <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                        Dosis de vacuna:
                    </Text>{' '}
                    {vaccines}
                    </ListItem>
                    <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                        Contrase??a:
                    </Text>{' '}
                    {password}
                    </ListItem>
                </List>
                </Box>
            </Stack>

            <RedirectButton color="yellow.400" title="Editar" onClick={(e : any) => {
              e.preventDefault();
              history.push("/editUser");
            }}/>
            <RedirectButton color="red.400" title="Eliminar" onClick={() => {
              const data = {user_id : user_id};
              axios.put("http://localhost:5000/api/users/delete", data)
                  .then((response) => {
                      history.push("/adminUsers");
                  })
                  .catch((err) => {
                      console.log("Err", err);
                  });
            }}/>
              
            </Stack>
        </SimpleGrid>
        </Container>
        )}
        </SidebarWithHeader>
        </>
    );
};

export default UserDetail;