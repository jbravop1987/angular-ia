import { Component, signal, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User, CreateUserDto } from '../../../core/models/user.models';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.css'
})
export class UserModalComponent implements OnInit {
  @Input() user: User | null = null;
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<CreateUserDto>();

  userForm!: FormGroup;
  isEditMode = signal(false);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isEditMode.set(!!this.user);
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      name: [this.user?.name || '', [Validators.required, Validators.minLength(3)]],
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      role: [this.user?.role || 'User', Validators.required],
      phone: [this.user?.phone || '', [Validators.pattern(/^\+?[\d\s-()]+$/)]]
    });
  }

  onClose(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.save.emit(this.userForm.value);
    this.userForm.reset();
  }

  getErrorMessage(field: string): string {
    const control = this.userForm.get(field);
    
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

    if (control.errors['pattern']) {
      return 'Formato de teléfono inválido';
    }

    return '';
  }
}
