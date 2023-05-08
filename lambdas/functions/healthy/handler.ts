import { HealthyChecker } from '../../../src/modules/healthy/application/HealthyChecker';
import { Middyfy } from '../../../src/shared/domain/Middyfy';

const handler = async () => {
	const healthyChecker = new HealthyChecker();
	const healthy = await healthyChecker.run();

	return healthy;
};

export const run = Middyfy(handler);
