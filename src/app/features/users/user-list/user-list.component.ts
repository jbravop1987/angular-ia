import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { User } from '../../../core/models/user.models';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users = signal<User[]>([]);
  isLoading = signal(true);
  searchTerm = signal('');

  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading.set(true);
    
    // Intentar cargar desde API, con fallback a datos mock
    this.http.get<User[]>(`${this.API_URL}/users`).subscribe({
      next: (users) => {
        this.users.set(users);
        this.isLoading.set(false);
      },
      error: () => {
        // Fallback: Datos mock
        console.warn('API no disponible, usando datos mock');
        this.users.set(this.getMockUsers());
        this.isLoading.set(false);
      }
    });
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value.toLowerCase());
  }

  getFilteredUsers(): User[] {
    const term = this.searchTerm();
    if (!term) return this.users();
    
    return this.users().filter(user => 
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term)
    );
  }

  onNewUser(): void {
    console.log('Crear nuevo usuario');
    // Implementar lógica de creación
  }

  onEditUser(user: User): void {
    console.log('Editar usuario:', user);
    // Implementar lógica de edición
  }

  onDeleteUser(user: User): void {
    if (confirm(`¿Estás seguro de eliminar a ${user.name}?`)) {
      this.users.update(users => users.filter(u => u.id !== user.id));
      console.log('Usuario eliminado:', user);
    }
  }

  getStatusClass(status: string): string {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  }

  getRoleBadgeClass(role: string): string {
    const classes: Record<string, string> = {
      'admin': 'bg-purple-100 text-purple-800',
      'user': 'bg-blue-100 text-blue-800',
      'manager': 'bg-indigo-100 text-indigo-800',
      'guest': 'bg-slate-100 text-slate-800'
    };
    return classes[role.toLowerCase()] || 'bg-slate-100 text-slate-800';
  }

  private getMockUsers(): User[] {
    return [
      {
        id: 1,
        name: 'Juan Pérez',
        email: 'juan.perez@empresa.com',
        role: 'admin',
        status: 'active',
        createdAt: new Date('2024-01-15'),
        avatar: 'https://ui-avatars.com/api/?name=Juan+Perez&background=4f46e5&color=fff'
      },
      {
        id: 2,
        name: 'María García',
        email: 'maria.garcia@empresa.com',
        role: 'manager',
        status: 'active',
        createdAt: new Date('2024-02-20'),
        avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=059669&color=fff'
      },
      {
        id: 3,
        name: 'Carlos Ruiz',
        email: 'carlos.ruiz@empresa.com',
        role: 'user',
        status: 'active',
        createdAt: new Date('2024-03-10'),
        avatar: 'https://ui-avatars.com/api/?name=Carlos+Ruiz&background=dc2626&color=fff'
      },
      {
        id: 4,
        name: 'Ana López',
        email: 'ana.lopez@empresa.com',
        role: 'user',
        status: 'inactive',
        createdAt: new Date('2024-01-25'),
        avatar: 'https://ui-avatars.com/api/?name=Ana+Lopez&background=f59e0b&color=fff'
      },
      {
        id: 5,
        name: 'Pedro Sánchez',
        email: 'pedro.sanchez@empresa.com',
        role: 'manager',
        status: 'active',
        createdAt: new Date('2024-04-05'),
        avatar: 'https://ui-avatars.com/api/?name=Pedro+Sanchez&background=8b5cf6&color=fff'
      },
      {
        id: 6,
        name: 'Laura Martínez',
        email: 'laura.martinez@empresa.com',
        role: 'user',
        status: 'active',
        createdAt: new Date('2024-05-12'),
        avatar: 'https://ui-avatars.com/api/?name=Laura+Martinez&background=ec4899&color=fff'
      }
    ];
  }
}
