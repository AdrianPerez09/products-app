import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarAdminComponent } from "../shared/navbar-admin/admin-navbar";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarAdminComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {}
