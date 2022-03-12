import axios from "axios";
import environment from "../environment";
import {getToken} from "./cookie/token.cookie";
import {apiErrorHandler} from "./apiErrorHandler";

interface IRequest {
	path: string;
	method: "GET" | "POST";
	data?: any;
	params?: any;
	showErrorNotification?: boolean;
}

export async function requestHandler(props:IRequest) {
  try {
    const token = await getToken();
    const response = await axios({
      url: `${environment.baseUrl}${props.path}`,
      method: props.method,
      params: props.params,
      data: props.data,
      headers: { Authorization: `Bearer ${token}` },
    });
    return {
      status: response.status,
      data: response.data
    };
  } catch (e: any) {
    return apiErrorHandler(e.response.status, e, props.showErrorNotification);
  }
}
