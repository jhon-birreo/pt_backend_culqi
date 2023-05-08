export interface UserRequest {
	id: string;
	name: string;
	email: string;
	password: string;
	userToken: {
		tokenPK: string,
		tokenExpire: string,
	};
};