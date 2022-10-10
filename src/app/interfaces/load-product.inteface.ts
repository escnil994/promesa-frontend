import { Product } from './../models/product.model';


export interface loadProductInterface{
    total: number,
    products: Product[]
}