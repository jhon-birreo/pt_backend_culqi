import { DomainError } from '../../../../shared/domain/DomainError';
import { StringValueObject } from '../../../../shared/domain/value-object/StringValueObject';

export class CardExpirationMonth extends StringValueObject {
	constructor(value: string) {
		super(value);
		this.monthValid(value);
	}

	monthValid(value: string) {
		if (!value) {
			throw new DomainError('fecha de expiración no existente');
		}
		const convertInteger = parseInt(value);
		if (!(convertInteger <= 12 && convertInteger >= 1)) {
			throw new DomainError('fecha de expiración no es válido');
		}
	}
}
