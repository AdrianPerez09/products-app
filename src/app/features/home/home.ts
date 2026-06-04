import { Component } from '@angular/core';
import { NavbarClientComponent } from '../shared/navbar-client/client-navbar';

@Component({
  selector: 'app-home',
  imports: [NavbarClientComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {}
