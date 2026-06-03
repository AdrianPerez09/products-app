import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { LoginRequest } from '../../models/login-request';

import { AuthResponse } from '../../models/auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  
  constructor(private http: HttpClient) {}
  
  login(credentials: LoginRequest): Observable<AuthResponse> {
  
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/login`, credentials
    );
  }
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
