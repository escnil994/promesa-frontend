import { Category } from 'src/app/models/category.model';


export interface loadCategoriesInterface{
    total: number,
    categories: Category[]
}