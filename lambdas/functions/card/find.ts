import { APIGatewayProxyEvent } from 'aws-lambda';
import { CardFind } from '../../../src/modules/card/application/CardFind';
import { createServices } from '../../../src/services/factory';
import { DomainError } from '../../../src/shared/domain/DomainError';
import { FormatJSONResponse } from '../../../src/shared/domain/FormatJSONResponse';
import { Middyfy } from '../../../src/shared/domain/Middyfy';

const handler = async (event: APIGatewayProxyEvent) => {
	try {
		let token = '';
		const authHeader = event.headers.authorization || event.headers.Authorization;
		const userIdentifier = event.headers['x-custom-id'];
		
		if (!authHeader) {
			throw new DomainError('Authorization es requerido');
		}
		if (!userIdentifier) {
			throw new DomainError('x-custom-id es requerido');
		}

		if (authHeader.startsWith('Bearer ')) {
			token = authHeader.substring(7, authHeader.length);
		}

		const service = <CardFind>createServices('CardFind');

		const card = await service.run(userIdentifier, token);

		if (!card) {
			throw new DomainError('Tarjeta no encontrado');
		}

		return FormatJSONResponse(200, {
			status: 200,
			message: 'Operación realizada con éxito',
			data: {
				card: card.toFilterPrimitives()
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
