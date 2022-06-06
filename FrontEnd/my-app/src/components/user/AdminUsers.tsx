import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import SidebarWithHeader from "../sections/header";
import { useHistory } from 'react-router-dom';
import { removeSelectedAdminUser, setUsers } from "../../redux/actions/userActions";
import { Center, Flex, Heading } from "@chakra-ui/react";
import RedirectButton from "../food/ButtonRedirect";
import UserItems from "./UserItems";

const AdminUsers = () => {

  const users = useSelector((state : any) => state.allUsers);
  const dispatch = useDispatch();
  const history = useHistory();

  const fetchUsers = async () => {
    const response : any = await axios
    .get("http://172.30.232.105:5000/api/users/list")
    .catch((err) => {
        console.log("Err", err);
    });
    dispatch(setUsers(response.data))   //lo mandamos al store de redux, ahora cualquier componente puede acceder a allMovies
  };

  useEffect(() => {
    if (users && users !== undefined) fetchUsers();
    return () => {
      dispatch(removeSelectedAdminUser())
    }
  }, []);

  return(
      <>
      <SidebarWithHeader>
          
        <Flex direction="column" gap="20px" >
          <Heading>Lista de usuarios</Heading>
          <Center>
          <RedirectButton color="yellow.400" title="Añadir usuario" onClick={(e : any) => {
                e.preventDefault();
                dispatch(removeSelectedAdminUser())
                history.push("/addUser");
            }}/>
          </Center>
          <UserItems />  
        </Flex>
            
      </SidebarWithHeader>  
      </>
  );
};

export default AdminUsers;