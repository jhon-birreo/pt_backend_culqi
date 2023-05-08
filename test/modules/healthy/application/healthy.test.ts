import 'reflect-metadata';
import { HealthyChecker } from "../../../../src/modules/healthy/application/HealthyChecker";

describe('Health Chcker', () => {
  it('should give a valid response', async () => {
      const checker = new HealthyChecker();
      const response = await checker.run();
      expect(response.statusCode).toBe(200);
  });
});
