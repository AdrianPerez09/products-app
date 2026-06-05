import { Component, inject, signal } from '@angular/core';

import { CommonModule } from '@angular/common';

import { toSignal } from '@angular/core/rxjs-interop';

import { CategoryService } from '../../../services/category/CategoryService';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-client-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './client-navbar.html',
  styleUrl: './client-navbar.css'
})
export class ClientNavbarComponent {

  private categoryService = inject(CategoryService);

  sidebarOpen = signal(false);

  categories = toSignal(
    this.categoryService.getAllCategories(),
    {
      initialValue: []
    }
  );
}