import { Component, NgZone } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product/product.service';
import { OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

constructor(private productService: ProductService,     private ngZone: NgZone) {
} 

ngOnInit(): void {
    // Lista los productos al cargar el componente
    console.log('ProductListComponent initialized');
      this.loadProducts();
  }

loadProducts(): void {
    console.log('Loading products...');

    this.productService.getAllProducts().subscribe({
      next: (data) => {
        console.log('Products loaded:', data);
        this.ngZone.run(() => {

          this.products = data;

        });
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    }
    );
  }

}