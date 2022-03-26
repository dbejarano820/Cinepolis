import React, { useEffect } from "react";
import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { Heading } from "@chakra-ui/react";
import { selectedFood } from "../../redux/actions/foodActions";

const FoodDetail = () => {
    const food = useSelector((state : any) => state.food);
    const foodId : any = useParams();
    const dispatch = useDispatch();
    console.log("------ID DEL PRODUCTO:", foodId)

    const fetchProductDetail = async () => {
        const response : any = await axios
        .get(`http://localhost:5000/api/food/${foodId}`)
        .catch((err) => {
            console.log("Err", err);
        });
        dispatch(selectedFood(response.data))
    }

    useEffect(() => {
        if (foodId && foodId !== "") fetchProductDetail();
    }, [foodId]);
    

    return(
        <Heading>Detalles</Heading>      
    );
};

export default FoodDetail;