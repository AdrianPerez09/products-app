import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app';
import { ProductListComponent } from './features/products/product-list/product-list';
import { LoginComponent } from './features/auth/login/login';
import { jwtInterceptor } from './interceptors/jwt-interceptor';
import { DashboardComponent } from './features/dashboard/dashboard';
import { CategoryListComponent } from './features/categories/category-list/category-list';
import { BrandListComponent } from './features/brands/brand-list/brand-list';
import { UserList } from './features/users/user-list/user-list';
import { NavbarComponent } from './features/shared/navbar/navbar';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    LoginComponent,
    DashboardComponent,
    CategoryListComponent,
    BrandListComponent,
    UserList,
    NavbarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([jwtInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
