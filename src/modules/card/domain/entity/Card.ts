import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import {
	TimeLine,
	TimeLineCreatedAt,
	TimeLineDeletedAt,
	TimeLineUpdatedAt
} from '../../../../shared/domain/value-object/TimeLine';
import { UserId } from '../../../user/domain/entity/UserId';
import { CardCvv } from './CardCvv';
import { CardEmail } from './CardEmail';
import { CardExpirationMonth } from './CardExpirationMonth';
import { CardExpirationYear } from './CardExpirationYear';
import { CardId } from './CardId';
import { CardNumber } from './CardNumber';
import { CardStatus } from './CardStatus';
import { CardToken } from './CardToken';
import { CardTokenExpire } from './CardTokenExpire';
import CardTokenPK from './CardTokenPK';

export class Card extends AggregateRoot {
	readonly id: CardId;
	readonly userID: UserId;
	readonly number: CardNumber;
	readonly cvv: CardCvv;
	readonly expirationMonth: CardExpirationMonth;
	readonly expirationYear: CardExpirationYear;
	readonly email: CardEmail;
	readonly cardToken: CardToken;
	readonly status: CardStatus | null;
	readonly timeLine: TimeLine;
	constructor(
		id: CardId,
		userID: UserId,
		number: CardNumber,
		cvv: CardCvv,
		expirationMonth: CardExpirationMonth,
		expirationYear: CardExpirationYear,
		email: CardEmail,
		cardToken: CardToken,
		status: CardStatus | null,
		timeLine: TimeLine
	) {
		super();
		this.id = id;
		this.userID = userID;
		this.number = number;
		this.cvv = cvv;
		this.expirationMonth = expirationMonth;
		this.expirationYear = expirationYear;
		this.email = email;
		this.cardToken = cardToken;
		this.status = status;
		this.timeLine = timeLine;
	}
	static create(
		id: CardId,
		userID: UserId,
		number: CardNumber,
		cvv: CardCvv,
		expirationMonth: CardExpirationMonth,
		expirationYear: CardExpirationYear,
		email: CardEmail,
		cardToken: CardToken,
		status: CardStatus | null,
		timeLine: TimeLine
	): Card {
		const card = new Card(id, userID, number, cvv, expirationMonth, expirationYear, email, cardToken, status, timeLine);
		return card;
	}

	toPrimitives() {
		return {
			userID: this.userID.value,
			number: this.number.value,
			cvv: this.cvv.value,
			expirationMonth: this.expirationMonth.value,
			expirationYear: this.expirationYear.value,
			email: this.email.value,
			cardToken: this.cardToken.toPrimitives(),
			status: this.status.value,
			timeLine: this.timeLine.toPrimitives()
		};
	}
	toFilterPrimitives() {
		return {
			userID: this.userID.value,
			number: this.number.value,
			expirationMonth: this.expirationMonth.value,
			expirationYear: this.expirationYear.value,
			email: this.email.value,
			status: this.status.value
		};
	}

	static fromPrimitives(primitives: any) {
		return new Card(
			new CardId(primitives.id),
			new UserId(primitives.userID),
			new CardNumber(primitives.number),
			new CardCvv(primitives.cvv),
			new CardExpirationMonth(primitives.expirationMonth),
			new CardExpirationYear(primitives.expirationYear),
			new CardEmail(primitives.email),
			new CardToken(
				new CardTokenExpire(primitives.cardToken.tokenExpire),
				new CardTokenPK(primitives.cardToken.tokenPK)
			),
			primitives.status ? new CardStatus(primitives.status) : null,
			new TimeLine(
				TimeLineCreatedAt.fromString(primitives.timeLine.created),
				primitives.timeLine.updated ? TimeLineUpdatedAt.fromString(primitives.timeLine.updated) : null,
				primitives.timeLine.deleted ? TimeLineDeletedAt.fromString(primitives.timeLine.deleted) : null
			)
		);
	}

	updateFromPrimitives(plainData: any): Card {
		return Card.fromPrimitives({
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
