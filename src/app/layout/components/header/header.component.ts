import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  currentUser = this.authService.currentUser;
  showUserMenu = false;

  userEmail = computed(() => {
    const user = this.currentUser();
    return user ? user.email : '';
  });

  userName = computed(() => {
    const user = this.currentUser();
    return user ? user.name : 'Usuario';
  });

  userInitials = computed(() => {
    const name = this.userName();
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  });

  constructor(private authService: AuthService) {}

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  logout(): void {
    this.authService.logout();
  }
}
