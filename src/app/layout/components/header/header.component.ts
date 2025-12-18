import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isProfileMenuOpen = signal(false);
  isMobileMenuOpen = signal(false);

  constructor(public authService: AuthService) {}

  toggleProfileMenu(): void {
    this.isProfileMenuOpen.update(value => !value);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(value => !value);
  }

  logout(): void {
    this.authService.logout();
    this.isProfileMenuOpen.set(false);
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
