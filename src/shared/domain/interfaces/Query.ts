export interface Query {
    conditions: string;
    values: { [key: string]: any };
}