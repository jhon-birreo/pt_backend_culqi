import { generator } from 'rand-token';

export class RandToken {
	readonly value: string;

	constructor(value: string) {
		this.value = value;
	}

	static random(prefix?: string): RandToken {
		const randToken = generator({
			source: 'crypto'
		});
		prefix = prefix ? prefix : '';
		return new RandToken(`${prefix}${randToken.generate(16)}`);
	}

	toString(): string {
		return this.value;
	}
}
