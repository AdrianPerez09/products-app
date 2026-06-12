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

import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../services/product/product.service';
import { KbSuggestionsNavigation } from './kb-suggestions-navigation';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  providers: [
    KbSuggestionsNavigation
  ],
  templateUrl: './product-search.html',
  styleUrl: './product-search.css'
})
export class ProductSearchComponent {

  private productService =
    inject(ProductService);

  private elementRef =
    inject(ElementRef);

  private router =
    inject(Router);

  private route =
    inject(ActivatedRoute);

  private keyboardNavigation =
    inject(KbSuggestionsNavigation);

  private ignoreNextSearch =
    false;

  searchControl =
    new FormControl('');

  suggestions = signal<any[]>([]);
  isOpen = signal(false);

  selectedIndex =

    this.keyboardNavigation
      .selectedIndex;

  constructor() {

    this.searchControl.valueChanges
      .pipe(

        debounceTime(300),

        distinctUntilChanged()

      )
      .subscribe(query => {

        if (

          this.ignoreNextSearch

        ) {

          this.ignoreNextSearch = false;

          return;

        }

        if (!query || query.length < 2) {

          this.suggestions.set([]);

          return;

        }

        this.productService
          .getSuggestions(query)
          .subscribe(products => {

            console.log(
              'SEARCH QUERY:',
              query
            );

            this.suggestions.set(products);
            this.keyboardNavigation.reset();
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

  selectProduct(productId: number): void {

    const currentParams =

      this.route.snapshot.queryParams;

        this.searchControl.reset();
        console.log('CERRANDO');
        this.isOpen.set(false);

    this.router.navigate(

      [

        '/products',

        productId

      ],

      {

        queryParams:

          currentParams

      }

    );

  }

  selectCurrentSuggestion(): void {

    const product =

      this.suggestions()[

      this.selectedIndex()

      ];

    if (product) {

      this.selectProduct(
        product.id
      );

      return;

    }

    this.searchProducts();

  }

  moveDown(): void {

    this.keyboardNavigation

      .moveDown(

        this.suggestions().length

      );

  }

  moveUp(): void {

    this.keyboardNavigation

      .moveUp();

  }


  searchProducts(): void {

    const query =

      this.searchControl.value?.trim();

    if (!query) {

      return;

    }

    this.ignoreNextSearch = true;

    this.isOpen.set(false);

    this.suggestions.set([]);

    this.keyboardNavigation.reset();



    const currentParams =

      this.route.snapshot.queryParams;

    this.router.navigate(

      ['/products'],

      {

        queryParams: {

          ...currentParams,

          search: query

        }

      }

    );

  }

}