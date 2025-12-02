import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isCollapsed = signal(false);

  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'fa-chart-line', route: '/dashboard' },
    { label: 'Usuarios', icon: 'fa-users', route: '/users' },
    { label: 'Proyectos', icon: 'fa-folder', route: '/projects' },
    { label: 'Reportes', icon: 'fa-file-chart-line', route: '/reports' },
    { label: 'Configuración', icon: 'fa-cog', route: '/settings' }
  ];

  toggleSidebar(): void {
    this.isCollapsed.update(value => !value);
  }
}
