import {
  Component,
  inject,
  signal,
  effect
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { toSignal } from '@angular/core/rxjs-interop';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { map, switchMap } from 'rxjs';

import { ProductService } from '../../../services/product/product.service';

import { Product } from '../../../models/product.model';
import { BrandService } from '../../../services/brand/brand.service';
import { CategoryService } from '../../../services/category/category.service';
import { Category } from '../../../models/category.model';
import { Brand } from '../../../models/brand.model';
import { FormsModule } from '@angular/forms';

@Component({

  selector: 'app-product-list',

  standalone: true,

  imports: [
    CommonModule,
    RouterLink,
    FormsModule
  ],

  templateUrl: './product-list.html',

  styleUrl: './product-list.css'

})
export class ProductListComponent {

  /* ==========================================
     DEPENDENCIES
  ========================================== */

  private productService =
    inject(ProductService);

  private route =
    inject(ActivatedRoute);

  private brandService =
    inject(BrandService);

  private categoryService =
    inject(CategoryService);

  private router =
    inject(Router);


  /* ==========================================
   BRANDS
========================================== */

  private loadBrands(): void {

    this.brandService

      .getAllBrands()

      .subscribe(brands => {

        this.brands.set(
          brands
        );

      });

  }

  /* ==========================================
     CATEGORIES
  ========================================== */

  private loadCategories(): void {

    this.categoryService

      .getAllCategories()

      .subscribe(categories => {

        this.categories.set(
          categories
        );

      });

  }

  /**
   * Productos mostrados.
   */
  filteredProducts =
    signal<Product[]>([]);

  brands =
    signal<Brand[]>([]);

  categories =
    signal<Category[]>([]);


  /* ==========================================
     FILTERS
  ========================================== */

  searchQuery = '';

  selectedBrand =
    signal<number | null>(
      null
    );

  selectedCategory =
    signal<number | null>(
      null
    );

  readonly categoryFromQuery = toSignal(

    this.route.queryParamMap.pipe(

      map(params =>

        Number(
          params.get('category')
        ) || null

      )

    ),

    {
      initialValue: null
    }

  );

  readonly brandFromQuery = toSignal(

    this.route.queryParamMap.pipe(

      map(params =>

        Number(
          params.get('brand')
        ) || null

      )

    ),

    {
      initialValue: null
    }

  );

  readonly sortFromQuery = toSignal(

    this.route.queryParamMap.pipe(

      map(params =>

        params.get('sort')

        || ''

      )

    ),

    {
      initialValue: ''
    }

  );

  sortBy =
    signal('');

  /* ==========================================
     CONSTRUCTOR
  ========================================== */

  constructor() {

    this.initializeEffects();

    this.loadCategories();
  }
  /* ==========================================
     EFFECTS
  ========================================== */
  private initializeEffects(): void {

    effect(() => {

      const categoryId =

        this.categoryFromQuery();

      const brandId =

        this.brandFromQuery();

      const sort =

        this.sortFromQuery();

      this.selectedCategory.set(
        categoryId
      );

      this.selectedBrand.set(
        brandId
      );

      this.sortBy.set(
        sort
      );

      if (categoryId) {

        this.loadBrandsByCategory(
          categoryId
        );

      }

      else {

        this.loadBrands();

      }

      this.loadFilteredProducts();

    });

  }
  /* ==========================================
     EVENTS
  ========================================== */

  onCategorySelect(
    categoryId: number | null
  ): void {

    this.router.navigate(

      ['/products'],

      {

        queryParams: {

          category: categoryId,

          brand: null,

          sort: this.sortBy() || null

        }

      }

    );

  }
  onBrandSelect(
    brandId: number | null
  ): void {

    this.router.navigate(

      ['/products'],

      {

        queryParams: {

          category: this.selectedCategory(),

          brand: brandId,

          sort: this.sortBy() || null

        }

      }

    );

  }

  onSortSelect(
    sort: string
  ): void {

    this.router.navigate(

      ['/products'],

      {

        queryParams: {

          category: this.selectedCategory(),

          brand: this.selectedBrand(),

          sort: sort || null

        }

      }

    );

  }

  /* ==========================================
     API FILTERS
  ========================================== */

  private loadFilteredProducts(): void {

    this.productService

      .searchProducts(

        undefined,

        this.selectedBrand() ?? undefined,

        this.selectedCategory() ?? undefined,

        this.sortBy() || undefined

      )

      .subscribe(products => {

        this.filteredProducts.set(
          products
        );

      });

  }

  private loadBrandsByCategory(
    categoryId: number
  ): void {

    this.brandService

      .getBrandsByCategory(
        categoryId
      )

      .subscribe(brands => {

        this.brands.set(
          brands
        );

      });

  }

}