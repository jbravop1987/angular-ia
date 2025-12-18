import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  stats = [
    {
      title: 'Usuarios Totales',
      value: '2,543',
      change: '+12.5%',
      isPositive: true,
      icon: 'fa-users',
      bgColor: 'bg-blue-500'
    },
    {
      title: 'Ingresos',
      value: '$45,231',
      change: '+8.2%',
      isPositive: true,
      icon: 'fa-dollar-sign',
      bgColor: 'bg-green-500'
    },
    {
      title: 'Proyectos',
      value: '127',
      change: '+4.7%',
      isPositive: true,
      icon: 'fa-briefcase',
      bgColor: 'bg-indigo-500'
    },
    {
      title: 'Tasa de Conversión',
      value: '3.24%',
      change: '-2.1%',
      isPositive: false,
      icon: 'fa-chart-line',
      bgColor: 'bg-purple-500'
    }
  ];

  recentActivities = [
    { user: 'Juan Pérez', action: 'creó un nuevo proyecto', time: 'Hace 5 min', icon: 'fa-plus-circle', color: 'text-green-500' },
    { user: 'María García', action: 'actualizó un documento', time: 'Hace 15 min', icon: 'fa-edit', color: 'text-blue-500' },
    { user: 'Carlos López', action: 'completó una tarea', time: 'Hace 1 hora', icon: 'fa-check-circle', color: 'text-purple-500' },
    { user: 'Ana Martínez', action: 'comentó en un proyecto', time: 'Hace 2 horas', icon: 'fa-comment', color: 'text-indigo-500' },
    { user: 'Luis Rodríguez', action: 'subió un archivo', time: 'Hace 3 horas', icon: 'fa-upload', color: 'text-orange-500' }
  ];

  constructor(public authService: AuthService) {}
}
