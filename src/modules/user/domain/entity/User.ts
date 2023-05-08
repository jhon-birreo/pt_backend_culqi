import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import {
	TimeLine,
	TimeLineCreatedAt,
	TimeLineDeletedAt,
	TimeLineUpdatedAt
} from '../../../../shared/domain/value-object/TimeLine';
import { UserEmail } from './UserEmail';
import { UserId } from './UserId';
import { UserName } from './UserName';
import { UserPassword } from './UserPassword';
import UserTokenPK from './UserTokenPK';

export class User extends AggregateRoot {
	readonly id: UserId;
	readonly email: UserEmail;
	readonly password: UserPassword;
	readonly name: UserName;
	readonly timeLine: TimeLine;
	constructor(
		id: UserId,
		email: UserEmail,
		password: UserPassword,
		name: UserName,
		timeLine: TimeLine
	) {
		super();
		this.id = id;
		this.email = email;
		this.password = password;
		this.name = name;
		this.timeLine = timeLine;
	}
	static create(
		id: UserId,
		email: UserEmail,
		password: UserPassword,
		name: UserName,
		timeLine: TimeLine
	): User {
		const user = new User(id, email, password, name, timeLine);
		return user;
	}

	toPrimitives() {
		return {
			// id: this.id.value,
			email: this.email.value,
			password: this.password.value,
			name: this.name.value,
			timeLine: this.timeLine.toPrimitives()
		};
	}
	toFilterPrimitives() {
		return {
			id: this.id.value,
			email: this.email.value,
			name: this.name.value,
		};
	}

	static fromPrimitives(primitives: any) {
		return new User(
			new UserId(primitives.id),
			new UserEmail(primitives.email),
			new UserPassword(primitives.password),
			new UserName(primitives.name),
			new TimeLine(
				TimeLineCreatedAt.fromString(primitives.timeLine.created),
				primitives.timeLine.updated ? TimeLineUpdatedAt.fromString(primitives.timeLine.updated) : null,
				primitives.timeLine.deleted ? TimeLineDeletedAt.fromString(primitives.timeLine.deleted) : null
			)
		);
	}

	updateFromPrimitives(plainData: any): User {
		return User.fromPrimitives({
			...this.toPrimitives(),
			...plainData,
			...{
				timeLine: {
					...this.timeLine.toPrimitives(),
					...{
						updated: new Date().toISOString()
					}
				}
			}
		});
	}
}
