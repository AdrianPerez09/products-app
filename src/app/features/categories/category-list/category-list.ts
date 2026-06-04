import { Component, inject, signal } from '@angular/core';


import { CategoryService } from '../../../services/category/CategoryService';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})
export class CategoryListComponent{
  private categoryService = inject(CategoryService);

  categories = toSignal(this.categoryService.getAllCategories(), { initialValue: [] });

}