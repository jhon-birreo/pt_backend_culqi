import 'reflect-metadata';
import { CardCreator } from '../../../../src/modules/card/application/CardCreator';
import { createServices } from '../../../../src/services/factory';
import { envConfig } from '../../../config/env';
// describe('Create card!', () => {
//   it('should give a valid response', async () => {
//       const checker = new HealthyChecker();
//       const response = await checker.run();
//       expect(response.statusCode).toBe(200);
//   });
// });

const requestBody: any = {
	number: 4263982640269299,
	cvv: 122,
	expirationMonth: '12',
	expirationYear: '2028',
	email: 'test@hotmail.com'
};

export const createCard =() =>{
	let service: CardCreator;
	beforeAll(async () => {
    process.env = envConfig;
		process.env.USER_ID
		service = <CardCreator>createServices('CardCreator');
	});
	let token = ''

	it('POST/v1/api/card', async () => {
		const userToken = process.env.USER_ID;
		const card = await service.run(userToken!, requestBody);
    const response = card!.cardToken.toPrimitives()
		token = response.tokenPK;
    expect(response.tokenPK.length).toBe(16);
	});

	afterAll(async () => {
		process.env = Object.assign(process.env, {
			CARD_TOKEN: token
		});
	});
}