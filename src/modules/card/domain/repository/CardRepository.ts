import { Nullable } from '../../../../shared/domain/types/Nullable';
import { UserId } from '../../../user/domain/entity/UserId';
import { Card } from '../entity/Card';
import { CardId } from '../entity/CardId';

export interface CardRepository {
	save(card: Card): Promise<void>;
	getCard(id: CardId): Promise<Nullable<Card>>;
	getCardVerifiedExpire(id: UserId, tokenPK: string): Promise<Nullable<Card>>;
	cardProcess(is: string): Promise<any>;
	findAllByStatus(): Promise<Nullable<Card[]>>;
	getCardByStatus(id: CardId): Promise<Nullable<Card>>;
	getCardByNumber(id:UserId, numberCard: number): Promise<Nullable<Card>>;
	updateToken(id: CardId, card: Card): Promise<void>;
}
