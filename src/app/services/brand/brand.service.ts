import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Brand } from '../../models/brand.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private apiUrl =
    `${environment.apiUrl}/brands`;

  constructor(private http: HttpClient) { }

  getAllBrands(): Observable<Brand[]> {

    return this.http.get<Brand[]>(
      this.apiUrl
    );

  }

  getBrandsByCategory(
    categoryId: number
  ) {

    return this.http.get<Brand[]>(

      `${this.apiUrl}/category/${categoryId}`

    );

  }

}