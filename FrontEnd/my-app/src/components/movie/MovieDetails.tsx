/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import { connect, useDispatch, useSelector } from "react-redux";
import { 
    selectedMovie,
    removeSelectedMovie,
} from "../../redux/actions/movieActions";
import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,

    VisuallyHidden,
    List,
    ListItem,
  } from '@chakra-ui/react';
  import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
  import { MdLiveTv, MdLocalShipping } from 'react-icons/md';
import { removeSelectedTanda, setTandas } from "../../redux/actions/tandaActions";
import { ActionTypes } from "../../redux/constants/action-types";
import { Link } from "react-router-dom";
import RedirectButton from "../food/ButtonRedirect";

const MovieDetails = () => {
    const MINIMUM_VACCINES_REQUIRED = 2;
    const movie = useSelector((state: any) => state.movie);
    const tandas = useSelector((state: any) => state.allTandas.tandas)
    const user = useSelector((state : any) => state.user);
    const {movie_id,title, actors, description, director, duration, minimum_age, genre, languages, year, image, visible} = movie;  // destructure object
    const {movieTitle} : any = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const fetchMovieDetail = async() => {
        const response : any = await axios
        .get(`http://localhost:5000/api/movies/${movieTitle}`)
        .catch((err) => {
            console.log("Err: ", err);
        });
        dispatch(selectedMovie(response.data));

        const response2 : any = await axios
        .get(`http://localhost:5000/api/movies/tandas/${movieTitle}`)
        .catch((err) => {
            console.log("Err: ", err);
        });
        console.log(response2.data)
        dispatch(setTandas(response2.data));
        
    };

    useEffect(() => {
        if (movieTitle && movieTitle !== "") fetchMovieDetail(); 
        // return() => {
        //     dispatch(removeSelectedMovie());
        // }
    }, [movieTitle]);

    const currentDate = new Date();
    const userBday = new Date(user.birthday);
    const time_difference = currentDate.getTime() - userBday.getTime();
    const days_difference = time_difference / (1000 * 60 * 60 * 24);
    const userAge = days_difference / 365;
    const user_vaccines = user.vaccines;

    console.log(userAge)
        return (

            <div>
            {Object.keys(movie).length === 0 ? (
                <div>...Loading</div> 
            ) : (
                
            <Container maxW={'7xl'}>
              <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 18, md: 24 }}>
                <Flex>
                  <Image
                    rounded={'md'}
                    alt={'product image'}
                    src={image}
                    fit={'cover'}
                    align={'center'}
                    w={'100%'}
                    h={{ base: '100%', sm: '400px', lg: '500px' }}
                  />
                </Flex>
                <Stack spacing={{ base: 6, md: 10 }}>
                  <Box as={'header'}>
                    <Heading
                      lineHeight={1.1}
                      fontWeight={600}
                      fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                      {title}
                    </Heading>
                    <Text
                      fontWeight={300}
                      fontSize={'2xl'}>
                      {year}
                    </Text>
                  </Box>
        
                  <Stack
                    spacing={{ base: 4, sm: 6 }}
                    direction={'column'}
                    divider={
                      <StackDivider
                      />
                    }>
                    <VStack spacing={{ base: 4, sm: 6 }}>
                      <Text
                        fontSize={'2xl'}
                        fontWeight={'300'}>
                        {description}
                      </Text>
                      <Text
                        fontSize={{ base: '16px', lg: '18px' }}
                        fontWeight={'500'}
                        textTransform={'uppercase'}
                        mb={'4'}>
                        Actors:
                      </Text>
                      <Text fontSize={'lg'}>
                        {actors}
                      </Text>
                    </VStack>
                    <Box>
                      <Text
                        fontSize={{ base: '16px', lg: '18px' }}
                        fontWeight={'500'}
                        textTransform={'uppercase'}
                        mb={'4'}>
                        Details
                      </Text>
        
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                        <List spacing={2}>
                        <ListItem>
                          <Text as={'span'} fontWeight={'bold'}>
                            Estado:
                          </Text>{' '}
                          {visible ? "Disponible" : "No disponible"}
                        </ListItem>
                        <ListItem>
                          <Text as={'span'} fontWeight={'bold'}>
                            Director:
                          </Text>{' '}
                          {director}
                        </ListItem>
                        <ListItem>
                          <Text as={'span'} fontWeight={'bold'}>
                            Minimum Age:
                          </Text>{' '}
                          {minimum_age}
                        </ListItem>
                        <ListItem>
                          <Text as={'span'} fontWeight={'bold'}>
                            Genre:
                          </Text>{' '}
                          {genre}
                        </ListItem>
                        </List>
                        <List spacing={2}>
                        <ListItem>
                          <Text as={'span'} fontWeight={'bold'}>
                            Duration:
                          </Text>{' '}
                          {duration} minutes
                        </ListItem>
                        <ListItem>
                          <Text as={'span'} fontWeight={'bold'}>
                            Languages:
                          </Text>{' '}
                          {languages}
                        </ListItem>
                        </List>
                      </SimpleGrid>
                    </Box>
                  </Stack>

            {/*-----------------------------
              SE MUESTRA SOLO SI ES CLIENTE 
              -----------------------------*/}
            {user.type === "Client" ? (
              (userAge > minimum_age) && (user_vaccines >= MINIMUM_VACCINES_REQUIRED) ? (
                tandas.map((tanda: { chart_id: any; movie_title: any; sala_name: any; start_time: any;}) => {
                  const {movie_title, sala_name, start_time, chart_id} = tanda
                  const fecha = new Date(start_time);
                  console.log(start_time)
                  console.log(fecha.toUTCString());
                    
                  return(
                    <div key={movieTitle}>
                      <Link to={`/movies/${movie_title}/${sala_name}/${start_time}/${chart_id}`}> 
                        <Button
                          rounded={'none'}
                          w={'full'}
                          mt={8}
                          size={'lg'}
                          py={'7'}
                          textTransform={'uppercase'}
                          _hover={{
                            transform: 'translateY(2px)',
                            boxShadow: 'lg',
                          }}>
                            {sala_name} : {fecha.toUTCString() }
                        </Button>
                      </Link>
                    </div>
                  );    
                })
              ) : ("<p>Usuario es muy joven</p>"))
            
             : (
              //BOTONES PARA ADMIN
              <>
              <RedirectButton color="blue.400" title={visible ? "Deshabilitar" : "Habilitar"} onClick={() => {
                const data = {
                  movie_id : movie_id,
                  visible : !visible
                };
                axios.put("http://localhost:5000/api/movies/visible", data)
                    .then((response) => {
                        history.push("/movies");
                    })
                    .catch((err) => {
                        console.log("Err", err);
                    });
              }}/>
              <RedirectButton color="blue.800" title="Agregar tanda" onClick={(e : any) => {
                e.preventDefault();
                history.push("/addTanda");
              }}/>
              <RedirectButton color="yellow.400" title="Editar" onClick={(e : any) => {
                e.preventDefault();
                history.push("/editMovie");
              }}/>
              <RedirectButton color="red.400" title="Eliminar" onClick={() => {
                const data = {movie_id : movie_id};
                axios.put("http://localhost:5000/api/movies/delete", data)
                    .then((response) => {
                        history.push("/movies");
                    })
                    .catch((err) => {
                        console.log("Err", err);
                    });
              }}/>
              </>
            ) }

                </Stack>
              </SimpleGrid>
            </Container>
            )}
            </div>
         )
};

const mapStateToProps = (state : any) => {
    return {movie : state};
};

export default MovieDetails;