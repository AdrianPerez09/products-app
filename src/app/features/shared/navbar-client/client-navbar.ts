import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './client-navbar.html',
  styleUrl: './client-navbar.css',
})
export class NavbarClientComponent {}
