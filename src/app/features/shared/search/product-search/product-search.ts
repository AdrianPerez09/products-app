import {
  Component,
  inject,
  signal
} from '@angular/core';

import {
  ElementRef,
  HostListener
} from '@angular/core';

import {
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';

import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs';

import { RouterLink } from '@angular/router';
import { ProductService } from '../../../../services/product/product.service';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './product-search.html',
  styleUrl: './product-search.css'
})
export class ProductSearchComponent {

  private productService =
    inject(ProductService);

  private elementRef =
    inject(ElementRef);

  searchControl =
    new FormControl('');

  suggestions = signal<any[]>([]);
  isOpen = signal(false);

  constructor() {

    this.searchControl.valueChanges
      .pipe(

        debounceTime(300),

        distinctUntilChanged()

      )
      .subscribe(query => {

        if (!query || query.length < 2) {

          this.suggestions.set([]);

          return;

        }

        this.productService
          .searchProducts(query)
          .subscribe(products => {

            this.suggestions.set(products);
            this.isOpen.set(products.length > 0);

          });
      });
  }

  @HostListener(
    'document:click',
    ['$event']
  )
  onDocumentClick(
    event: MouseEvent
  ) {

    const clickedInside =
      this.elementRef
        .nativeElement
        .contains(event.target);

    if (!clickedInside) {

      this.isOpen.set(false);

    }

  }

  @HostListener(
  'document:keydown.escape'
)
closeSearch() {

  this.isOpen.set(false);

}

  selectProduct() {

  this.isOpen.set(false);

}

}