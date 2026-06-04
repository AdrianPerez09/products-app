import { Component, OnInit } from '@angular/core';

import { Category } from '../../../models/category.model';

import { CategoryService } from '../../../services/category/CategoryService';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-category-list',
  standalone: true,
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {

    this.loadCategories();

  }

  loadCategories(): void {

    this.categoryService
      .getAllCategories()
      .subscribe({

        next: (data) => {

          this.categories = data;

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

}