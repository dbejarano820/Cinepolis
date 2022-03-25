import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const FoodDetail = () => {

    const foods = useSelector((state) => state);
    console.log(foods);

    return(
        <div className="ui grid container">
            <h1>Detalles</h1>      
        </div>
    );
};

export default FoodDetail;