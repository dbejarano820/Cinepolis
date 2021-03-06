/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
  Flex,
  Select,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Grid, GridItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { removeSelectedFood } from "../../redux/actions/foodActions";
import { setCart } from "../../redux/actions/cartActions";

export default function CheckOutItems(props: any) {
  let key_counter = -1; //just to put a key on Flex html tag
  const [rerender, setRerender] = useState(false);
  const dispatch = useDispatch();
  const getHeading = (product: any) => {
    if (product.type === "Ticket") {
      return (
        <>
          <div>
            {" "}
            {product.movie +
              " -> " +
              product.sala +
              "-" +
              product.row +
              product.num}{" "}
          </div>{" "}
          <br /> <div>{new Date(product.time).toUTCString()}</div>
        </>
      );
    }
    return product.food_name;
  };

  const handleDelete = (product : any)=>{
        const index = props.products.indexOf(product);
        props.products.splice(index, 1);
        dispatch(setCart(props.products))
        setRerender(!rerender);
    }

  const renderList = props.products.map((product: any) => {
    
    /* {type: "ticket", movie: "Batman", sala:"A", row:1, category: "General", price: 4},
                        {type: "food", name: "Popcorn", category: "Snack", price: 4}, */
    key_counter++;
    if (product.type === "Ticket") {
      const { type, row, num, price, movie, sala, time, style } = product;
    } else {
      const { type, food_name, price, style } = product;
    }

    return (
      <Flex justify={"flex-start"} key={key_counter}>
        <Box
          role={"group"}
          p={6}
          minW={"330px"}
          w={"full"}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
        >
          <Box
            rounded={"lg"}
            mt={-12}
            pos={"relative"}
            minH={"75px"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            {/* {type: "ticket", movie: "Batman", sala:"A", row:1, category: "General", price: 4},
                        {type: "food", name: "Popcorn", category: "Snack", price: 4}, */}
          </Box>
          <Button onClick={() => handleDelete(product)}>
            <DeleteIcon w={6} h={6} />
          </Button>
          <Stack pt={10} align={"center"}>
            <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
              {getHeading(product)}
            </Heading>
            <Stack direction={"row"} align={"center"}>
              <Text fontWeight={800} fontSize={"xl"}>
                {product.style} - ${product.price}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Flex>
    );
  });

  return (
    <>
      <Grid templateColumns="repeat(1, auto)" gap={"10px"}>
        {renderList}
      </Grid>
    </>
  );
}
