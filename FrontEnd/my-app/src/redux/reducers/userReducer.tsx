import { ActionTypes } from "../constants/action-types"

const initialState = {
  users : [],
};

export const UserReducer = (state=initialState, {type, payload} : any) => {

  switch(type) {
      case ActionTypes.SET_USERS:
          return {...state, users:payload};
      default:
          return state;
  }
};

export const selectedUserReducer = (state = {}, {type, payload} : any) => {
    switch (type) {
        case ActionTypes.SET_USER:
            return { ...state, ...payload};
        case ActionTypes.REMOVE_USER:
            return {};
        default:
            return state;
    }
}

export const selectedAdminUserReducer = (state = {}, {type, payload} : any) => {
  switch (type) {
      case ActionTypes.SELECTED_ADMIN_USER:
          return {...state, ...payload};
      case ActionTypes.REMOVE_SELECTED_ADMIN_USER:
          return {};
      default:
          return state;
  }
}