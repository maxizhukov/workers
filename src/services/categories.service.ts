import {requestHandler} from "../utils/requestHandler";

export class categoriesService {
  constructor() {
    //
  }

  async getAllCategories() {
    let responseObj:any = {};
    await requestHandler({
      path: "general/categories",
      method: "GET"
    }).then((res:any) => {
      if (res && res.status === 200) {
        responseObj = {
          status: true,
          data: res.data
        };
      }
    }).catch((e:any) => {
      responseObj = {
        status: false,
        message: e.response.data.message
      };
    });
    return responseObj;
  }

}
