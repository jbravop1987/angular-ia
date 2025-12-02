import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

interface DashboardCard {
  title: string;
  value: string | number;
  icon: string;
  change: string;
  changeType: 'positive' | 'negative';
  bgColor: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  currentUser = this.authService.currentUser;
  
  cards: DashboardCard[] = [
    {
      title: 'Total Usuarios',
      value: 2847,
      icon: 'fa-users',
      change: '+12.5%',
      changeType: 'positive',
      bgColor: 'bg-indigo-600'
    },
    {
      title: 'Ingresos Mensuales',
      value: '$54,239',
      icon: 'fa-dollar-sign',
      change: '+8.2%',
      changeType: 'positive',
      bgColor: 'bg-emerald-600'
    },
    {
      title: 'Tareas Completadas',
      value: 342,
      icon: 'fa-check-circle',
      change: '-2.4%',
      changeType: 'negative',
      bgColor: 'bg-amber-600'
    },
    {
      title: 'Rendimiento',
      value: '94.8%',
      icon: 'fa-chart-line',
      change: '+5.1%',
      changeType: 'positive',
      bgColor: 'bg-violet-600'
    }
  ];

  recentActivities = [
    { user: 'Juan Pérez', action: 'Creó un nuevo proyecto', time: 'Hace 5 minutos', icon: 'fa-folder-plus', iconColor: 'text-blue-600' },
    { user: 'María García', action: 'Completó una tarea', time: 'Hace 15 minutos', icon: 'fa-check', iconColor: 'text-green-600' },
    { user: 'Carlos Ruiz', action: 'Subió un documento', time: 'Hace 1 hora', icon: 'fa-file-arrow-up', iconColor: 'text-purple-600' },
    { user: 'Ana López', action: 'Comentó en un proyecto', time: 'Hace 2 horas', icon: 'fa-comment', iconColor: 'text-amber-600' },
    { user: 'Pedro Sánchez', action: 'Actualizó el estado', time: 'Hace 3 horas', icon: 'fa-rotate', iconColor: 'text-indigo-600' }
  ];

  userName = computed(() => {
    const user = this.currentUser();
    return user ? user.name : 'Usuario';
  });

  constructor(private authService: AuthService) {}
}
