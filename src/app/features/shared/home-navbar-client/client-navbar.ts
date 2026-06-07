import { Component, inject, signal } from '@angular/core';

import { CommonModule } from '@angular/common';

import { toSignal } from '@angular/core/rxjs-interop';

import { CategoryService } from '../../../services/category/category.service';
import { AuthService } from '../../../services/auth/auth.service';
import { RouterLink, Router} from '@angular/router';
import { ProductSearchComponent } from "../search/product-search/product-search";


@Component({
  selector: 'app-client-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductSearchComponent],
  templateUrl: './client-navbar.html',
  styleUrl: './client-navbar.css'
})
export class ClientHomeNavbarComponent {

  private categoryService = inject(CategoryService);
  protected authService = inject(AuthService);
  private router = inject(Router)

  sidebarOpen = signal(false);

  categories = toSignal(
    this.categoryService.getAllCategories(),
    {
      initialValue: []
    }
  );

   logout(): void {

    this.authService.logout();

    this.router.navigate(['/']);

  }
}