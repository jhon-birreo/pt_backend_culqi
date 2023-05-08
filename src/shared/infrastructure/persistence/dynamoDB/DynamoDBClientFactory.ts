import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { Nullable } from '../../../domain/types/Nullable';
import DynamoDBConfig from '../../../domain/types/DynamoDBConfig';

export class DynamoDBClientFactory {
	private static clients: DynamoDBDocument;

	static async createClient(config: DynamoDBConfig): Promise<DynamoDBDocument> {
		let client = DynamoDBClientFactory.getClient();

		if (!client) {
			client = await DynamoDBClientFactory.createAndConnectClient(config);

			DynamoDBClientFactory.registerClient(client);
		}

		return client;
	}

	private static getClient(): Nullable<DynamoDBDocument> {
		return DynamoDBClientFactory.clients;
	}

	private static async createAndConnectClient(config: DynamoDBConfig): Promise<DynamoDBDocument> {
		const client = new DynamoDB(config);
		return DynamoDBDocument.from(client);
	}

	private static registerClient(client: DynamoDBDocument): void {
		DynamoDBClientFactory.clients = client;
	}
}
