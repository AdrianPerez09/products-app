
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './features/products/product-list/product-list';
import { LoginComponent } from './features/auth/login/login';
import { BrandListComponent } from './features/brands/brand-list/brand-list';
import { CategoryListComponent } from './features/categories/category-list/category-list';
import { DashboardComponent } from './features/dashboard/dashboard';
import { HomeComponent } from './features/home/home';

export const routes: Routes = [
 {
    path: '',
    component: HomeComponent
  },
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'brands',
    component: BrandListComponent
    
  },
  {
    path: 'categories',
    component: CategoryListComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];

export class AppRoutes { }
