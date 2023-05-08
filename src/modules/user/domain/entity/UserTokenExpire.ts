import { DomainError } from '../../../../shared/domain/DomainError';
import { StringValueObject } from '../../../../shared/domain/value-object/StringValueObject';
import { expiredType } from '../types/expiredType';

export class UserTokenExpire extends StringValueObject {
	constructor(value: string) {
		super(value);
	}

	public static fromString(time: expiredType) {
		const editDate = new Date();
		switch (time.timeUnite) {
			case 'minute':
				editDate.setMinutes(editDate.getMinutes() + time.value);
				break;
            case 'hour':
                editDate.setHours(editDate.getHours() +time.value);
                break;
            case 'month':
                editDate.setMonth(editDate.getMonth() + time.value);
                break;
            case 'year':
                editDate.setFullYear(editDate.getFullYear() +time.value);
                break;
			default:
				break;
		}
		return new UserTokenExpire(editDate.toISOString());
	}
}
