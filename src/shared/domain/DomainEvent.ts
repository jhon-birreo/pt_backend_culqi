import { Uuid } from './value-object/Uuid';

export abstract class DomainEvent {
    static EVENT_NAME: string;
    readonly aggregateId: string;
    readonly eventId: string;
    readonly occurredOn: Date;
    readonly eventContent: string;

    constructor(eventContent: string, aggregateId: string, eventId?: string, occurredOn?: Date) {
        this.aggregateId = aggregateId;
        this.eventId = eventId || Uuid.random().value;
        this.occurredOn = occurredOn || new Date();
        this.eventContent = eventContent;
    }

    abstract getEvent(): string;

    abstract toPrimitive(): Object;
}