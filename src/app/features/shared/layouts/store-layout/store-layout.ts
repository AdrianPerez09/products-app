import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuthService } from '../../../../services/auth/auth.service';

import { GuestHomeNavbarComponent } from '../../home-navbar-guest/guest-navbar';
import { ClientHomeNavbarComponent } from '../../home-navbar-client/client-navbar';
import { AdminHomeNavbarComponent } from '../../home-navbar-admin/admin-navbar';
import { ShopFooter } from '../../home-footer/shop-footer/shop-footer';
import { NavbarAdminComponent } from "../../navbar-admin/admin-navbar";


@Component({
  selector: 'app-store-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    GuestHomeNavbarComponent,
    ClientHomeNavbarComponent,
    AdminHomeNavbarComponent,
    ShopFooter
],
  templateUrl: './store-layout.html',
  styleUrl: './store-layout.css'
})
export class StoreLayoutComponent {

  protected authService = inject(AuthService);

}