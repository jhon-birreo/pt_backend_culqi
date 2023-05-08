import { DomainError } from '../../../../shared/domain/DomainError';
import { StringValueObject } from '../../../../shared/domain/value-object/StringValueObject';

export class UserEmail extends StringValueObject {
	constructor(value: string) {
		super(value);
		this.validateEmail(value);
	}

	validateEmail(value: string) {
		if (!value) {
			throw new DomainError('La dirección de correo electrónico es requerido');
		}
		const domainValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value.trim());
    if (!domainValid) {
      throw new DomainError('¡Ha ingresado una dirección de correo electrónico no válida!');
    }
	}
}
