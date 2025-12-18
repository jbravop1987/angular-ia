import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { User, CreateUserDto, UsersResponse } from '../../../core/models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSignal = signal<User[]>([]);
  
  public readonly users = this.usersSignal.asReadonly();

  // Mock data para desarrollo
 // private mockUsers: User[] = [
 //   { id: 1, email: 'admin@example.com', name: 'Admin Usuario', role: 'Admin', phone: '+1234567890', status: 'active', createdAt: new Date() },
 //   { id: 2, email: 'user1@example.com', name: 'Juan Pérez', role: 'User', phone: '+1234567891', status: 'active', createdAt: new Date() },
 //   { id: 3, email: 'user2@example.com', name: 'María García', role: 'User', phone: '+1234567892', status: 'active', createdAt: new Date() },
 //   { id: 4, email: 'user3@example.com', name: 'Carlos López', role: 'Editor', phone: '+1234567893', status: 'inactive', createdAt: new Date() },
 //   { id: 5, email: 'user4@example.com', name: 'Ana Martínez', role: 'User', phone: '+1234567894', status: 'active', createdAt: new Date() }
 // ];

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  loadUsers(): void {
    this.http.get<UsersResponse>(`${environment.apiUrl}/users`).pipe(
      tap(response => this.usersSignal.set(response.data.data)),
      catchError((error) => {
        // Fallback a datos locales
        console.warn('API no disponible:', error);
        // this.usersSignal.set(this.mockUsers);
        return of(null);
      })
    ).subscribe();
  }

  getUsers(): Observable<User[]> {
    return of(this.usersSignal());
  }

  getUser(id: number): User | undefined {
    return this.usersSignal().find(u => u.id === id);
  }

  createUser(userData: CreateUserDto): Observable<User> {
    const newUser: User = {
      id: Math.max(...this.usersSignal().map(u => u.id), 0) + 1,
      email: userData.email,
      name: userData.name,
      role: userData.role,
      phone: userData.phone,
      status: 'active',
      createdAt: new Date()
    };

    this.usersSignal.update(users => [...users, newUser]);
    return of(newUser);
  }

  updateUser(id: number, userData: Partial<CreateUserDto>): Observable<User> {
    const users = this.usersSignal();
    const index = users.findIndex(u => u.id === id);
    
    if (index !== -1) {
      const updatedUser = { ...users[index], ...userData };
      this.usersSignal.update(users => [
        ...users.slice(0, index),
        updatedUser,
        ...users.slice(index + 1)
      ]);
      return of(updatedUser);
    }
    
    throw new Error('Usuario no encontrado');
  }

  deleteUser(id: number): Observable<void> {
    this.usersSignal.update(users => users.filter(u => u.id !== id));
    return of(void 0);
  }
}
