import axios from "axios";
import environment from "../environment";
import {getToken} from "./cookie/token.cookie";

interface IRequest {
	path: string;
	method: "GET" | "POST";
	params?: any;
}

export async function requestHandler(props:IRequest) {
  try {
    const token = await getToken();
    const response = await axios({
      url: `${environment.baseUrl}${props.path}`,
      method: props.method,
      params: props.params,
      headers: { Authorization: `Bearer ${token}` },
    });
    return {
      status: response.status,
      data: response.data
    };
  } catch (e: any) {
    return {
      status: e.response.status,
      data: e.response.data
    };
  }
}
