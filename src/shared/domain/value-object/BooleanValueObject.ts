export abstract class BooleanValueObject {
  readonly value: boolean;

  constructor(value: boolean) {
    this.value = value;
  }

  isBoolean(): boolean {
    return this.value ? this.value : false;
  }

}
