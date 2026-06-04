import { Component } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product/product.service';
import { OnInit } from '@angular/core';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-list',
   standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductListComponent implements OnInit {
  products = signal<Product[]>([]);


  constructor(
    private productService: ProductService,
  ) { }
  ngOnInit(): void {
    // Lista los productos al cargar el componente
    console.log('ProductListComponent initialized');
    this.loadProducts();
  }

  loadProducts(): void {
    console.log('Loading products...');
    this.productService.getAllProducts().subscribe(data => {
      this.products.set(data);
    });

  }
}