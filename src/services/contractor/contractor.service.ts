import {requestHandler} from "../../utils/requestHandler";
import {apiErrorHandler} from "../../utils/apiErrorHandler";

export class contractorContractorService {
  constructor() {
    //
  }

  async getInfoByToken() {
    return await requestHandler({
      path: "contractor/contractor",
      method: "GET",
      showErrorNotification: false,
      tokenType: "contractor"
    }).then((res:any) => {
      return res;
    }).catch((e:any) => {
      return apiErrorHandler(500, e);
    });
  }

}
