import Cookies from "universal-cookie";
import CryptoJS from "crypto-js";

const cookies = new Cookies();

export function decryptWithAES(ciphertext: any) {
  const passphrase = "admin";
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}

export function encryptWithAES(text: string) {
  const passphrase = "admin";
  return CryptoJS.AES.encrypt(text, passphrase).toString();
}

export function setToken(token: string) {
  const encryptedRole = encryptWithAES(token.toString());
  cookies.set("key", encryptedRole, { sameSite: true });
}


export function getToken() {
  const token = cookies.get("key");
  if (token) {
    return decryptWithAES(token);
  }
}

export function removeToken() {
  cookies.remove("key");
}

