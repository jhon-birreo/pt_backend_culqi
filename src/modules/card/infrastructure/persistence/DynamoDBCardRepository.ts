import { Nullable } from '../../../../shared/domain/types/Nullable';
import { DynamoDBRepository } from '../../../../shared/infrastructure/persistence/dynamoDB/DynamoDBRepository';
import { PrimaryKey } from '../../../shared/domain/PrimaryKey';
import { UserId } from '../../../user/domain/entity/UserId';
import { Card } from '../../domain/entity/Card';
import { CardId } from '../../domain/entity/CardId';
import { CardRepository } from '../../domain/repository/CardRepository';

export class DynamoDBCardRepository extends DynamoDBRepository<Card> implements CardRepository {
	public async save(card: Card): Promise<void> {
		await this.persist(card.id.value, card);
	}

	public async getCard(id: CardId): Promise<Nullable<Card>> {
		const response = await this.getItem({
			TableName: this.tableName(),
			Key: {
				PK: this.convertToPk(id.value),
				SK: `${this.moduleName()}#${id.toString()}#${id.toString()}`
			}
		});

		if (!response.Item) {
			return null;
		}

		const cardRaw = response.Item;

		return Card.fromPrimitives({
			...cardRaw
		});
	}
	public async getCardVerifiedExpire(id: UserId, tokenPK: string): Promise<Nullable<Card>> {
		const response = await this.scan({
			TableName: this.tableName(),
			FilterExpression: '#userID = :userID AND #status = :status',
			ExpressionAttributeNames: { '#userID': 'userID', '#status': 'status' },
			ExpressionAttributeValues: {
				':status': 'ACTIVE',
				':userID': id.value
			}
		});

		if (!response.Items) {
			return null;
		}

		const cardRaw = response.Items.filter((cards: Card) => {
			return (cards.cardToken.tokenPK as unknown as string) === tokenPK;
		});
		if (cardRaw.length === 0) {
			return null;
		}

		return Card.fromPrimitives({
			...cardRaw[0],
			...{
				id: cardRaw[0].PK
			}
		});
	}

	async findAllByStatus(): Promise<Nullable<Card[]>> {
		const response = await this.scan({
			TableName: this.tableName(),
			FilterExpression: '#status = :status',
			ExpressionAttributeNames: { '#status': 'status' },
			ExpressionAttributeValues: {
				':status': 'ACTIVE'
			}
		});

		if (!response.Items) {
			return null;
		}

		const cardRaw = response.Items.map((values) =>
			Card.fromPrimitives({
				...values,
				...{
					id: values.PK
				}
			})
		);
		return cardRaw ? cardRaw : null;
	}

	async cardProcess(id: string): Promise<any> {
		const params = {
			TableName: this.tableName(),
			Key: { PK: id },
			UpdateExpression: 'set #status = :status',
			ExpressionAttributeValues: {
				':status': 'EXPIRED'
			},
			ExpressionAttributeNames: {
				'#status': 'status'
			}
		};
		await this.update(params);
	}

	async getCardByStatus(id: CardId): Promise<Nullable<Card>> {
		const response = await this.scan({
			TableName: this.tableName(),
			FilterExpression: '#PK = :PK AND #status = :status',
			ExpressionAttributeNames: { '#PK': 'PK', '#status': 'status' },
			ExpressionAttributeValues: {
				':status': 'ACTIVE',
				':PK': id.value
			}
		});

		if (!response.Items) {
			return null;
		}

		if (response.Items.length === 0) {
			return null;
		}

		return Card.fromPrimitives({
			...response.Items[0],
			...{
				id: response.Items[0].PK
			}
		});
	}

	public async getCardByNumber(id: UserId, number: number): Promise<Nullable<Card>> {
		const response = await this.scan({
			TableName: this.tableName(),
			FilterExpression: '#userID = :userID AND #status = :status AND #number = :number',
			ExpressionAttributeNames: { '#userID': 'userID', '#status': 'status', '#number': 'number' },
			ExpressionAttributeValues: {
				':status': 'ACTIVE',
				':number': number,
				':userID': id.value
			}
		});

		if (!response.Items) {
			return null;
		}

		if (response.Items.length === 0) {
			return null;
		}

		return Card.fromPrimitives({
			...response.Items[0],
			...{
				id: response.Items[0].PK
			}
		});
	}
	public async updateToken(id: CardId, card: Card): Promise<void> {
		const params = {
			TableName: this.tableName(),
			Key: { PK: id.value },
			UpdateExpression: 'set #cardToken = :cardToken',
			ExpressionAttributeValues: {
				':cardToken': card.cardToken.toPrimitives()
			},
			ExpressionAttributeNames: {
				'#cardToken': 'cardToken'
			}
		};
		await this.update(params);
	}

	protected moduleName(): string {
		return 'CARD';
	}

	protected convertToId(pk: string): string {
		return pk;
	}

	protected convertToPk(id: string): string {
		return id;
	}

	protected generatePK(): string {
		return PrimaryKey.random().value;
	}
}
