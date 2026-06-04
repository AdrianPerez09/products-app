import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-navbar.html',
  styleUrl: './admin-navbar.css',
})
export class NavbarAdminComponent {}
