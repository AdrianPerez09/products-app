import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './features/products/product-list/product-list';
import { LoginComponent } from './features/auth/login/login';
import { BrandListComponent } from './features/brands/brand-list/brand-list';
import { CategoryListComponent } from './features/categories/category-list/category-list';
import { DashboardComponent } from './features/dashboard/dashboard';

const routes: Routes = [
  {
  path: '',
  redirectTo: '/login',
  pathMatch: 'full'
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
