import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { expiredType } from '../types/expiredType';
import { UserTokenExpire } from './UserTokenExpire';
import UserTokenPK from './UserTokenPK';

export class UserToken {
	readonly tokenExpire: UserTokenExpire;
	readonly tokenPK: UserTokenPK;
	constructor(tokenExpire: UserTokenExpire, tokenPK: UserTokenPK) {
		this.tokenExpire = tokenExpire;
		this.tokenPK = tokenPK;
	}
	static create(tokenExpire: UserTokenExpire, tokenPK: UserTokenPK): UserToken {
		const userToken = new UserToken(tokenExpire, tokenPK);
		return userToken;
	}

	toPrimitives() {
		return {
			tokenExpire: this.tokenExpire.value,
			tokenPK: this.tokenPK.value
		};
	}

	static fromPrimitives(primitives: { tokenPK: string; tokenExpire: expiredType }) {
		return new UserToken(
			UserTokenExpire.fromString(primitives.tokenExpire),
		 	new UserTokenPK(primitives.tokenPK)
		);
	}

	updateFromPrimitives(plainData: any): UserToken {
		return UserToken.fromPrimitives({
			...this.toPrimitives(),
			...plainData
		});
	}
}
