import { APIGatewayProxyEvent } from 'aws-lambda';
import { CardFind } from '../../../src/modules/card/application/CardFind';
import { createServices } from '../../../src/services/factory';
import { DomainError } from '../../../src/shared/domain/DomainError';
import { FormatJSONResponse } from '../../../src/shared/domain/FormatJSONResponse';
import { Middyfy } from '../../../src/shared/domain/Middyfy';
import { CardProcess } from '../../../src/modules/card/application/CardProcess';

const handler = async (event: APIGatewayProxyEvent) => {
	try {

		const service = <CardProcess>createServices('CardProcess');

		await service.run();

		return FormatJSONResponse(200, {
			status: 200,
			message: 'Operación realizada con éxito',
			data: {
				card: 'success'
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
