import { Component, inject } from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../services/auth/auth.service';
import { AuthNavbarComponent } from "../../shared/navbar-auth/auth-navbar";

import { signal } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    AuthNavbarComponent
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  isLoading = signal(false);

  errorMessage = signal('');

  private router = inject(Router)

  private fb = inject(FormBuilder);

  private authService = inject(AuthService);

  // Formulario reactivo
  loginForm = this.fb.nonNullable.group({

    username: ['',
      [
        Validators.required
      ]
    ],

    password: [
      '',

      [
        Validators.required,
        Validators.minLength(3)
      ]
    ]

  });

  login(): void {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;

    }

    this.authService
      .login(this.loginForm.getRawValue())

      .subscribe({

        next: response => {

          this.authService.saveTokens(
            response.accessToken,
            response.refreshToken
          );

          this.authService.setRole(response.role);
          this.authService.saveUsername(response.username);

          this.router.navigate([
            '/'
          ]);

        },

        error: error => {

          this.isLoading.set(false);

          console.log('STATUS:', error.status);

          console.log('ERROR:', error);

          console.log('BODY:', error.error);



          if (error.status === 401) {

            this.errorMessage.set(
              'Invalid username or password'
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