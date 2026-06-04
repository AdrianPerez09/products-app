import { Component, OnInit } from '@angular/core';

import { Brand } from '../../../models/brand.model';

import { BrandService } from '../../../services/brand/BrandService';

@Component({
  selector: 'app-brand-list',
  standalone: false,
  templateUrl: './brand-list.html',
  styleUrl: './brand-list.css'
})
export class BrandListComponent implements OnInit {

  brands: Brand[] = [];

  constructor(
    private brandService: BrandService
  ) {}

  ngOnInit(): void {

    this.loadBrands();

  }

  loadBrands(): void {

    this.brandService
      .getAllBrands()
      .subscribe({

        next: (data) => {

          this.brands = data;

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

}