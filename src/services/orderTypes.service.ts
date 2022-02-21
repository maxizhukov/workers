import {requestHandler} from "../utils/requestHandler";

export class orderTypesService {
  constructor() {
    //
  }

  async getBySubCategoryId(id:string) {
    let responseObj:any = {};
    await requestHandler({
      path: `general/orderTypes/bySubCategoryId/${id}`,
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
