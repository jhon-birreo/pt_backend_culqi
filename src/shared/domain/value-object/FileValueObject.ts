export abstract class FileValueObject {
    readonly content: string;

    constructor(content: string) {
        this.content = content;
    }

    toPrimitive(): Object {
        return this.content;
    }
}