import { APIGatewayProxyEvent } from 'aws-lambda';
import { object, string } from 'yup';
import { UserCreator } from '../../../src/modules/user/application/UserCreator';
import { createServices } from '../../../src/services/factory';
import { DomainError } from '../../../src/shared/domain/DomainError';
import { FormatJSONResponse } from '../../../src/shared/domain/FormatJSONResponse';
import { Middyfy } from '../../../src/shared/domain/Middyfy';

const handler = async (event: APIGatewayProxyEvent) => {
	try {
		const body: any = event.body;
		const schema = object({
			name: string().optional(),
			email: string()
				.min(5)
				.max(100)
				.email('debe ser un correo electrónico válido')
				.required('el correo electrónico es un campo obligatorio'),
			password: string().required('La contraseña es un campo obligatorio')
		});
		await schema.validate(body, { abortEarly: false });

		const service = <UserCreator>createServices('UserCreator');

		const user = await service.run(body);

		if (!user) {
			throw new DomainError('El usuario no se creo');
		}
		return FormatJSONResponse(200, {
			status: 200,
			message: 'Operación realizada con éxito',
			data: {
				user: user.toFilterPrimitives()
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
