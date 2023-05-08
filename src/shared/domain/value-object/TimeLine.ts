import { Nullable } from '../types/Nullable';
import { DateValueObject } from './DateValueObject';

export interface TimeLineString {
	created: string;
	updated: Nullable<string>;
	deleted: Nullable<string>;
}

export class TimeLineCreatedAt extends DateValueObject {
	constructor(value: Date) {
		super(value);
	}

	public static fromString(value: string): TimeLineCreatedAt {
		return new TimeLineCreatedAt(new Date(value));
	}
}

export class TimeLineUpdatedAt extends DateValueObject {
	constructor(value: Date) {
		super(value);
	}
	public static fromString(value: string): TimeLineUpdatedAt {
		return new TimeLineUpdatedAt(new Date(value));
	}
}

export class TimeLineDeletedAt extends DateValueObject {
	constructor(value: Date) {
		super(value);
	}

	public static fromString(value: string): TimeLineDeletedAt {
		return new TimeLineDeletedAt(new Date(value));
	}
}

export class TimeLine {
	readonly created: TimeLineCreatedAt;
	readonly updated: Nullable<TimeLineUpdatedAt>;
	readonly deleted: Nullable<TimeLineDeletedAt>;

	constructor(
		created: TimeLineCreatedAt,
		updated: Nullable<TimeLineUpdatedAt>,
		deleted: Nullable<TimeLineUpdatedAt>
	) {
		this.created = created;
		this.updated = updated;
		this.deleted = deleted;
	}

	isDeleted(): boolean {
		return this.deleted !== null;
	}

	isUpdated(): boolean {
		return this.updated !== null;
	}

	public static fromPrimitives(plainData: {
		created: string;
		updated: string | null;
		deleted: string | null;
	}): TimeLine {
		return new TimeLine(
			TimeLineCreatedAt.fromString(plainData.created),
			plainData.updated ? TimeLineUpdatedAt.fromString(plainData.updated) : null,
			plainData.deleted ? TimeLineDeletedAt.fromString(plainData.deleted) : null
		);
	}

	toPrimitives() {
		type responseType = {
			created: string;
			updated?: string;
			deleted?: string;
		};

		let response: responseType = {
			created: this.created.toString()
		};

		if (this.updated) {
			response.updated = this.updated.toString();
		}

		if (this.deleted) {
			response.deleted = this.deleted.toString();
		}

		return response;
	}
}
