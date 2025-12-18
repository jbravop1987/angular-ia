import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { ToastService } from '../../../shared/services/toast.service';
import { User, CreateUserDto } from '../../../core/models/user.models';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserModalComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  isModalOpen = signal(false);
  selectedUser = signal<User | null>(null);
  searchTerm = signal('');

  constructor(
    public userService: UserService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.userService.loadUsers();
  }

  get filteredUsers(): User[] {
    const term = this.searchTerm().toLowerCase();
    if (!term) {
      return this.userService.users();
    }
    
    return this.userService.users().filter(user => 
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term)
    );
  }

  openCreateModal(): void {
    this.selectedUser.set(null);
    this.isModalOpen.set(true);
  }

  openEditModal(user: User): void {
    this.selectedUser.set(user);
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.selectedUser.set(null);
  }

  onSaveUser(userData: CreateUserDto): void {
    const currentUser = this.selectedUser();
    
    if (currentUser) {
      // Edit mode
      this.userService.updateUser(currentUser.id, userData).subscribe({
        next: () => {
          this.toastService.success('Usuario actualizado exitosamente');
          this.closeModal();
        },
        error: () => {
          this.toastService.error('Error al actualizar usuario');
        }
      });
    } else {
      // Create mode
      this.userService.createUser(userData).subscribe({
        next: () => {
          this.toastService.success('Usuario creado exitosamente');
          this.closeModal();
        },
        error: () => {
          this.toastService.error('Error al crear usuario');
        }
      });
    }
  }

  deleteUser(user: User): void {
    if (confirm(`¿Estás seguro de eliminar a ${user.name}?`)) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.toastService.success('Usuario eliminado exitosamente');
        },
        error: () => {
          this.toastService.error('Error al eliminar usuario');
        }
      });
    }
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }

  getStatusBadgeClass(status: string): string {
    return status === 'active' 
      ? 'bg-green-100 text-green-700' 
      : 'bg-red-100 text-red-700';
  }

  getRoleBadgeClass(role: string): string {
    const classes: Record<string, string> = {
      'admin': 'bg-purple-100 text-purple-700',
      'user': 'bg-blue-100 text-blue-700',
      'editor': 'bg-slate-100 text-slate-700'
    };
    return classes[role] || 'bg-slate-100 text-slate-700';
  }
}
