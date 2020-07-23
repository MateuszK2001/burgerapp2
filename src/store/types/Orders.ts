import { Ingredients } from "./Ingredients";

export interface Order{
    ingredients:Ingredients;
    price:number;
    id?:string;
}