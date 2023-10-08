import {z} from "zod"
import { Brand } from "../utility/brand"

export type id = Brand<number , "id">

export module id {
    export const is = (number: number): number is id =>{
        return typeof number === 'number' && Number.isInteger(number) && number > 0 ;
    }
    export const zod = z.coerce.number().refine(is);

}
