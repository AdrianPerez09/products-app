import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Brand } from '../../models/brand.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private apiUrl =
    'http://localhost:8080/brands';

  constructor( private http: HttpClient) {}

  getAllBrands():Observable<Brand[]> {

    return this.http.get<Brand[]>(
      this.apiUrl
    );

  }

}