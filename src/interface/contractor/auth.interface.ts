export interface IRegister {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface ILogin {
	email: string;
	password: string;
}

export interface ICookieData {
	email: string;
	iat: number;
	exp: number;
	token: string;
}
