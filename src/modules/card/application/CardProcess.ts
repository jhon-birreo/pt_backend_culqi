import { CardRepository } from '../domain/repository/CardRepository';

export class CardProcess {
	private readonly cardRepository: CardRepository;
	constructor(cardRepo: CardRepository) {
		this.cardRepository = cardRepo;
	}

	async run(): Promise<any> {
		const cards = await this.cardRepository.findAllByStatus();
		const expiredPromises = cards.map((card) => this.cardProcess(card.id.value));
		await Promise.all(expiredPromises);

		return { expired: expiredPromises.length };
	}

	public async cardProcess(id: string): Promise<any> {
		await this.cardRepository.cardProcess(id);
	}
}
