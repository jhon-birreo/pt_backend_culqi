import 'reflect-metadata';
import { CardFind } from '../../../../src/modules/card/application/CardFind';
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

export const findCard = () => {
	let service: CardFind;
	beforeAll(async () => {
		process.env = envConfig;
		process.env.USER_ID;
		process.env.CARD_TOKEN;
		service = <CardFind>createServices('CardFind');
	});

	it('GET/v1/api/cards', async () => {
		const userToken = process.env.USER_ID;
		const cardToken = process.env.CARD_TOKEN;
		const card = await service.run(userToken!, cardToken!);
		const response = card!.toPrimitives();
		expect(response.userID).toBe(userToken);
		expect(response.number).toBeTruthy();
		expect(response.expirationMonth).toBeTruthy();
		expect(response.expirationYear).toBeTruthy();
		expect(response.status).toBe('ACTIVE');
	});
};
