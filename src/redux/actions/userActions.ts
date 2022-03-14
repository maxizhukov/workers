import {SET_USER_INFO} from "../types/userTypes";

export function setUser(user:any) {
  return {
    type: SET_USER_INFO,
    payload: user
  };
}
