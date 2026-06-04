import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductListComponent {

   private productService = inject(ProductService);

  products = toSignal(this.productService.getAllProducts(), { initialValue: [] }
  );
}