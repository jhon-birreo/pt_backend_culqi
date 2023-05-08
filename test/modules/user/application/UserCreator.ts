import 'reflect-metadata';
import { UserCreator } from '../../../../src/modules/user/application/UserCreator';
import { createServices } from '../../../../src/services/factory';
import { envConfig } from '../../../config/env';

const requestBody: any = {
	name: 'Jhon',
	email: 'holamundo@hotmail.com',
	password: '12345'
};
export const userCreator = () => {
	let service: UserCreator;
	beforeAll(async () => {
		process.env = envConfig;
		service = <UserCreator>createServices('UserCreator');
	});
	let userId = '';
	it('POST/v1/api/user', async () => {
		const user = await service.run(requestBody);
		const response = user!.toFilterPrimitives();
		userId = response.id;
		expect(response.id).toBeTruthy();
		expect(response.name).toContain(requestBody.name);
		expect(response.email).toContain(requestBody.email);
	});

	afterAll(async () => {
		process.env = Object.assign(process.env, {
			USER_ID: userId
		});
	});
};
