import React, { useEffect } from "react";
import FoodItems from './FoodItem'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setFoods } from "../../redux/actions/foodActions";
import SidebarWithHeader from "../sections/header";
import { Heading } from '@chakra-ui/react'

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
    console.log("Foods: ", foods);

    return(
        <>
        <SidebarWithHeader>
            <Heading>Lista de alimentos</Heading>
            <FoodItems />   
        </SidebarWithHeader>  
        </>
    );
};

export default FoodList;