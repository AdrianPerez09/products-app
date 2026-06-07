
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
import { RegisterRequest } from '../../models/register-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private role = signal<string | null>(null);

  private username = signal<string | null>(null);
  // Usuario autenticado

  usernameValue = computed(() => this.username());

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
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials);
  }

  register(request: RegisterRequest) {

  return this.http.post(
    `${this.apiUrl}/register`,
    request
  );

}

  saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
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
        refreshToken: this.getRefreshToken()
      }
    );

  }

  saveRole(role: string): void {

    localStorage.setItem(
      'role',
      role
    );

    this.role.set(role);

  }

  saveUsername(username: string): void {

    localStorage.setItem(
      'username',
      username
    );

    this.username.set(username);

  }

  loadUsername(): void {

    const username =
      localStorage.getItem('username');

    if (username) {

      this.username.set(username);

    }

  }

  loadRole(): void {

    const role = localStorage.getItem('role');

    if (role) {

      this.role.set(role);

    }

  }


  setRole(role: string): void {

    this.saveRole(role);

  }

  getRole(): string | null {

    return this.role();

  }

  logout(): void {

    localStorage.removeItem(
      'accessToken'
    );

    localStorage.removeItem(
      'refreshToken'
    );

    localStorage.removeItem(
      'role'
    );

    localStorage.removeItem(
      'username'
    );

    this.username.set(null);

    this.role.set(null);

  }
}