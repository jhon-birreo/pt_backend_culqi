import { createCard } from './card/application/CardCreator';
import { findCard } from './card/application/CardFind';
import { userCreator } from './user/application/UserCreator';

describe('UserCreator', userCreator);
describe('CardCreator', createCard);
describe('CardFind', findCard);
