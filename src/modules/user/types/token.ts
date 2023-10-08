import {Brand} from "../../../utility/brand";
import z from "zod";

export type Token = Brand<string, "Token">

const tokenRegex = /^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/g
export const isToken = (token: string): token is Token => { return token.length > 32 && token.length < 256 ; }

export const zodToken = z.string().refine(isToken, "Token must be alphanumeric")
