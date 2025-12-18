import { Injectable, signal, computed } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User, LoginCredentials, AuthResponse } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';
  
  // Signal para el usuario actual
  private userSignal = signal<User | null>(this.loadUserFromStorage());
  
  // Computed signal para saber si está autenticado
  public isAuthenticated = computed(() => this.userSignal() !== null);
  
  // Getter público para el usuario
  public get currentUser() {
    return this.userSignal.asReadonly();
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(credentials: LoginCredentials): Observable<User> {
    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/auth/login`,
      credentials
    ).pipe(
      tap(response => {
        console.log('Auth response from API:', response.data);
        this.setSession(response.data.token, response.data.user);
      }),
      map(response => response.data.user),
      catchError((error: HttpErrorResponse) => {
        // Fallback local para desarrollo
        console.warn('API no disponible, usando autenticación local');
        return throwError(() => error);
      })
    );
  }

  private localLogin(credentials: LoginCredentials): Observable<User> {
    // Simulación de login local para desarrollo
    if (credentials.email && credentials.password) {
      const mockUser: User = {
        id: 1,
        email: credentials.email,
        name: credentials.email.split('@')[0],
        role: 'Admin'
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      this.setSession(mockToken, mockUser);
      
      return of(mockUser);
    }
    
    return throwError(() => new Error('Credenciales inválidas'));
  }

  private setSession(token: string, user: User): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.userSignal.set(user);
  }

  private loadUserFromStorage(): User | null {
    try {
      const userJson = localStorage.getItem(this.USER_KEY);
      return userJson ? JSON.parse(userJson) : null;
    } catch {
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.userSignal.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  updateUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.userSignal.set(user);
  }
}
