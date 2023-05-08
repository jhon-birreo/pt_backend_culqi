import { DomainError } from '../../../../shared/domain/DomainError';
import { StringValueObject } from '../../../../shared/domain/value-object/StringValueObject';

export class CardEmail extends StringValueObject {
	constructor(value: string) {
		super(value);
		this.validateEmailDomain(value);
	}

	validateEmailDomain(value: string) {
		const domainValid = /^\w+([-+.']\w+)*@?(gmail.com|hotmail.com|yahoo.es)$/.test(value.trim());
    if (!domainValid) {
      throw new DomainError('Correo electrónico no permitido');
    }
	}
}
