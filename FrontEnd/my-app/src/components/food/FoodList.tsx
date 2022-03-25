import React, { useEffect } from "react";
import { Box } from '@chakra-ui/react'
import ProductSimple from './FoodItem'
import { useSelector } from "react-redux";

const FoodList = () => {
    
    const foods = useSelector((state) => state);
    
    
    // const fetchFoods = async () => {
    //     const response = 
    // }

    return(

        <div className="ui grid container"> 
            <h1>Food listing</h1> 
            <ProductSimple />     
        </div>
    );
};

export default FoodList;