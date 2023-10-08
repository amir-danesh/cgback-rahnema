import { Brand } from "../utility/brand";

export type Int = Brand<number, "Integer">

export const isInt = (value: number): value is Int => Number.isInteger(value);