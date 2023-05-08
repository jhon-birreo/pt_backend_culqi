import { DomainError } from '../../../shared/domain/DomainError';
import { Nullable } from '../../../shared/domain/types/Nullable';
import { User } from '../../user/domain/entity/User';
import { UserId } from '../../user/domain/entity/UserId';
import { UserRepository } from '../../user/domain/repository/UserRepository';
import { Card } from '../domain/entity/Card';
import { CardId } from '../domain/entity/CardId';
import { CardRepository } from '../domain/repository/CardRepository';
import { CardProcess } from './CardProcess';

export class CardFind {
	private readonly cardRepository: CardRepository;
	private readonly userRepository: UserRepository;
	private readonly cardProcess: CardProcess;

	constructor(cardRepo: CardRepository, userRepo: UserRepository) {
		this.cardRepository = cardRepo;
		this.userRepository = userRepo;
		this.cardProcess = new CardProcess(cardRepo);
	}

	async run(userIdentifier: string, token: string): Promise<Nullable<Card>> {
		
		await this.getUser(userIdentifier);

		const card = await this.getCard(userIdentifier, token);

		return card;
	}

	private async getUser(idUser: string): Promise<User> {
		const user = await this.userRepository.getUser(new UserId(idUser));

		if (!user) {
			throw new DomainError('User not found');
		}

		return user;
	}
	private async getCard(idUser: string, token: string): Promise<Card> {
		const card = await this.cardRepository.getCardVerifiedExpire(new UserId(idUser), token);

		if (!card) {
			throw new DomainError('Card not found');
		}

		await this.checkExpiredCard(card);

		return card;
	}
	private async checkExpiredCard(card: Card): Promise<any> {
		const cardActive = await this.cardRepository.getCardByStatus(new CardId(card.id.value));
		if (!cardActive) {
			return;
		}

		if (!this.checkDate(cardActive.cardToken.tokenExpire.value)) {
			await this.cardProcess.cardProcess(cardActive.id.value);

			throw new DomainError('Card expired!');
		}
	}

	private checkDate(date: string): boolean {
		const dateNow = new Date();
		const dateExpired = new Date(date);
		return dateNow.getTime() < dateExpired.getTime();
	}
}
