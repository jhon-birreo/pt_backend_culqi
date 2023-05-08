import { DomainError } from '../../../../shared/domain/DomainError';
import { StringValueObject } from '../../../../shared/domain/value-object/StringValueObject';

export class UserPassword extends StringValueObject {
	constructor(value: string) {
		super(value);
		this.checkIfEmpty(value);
	}

	checkIfEmpty(value: string) {
		if (!value) {
			throw new DomainError('La contraseña es requerido');
		}
	}
}
