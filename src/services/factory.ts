import { CardCreator } from '../modules/card/application/CardCreator';
import { CardFind } from '../modules/card/application/CardFind';
import { CardProcess } from '../modules/card/application/CardProcess';
import { DynamoDBCardRepository } from '../modules/card/infrastructure/persistence/DynamoDBCardRepository';
import { UserCreator } from '../modules/user/application/UserCreator';
import { DynamoDBUserRepository } from '../modules/user/infrastructure/persistence/DynamoDBUserRepository';
import DynamoDBConfig from '../shared/domain/types/DynamoDBConfig';
import { DynamoDBClientFactory } from '../shared/infrastructure/persistence/dynamoDB/DynamoDBClientFactory';

export function createServices(nameService: string): any {

	switch (nameService) {
		case 'DynamoDBCardRepository':
			let configCard: DynamoDBConfig = {
				region: process.env.AMAZON_REGION as string
			};

			if (process.env.APP_ENVIRONMENT === 'local') {
				console.log('cargando configuracion local dynamodb para cards');
				configCard.endpoint = process.env.DYNAMODB_LOCAL_ENDPOINT;
			}

			return new DynamoDBCardRepository(
				DynamoDBClientFactory.createClient(configCard),
				process.env.CARD_TABLE_NAME as string
			);
			break;
		case 'DynamoDBUserRepository':
			let configUser: DynamoDBConfig = {
				region: process.env.AMAZON_REGION as string
			};

			if (process.env.APP_ENVIRONMENT === 'local') {
				console.log('cargando configuracion local dynamodb para users');
				configUser.endpoint = process.env.DYNAMODB_LOCAL_ENDPOINT;
			}

			return new DynamoDBUserRepository(
				DynamoDBClientFactory.createClient(configUser),
				process.env.USER_TABLE_NAME as string
			);
			break;

		case 'CardCreator':
			return new CardCreator(
				<DynamoDBCardRepository>createServices('DynamoDBCardRepository'),
				<DynamoDBUserRepository>createServices('DynamoDBUserRepository')
			);
			break;

		case 'CardFind':
			return new CardFind(
				<DynamoDBCardRepository>createServices('DynamoDBCardRepository'),
				<DynamoDBUserRepository>createServices('DynamoDBUserRepository')
			);
			break;
		case 'CardProcess':
			return new CardProcess(
				<DynamoDBCardRepository>createServices('DynamoDBCardRepository')
			);
			break;

		case 'UserCreator':
			return new UserCreator(<DynamoDBUserRepository>createServices('DynamoDBUserRepository'));
			break;

		default:
			break;
	}
}
