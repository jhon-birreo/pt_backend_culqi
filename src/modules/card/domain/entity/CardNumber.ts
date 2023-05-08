import { DomainError } from '../../../../shared/domain/DomainError';
import { NumberValueObject } from '../../../../shared/domain/value-object/IntValueObject';

export class CardNumber extends NumberValueObject {
	private static cardNumber: number;
	constructor(value: number) {
		super(value);
		this.validCard(value);
		CardNumber.cardNumber = value;
	}

	validCard(value: number) {
		const isValid = this.validCardWithLuhnAlg(value.toString());

		if (!isValid) {
			throw new DomainError('El número de tarjeta no es válido');
		}
	}

	// takes the form field value and returns true on valid number
	validCardWithLuhnAlg(value: string) {
		// accept only digits, dashes or spaces
		if (/[^0-9-\s]+/.test(value)) return false;

		// The Luhn Algorithm. It's so pretty.
		var nCheck = 0,
			nDigit = 0,
			bEven = false;
		value = value.replace(/\D/g, '');

		for (var n = value.length - 1; n >= 0; n--) {
			var cDigit = value.charAt(n),
				nDigit = parseInt(cDigit, 10);

			if (bEven) {
				if ((nDigit *= 2) > 9) nDigit -= 9;
			}

			nCheck += nDigit;
			bEven = !bEven;
		}
		return nCheck % 10 == 0;
	}

	static getCardType() {

		const re = {
			electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
			maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
			dankort: /^(5019)\d+$/,
			interpayment: /^(636)\d+$/,
			unionpay: /^(62|88)\d+$/,
			visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
			mastercard: /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/,
			amex: /^3[47][0-9]{13}$/,
			diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
			discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
			jcb: /^(?:2131|1800|35\d{3})\d{11}$/
		};

		for (var key in re) {
			if (re[key].test(CardNumber.cardNumber)) {
				return key;
			}
		}

		return 'unknown';
	}
}
