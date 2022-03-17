import Cookies from "universal-cookie";
import {ICookieData} from "../../interface/contractor/auth.interface";

export class contractorCookieService {
	cookies;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor() {
	  this.cookies = new Cookies();
	}

	// Save token to cookie
	async setTokenData(tokenData:ICookieData) {
	  this.cookies.set("contractorToken", JSON.stringify(tokenData), { sameSite: true, path: "/" });
	}

	// Get token to cookie
	async getTokenData() {
	  const tokenData = this.cookies.get("contractorToken");
	  if (tokenData) {
	    return tokenData;
	  } else {
	    return false;
	  }
	}

	// Delete token from cookie
	async removeTokenData() {
	  window.location.reload();
	  await this.cookies.remove("contractorToken", { path: "/" });
	}

}


