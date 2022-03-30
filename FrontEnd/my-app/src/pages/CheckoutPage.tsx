import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import SidebarWithHeader from "../components/sections/header";
import { Box, Button, Stack, Center, Flex, Heading, Spacer } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom';
import CheckOutItems from "../components/checkout/CheckOutItem";

// import "jspdf/dist/polyfills.es.js";
// import { jsPDF } from "jspdf";


const Checkout = () => {
    
    //Need to use selector to get all products
    //const user = useSelector((state : any) => state.user);

    const history = useHistory();

    //Instead of redux data, I'm gonna use harcode data
    //All products have the same reservation id
    //row, sala_name, movie_name
    const products = [
        {type: "ticket",  movie: "Batman", sala:"A", row:1, category: "General", price: 4},
        {type: "ticket",  movie: "Batman", sala:"A", row:2, category: "General", price: 4},
        {type: "ticket",  movie: "Batman", sala:"A", row:3, category: "General", price: 4},
        {type: "food", name: "Popcorn", category: "Snack", price: 4},
    ];

    const handleSubmit = () => {
        console.log("Test Submit Checkout page");
        const body = {products};
        axios
          .post("http://localhost:5000/api/checkout", body)
          .then((response : any)=>{
            console.log("Response checkout");
            console.log(response);
             
          })
          .catch((err)=>{
            console.log("Err ", err);
            alert(err);
          });

            
        }

    return(
        <>
        <SidebarWithHeader>
            <Flex direction="column" gap="20px" align={'center'} >
              <Heading>Carrito de Compras</Heading>
              <CheckOutItems products={products} />
                <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'center'}>
                        <Button
                            onClick={handleSubmit}
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                            bg: 'blue.500',
                            }}>
                            Pagar
                        </Button>
                </Stack>
            </Flex>
            
        </SidebarWithHeader>  
        </>
    );
};

export default Checkout;



