import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import SidebarWithHeader from "../components/sections/header";
import { Box, Button, Stack, Center, Flex, Heading, Spacer } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom';
import CheckOutItems from "../components/checkout/CheckOutItem";
import { setCart } from "../redux/actions/cartActions";


const Checkout = () => {
    
    //Need to use selector to get all products
    //const user = useSelector((state : any) => state.user);
    const [rerender, setRerender] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    //Instead of redux data, I'm gonna use harcode data
    //All products have the same reservation id
    //row, sala_name, movie_name
    let products = useSelector((state: any) => state.cart.items)
    const user = useSelector((state : any) => state.user);

    // const products = [
    //     {type: "ticket",  movie: "Batman", sala:"A", row:1, category: "General", price: 4},
    //     {type: "ticket",  movie: "Batman", sala:"A", row:2, category: "General", price: 4},
    //     {type: "ticket",  movie: "Batman", sala:"A", row:3, category: "General", price: 4},
    //     {type: "food", name: "Popcorn", category: "Snack", price: 4},
    // ];

    const handleSubmit = () => {
        console.log("Test Submit Checkout page");
        console.log("email: " + user.email);
        
        const body = {products : products,
                      toAddress: user.email};
        console.log(products);
        
        axios
          .post("http://localhost:5000/api/checkout/pay", body)
          .then((response : any)=>{
            console.log("Response checkout");
            console.log(response);
            products = []
            dispatch(setCart(products));
            setRerender(!rerender);
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



