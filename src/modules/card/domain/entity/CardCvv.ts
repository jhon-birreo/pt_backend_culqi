import { DomainError } from '../../../../shared/domain/DomainError';
import { NumberValueObject } from '../../../../shared/domain/value-object/IntValueObject';
import { CardNumber } from './CardNumber';

export class CardCvv extends NumberValueObject {
	constructor(value: number) {
		super(value);
		this.validateCvv(value);
	}

	validateCvv(value : number) {

    const cardType = CardNumber.getCardType();
    switch (cardType) {
      case 'visa':
      case 'mastercard':
        if (value.toString().length !== 3) {
          throw new DomainError(`El cvv: ${value} es incorrecto para la tarjeta ${cardType}`);
        }
        break;
      case 'amex':
        if (value.toString().length !== 4) {
          throw new DomainError(`El cvv: ${value} es incorrecto para la tarjeta ${cardType}`);
        }
        break;

      default:
        break;
    }

	}
}
