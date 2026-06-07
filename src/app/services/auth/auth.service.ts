
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { LoginRequest } from '../../models/login-request';

import { AuthResponse } from '../../models/auth-response';

import {
  Injectable,
  computed,
  signal
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private role = signal<string | null>(null);
  // Usuario autenticado

isAuthenticated = computed(() =>
  this.role() !== null
);

// Usuario normal
isUser = computed(() =>

  this.role() === 'USER'

);

// Administrador
isAdmin = computed(() =>

  this.role() === 'ADMIN'

);

  private apiUrl =
    `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient
  ) { }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`,credentials);
  }

  saveTokens(accessToken: string, refreshToken: string): void 
  {
    localStorage.setItem('accessToken',accessToken);
    localStorage.setItem('refreshToken',refreshToken);
  }

  getAccessToken(): string | null {

    return localStorage.getItem(
      'accessToken'
    );

  }

  getRefreshToken(): string | null {

    return localStorage.getItem('refreshToken');
  }

  refreshToken(): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`,
      {
        refreshToken:this.getRefreshToken()
      }
    );

  }

  setRole(role: string): void {

  this.role.set(role);

}

getRole(): string | null {

  return this.role();

}

  logout(): void {

    localStorage.removeItem('accessToken');

    localStorage.removeItem('refreshToken');

    this.role.set(null);
  }

}