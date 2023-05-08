export abstract class NumberValueObject {
  readonly value: number;

  constructor(value: number) {
    this.value = value;
  }

  equalsTo(other: NumberValueObject): boolean {
    return this.value === other.value;
  }

  isBiggerThan(other: NumberValueObject): boolean {
    return this.value > other.value;
  }

  toString(): string {
    return this.value ? this.value.toString() : null;
  }

  toFixed(digits: number = 5): string {
    let number = Number(this.value ?? null);

    return number.toFixed(digits);
  }
}
