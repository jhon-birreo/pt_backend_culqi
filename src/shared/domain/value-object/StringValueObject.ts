export abstract class StringValueObject {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  isEmpty(): boolean {
    return this.toString().trim() === "";
  }

  toString(): string {
    return this.value ? this.value.toString() : "";
  }
}
