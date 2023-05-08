export const envConfig = Object.assign(process.env, {
  APP_ENVIRONMENT: 'local',
  SERVICE_NAME: 'api-culqi-serverless',
  NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
  DYNAMODB_LOCAL_ENDPOINT: 'http://localhost:8000',
  AMAZON_REGION: 'us-east-2',
  AMAZON_ACCOUNTID: '000000000000',
  CARD_TABLE_NAME: 'UsersTable-local',
  USER_TABLE_NAME: 'CardsTable-local',
}) ;