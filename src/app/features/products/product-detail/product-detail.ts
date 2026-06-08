import { Component, inject, signal } from '@angular/core';

import {
  ActivatedRoute
} from '@angular/router';
import {
  ProductService
} from '../../../services/product/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetailComponent {

selectedImage = signal(''); 

  constructor() {

    this.productService

      .getProductById(
        this.productId
      )

      .subscribe({

        next: product => {

          this.product.set(product);


          const thumbnail =

            product.images.find(

              image => image.thumbnail

            );

          this.selectedImage.set(

            thumbnail?.imageUrl ??

            product.images[0]?.imageUrl ??

            ''

          );

        }

      });

  }

  private route = inject(ActivatedRoute);

  private productService = inject(ProductService);

  productId = Number(this.route.snapshot.paramMap.get('id'));

  product = signal<any>(
    null
  );

}
