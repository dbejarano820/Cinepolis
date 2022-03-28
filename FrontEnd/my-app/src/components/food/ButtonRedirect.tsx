import { Button, ButtonProps, Flex } from '@chakra-ui/react';
import React from 'react'

export default function RedirectButton(props: any) {
  return (
    // <Flex h="20vh" justifyContent="center" alignItems="center">
      <Button
        px={4}
        fontSize={'sm'}
        rounded={'full'}
        bg={props.color}
        color={'black'}
        boxShadow={
          '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
        }
        _hover={{
          bg: 'yellow.600',
        }}
        _focus={{
          bg: 'yellow.600',
        }}
        // onClick={(e) => {
        //     e.preventDefault();
        //     window.location.href=props.path;
        // }}
        onClick={props.onClick}
        >
        {props.title}
      </Button>
    // </Flex>
  );
}
