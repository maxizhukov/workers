import {requestHandler} from "../utils/requestHandler";
import {ILogin, IRegister} from "../interface/authentication.interface";
import {apiErrorHandler} from "../utils/apiErrorHandler";

export class authenticationService {
  constructor() {
    //
  }

  async register(data:IRegister) {
    return await requestHandler({
      path: "customer/auth/register",
      method: "POST",
      data: data,
      showErrorNotification: true
    }).then((res:any) => {
      return res;
    }).catch((e:any) => {
      return apiErrorHandler(500, e);
    });
  }

  async login(data:ILogin) {
    return await requestHandler({
      path: "customer/auth/login",
      method: "POST",
      data: data,
      showErrorNotification: true
    }).then((res:any) => {
      return res;
    }).catch((e:any) => {
      return apiErrorHandler(500, e);
    });
  }

}
