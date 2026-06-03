import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ProductListComponent } from './features/products/product-list/product-list';
import { LoginComponent } from './features/auth/login/login';
import{jwtInterceptor} from './interceptors/jwt-interceptor';

@NgModule({
  declarations: [App, ProductListComponent, LoginComponent,],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([jwtInterceptor]))
  ],
  bootstrap: [App],
})
export class AppModule {}
