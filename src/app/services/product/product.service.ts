import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Product } from '../../models/product.model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(
  id: number
) {

  return this.http.get<Product>(
    `${this.apiUrl}/${id}`
  );

}

  getProductsByCategory(categoryId: number) {

    return this.http.get<Product[]>(`${this.apiUrl}/category/${categoryId}`);
  }

  searchProducts(

  query?: string,

  brandId?: number,

  categoryId?: number,

  sort?: string

) {

  const params: any = {};

  if (query) {

    params.query = query;

  }

  if (brandId) {

    params.brandId = brandId;

  }

  if (categoryId) {

    params.categoryId = categoryId;

  }

  if (sort) {

    params.sort = sort;

  }

  return this.http.get<Product[]>(

    `${this.apiUrl}/search`,

    {

      params

    }

  );

}
}