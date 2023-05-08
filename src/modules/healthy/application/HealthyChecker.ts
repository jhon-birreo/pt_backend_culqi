interface HealthyCheckerResponse {
	statusCode: number;
	body: string;
}
export class HealthyChecker {
	constructor() {}

	async run(): Promise<HealthyCheckerResponse> {
		return {
			statusCode: 200,
			body: 'OK'
		};
	}
}
