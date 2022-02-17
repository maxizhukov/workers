export const GET_USER_INFO = "GET_USER_INFO";

interface getUserInfoAction {
	type: typeof GET_USER_INFO
	payload: any
}

export type usersTypes = getUserInfoAction
