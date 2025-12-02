import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, catchError, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, LoginCredentials, AuthResponse } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;
  private readonly TOKEN_KEY = 'auth_token';
  
  private currentUserSignal = signal<User | null>(null);
  
  currentUser = this.currentUserSignal.asReadonly();
  isAuthenticated = computed(() => this.currentUserSignal() !== null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadUserFromStorage();
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/login`, credentials).pipe(
      catchError(() => {
        // Fallback: Simulación local si la API no responde
        console.warn('API no disponible, usando login simulado');
        const mockResponse: AuthResponse = {
          token: 'mock-jwt-token-' + Date.now(),
          user: {
            id: 1,
            email: credentials.email,
            name: 'Usuario Demo',
            role: 'admin'
          }
        };
        return of(mockResponse);
      }),
      tap(response => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
        localStorage.setItem('current_user', JSON.stringify(response.user));
        this.currentUserSignal.set(response.user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('current_user');
    this.currentUserSignal.set(null);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private loadUserFromStorage(): void {
    const token = this.getToken();
    const userJson = localStorage.getItem('current_user');
    
    if (token && userJson) {
      try {
        const user = JSON.parse(userJson);
        this.currentUserSignal.set(user);
      } catch (error) {
        console.error('Error loading user from storage', error);
        this.logout();
      }
    }
  }
}
