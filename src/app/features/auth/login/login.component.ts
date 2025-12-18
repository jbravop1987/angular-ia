import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../shared/services/toast.service';
import { LoadingService } from '../../../shared/services/loading.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = signal(false);
  isSubmitting = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private loadingService: LoadingService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword.update(value => !value);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.loadingService.show();

    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (user) => {
        console.log('Login successful:', user);
        this.loadingService.hide();
        this.isSubmitting.set(false);
        this.toastService.success(`Bienvenido, ${user.name}!`);
        
        // Redirect to returnUrl or dashboard
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        this.router.navigate([returnUrl]);
      },
      error: (error) => {
        this.loadingService.hide();
        this.isSubmitting.set(false);
        this.toastService.error('Credenciales incorrectas. Intenta nuevamente.');
        console.error('Login error:', error);
      }
    });
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.errors['required']) {
      return 'Este campo es requerido';
    }
    
    if (control.errors['email']) {
      return 'Email inválido';
    }
    
    if (control.errors['minlength']) {
      return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
    }

    return '';
  }
}
