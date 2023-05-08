import { DomainError } from '../../../../shared/domain/DomainError';
import { StringValueObject } from '../../../../shared/domain/value-object/StringValueObject';

export class CardExpirationYear extends StringValueObject {
	constructor(value: string) {
		super(value);
		this.yearValid(value);
	}

	yearValid(value: string) {
		if (!value) {
			throw new DomainError('el año de expiración no existente');
		}

		if (!(this.getYearLimit(5) >= parseInt(value))) {
			throw new DomainError('el año de expiración está fuera del rango');
		}
	}

	getYearLimit(addYear: number) {
		const date = new Date();
		date.setFullYear(date.getFullYear() + addYear);
		return date.getFullYear();
	}
}
