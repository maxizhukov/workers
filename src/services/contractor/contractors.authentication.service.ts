import {requestHandler} from "../../utils/requestHandler";
import {apiErrorHandler} from "../../utils/apiErrorHandler";
import {ILogin, IRegister} from "../../interface/contractor/auth.interface";
import {contractorCookieService} from "../cookies/contractor.cookies.service";

export class contractorAuthenticationService {
  constructor() {
    //
  }

  async register(data:IRegister) {
    return await requestHandler({
      path: "contractor/auth/register",
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
      path: "contractor/auth/login",
      method: "POST",
      data: data,
      showErrorNotification: true
    }).then(async (res:any) => {
      await new contractorCookieService().setTokenData(res.data);
      return res;
    }).catch((e:any) => {
      return apiErrorHandler(500, e);
    });
  }

  async activate(data:any) {
    return await requestHandler({
      path: "contractor/auth/activate",
      method: "POST",
      data: data,
      showErrorNotification: false
    }).then((res:any) => {
      return res;
    }).catch((e:any) => {
      return apiErrorHandler(500, e);
    });
  }

  async tokenLogin(token:string) {
    return await requestHandler({
      path: "contractor/auth/tokenLogin",
      method: "POST",
      data: {token: token},
      showErrorNotification: false
    }).then(async (res:any) => {
      await new contractorCookieService().setTokenData(res.data);
      return res;
    }).catch((e:any) => {
      return apiErrorHandler(500, e);
    });
  }

}
