import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { CategoryService } from '../../../services/category/category.service';
import { AuthService } from '../../../services/auth/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductSearchComponent } from "../search/product-search/product-search";


@Component({
  selector: 'app-home-navbar-admin',
  standalone: true,
  imports: [RouterLink, ProductSearchComponent],
  templateUrl: './admin-navbar.html',
  styleUrl: './admin-navbar.css'
})
export class AdminHomeNavbarComponent {

  private categoryService = inject(CategoryService);
  protected authService = inject(AuthService);
  private router = inject(Router);

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