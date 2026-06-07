import { Component, inject, signal } from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { AuthNavbarComponent } from '../../shared/navbar-auth/auth-navbar';

import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    AuthNavbarComponent
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  isLoading = signal(false);

  errorMessage = signal('');

  private router = inject(Router);

  private fb = inject(FormBuilder);

  private authService = inject(AuthService);

  registerForm = this.fb.nonNullable.group({

    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ],

    confirmPassword: [
      '',
      [
        Validators.required
      ]
    ]

  });

  register(): void {

    if (this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();

      return;

    }

    const {
      username,
      email,
      password,
      confirmPassword
    } = this.registerForm.getRawValue();

    if (password !== confirmPassword) {

      this.errorMessage.set(
        'Passwords do not match'
      );

      return;

    }

    this.isLoading.set(true);

    this.authService.register({

      username,
      email,
      password

    }).subscribe({

      next: () => {

        this.router.navigate([
          '/login'
        ]);

      },

      error: error => {

        this.isLoading.set(false);

        if (error.status === 409) {

          this.errorMessage.set(
            'Username or email already exists'
          );

          return;

        }

        this.errorMessage.set(
          'Unexpected error'
        );

      }

    });

  }

}