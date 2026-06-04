import { Component } from '@angular/core';
import {AuthService} from '../../../services/auth/authService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
   standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {

username: string = '';
password: string = '';

constructor(private authService: AuthService) {}

login(): void {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.authService.saveToken(response.token);
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
}
