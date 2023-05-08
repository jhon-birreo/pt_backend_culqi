import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpJsonBosyParser from '@middy/http-json-body-parser';

export const Middyfy = (handler: any) => {
	return middy(handler).use([httpErrorHandler(),httpEventNormalizer(), httpJsonBosyParser()]);
};
