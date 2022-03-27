import React, { useEffect } from "react";
import FoodItems from './FoodItem'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setFoods } from "../../redux/actions/foodActions";
import SidebarWithHeader from "../sections/header";
import { Flex, Heading } from '@chakra-ui/react'
import RedirectButton from "./ButtonRedirect";

const FoodList = () => {
    
    const foods = useSelector((state) => state);
    const dispatch = useDispatch();

    const fetchFoods = async () => {
        const response : any = await axios
        .get("http://localhost:5000/api/food/list")
        .catch((err) => {
            console.log("Err", err);
        });
        dispatch(setFoods(response.data))   //lo mandamos al store de redux, ahora cualquier componente puede acceder a allMovies
    };

    useEffect(() => {
        fetchFoods();
    }, []);
    //console.log("Foods: ", foods);

    return(
        <>
        <SidebarWithHeader>
            <Heading>Lista de alimentos</Heading>
            {/* -----------------------
                NO DEBE SALIR SI ES COMPRADOR */}
            <Flex h="20vh" justifyContent="center" alignItems="center">
            <RedirectButton color="yellow.400" title="Añadir alimento" onClick={(e : any) => {
                e.preventDefault();
                window.location.href='addFood';
            }}
            ></RedirectButton>
            </Flex>
            <FoodItems />   
        </SidebarWithHeader>  
        </>
    );
};

export default FoodList;