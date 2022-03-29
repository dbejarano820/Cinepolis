import React, { useEffect } from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux"
import MovieComponent from "./MovieComponent";
import { removeSelectedMovie, setMovies } from "../../redux/actions/movieActions";
import { Center, Flex, Heading } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import SidebarWithHeader from "../sections/header";
import RedirectButton from "../food/ButtonRedirect";

const MovieListing = () => {
    const movies = useSelector((state) => state);
    const user = useSelector((state : any) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const fetchMovies = async () => {
        const response : any = await axios
        .get("http://localhost:5000/api/movies/list")
        .catch((err) => {
            console.log("Err", err);
        });
        console.log(response.data)
        dispatch(setMovies(response.data))   //lo mandamos al store de redux, ahora cualquier componente puede acceder a allMovies
    };

    useEffect(() => {
        fetchMovies();
        return () => {
          dispatch(removeSelectedMovie())
        }
    }, []);

    return(
      <>  
        {/* -----------------------
            NO DEBE SALIR SI ES COMPRADOR */}
        <Flex direction="column" gap="20px" >
          <Heading>Lista de movies</Heading>
          {user.type === "Admin" ? (
            <Center>
            <RedirectButton color="yellow.400" title="Añadir película" onClick={(e : any) => {
                  e.preventDefault();
                  dispatch(removeSelectedMovie())
                  history.push("/addMovie");
              }}/>
            </Center>
            ) : (null)
          }
          <MovieComponent />
        </Flex> 
      </>
        
    );
};

export default MovieListing;