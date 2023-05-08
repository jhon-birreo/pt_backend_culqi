import { DomainError } from '../../../../shared/domain/DomainError';
import { StringValueObject } from '../../../../shared/domain/value-object/StringValueObject';

export class UserName extends StringValueObject {
	constructor(value: string) {
		super(value);
	}
}
