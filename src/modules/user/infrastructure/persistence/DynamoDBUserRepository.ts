import { Nullable } from '../../../../shared/domain/types/Nullable';
import { DynamoDBRepository } from '../../../../shared/infrastructure/persistence/dynamoDB/DynamoDBRepository';
import { PrimaryKey } from '../../../shared/domain/PrimaryKey';
import { User } from '../../domain/entity/User';
import { UserId } from '../../domain/entity/UserId';
import { UserRepository } from '../../domain/repository/UserRepository';

export class DynamoDBUserRepository extends DynamoDBRepository<User> implements UserRepository {
	public async save(user: User): Promise<void> {
		await this.persist(user.id.value, user);
	}

	public async getUser(id: UserId): Promise<Nullable<User>> {
		const response = await this.getItem({
			TableName: this.tableName(),
			Key: {
				PK: this.convertToPk(id.value)
			}
		});

		if (!response.Item) {
			return null;
		}

		const userRaw = response.Item;

		return User.fromPrimitives({
			...userRaw,
			...{
				id: userRaw.PK
			}
		});
	}

	protected moduleName(): string {
		return 'USER';
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
