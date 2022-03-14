import axios from "axios";
import environment from "../environment";
import {getToken} from "./cookie/token.cookie";
import {apiErrorHandler} from "./apiErrorHandler";
import {contractorCookieService} from "../services/cookies/contractor.cookies.service";

interface IRequest {
	path: string;
	method: "GET" | "POST";
	data?: any;
	params?: any;
	showErrorNotification?: boolean;
	tokenType?: "customer" | "contractor"
}

export async function requestHandler(props:IRequest) {
  try {
  	let tokenData:any;
  	if (props.tokenType) {
      tokenData = props.tokenType === "customer"
        ? await getToken()
        : await new contractorCookieService().getTokenData();
    }

    const response = await axios({
      url: `${environment.baseUrl}${props.path}`,
      method: props.method,
      params: props.params,
      data: props.data,
      headers: { Authorization: `Bearer ${tokenData?.token || ""}` },
    });
    return {
      status: response.status,
      data: response.data
    };
  } catch (e: any) {
    return apiErrorHandler(e.response.status, e, props.showErrorNotification);
  }
}
