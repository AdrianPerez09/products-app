import { Component, inject, OnInit } from '@angular/core';

import { BrandService } from '../../../services/brand/brand.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-brand-list',
   standalone: true,
  imports: [CommonModule],
  templateUrl: './brand-list.html',
  styleUrl: './brand-list.css'
})
export class BrandListComponent{

  private brandService = inject(BrandService);

  brands = toSignal(this.brandService.getAllBrands(), { initialValue: [] });

}