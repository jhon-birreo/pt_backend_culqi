import { APIGatewayProxyEvent } from 'aws-lambda';
import { number, object, string } from 'yup';
import { CardCreator } from '../../../src/modules/card/application/CardCreator';
import { createServices } from '../../../src/services/factory';
import { DomainError } from '../../../src/shared/domain/DomainError';
import { FormatJSONResponse } from '../../../src/shared/domain/FormatJSONResponse';
import { Middyfy } from '../../../src/shared/domain/Middyfy';

const handler = async (event: APIGatewayProxyEvent) => {
	try {
		const body: any = event.body;
		let merchantIdentifier = '';

		const authHeader = event.headers.authorization || event.headers.Authorization;

		if (!authHeader) {
			throw new DomainError('Authorization es requerido');
		}

		if (authHeader.startsWith('Bearer ')) {
			merchantIdentifier = authHeader.substring(7, authHeader.length);
		}

		const schema = object({
			number: number().positive().integer().required('el numero de la tarjeta es un campo obligatorio'),
			cvv: number().positive().integer().required('el cvv es un campo obligatorio'),
			expirationMonth: string().min(1).max(2).required('el mes de expiración es un campo obligatorio'),
			expirationYear: string().length(4).required('el año de expiración es un campo obligatorio'),
			email: string()
				.min(5)
				.max(100)
				.email('debe ser un correo electrónico válido')
				.required('el correo electrónico es un campo obligatorio')
		});
		
		await schema.validate(body, { abortEarly: false });

		const service = <CardCreator>createServices('CardCreator');

		const card = await service.run(merchantIdentifier, body);

		if (!card) {
			throw new DomainError('La tarjeta no se creo');
		}

		const token = card.cardToken.toPrimitives().tokenPK;

		return FormatJSONResponse(200, {
			status: 200,
			message: 'Operación realizada con éxito',
			data: {
				token
			}
		});
	} catch (error) {
		if (error instanceof DomainError) {
      return FormatJSONResponse(400, {
        status: {
          errors: [error.message],
          message: 'Error en la operación'
        }
      });
    } else {
			return FormatJSONResponse(400, {
				status: {
          errors: error.message,
          message: 'Error en la operación'
        }
			});
		}
	}
};

export const run = Middyfy(handler);
