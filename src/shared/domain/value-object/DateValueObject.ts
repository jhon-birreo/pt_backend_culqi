export abstract class DateValueObject {
  readonly value: Date;

  constructor(value: Date) {
    this.value = value
  }

  equalsTo(other: DateValueObject): boolean {
    return this.value === other.value
  }

  isBiggerThan(other: DateValueObject): boolean {
    return this.value > other.value
  }
  
  isSmallerThan(other: DateValueObject): boolean {
    return this.value < other.value
  }

  isBiggerOrEqualThan(other: DateValueObject): boolean {
    return this.value >= other.value
  }
  isSmallerOrEqualThan(other: DateValueObject): boolean {
    return this.value <= other.value
  }

  toString(): string {
    return this.value ? this.value.toISOString() : ""
  }
  
  getMonth(): string {
    const month = this.value.getMonth() + 1;
    return month < 10 ? `0${month}` : month.toString();
  }

  getDay(): string {
    const day = this.value.getDate();
    return day < 10 ? `0${day}` : day.toString();
  }

  getMinute(): string {
    const minute = this.value.getMinutes();
    return minute < 10 ? `0${minute}` : minute.toString();
  }

  getYear(): string {
    return this.value.getFullYear().toString();
  }

  isEmpty(): boolean {
    return !this.value || this.value.toString() === "";
  }
  
  toDateTimeValue(): string {
    return this.isEmpty() ? "" : `${this.getYear()}-${this.getMonth()}-${this.getDay()}T00:00:00-05:00`;
  }
}
