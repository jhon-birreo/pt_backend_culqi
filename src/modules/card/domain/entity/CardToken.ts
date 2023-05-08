import { expiredType } from '../../../user/domain/types/expiredType';
import { CardTokenExpire } from './CardTokenExpire';
import CardTokenPK from './CardTokenPK';

export class CardToken {
	readonly tokenExpire: CardTokenExpire;
	readonly tokenPK: CardTokenPK;
	constructor(tokenExpire: CardTokenExpire, tokenPK: CardTokenPK) {
		this.tokenExpire = tokenExpire;
		this.tokenPK = tokenPK;
	}
	static create(tokenExpire: CardTokenExpire, tokenPK: CardTokenPK): CardToken {
		const cardToken = new CardToken(tokenExpire, tokenPK);
		return cardToken;
	}

	toPrimitives() {
		return {
			tokenExpire: this.tokenExpire.value,
			tokenPK: this.tokenPK.value
		};
	}

	static fromPrimitives(primitives: { tokenPK: string; tokenExpire: expiredType }) {
		return new CardToken(CardTokenExpire.fromString(primitives.tokenExpire), new CardTokenPK(primitives.tokenPK));
	}

	updateFromPrimitives(plainData: any): CardToken {
		return CardToken.fromPrimitives({
			...this.toPrimitives(),
			...plainData
		});
	}
}
