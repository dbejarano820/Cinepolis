import React, { useEffect } from "react";
import FoodItems from './FoodItem'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { removeSelectedFood, setFoods } from "../../redux/actions/foodActions";
import SidebarWithHeader from "../sections/header";
import { Box, Center, Flex, Heading, Spacer } from '@chakra-ui/react'
import RedirectButton from "./ButtonRedirect";
import { useHistory } from 'react-router-dom';

const FoodList = () => {
    
    const foods = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const fetchFoods = async () => {
        const response : any = await axios
        .get("http://localhost:5000/api/food/list")
        .catch((err) => {
            console.log("Err", err);
        });
        dispatch(setFoods(response.data))   //lo mandamos al store de redux, ahora cualquier componente puede acceder a allMovies
    };

    useEffect(() => {
        if (foods && foods !== undefined) fetchFoods();
        return () => {
            dispatch(removeSelectedFood())
        }
    }, []);

    return(
        <>
        <SidebarWithHeader>
            
            {/* -----------------------
                NO DEBE SALIR SI ES COMPRADOR */}
            <Flex direction="column" gap="20px" >
              <Heading>Lista de alimentos</Heading>
              <Center>
              <RedirectButton color="yellow.400" title="Añadir alimento" onClick={(e : any) => {
                    e.preventDefault();
                    dispatch(removeSelectedFood())
                    history.push("/addFood");
                }}/>
              </Center>
              <FoodItems />  
            </Flex>
             
        </SidebarWithHeader>  
        </>
    );
};

export default FoodList;