import { Component, inject, signal } from '@angular/core';

import { CommonModule } from '@angular/common';

import { toSignal } from '@angular/core/rxjs-interop';

import { CategoryService } from '../../../services/category/category.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './auth-navbar.html',
  styleUrl: './auth-navbar.css'
})
export class AuthNavbarComponent {
}