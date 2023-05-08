import { EnumValueObject } from '../../../../shared/domain/value-object/EnumValueObject';
import { InvalidArgumentError } from '../../../../shared/domain/value-object/InvalidArgumentError';

export enum CardStatusAvaibles {
	ACTIVE = 'ACTIVE',
	EXPIRED = 'EXPIRED'
}
export class CardStatus extends EnumValueObject<CardStatusAvaibles> {
	constructor(value: CardStatusAvaibles) {
		super(value, Object.values(CardStatusAvaibles));
	}
	static fromValue(value: string): CardStatus {
		switch (value) {
			case CardStatusAvaibles.ACTIVE:
				return new CardStatus(CardStatusAvaibles.ACTIVE);
			case CardStatusAvaibles.EXPIRED:
				return new CardStatus(CardStatusAvaibles.EXPIRED);
			default:
				throw new InvalidArgumentError(`The card status ${value} is invalid`);
		}
	}

	public isActive(): boolean {
		return this.value === CardStatusAvaibles.ACTIVE;
	}

	public isExpired(): boolean {
		return this.value === CardStatusAvaibles.EXPIRED;
	}

	protected throwErrorForInvalidValue(value: CardStatusAvaibles): void {
		throw new InvalidArgumentError(`The card status ${value} is invalid`);
	}
}
