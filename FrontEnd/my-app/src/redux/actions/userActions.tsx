import { ActionTypes } from "../constants/action-types";

export const setUser = (user: any) => {
    return {
        type : ActionTypes.SET_USER,
        payload : user
    };
};

//--------------------------------------------------------

export const setUsers = (users: any) => {
  return {
      type : ActionTypes.SET_USERS,
      payload : users
  };
};

export const selectedAdminUser = (user: any) => {
  return {
      type : ActionTypes.SELECTED_ADMIN_USER,
      payload : user
  };
};

export const removeUser = () => {
  return {
      type : ActionTypes.REMOVE_USER
  };
};

export const removeSelectedAdminUser = () => {
  return {
      type : ActionTypes.REMOVE_SELECTED_ADMIN_USER,
  };
};

