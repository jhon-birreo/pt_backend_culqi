# Technical Test with Node.js, TypeScript and AWS DynamoDB

It's a tokenization process with Node.js and TypeScript with serverless framework infrastructure as code
to easily deploy on AWS. The DDD architecture was used.

## Prerequisites

- AWS CLI installed and configured
- [`serverless-framework`](https://github.com/serverless/serverless)
- [`node.js`](https://nodejs.org)
- [`docker`](https://www.docker.com)

## Installation

Run docker-compose, this run dynamodb and dynamodb-admin:

Run:

```bash
npm install
```

or

```
yarn install
```

Run dynamodb and dynamodb-admin

```bash
docker-compose up --build -d
```
```bash
dynamodb-admin running in http://localhost:8003
```

## Deployment local

Dynamodb migrate:

```bash
yarn dynamodb:migrate
```
Serverless offline:

```bash
yarn offline
```

## Deployment

Run:

```bash
yarn deploy
```

## Test with Jest

Run:

```bash
yarn test
```
or

```bash
npm run test
```
## Endpoints

- POST api/v1/user - creates a new user with prefix pk_test_ automatically generated user id.

Body:
```bash
{
    "name": "Jhon",
    "email": "jhon@hotmail.com",
    "password": "12345"
}
```
- POST api/v1/card - create or edit token with 15 minute expiation.

Headers:
```bash
Autorization: pk_test_xxxxxxxxxxxxxx
```

Body:
```bash
{
    "number": 4263982640269299,
    "cvv": 122,
    "expirationMonth": "12",
    "expirationYear": "2028",
    "email": "hola@hotmail.com"
}
```
- GET api/v1/cards - get card data always on when it has not expired.

Headers:
```bash
x-custom-id: pk_test_xxxxxxxxxxxxxx
Autorization: xxxxxxxxxxxxxx
```
- GET api/v1/health - check if the request is correct

## Endpoint to prod
Url:
```bash
  POST - https://8u397wdlkd.execute-api.us-east-2.amazonaws.com/api/v1/user
  POST - https://8u397wdlkd.execute-api.us-east-2.amazonaws.com/api/v1/card
  GET - https://8u397wdlkd.execute-api.us-east-2.amazonaws.com/api/v1/cards
  GET - https://8u397wdlkd.execute-api.us-east-2.amazonaws.com/api/v1/health
```
## Licence

MIT.
