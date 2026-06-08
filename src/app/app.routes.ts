import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home';

import { ProductListComponent } from './features/products/product-list/product-list';

import { BrandListComponent } from './features/brands/brand-list/brand-list';

import { CategoryListComponent } from './features/categories/category-list/category-list';

import { DashboardComponent } from './features/dashboard/dashboard';

import { LoginComponent } from './features/auth/login/login';

import { RegisterComponent } from './features/auth/register/register';

import { StoreLayoutComponent } from './features/shared/layouts/store-layout/store-layout';
import { ProductDetailComponent } from './features/products/product-detail/product-detail';

export const routes: Routes = [

  /* =========================
     STORE
  ========================= */

  {
    path: '',
    component: StoreLayoutComponent,
    children: [

      {
        path: '',
        component: HomeComponent
      },

      {
        path: 'products',
        component: ProductListComponent
      },

      {
        path: 'products/:id',
        component: ProductDetailComponent
      },

      {
        path: 'products/category/:id',
        component: ProductListComponent
      },

      {
        path: 'brands',
        component: BrandListComponent
      },

      {
        path: 'categories',
        component: CategoryListComponent
      }

    ]
  },

  /* =========================
     AUTH
  ========================= */

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  /* =========================
     ADMIN
  ========================= */

  {
    path: 'dashboard',
    component: DashboardComponent
  },

  /* =========================
     FALLBACK
  ========================= */

  {
    path: '**',
    redirectTo: ''
  }

];