import { DomainError } from '../../../../shared/domain/DomainError';
import { RandToken } from '../../../../shared/domain/value-object/RandToken';
import { StringValueObject } from '../../../../shared/domain/value-object/StringValueObject';

const prefix ='pk_test_'
export class UserId extends StringValueObject {
	constructor(value: string) {
		super(value);
		this.validatePrefix(value);
	}
	validatePrefix(value: string) {
		if (value.length !== 24) {
			throw new DomainError('Token no válido!');
		}

		let isValid = value.includes(prefix);

		if (!isValid) {
			throw new DomainError('El token no contiene el prefijo valido');
		}
	}

	static generateRamdom() {
		const generate = RandToken.random(prefix);
		return new UserId(generate.value);
	}
}
