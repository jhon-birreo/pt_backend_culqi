import { DomainError } from '../../../shared/domain/DomainError';
import { Nullable } from '../../../shared/domain/types/Nullable';
import { TimeLine } from '../../../shared/domain/value-object/TimeLine';
import { User } from '../../user/domain/entity/User';
import { UserId } from '../../user/domain/entity/UserId';
import { UserRepository } from '../../user/domain/repository/UserRepository';
import { Card } from '../domain/entity/Card';
import { CardCvv } from '../domain/entity/CardCvv';
import { CardEmail } from '../domain/entity/CardEmail';
import { CardExpirationMonth } from '../domain/entity/CardExpirationMonth';
import { CardExpirationYear } from '../domain/entity/CardExpirationYear';
import { CardId } from '../domain/entity/CardId';
import { CardNumber } from '../domain/entity/CardNumber';
import { CardStatus, CardStatusAvaibles } from '../domain/entity/CardStatus';
import { CardToken } from '../domain/entity/CardToken';
import CardTokenPK from '../domain/entity/CardTokenPK';
import { CardRequest } from '../domain/interface/CardRequest';
import { CardRepository } from '../domain/repository/CardRepository';

export class CardCreator {
	private readonly cardRepository: CardRepository;
	private readonly userRepository: UserRepository;
	constructor(cardRepo: CardRepository, userRepo: UserRepository) {
		this.cardRepository = cardRepo;
		this.userRepository = userRepo;
	}

	async run(merchantIdentifier: string, request: CardRequest): Promise<Nullable<Card>> {
		await this.getUser(merchantIdentifier);
		const IsExistCard = await this.updateExpireDateIfExistCardByStatus(merchantIdentifier, request.number);
		if (IsExistCard) {
			console.log('IsExistCard');
			console.log(IsExistCard);

			return IsExistCard;
		}
		const card = Card.create(
			CardId.random(),
			new UserId(merchantIdentifier),
			new CardNumber(request.number),
			new CardCvv(request.cvv),
			new CardExpirationMonth(request.expirationMonth),
			new CardExpirationYear(request.expirationYear),
			new CardEmail(request.email),
			CardToken.fromPrimitives({
				tokenPK: CardTokenPK.random().value,
				tokenExpire: {
					value: 15,
					timeUnite: 'minute'
				}
			}),
			new CardStatus(CardStatusAvaibles.ACTIVE),
			TimeLine.fromPrimitives({
				created: new Date().toISOString(),
				updated: null,
				deleted: null
			})
		);

		await this.cardRepository.save(card);
		return card;
	}

	private async getUser(idUser: string): Promise<User> {
		const user = await this.userRepository.getUser(new UserId(idUser));
		if (!user) {
			throw new DomainError('User not found');
		}
		return user;
	}
	private async updateExpireDateIfExistCardByStatus(userId: string, numberCard: number): Promise<Nullable<Card>> {
		const card = await this.cardRepository.getCardByNumber(new UserId(userId), numberCard);

		if (card) {
			const cardUpdate = card.updateFromPrimitives({
				id: card.id.value,
				cardToken: CardToken.fromPrimitives({
					tokenPK: CardTokenPK.random().value,
					tokenExpire: {
						value: 15,
						timeUnite: 'minute'
					}
				}).toPrimitives()
			});
			await this.cardRepository.save(cardUpdate);
			return cardUpdate;
		}
		return null;
	}
}
