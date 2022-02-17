import {
  GET_USER_INFO,
  usersTypes
} from "../types/userTypes";

interface DefaultStateI {
	loading: boolean,
	error: string,
	userInformation: any
}

const initialState:DefaultStateI = {
  loading: true,
  error: "",
  userInformation: {}
};

export const userReducer = (
  state: DefaultStateI = initialState,
  action: usersTypes):DefaultStateI => {
  switch (action.type) {
  case GET_USER_INFO:
    return {
      ...state, userInformation: action.payload,
      loading: false
    };
  default:
    return state;
  }
};
