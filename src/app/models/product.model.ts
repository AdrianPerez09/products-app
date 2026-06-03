import { Category } from './category.model';
import { Brand } from './brand.model';

export interface Product {

  id?: number;

  name: string;

  description: string;

  price: number;

  category: Category;

  brand: Brand;
}