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
yarn dynamodb-migrate
```
Serverless offline:

```bash
yarn offline
```

## Deployment

Run:

```bash
serverless deploy --verbose
```

## Endpoints

- POST api/v1/user - creates a new user with prefix pk_test_ automatically generated user id.
- POST api/v1/card - create or edit token with 15 minute expiation.
- GET api/v1/cards - get card data always on when it has not expired.
- GET api/v1/health - check if the request is correct

## Licence

MIT.
