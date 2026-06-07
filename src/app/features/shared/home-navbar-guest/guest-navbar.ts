import { Component, Inject, inject, signal } from '@angular/core';

import { CommonModule } from '@angular/common';

import { toSignal } from '@angular/core/rxjs-interop';

import { CategoryService } from '../../../services/category/category.service';
import { RouterLink } from '@angular/router';

import { FormControl } from '@angular/forms';

import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product/product.service';
import { ProductSearchComponent } from "../search/product-search/product-search";

@Component({
  selector: 'app-guest-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductSearchComponent],
  templateUrl: './guest-navbar.html',
  styleUrl: './guest-navbar.css'
})
export class GuestHomeNavbarComponent {

searchControl = new FormControl('');

suggestions = signal<Product[]>([]);

productService = Inject(ProductService);


  private categoryService = inject(CategoryService);

  sidebarOpen = signal(false);

  categories = toSignal(
    this.categoryService.getAllCategories(),
    {
      initialValue: []
    }
  );
}