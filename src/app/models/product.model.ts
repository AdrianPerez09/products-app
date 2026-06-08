import { Category } from './category.model';
import { Brand } from './brand.model';
import { ProductImage } from './product-image.model';

export interface Product {

  id: number;

  name: string;

  description: string;

  price: number;

  brand: Brand;

  category: Category;

  images: ProductImage[];

}