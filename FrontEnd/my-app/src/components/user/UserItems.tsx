import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Image,
    Flex,
    Select,
  } from '@chakra-ui/react';
import { Link } from 'react-router-dom'

export default function UserItems() {
    const users = useSelector((state : any) => state.allUsers.users);

    const renderList = users.map((user : any) => {

        const {user_id, name, lastname, secondlastname, email, usertype_id} = user;
  
          return (
            <div key={user_id}>
                <Link to={`/user/${email}`}>
                {/* <GridItem> */}
                <Center py={12}>
                <Box
                    role={'group'}
                    p={6}
                    maxW={'330px'}
                    w={'full'}
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
                        backgroundImage: `url('https://www.kindpng.com/picc/m/269-2697881_computer-icons-user-clip-art-transparent-png-icon.png')`,
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
                        src='https://www.kindpng.com/picc/m/269-2697881_computer-icons-user-clip-art-transparent-png-icon.png'
                    />
                    </Box>
                    <Stack pt={10} align={'center'}>
                    <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                        {name + " " + lastname + " " + secondlastname}
                    </Heading>

                    <Stack direction={'row'} align={'center'}>
                        <Text fontWeight={800} fontSize={'xl'}>
                        {usertype_id === 1 ? 'Client' : 'Admin'}
                        </Text>
                    </Stack>
                    </Stack>
                </Box>
                </Center>
                {/* </GridItem> */}
                </Link>
            </div>
            )
    })

    return (
        <>
        {/* <Grid templateColumns='repeat(4, auto)' gap={6}> */}
            {renderList}
        {/* </Grid> */}
        </>
    );
}
  